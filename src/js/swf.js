/**
 * SenangWebs Frame - A lightweight, touch-friendly slider library
 * Version 1.1.0
 */

class SWF {
    constructor(config = {}) {
        this.config = {
            autoplay: config.autoplay ?? false,
            autoplayDelay: config.autoplayDelay ?? 3000,
            animationSpeed: config.animationSpeed ?? 300,
            infinite: config.infinite ?? true,
            startIndex: config.startIndex ?? 0,
            responsive: config.responsive ?? [
                {
                    breakpoint: 4000,
                    slidesPerView: 1,
                    spacing: 0
                }
            ],
            ...config
        };

        // Sort breakpoints in ascending order initially
        this.config.responsive.sort((a, b) => a.breakpoint - b.breakpoint);

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

    init() {
        this.container = document.querySelector('[data-swf-items]');
        if (!this.container) return;

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
        this.prevButton = document.querySelector('[data-swf-prev]');
        this.nextButton = document.querySelector('[data-swf-next]');

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
        
        // Find the appropriate breakpoint
        // Start from smallest breakpoint and work up
        let currentBreakpoint = this.config.responsive[0]; // Default to smallest

        for (let bp of this.config.responsive) {
            if (width > bp.breakpoint) {
                continue;
            } else {
                currentBreakpoint = bp;
                break;
            }
        }

        // If we're larger than all breakpoints, use the largest one
        if (width > currentBreakpoint.breakpoint) {
            currentBreakpoint = this.config.responsive[this.config.responsive.length - 1];
        }

        this.state.currentBreakpoint = currentBreakpoint;
        this.state.slidesPerView = currentBreakpoint.slidesPerView;
        this.state.spacing = currentBreakpoint.spacing;

        // Debug output
        console.log('Current width:', width);
        console.log('Selected breakpoint:', currentBreakpoint);
        console.log('Slides per view:', this.state.slidesPerView);
    }

    setupStyles() {
        const containerWidth = this.container.offsetWidth;
        const totalSlides = this.slides.length;
        const slidesPerView = this.state.slidesPerView;
        const spacing = this.state.spacing;

        // Calculate exact slide width based on container width and spacing
        const slideWidth = (containerWidth - (spacing * (slidesPerView - 1))) / slidesPerView;
        
        // Set absolute widths and margins in pixels for precise control
        this.slides.forEach(slide => {
            slide.style.width = `${slideWidth}px`;
            slide.style.marginRight = `${spacing}px`;
        });
        
        // Remove margin from last slide if not infinite
        if (!this.config.infinite) {
            this.slides[this.slides.length - 1].style.marginRight = '0px';
        }

        // Calculate and set track width in pixels
        const trackWidth = (slideWidth * totalSlides) + (spacing * (totalSlides - 1));
        this.track.style.width = `${trackWidth}px`;
        
        // Store calculated dimensions for position updates
        this.state.dimensions = {
            slideWidth,
            spacing,
            trackWidth
        };
    }

    getMaxIndex() {
        const totalSlides = this.slides.length;
        const slidesPerView = this.state.slidesPerView;
        // Subtract slidesPerView from total and add 1 to get correct max index
        return Math.max(0, totalSlides - slidesPerView);
    }

    updateSlidePositions() {
        if (!this.state.dimensions) return;
        
        const { slideWidth, spacing } = this.state.dimensions;
        // Calculate movement based on slide width plus spacing
        const moveDistance = slideWidth + spacing;
        const translateX = -(this.state.currentIndex * moveDistance);
        
        this.track.style.transform = `translateX(${translateX}px)`;

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
        const { slideWidth, spacing } = this.state.dimensions;
        const moveDistance = slideWidth + spacing;
        const baseTranslate = -(this.state.currentIndex * moveDistance);
        
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
        const previousSlidesPerView = this.state.slidesPerView;
        this.setupResponsive();
        
        if (previousSlidesPerView !== this.state.slidesPerView) {
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
                    slide: this.slides[targetIndex]
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
}

export default SWF;

if (typeof window !== 'undefined') {
    window.SWF = SWF;
}