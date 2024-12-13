/**
 * SenangWebs Frame - A lightweight, touch-friendly slider library
 * Version 1.2.1
 */

class SWF {
    constructor(element, userConfig = {}) {
        if (!(element instanceof HTMLElement)) {
            userConfig = element;
            element = null;
        }

        this.wrapper = element || document.querySelector('[data-swf]');
        if (!this.wrapper) return;

        this.container = this.wrapper.querySelector('[data-swf-items]');
        if (!this.container) return;

        const dataConfig = this.parseDataAttributes(this.container);

        this.config = {
            autoplay: false,
            autoplayDelay: 3000,
            animationSpeed: 300,
            infinite: true,
            startIndex: 0,
            responsive: [{
                breakpoint: 4000,
                slidesPerView: 1,
                spacing: 0
            }],
            ...dataConfig,
            ...userConfig
        };

        this.normalizeResponsiveConfig();

        this.state = {
            currentIndex: this.config.startIndex,
            isAnimating: false,
            autoplayInterval: null,
            touchStartX: 0,
            touchEndX: 0,
            isTouching: false,
            currentBreakpoint: null,
            slidesPerView: 1,
            spacing: 0,
            slideWidth: 0,
            trackWidth: 0
        };

        this.init();
    }

    parseDataAttributes(element) {
        const config = {};
        const booleanAttrs = ['autoplay', 'infinite'];
        const numberAttrs = ['autoplayDelay', 'animationSpeed', 'startIndex'];

        booleanAttrs.forEach(attr => {
            const value = element.dataset[`swf${attr.charAt(0).toUpperCase()}${attr.slice(1)}`];
            if (value !== undefined) {
                config[attr] = value === 'true';
            }
        });

        numberAttrs.forEach(attr => {
            const value = element.dataset[`swf${attr.charAt(0).toUpperCase()}${attr.slice(1)}`];
            if (value !== undefined) {
                config[attr] = Number(value);
            }
        });

        try {
            const responsiveAttr = element.dataset.swfResponsive;
            if (responsiveAttr) {
                config.responsive = JSON.parse(responsiveAttr);
            }
        } catch (e) {
            console.warn('Invalid responsive configuration:', e);
        }

        return config;
    }

    normalizeResponsiveConfig() {
        if (!Array.isArray(this.config.responsive)) {
            this.config.responsive = [{
                breakpoint: 4000,
                slidesPerView: 1,
                spacing: 0
            }];
            return;
        }

        this.config.responsive.sort((a, b) => b.breakpoint - a.breakpoint);
    }

    init() {
        this.track = this.container.querySelector('[data-swf-track]');
        if (!this.track) {
            this.track = document.createElement('div');
            this.track.setAttribute('data-swf-track', '');
            
            const items = Array.from(this.container.children);
            items.forEach(item => {
                if (item.hasAttribute('data-swf-item')) {
                    this.track.appendChild(item);
                }
            });
            
            this.container.appendChild(this.track);
        }

        this.slides = Array.from(this.track.querySelectorAll('[data-swf-item]'));
        if (!this.slides.length) return;

        const controls = this.wrapper.querySelector('[data-swf-controls]');
        if (controls) {
            this.prevButton = controls.querySelector('[data-swf-prev]');
            this.nextButton = controls.querySelector('[data-swf-next]');
        }

        this.container.style.setProperty('--swf-transition-speed', `${this.config.animationSpeed}ms`);

        this.setupResponsive();
        this.setupStyles();
        this.bindEvents();

        if (this.config.autoplay) {
            this.startAutoplay();
        }

        this.updateSlidePositions(false);

        this.resizeObserver = new ResizeObserver(() => {
            this.handleResize();
        });
        this.resizeObserver.observe(this.container);
    }

    setupResponsive() {
        const width = window.innerWidth;
        let matchedBreakpoint = this.config.responsive[0];

        for (const bp of this.config.responsive) {
            if (width <= bp.breakpoint) {
                matchedBreakpoint = bp;
            }
        }

        const breakpointChanged = matchedBreakpoint !== this.state.currentBreakpoint;
        if (breakpointChanged) {
            this.state.currentBreakpoint = matchedBreakpoint;
            this.state.slidesPerView = matchedBreakpoint.slidesPerView;
            this.state.spacing = matchedBreakpoint.spacing;
        }

        return breakpointChanged;
    }

    setupStyles() {
        if (!this.container || !this.track || !this.slides.length) return;

        const containerWidth = this.container.offsetWidth;
        const { slidesPerView, spacing } = this.state;

        // Calculate individual slide width
        const availableWidth = containerWidth - (spacing * (slidesPerView - 1));
        const slideWidth = availableWidth / slidesPerView;

        // Calculate total track width needed for all slides
        const totalSlides = this.slides.length;
        const totalWidth = (slideWidth * totalSlides) + (spacing * (totalSlides - 1));
        
        // Update track styles
        this.track.style.display = 'flex';
        this.track.style.width = `${totalWidth}px`;
        this.track.style.gap = `${spacing}px`;

        // Update slides styles
        this.slides.forEach(slide => {
            slide.style.flex = `0 0 ${slideWidth}px`;
            slide.style.maxWidth = `${slideWidth}px`;
        });

        // Store calculated dimensions
        this.state.dimensions = {
            containerWidth,
            slideWidth,
            spacing,
            slidesPerView,
            totalWidth,
            slidesCount: totalSlides
        };
    }

    updateSlidePositions(animate = true) {
        if (!this.state.dimensions) return;

        const { slideWidth, spacing, slidesCount } = this.state.dimensions;
        const slideAndSpacing = slideWidth + spacing;
        const position = -this.state.currentIndex * slideAndSpacing;

        // Prevent overscroll
        const maxScroll = -(slideAndSpacing * (slidesCount - this.state.slidesPerView));
        const clampedPosition = Math.max(Math.min(position, 0), maxScroll);

        if (!animate) {
            this.track.style.transition = 'none';
        }

        this.track.style.transform = `translateX(${clampedPosition}px)`;

        if (!animate) {
            // Force reflow
            this.track.offsetHeight;
            this.track.style.transition = '';
        }

        // Update navigation buttons
        if (!this.config.infinite) {
            if (this.prevButton) {
                this.prevButton.disabled = this.state.currentIndex <= 0;
            }
            if (this.nextButton) {
                this.nextButton.disabled = this.state.currentIndex >= this.getMaxIndex();
            }
        }
    }

    getMaxIndex() {
        if (!this.slides.length || !this.state.slidesPerView) return 0;
        return Math.max(0, this.slides.length - this.state.slidesPerView);
    }

    goToSlide(index) {
        if (this.state.isAnimating) return;

        const maxIndex = this.getMaxIndex();
        let targetIndex = index;

        if (this.config.infinite) {
            if (index < 0) {
                targetIndex = maxIndex;
            } else if (index > maxIndex) {
                targetIndex = 0;
            }
        } else {
            if (index < 0) {
                targetIndex = 0;
            } else if (index > maxIndex) {
                targetIndex = maxIndex;
            }
        }

        this.state.isAnimating = true;
        this.state.currentIndex = targetIndex;
        this.updateSlidePositions();

        setTimeout(() => {
            this.state.isAnimating = false;
            this.container.dispatchEvent(new CustomEvent('swf:change', {
                detail: {
                    index: targetIndex,
                    slide: this.slides[targetIndex]
                }
            }));
        }, this.config.animationSpeed);
    }

    bindEvents() {
        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prev());
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.next());
        }

        this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: true });
        this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));

        window.addEventListener('resize', this.handleResize.bind(this));
        document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }

    handleTouchStart(e) {
        if (this.state.isAnimating) return;
        
        this.state.isTouching = true;
        this.state.touchStartX = e.touches[0].clientX;
        
        if (this.config.autoplay) {
            this.pauseAutoplay();
        }
    }

    handleTouchMove(e) {
        if (!this.state.isTouching || !this.state.dimensions) return;

        const currentX = e.touches[0].clientX;
        const diff = this.state.touchStartX - currentX;
        const { slideWidth, spacing, slidesCount } = this.state.dimensions;
        
        const slideAndSpacing = slideWidth + spacing;
        const basePosition = -this.state.currentIndex * slideAndSpacing;
        const newPosition = basePosition - diff;
        
        // Calculate bounds
        const maxScroll = -(slideAndSpacing * (slidesCount - this.state.slidesPerView));
        const clampedPosition = Math.max(Math.min(newPosition, 0), maxScroll);
        
        this.track.style.transform = `translateX(${clampedPosition}px)`;
    }

    handleTouchEnd(e) {
        if (!this.state.isTouching) return;

        const diff = this.state.touchStartX - e.changedTouches[0].clientX;
        const { slideWidth, spacing } = this.state.dimensions;
        const slideAndSpacing = slideWidth + spacing;
        
        // Calculate movement threshold (20% of slide width)
        const threshold = slideAndSpacing * 0.2;

        if (Math.abs(diff) > threshold) {
            // Calculate how many slides to move
            const slidesToMove = Math.max(1, Math.round(Math.abs(diff) / slideAndSpacing));
            
            if (diff > 0) {
                this.goToSlide(this.state.currentIndex + slidesToMove);
            } else {
                this.goToSlide(this.state.currentIndex - slidesToMove);
            }
        } else {
            // Snap back to current position
            this.updateSlidePositions();
        }

        this.state.isTouching = false;

        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }

    handleResize() {
        if (this.setupResponsive()) {
            this.setupStyles();
            
            // Ensure current index is valid after resize
            const maxIndex = this.getMaxIndex();
            if (this.state.currentIndex > maxIndex) {
                this.state.currentIndex = maxIndex;
            }
            
            this.updateSlidePositions(false);
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseAutoplay();
        } else if (this.config.autoplay) {
            this.startAutoplay();
        }
    }

    next() {
        this.goToSlide(this.state.currentIndex + 1);
    }

    prev() {
        this.goToSlide(this.state.currentIndex - 1);
    }

    startAutoplay() {
        if (this.state.autoplayInterval) return;
        this.state.autoplayInterval = setInterval(() => this.next(), this.config.autoplayDelay);
    }

    pauseAutoplay() {
        if (this.state.autoplayInterval) {
            clearInterval(this.state.autoplayInterval);
            this.state.autoplayInterval = null;
        }
    }

    destroy() {
        this.pauseAutoplay();

        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }

        if (this.prevButton) {
            this.prevButton.removeEventListener('click', this.prev);
        }
        if (this.nextButton) {
            this.nextButton.removeEventListener('click', this.next);
        }

        this.container.removeEventListener('touchstart', this.handleTouchStart);
        this.container.removeEventListener('touchmove', this.handleTouchMove);
        this.container.removeEventListener('touchend', this.handleTouchEnd);

        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);

        // Reset styles
        this.wrapper.style = '';
        this.container.style = '';
        this.track.style = '';
        this.slides.forEach(slide => {
            slide.style = '';
        });
    }

    static initializeAll() {
        document.querySelectorAll('[data-swf]').forEach(wrapper => {
            new SWF(wrapper);
        });
    }
}

export default SWF;

if (typeof window !== 'undefined') {
    window.SWF = SWF;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', SWF.initializeAll);
    } else {
        SWF.initializeAll();
    }
}