/**
 * SenangWebs Frame - A lightweight, touch-friendly slider library
 * Version 1.1.0
 */

class SWF {
    constructor(element, userConfig = {}) {
        // Allow passing either element or config
        if (!(element instanceof HTMLElement)) {
            userConfig = element;
            element = null;
        }

        this.container = element || document.querySelector('[data-swf-items]');
        if (!this.container) return;

        // Parse data attributes
        const dataConfig = this.parseDataAttributes(this.container);
        
        this.config = {
            autoplay: false,
            autoplayDelay: 3000,
            animationSpeed: 300,
            infinite: true,
            startIndex: 0,
            responsive: [
                {
                    breakpoint: 4000,
                    slidesPerView: 1,
                    spacing: 0
                }
            ],
            ...dataConfig,  // Data attributes override defaults
            ...userConfig   // User config overrides data attributes
        };

        // Ensure responsive config is properly formatted
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
            spacing: 0
        };

        this.init();
    }

    parseDataAttributes(element) {
        const config = {};
        const booleanAttrs = ['autoplay', 'infinite'];
        const numberAttrs = ['autoplayDelay', 'animationSpeed', 'startIndex'];

        // Parse boolean attributes
        booleanAttrs.forEach(attr => {
            const value = element.dataset[`swf${attr.charAt(0).toUpperCase()}${attr.slice(1)}`];
            if (value !== undefined) {
                config[attr] = value === 'true';
            }
        });

        // Parse number attributes
        numberAttrs.forEach(attr => {
            const value = element.dataset[`swf${attr.charAt(0).toUpperCase()}${attr.slice(1)}`];
            if (value !== undefined) {
                config[attr] = Number(value);
            }
        });

        // Parse responsive settings
        this.parseResponsiveAttributes(element, config);

        return config;
    }

    parseResponsiveAttributes(element, config) {
        // Try to parse the responsive JSON data attribute
        const responsiveJson = element.dataset.swfResponsive;
        if (responsiveJson) {
            try {
                const parsed = JSON.parse(responsiveJson);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    config.responsive = parsed;
                    console.log('Parsed responsive config:', config.responsive);
                }
            } catch (e) {
                console.warn('Invalid JSON in data-swf-responsive:', e);
            }
        }

        // Fallback to individual attributes if JSON parsing failed or was empty
        if (!config.responsive || !config.responsive.length) {
            const responsive = [];
            let breakpoint = 0;
            
            while (true) {
                const breakpointAttr = element.dataset[`swfBreakpoint${breakpoint}`];
                const slidesAttr = element.dataset[`swfSlides${breakpoint}`];
                const spacingAttr = element.dataset[`swfSpacing${breakpoint}`];

                if (!breakpointAttr && !slidesAttr && !spacingAttr) {
                    break;
                }

                if (breakpointAttr) {
                    responsive.push({
                        breakpoint: parseInt(breakpointAttr, 10) || 4000,
                        slidesPerView: parseInt(slidesAttr, 10) || 1,
                        spacing: parseInt(spacingAttr, 10) || 0
                    });
                }

                breakpoint++;
            }

            if (responsive.length > 0) {
                config.responsive = responsive;
            }
        }
    }

    normalizeResponsiveConfig() {
        if (!Array.isArray(this.config.responsive)) {
            this.config.responsive = [
                {
                    breakpoint: 4000,
                    slidesPerView: 1,
                    spacing: 0
                }
            ];
            return;
        }

        // Validate and fix each breakpoint configuration
        this.config.responsive = this.config.responsive.map(bp => ({
            breakpoint: parseInt(bp.breakpoint) || 4000,
            slidesPerView: Math.max(1, parseInt(bp.slidesPerView) || 1),
            spacing: Math.max(0, parseInt(bp.spacing) || 0)
        }));

        // Sort breakpoints in ascending order
        this.config.responsive.sort((a, b) => a.breakpoint - b.breakpoint);

        console.log('Normalized responsive config:', this.config.responsive);
    }

    init() {
        // Create track element if it doesn't exist
        this.track = this.container.querySelector('[data-swf-track]');
        if (!this.track) {
            this.track = document.createElement('div');
            this.track.setAttribute('data-swf-track', '');
            while (this.container.firstChild) {
                this.track.appendChild(this.container.firstChild);
            }
            this.container.appendChild(this.track);
        }

        // Set infinite attribute if enabled
        if (this.config.infinite) {
            this.track.setAttribute('data-infinite', '');
        }

        this.slides = Array.from(this.container.querySelectorAll('[data-swf-item]'));
        
        // Find controls within the same container scope
        const controls = this.container.closest('[data-swf-controls]') || 
                        this.container.nextElementSibling;
        
        if (controls && controls.matches('[data-swf-controls]')) {
            this.prevButton = controls.querySelector('[data-swf-prev]');
            this.nextButton = controls.querySelector('[data-swf-next]');
        }

        if (!this.slides.length) return;

        // Set transition speed CSS variable
        this.container.style.setProperty('--swf-transition-speed', `${this.config.animationSpeed}ms`);

        this.setupResponsive();
        this.setupStyles();
        this.bindEvents();

        if (this.config.autoplay) {
            this.startAutoplay();
        }

        // Initialize positions
        this.updateSlidePositions();

        // Add resize observer to handle container width changes
        this.resizeObserver = new ResizeObserver(() => {
            this.setupStyles();
            this.updateSlidePositions();
        });
        this.resizeObserver.observe(this.container);
    }

    setupResponsive() {
        const width = window.innerWidth;
        console.log('Current window width:', width);
        
        // Find the appropriate breakpoint
        let currentBreakpoint = this.config.responsive[0];

        for (const bp of this.config.responsive) {
            if (width <= bp.breakpoint) {
                currentBreakpoint = bp;
                break;
            }
        }

        // If no matching breakpoint found, use the largest one
        if (!currentBreakpoint) {
            currentBreakpoint = this.config.responsive[this.config.responsive.length - 1];
        }

        const previousBreakpoint = this.state.currentBreakpoint;
        this.state.currentBreakpoint = currentBreakpoint;
        this.state.slidesPerView = currentBreakpoint.slidesPerView;
        this.state.spacing = currentBreakpoint.spacing;

        console.log('Selected breakpoint:', currentBreakpoint);
        console.log('Slides per view:', this.state.slidesPerView);
        console.log('Spacing:', this.state.spacing);

        return previousBreakpoint !== currentBreakpoint;
    }

    setupStyles() {
        if (!this.container || !this.track || !this.slides.length) return;

        const containerWidth = this.container.offsetWidth;
        const totalSlides = this.slides.length;
        const slidesPerView = this.state.slidesPerView;
        const spacing = this.state.spacing;

        console.log('Container width:', containerWidth);
        console.log('Setting up styles with:', { slidesPerView, spacing, totalSlides });

        // Calculate slide width accounting for spacing between slides
        const totalSpacingWidth = spacing * (slidesPerView - 1);
        const slideWidth = (containerWidth - totalSpacingWidth) / slidesPerView;

        console.log('Calculated slide width:', slideWidth);

        // Reset track styles
        this.track.style.display = 'flex';
        this.track.style.flexWrap = 'nowrap';
        this.track.style.width = '100%';
        this.track.style.gap = `${spacing}px`;

        // Set styles for slides
        this.slides.forEach(slide => {
            slide.style.flex = `0 0 ${(100 / slidesPerView)}%`;
            slide.style.maxWidth = `${(100 / slidesPerView)}%`;
            slide.style.boxSizing = 'border-box';
        });

        // Store calculated dimensions for position updates
        this.state.dimensions = {
            slideWidth,
            spacing,
            containerWidth,
            slidesPerView
        };
    }

    getMaxIndex() {
        if (!this.slides.length || !this.state.slidesPerView) return 0;
        
        const totalSlides = this.slides.length;
        const slidesPerView = this.state.slidesPerView;
        return Math.max(0, Math.ceil(totalSlides / slidesPerView) - 1);
    }

    updateSlidePositions() {
        if (!this.state.dimensions) return;

        const { containerWidth } = this.state.dimensions;
        const targetPosition = -this.state.currentIndex * containerWidth;
        
        this.track.style.transform = `translateX(${targetPosition}px)`;

        // Update button states if not infinite
        if (!this.config.infinite) {
            const maxIndex = this.getMaxIndex();
            if (this.prevButton) {
                this.prevButton.disabled = this.state.currentIndex === 0;
            }
            if (this.nextButton) {
                this.nextButton.disabled = this.state.currentIndex === maxIndex;
            }
        }
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
        const { containerWidth } = this.state.dimensions;
        const baseTranslate = -(this.state.currentIndex * containerWidth);
        
        this.track.style.transform = `translateX(${baseTranslate - diff}px)`;
    }

    handleTouchEnd(e) {
        if (!this.state.isTouching) return;

        const diff = this.state.touchStartX - e.changedTouches[0].clientX;
        const threshold = this.container.offsetWidth * 0.15;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                this.next();
            } else {
                this.prev();
            }
        } else {
            this.updateSlidePositions();
        }

        this.state.isTouching = false;

        if (this.config.autoplay) {
            this.startAutoplay();
        }
    }

    handleResize() {
        const width = window.innerWidth;
        console.log('Window resized to:', width);

        if (this.setupResponsive()) {
            console.log('Breakpoint changed, updating styles');
            this.setupStyles();
            
            const maxIndex = this.getMaxIndex();
            if (this.state.currentIndex > maxIndex) {
                this.state.currentIndex = maxIndex;
            }
            
            this.updateSlidePositions();
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            this.pauseAutoplay();
        } else if (this.config.autoplay) {
            this.startAutoplay();
        }
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
            if (index < 0 || index > maxIndex) {
                return;
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
                    slide: this.slides[targetIndex * this.state.slidesPerView]
                }
            }));
        }, this.config.animationSpeed);
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
        this.container.style = '';
        this.track.style = '';
        this.slides.forEach(slide => {
            slide.style = '';
        });
    }

    static initializeAll() {
        document.querySelectorAll('[data-swf-items]').forEach(container => {
            new SWF(container);
        });
    }
}

export default SWF;

if (typeof window !== 'undefined') {
    window.SWF = SWF;
    // Auto-initialize all carousels when the DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => SWF.initializeAll());
    } else {
        SWF.initializeAll();
    }
}