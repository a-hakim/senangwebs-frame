/**
 * SenangWebs Frame - A lightweight, touch-friendly slider library
 * Version 1.2.6
 */

const DEFAULT_RESPONSIVE = () => [{
    breakpoint: 4000,
    slidesPerView: 1,
    spacing: 0
}];

function toFiniteNumber(value, fallback) {
    const n = Number(value);
    return Number.isFinite(n) ? n : fallback;
}

function toNonNegativeInteger(value, fallback) {
    const n = Math.trunc(toFiniteNumber(value, fallback));
    return n >= 0 ? n : fallback;
}

function toPositiveInteger(value, fallback) {
    const n = Math.trunc(toFiniteNumber(value, fallback));
    return n >= 1 ? n : fallback;
}

class SWF {
    constructor(element, userConfig = {}) {
        if (!(element instanceof HTMLElement)) {
            if (element && typeof element === 'object') {
                userConfig = element;
                element = null;
            } else {
                throw new TypeError(
                    'SWF: expected an HTMLElement as the first argument, or a configuration object. A null/undefined element is not supported.'
                );
            }
        }

        this.wrapper = element || document.querySelector('[data-swf]');
        if (!(this.wrapper instanceof HTMLElement)) {
            throw new Error('SWF: no slider wrapper ([data-swf]) was found in the document.');
        }

        // Replace any existing instance on this wrapper.
        const existing = this.wrapper._swf;
        if (existing instanceof SWF) {
            existing.destroy();
        }

        this.destroyed = false;
        this.abortController = new AbortController();
        this.transitionTimeout = null;
        this.resizeFrame = null;
        this.autoplayRequested = false;
        this.autoplaySuspensions = new Set();
        this.createdTrack = false;
        this.createdControls = false;
        this.createdPauseButton = false;
        this.originalStyles = null;

        this.container = this.findOwned('[data-swf-items]');
        if (!this.container) {
            throw new Error('SWF: the slider wrapper is missing a [data-swf-items] container.');
        }

        // Locate the track and slides before any DOM mutation so that
        // structural problems fail atomically (no registration, no mutation).
        this.track = null;
        for (const candidate of this.container.querySelectorAll('[data-swf-track]')) {
            if (candidate.closest('[data-swf-items]') === this.container) {
                this.track = candidate;
                break;
            }
        }
        this.slides = this.collectSlides();
        if (!this.slides.length) {
            throw new Error('SWF: no [data-swf-item] slides were found inside the [data-swf-items] container.');
        }

        const dataConfig = this.parseDataAttributes(this.container);

        this.config = {
            autoplay: false,
            autoplayDelay: 3000,
            animationSpeed: 300,
            infinite: true,
            infinityLoop: false,
            startIndex: 0,
            responsive: DEFAULT_RESPONSIVE(),
            ...dataConfig,
            ...userConfig
        };

        this.config.autoplay = Boolean(this.config.autoplay);
        this.config.infinite = Boolean(this.config.infinite);
        this.config.infinityLoop = Boolean(this.config.infinityLoop);
        this.config.autoplayDelay = toNonNegativeInteger(this.config.autoplayDelay, 3000);
        this.config.animationSpeed = toNonNegativeInteger(this.config.animationSpeed, 300);
        this.config.startIndex = toFiniteNumber(this.config.startIndex, 0);
        this.config.responsive = this.normalizeResponsiveConfig(this.config.responsive);

        this.state = {
            currentIndex: 0,
            isAnimating: false,
            autoplayInterval: null,
            touchStartX: 0,
            touchStartY: 0,
            activeTouchId: null,
            touchAxisLocked: false,
            isTouching: false,
            currentBreakpoint: null,
            slidesPerView: 1,
            spacing: 0,
            slideWidth: 0,
            trackWidth: 0,
            renderedWidth: null,
            renderedSlidesPerView: null
        };

        this.indicators = this.findOwned('[data-swf-indicators]');
        this.indicatorButtons = [];
        this.prevButton = null;
        this.nextButton = null;
        this.pauseButton = null;
        this.resizeObserver = null;

        // Capture author-owned inline styles before SWF mutates anything so
        // destroy() can restore exactly what it changed.
        this.captureOriginalStyles();

        if (!this.track) {
            this.createdTrack = true;
            this.track = document.createElement('div');
            this.track.setAttribute('data-swf-track', '');
            this.slides.forEach(slide => this.track.appendChild(slide));
            this.container.appendChild(this.track);
        }

        // Registration happens only after structural validation succeeded.
        this.wrapper._swf = this;

        try {
            this.init();
        } catch (error) {
            this.destroy();
            throw error;
        }
    }

    static get version() {
        return '1.2.6';
    }

    // ---------------------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------------------

    parseDataAttributes(element) {
        const config = {};
        const booleanAttrs = ['autoplay', 'infinite', 'infinityLoop'];
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
            console.warn('SWF: invalid data-swf-responsive JSON, ignoring it:', e);
        }

        return config;
    }

    normalizeResponsiveConfig(responsive) {
        const fallback = DEFAULT_RESPONSIVE();

        if (!Array.isArray(responsive)) {
            return fallback;
        }

        const entries = responsive
            .filter(bp => bp && typeof bp === 'object' && !Array.isArray(bp))
            .map(bp => ({
                breakpoint: toFiniteNumber(bp.breakpoint, NaN),
                slidesPerView: Math.trunc(toFiniteNumber(bp.slidesPerView, NaN)),
                spacing: toFiniteNumber(bp.spacing, 0)
            }))
            .filter(bp =>
                Number.isFinite(bp.breakpoint) &&
                bp.slidesPerView >= 1 &&
                Number.isFinite(bp.spacing) &&
                bp.spacing >= 0
            );

        if (!entries.length) {
            console.warn('SWF: no valid responsive entries found, falling back to the default configuration.');
            return fallback;
        }

        // Sort a copy in descending order; never mutate the caller's array.
        entries.sort((a, b) => b.breakpoint - a.breakpoint);
        return entries;
    }

    // ---------------------------------------------------------------------
    // DOM ownership helpers (nested carousels are excluded)
    // ---------------------------------------------------------------------

    findOwned(selector) {
        for (const el of this.wrapper.querySelectorAll(selector)) {
            if (el.closest('[data-swf]') === this.wrapper) {
                return el;
            }
        }
        return null;
    }

    collectSlides() {
        if (this.track) {
            return Array.from(this.track.querySelectorAll('[data-swf-item]'))
                .filter(item => item.closest('[data-swf-track]') === this.track);
        }
        return Array.from(this.container.querySelectorAll('[data-swf-item]'))
            .filter(item => item.closest('[data-swf-items]') === this.container);
    }

    captureOriginalStyles() {
        this.originalStyles = [];
        const nodes = [this.wrapper, this.container, ...this.slides];
        if (this.track) nodes.push(this.track);
        for (const node of nodes) {
            this.originalStyles.push([node, node.getAttribute('style')]);
        }
    }

    // ---------------------------------------------------------------------
    // Initialization
    // ---------------------------------------------------------------------

    init() {
        if (this.config.infinityLoop) {
            this.setupClones();
        }

        this.setupControls();

        this.container.style.setProperty('--swf-transition-speed', `${this.config.animationSpeed}ms`);

        this.setupAria();

        // Normalize the starting index against the real slide count.
        const len = this.slides.length;
        const startIndex = Math.trunc(this.config.startIndex);
        if (this.config.infinityLoop) {
            this.state.currentIndex = ((startIndex % len) + len) % len;
        } else {
            this.state.currentIndex = Math.min(Math.max(startIndex, 0), Math.max(0, len - 1));
        }

        this.updateBreakpoint();
        this.applyLayout(true);
        this.bindEvents();

        if (this.config.autoplay) {
            this.autoplayRequested = true;
            if (document.hidden) {
                this.autoplaySuspensions.add('document-hidden');
            }
            this.syncAutoplay();
        }

        if (typeof ResizeObserver !== 'undefined') {
            this.resizeObserver = new ResizeObserver(() => this.scheduleResize());
            this.resizeObserver.observe(this.container);
        } else {
            console.warn('SWF: ResizeObserver is not available; responsive layout updates rely on window resize events only.');
        }
    }

    setupAria() {
        if (!this.container.hasAttribute('role')) {
            this.container.setAttribute('role', 'region');
        }
        if (!this.container.hasAttribute('aria-roledescription')) {
            this.container.setAttribute('aria-roledescription', 'carousel');
        }
        if (!this.container.hasAttribute('aria-label')) {
            this.container.setAttribute('aria-label', 'carousel');
        }

        const len = this.slides.length;
        this.slides.forEach((slide, index) => {
            if (!slide.hasAttribute('role')) {
                slide.setAttribute('role', 'group');
            }
            if (!slide.hasAttribute('aria-roledescription')) {
                slide.setAttribute('aria-roledescription', 'slide');
            }
            if (!slide.hasAttribute('aria-label')) {
                slide.setAttribute('aria-label', `Slide ${index + 1} of ${len}`);
            }
        });
    }

    setupClones() {
        this.clonedSlidesPrepend = [];
        this.clonedSlidesAppend = [];

        // Clones are visual-only: they are hidden from assistive technology,
        // removed from the tab order and form submission, and stripped of
        // IDs/names so they cannot create duplicate references.
        const makeClone = (slide) => {
            const clone = slide.cloneNode(true);
            clone.setAttribute('data-swf-clone', 'true');
            clone.setAttribute('aria-hidden', 'true');
            clone.setAttribute('inert', '');
            clone.removeAttribute('id');
            clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            clone.querySelectorAll('[name]').forEach(el => el.removeAttribute('name'));
            clone.querySelectorAll('[for]').forEach(el => el.removeAttribute('for'));
            clone.querySelectorAll('[aria-labelledby]').forEach(el => el.removeAttribute('aria-labelledby'));
            clone.querySelectorAll('[aria-describedby]').forEach(el => el.removeAttribute('aria-describedby'));
            clone.querySelectorAll('[autofocus]').forEach(el => el.removeAttribute('autofocus'));
            return clone;
        };

        // Clone and prepend (to preserve visual order, insert backwards)
        for (let i = this.slides.length - 1; i >= 0; i--) {
            const clone = makeClone(this.slides[i]);
            this.track.insertBefore(clone, this.track.firstChild);
            this.clonedSlidesPrepend.push(clone);
        }

        // Clone and append
        this.slides.forEach(slide => {
            const clone = makeClone(slide);
            this.track.appendChild(clone);
            this.clonedSlidesAppend.push(clone);
        });
    }

    setupControls() {
        this.prevButton = this.findOwned('[data-swf-prev]');
        this.nextButton = this.findOwned('[data-swf-next]');

        const controls = this.findOwned('[data-swf-controls]');
        if (controls && !this.prevButton && !this.nextButton) {
            this.prevButton = document.createElement('button');
            this.prevButton.type = 'button';
            this.prevButton.setAttribute('data-swf-prev', '');
            this.prevButton.setAttribute('aria-label', 'Previous slide');
            this.prevButton.classList.add('swf-default-arrow');

            this.nextButton = document.createElement('button');
            this.nextButton.type = 'button';
            this.nextButton.setAttribute('data-swf-next', '');
            this.nextButton.setAttribute('aria-label', 'Next slide');
            this.nextButton.classList.add('swf-default-arrow');

            controls.appendChild(this.prevButton);
            controls.appendChild(this.nextButton);
            this.createdControls = true;
        }

        this.pauseButton = this.findOwned('[data-swf-pause]');
        if (this.config.autoplay && !this.pauseButton) {
            this.pauseButton = document.createElement('button');
            this.pauseButton.type = 'button';
            this.pauseButton.setAttribute('data-swf-pause', '');
            this.pauseButton.classList.add('swf-default-pause');
            // The arrows container is a flex layout for previous/next only.
            // Mounting the absolute pause control there makes it overlap an arrow.
            this.wrapper.appendChild(this.pauseButton);
            this.createdPauseButton = true;
        }
        if (this.pauseButton) {
            this.pauseButton.type = 'button';
            this.pauseButton.classList.add('swf-pause-control');
        }
    }

    // ---------------------------------------------------------------------
    // Indicators
    // ---------------------------------------------------------------------

    getIndicatorCount() {
        if (this.config.infinityLoop) {
            return this.slides.length;
        }
        return this.getMaxIndex() + 1;
    }

    rebuildIndicators() {
        if (!this.indicators) return;

        this.indicators.innerHTML = '';
        this.indicatorButtons = [];

        const count = this.getIndicatorCount();
        for (let i = 0; i < count; i++) {
            const button = document.createElement('button');
            button.type = 'button';
            button.setAttribute('data-swf-indicator', '');
            button.setAttribute('aria-label', `Go to slide ${i + 1}`);
            button.addEventListener('click', () => this.goToSlide(i), {
                signal: this.abortController.signal
            });
            this.indicators.appendChild(button);
            this.indicatorButtons.push(button);
        }

        this.updateIndicators();
    }

    updateIndicators(activeIndex = this.state.currentIndex) {
        if (!this.indicatorButtons) return;

        this.indicatorButtons.forEach((button, index) => {
            const active = index === activeIndex;
            button.classList.toggle('active', active);
            if (active) {
                button.setAttribute('aria-current', 'true');
            } else {
                button.removeAttribute('aria-current');
            }
        });
    }

    // ---------------------------------------------------------------------
    // Responsive layout
    // ---------------------------------------------------------------------

    updateBreakpoint() {
        const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
        let matchedBreakpoint = this.config.responsive[0];

        for (const bp of this.config.responsive) {
            if (width <= bp.breakpoint) {
                matchedBreakpoint = bp;
            }
        }

        if (matchedBreakpoint !== this.state.currentBreakpoint) {
            this.state.currentBreakpoint = matchedBreakpoint;
            this.state.slidesPerView = matchedBreakpoint.slidesPerView;
            this.state.spacing = matchedBreakpoint.spacing;
            return true;
        }
        return false;
    }

    scheduleResize() {
        if (this.destroyed || this.resizeFrame !== null) return;
        this.resizeFrame = requestAnimationFrame(() => {
            this.resizeFrame = null;
            if (!this.destroyed) {
                this.applyLayout();
            }
        });
    }

    applyLayout(force = false) {
        if (this.destroyed || !this.container || !this.track) return;

        const breakpointChanged = this.updateBreakpoint();
        const containerWidth = this.container.offsetWidth;

        // Zero-width containers (hidden tabs, detached layout) defer layout
        // until they become measurable; ResizeObserver fires again then.
        if (!containerWidth) {
            this.needsLayout = true;
            return;
        }

        if (!force && !breakpointChanged && containerWidth === this.state.renderedWidth) {
            return;
        }

        this.needsLayout = false;
        this.state.renderedWidth = containerWidth;

        const slidesPerViewChanged = this.state.slidesPerView !== this.state.renderedSlidesPerView;
        this.state.renderedSlidesPerView = this.state.slidesPerView;

        this.setupStyles();

        const maxIndex = this.getMaxIndex();
        if (!this.config.infinityLoop && this.state.currentIndex > maxIndex) {
            this.state.currentIndex = maxIndex;
        }

        if (force || slidesPerViewChanged) {
            this.rebuildIndicators();
        }

        this.updateSlidePositions(false);
        this.updateIndicators();
        this.updateSlideVisibility();
    }

    setupStyles() {
        if (!this.container || !this.track || !this.slides.length) return;

        const containerWidth = this.container.offsetWidth;
        const { slidesPerView, spacing } = this.state;

        // Calculate individual slide width
        const availableWidth = containerWidth - (spacing * (slidesPerView - 1));
        const slideWidth = availableWidth / slidesPerView;

        // Calculate total track width needed for all slides
        let totalItems = this.slides.length;
        if (this.config.infinityLoop) {
            totalItems = this.slides.length * 3;
        }

        const totalWidth = (slideWidth * totalItems) + (spacing * (totalItems - 1));

        // Update track styles
        this.track.style.display = 'flex';
        this.track.style.width = `${totalWidth}px`;
        this.track.style.gap = `${spacing}px`;

        // Update slides styles
        const allSlides = Array.from(this.track.children);
        allSlides.forEach(slide => {
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
            slidesCount: this.slides.length
        };
    }

    updateSlideVisibility() {
        if (!this.slides || this.destroyed) return;

        const len = this.slides.length;
        const slidesPerView = this.state.slidesPerView;
        const current = this.state.currentIndex;

        this.slides.forEach((slide, index) => {
            const visible = this.config.infinityLoop
                ? ((index - current + len) % len) < slidesPerView
                : index >= current && index < current + slidesPerView;
            try {
                if (visible) {
                    slide.removeAttribute('inert');
                    slide.removeAttribute('aria-hidden');
                } else {
                    slide.setAttribute('inert', '');
                    slide.setAttribute('aria-hidden', 'true');
                }
            } catch (e) {
                // Engines without inert support: skip visibility policy.
            }
        });
    }

    // ---------------------------------------------------------------------
    // Positioning and navigation
    // ---------------------------------------------------------------------

    getMaxIndex() {
        if (!this.slides.length || !this.state.slidesPerView) return 0;
        return Math.max(0, this.slides.length - this.state.slidesPerView);
    }

    getAnimationSpeed() {
        if (typeof window !== 'undefined' && window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return 0;
        }
        return Math.max(0, Math.trunc(this.config.animationSpeed));
    }

    updateSlidePositions(animate = true) {
        if (!this.state.dimensions || this.destroyed) return;

        const { slideWidth, spacing, slidesCount } = this.state.dimensions;
        const slideAndSpacing = slideWidth + spacing;
        let position = -this.state.currentIndex * slideAndSpacing;

        if (this.config.infinityLoop) {
            position -= (slidesCount * slideAndSpacing);
        }

        // Prevent overscroll; carousels with fewer slides than
        // slidesPerView never scroll away from the start.
        let clampedPosition = position;
        if (!this.config.infinityLoop) {
            const scrollableSlides = Math.max(0, slidesCount - this.state.slidesPerView);
            const maxScroll = -(slideAndSpacing * scrollableSlides);
            clampedPosition = Math.max(Math.min(position, 0), maxScroll);
        }

        const speed = this.getAnimationSpeed();

        if (!animate || speed === 0) {
            this.track.style.transition = 'none';
            this.track.style.transform = `translateX(${clampedPosition}px)`;
            // Force reflow so the next transform can animate.
            this.track.offsetHeight;
            this.track.style.transition = '';
        } else {
            this.track.style.transition = `transform ${speed}ms ease`;
            this.track.style.transform = `translateX(${clampedPosition}px)`;
        }

        // Update navigation buttons
        if (!this.config.infinite && !this.config.infinityLoop) {
            if (this.prevButton) {
                this.prevButton.disabled = this.state.currentIndex <= 0;
            }
            if (this.nextButton) {
                this.nextButton.disabled = this.state.currentIndex >= this.getMaxIndex();
            }
        }
    }

    goToSlide(index) {
        if (this.destroyed || !this.slides.length) return false;
        if (this.state.isAnimating) return false;

        const requested = Math.trunc(Number(index));
        if (!Number.isFinite(requested)) {
            console.warn('SWF: goToSlide expects a finite number, received:', index);
            return false;
        }

        const len = this.slides.length;
        const maxIndex = this.getMaxIndex();
        let targetIndex;

        if (this.config.infinityLoop) {
            // Normalize up front so transitions are always bounded within
            // the clone window; distant targets never animate far away.
            targetIndex = ((requested % len) + len) % len;
        } else if (this.config.infinite) {
            if (requested < 0) {
                targetIndex = maxIndex;
            } else if (requested > maxIndex) {
                targetIndex = 0;
            } else {
                targetIndex = requested;
            }
        } else {
            targetIndex = Math.min(Math.max(requested, 0), maxIndex);
        }

        if (targetIndex === this.state.currentIndex) {
            // No logical change: keep UI consistent but emit no event.
            this.updateIndicators();
            this.updateSlideVisibility();
            return false;
        }

        this.state.isAnimating = true;
        this.state.currentIndex = targetIndex;
        this.updateSlidePositions(true);

        const speed = this.getAnimationSpeed();
        this.transitionTimeout = setTimeout(() => {
            this.transitionTimeout = null;
            if (this.destroyed) return;
            this.state.isAnimating = false;
            this.updateIndicators();
            this.updateSlideVisibility();
            this.container.dispatchEvent(new CustomEvent('swf:change', {
                detail: {
                    index: this.state.currentIndex,
                    slide: this.slides[this.state.currentIndex]
                }
            }));
        }, speed);

        return true;
    }

    next() {
        this.goToSlide(this.state.currentIndex + 1);
    }

    prev() {
        this.goToSlide(this.state.currentIndex - 1);
    }

    // ---------------------------------------------------------------------
    // Events
    // ---------------------------------------------------------------------

    bindEvents() {
        const signal = this.abortController.signal;

        if (this.prevButton) {
            this.prevButton.addEventListener('click', () => this.prev(), { signal });
        }
        if (this.nextButton) {
            this.nextButton.addEventListener('click', () => this.next(), { signal });
        }
        if (this.pauseButton) {
            this.pauseButton.addEventListener('click', () => this.toggleAutoplay(), { signal });
        }

        this.container.addEventListener('touchstart', (e) => this.handleTouchStart(e), { signal, passive: true });
        this.container.addEventListener('touchmove', (e) => this.handleTouchMove(e), { signal, passive: true });
        this.container.addEventListener('touchend', (e) => this.handleTouchEnd(e), { signal });
        this.container.addEventListener('touchcancel', (e) => this.handleTouchCancel(e), { signal });

        window.addEventListener('resize', () => this.scheduleResize(), { signal });
        document.addEventListener('visibilitychange', () => this.handleVisibilityChange(), { signal });

        // Autoplay suspension while the reader interacts with the carousel.
        this.wrapper.addEventListener('mouseenter', () => this.suspendAutoplay('pointer'), { signal });
        this.wrapper.addEventListener('mouseleave', () => this.resumeAutoplay('pointer'), { signal });
        this.wrapper.addEventListener('focusin', () => this.suspendAutoplay('focus'), { signal });
        this.wrapper.addEventListener('focusout', () => this.resumeAutoplay('focus'), { signal });
    }

    handleVisibilityChange() {
        if (this.destroyed) return;
        if (document.hidden) {
            this.suspendAutoplay('document-hidden');
        } else {
            this.resumeAutoplay('document-hidden');
        }
    }

    // ---------------------------------------------------------------------
    // Touch
    // ---------------------------------------------------------------------

    findTouch(e) {
        if (!e.changedTouches || !e.changedTouches.length) return null;
        if (this.state.activeTouchId === null) return e.changedTouches[0];
        for (const touch of e.changedTouches) {
            if (touch.identifier === this.state.activeTouchId) return touch;
        }
        return null;
    }

    handleTouchStart(e) {
        if (this.destroyed || this.state.isAnimating || this.state.isTouching) return;
        if (!e.changedTouches || !e.changedTouches.length) return;

        const touch = e.changedTouches[0];
        this.state.activeTouchId = touch.identifier;
        this.state.isTouching = true;
        this.state.touchAxisLocked = false;
        this.state.touchStartX = touch.clientX;
        this.state.touchStartY = touch.clientY;

        if (this.track) {
            this.track.style.transition = 'none';
        }
        this.suspendAutoplay('touch');
    }

    handleTouchMove(e) {
        if (this.destroyed || !this.state.isTouching || !this.state.dimensions) return;

        const touch = this.findTouch(e);
        if (!touch) return;

        const diffX = this.state.touchStartX - touch.clientX;
        const diffY = this.state.touchStartY - touch.clientY;

        // Lock the gesture axis once intent is clear; vertical movement
        // belongs to page scrolling and cancels the swipe.
        if (!this.state.touchAxisLocked) {
            if (Math.abs(diffX) < 8 && Math.abs(diffY) < 8) return;
            if (Math.abs(diffY) > Math.abs(diffX)) {
                this.cancelTouchGesture();
                return;
            }
            this.state.touchAxisLocked = true;
        }

        const { slideWidth, spacing, slidesCount } = this.state.dimensions;
        const slideAndSpacing = slideWidth + spacing;
        let basePosition = -this.state.currentIndex * slideAndSpacing;

        if (this.config.infinityLoop) {
            basePosition -= (slidesCount * slideAndSpacing);
        }

        const newPosition = basePosition - diffX;

        // Calculate bounds
        let clampedPosition = newPosition;
        if (!this.config.infinityLoop) {
            const scrollableSlides = Math.max(0, slidesCount - this.state.slidesPerView);
            const maxScroll = -(slideAndSpacing * scrollableSlides);
            clampedPosition = Math.max(Math.min(newPosition, 0), maxScroll);
        } else {
            const maxScroll = -(slideAndSpacing * (slidesCount * 3 - this.state.slidesPerView));
            clampedPosition = Math.max(Math.min(newPosition, 0), maxScroll);
        }

        this.track.style.transform = `translateX(${clampedPosition}px)`;
    }

    handleTouchEnd(e) {
        if (this.destroyed || !this.state.isTouching) return;
        const touch = this.findTouch(e);
        if (!touch) return;

        const diff = this.state.touchStartX - touch.clientX;
        const { slideWidth, spacing } = this.state.dimensions;
        const slideAndSpacing = slideWidth + spacing;

        // Calculate movement threshold (20% of slide width)
        const threshold = slideAndSpacing * 0.2;

        this.state.isTouching = false;
        this.state.activeTouchId = null;
        this.state.touchAxisLocked = false;

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

        this.resumeAutoplay('touch');
    }

    handleTouchCancel(e) {
        if (this.destroyed || !this.state.isTouching) return;
        if (!this.findTouch(e)) return;
        this.cancelTouchGesture();
    }

    cancelTouchGesture() {
        this.state.isTouching = false;
        this.state.activeTouchId = null;
        this.state.touchAxisLocked = false;
        if (this.track && this.state.dimensions) {
            this.updateSlidePositions();
        }
        this.resumeAutoplay('touch');
    }

    // ---------------------------------------------------------------------
    // Autoplay
    // ---------------------------------------------------------------------

    startAutoplay() {
        this.autoplayRequested = true;
        this.syncAutoplay();
    }

    pauseAutoplay() {
        this.autoplayRequested = false;
        this.syncAutoplay();
    }

    toggleAutoplay() {
        if (this.autoplayRequested) {
            this.pauseAutoplay();
        } else {
            this.startAutoplay();
        }
    }

    suspendAutoplay(reason) {
        this.autoplaySuspensions.add(reason);
        this.syncAutoplay();
    }

    resumeAutoplay(reason) {
        this.autoplaySuspensions.delete(reason);
        this.syncAutoplay();
    }

    syncAutoplay() {
        if (this.destroyed) return;

        const shouldRun = this.config.autoplay &&
            this.autoplayRequested &&
            this.autoplaySuspensions.size === 0;

        if (shouldRun && this.state.autoplayInterval === null) {
            this.state.autoplayInterval = setInterval(() => this.autoplayTick(), this.config.autoplayDelay);
        } else if (!shouldRun && this.state.autoplayInterval !== null) {
            clearInterval(this.state.autoplayInterval);
            this.state.autoplayInterval = null;
        }

        this.updatePauseControl();
    }

    autoplayTick() {
        if (this.destroyed) return;
        if (!this.config.infinite && !this.config.infinityLoop &&
            this.state.currentIndex >= this.getMaxIndex()) {
            // Finite carousel reached its terminal position.
            this.pauseAutoplay();
            return;
        }
        this.next();
    }

    updatePauseControl() {
        if (!this.pauseButton) return;
        const playing = this.config.autoplay && this.autoplayRequested;
        this.pauseButton.dataset.swfState = playing ? 'playing' : 'paused';
        this.pauseButton.setAttribute('aria-label', playing ? 'Pause autoplay' : 'Start autoplay');
        this.pauseButton.setAttribute('aria-pressed', String(!playing));
        // The generated control is icon-based; only custom buttons get text labels.
        if (!this.pauseButton.classList.contains('swf-default-pause')) {
            this.pauseButton.textContent = playing ? 'Pause' : 'Play';
        }
    }

    // ---------------------------------------------------------------------
    // Teardown
    // ---------------------------------------------------------------------

    destroy() {
        if (this.destroyed) return;
        this.destroyed = true;

        this.autoplayRequested = false;
        this.autoplaySuspensions.clear();
        if (this.state && this.state.autoplayInterval !== null) {
            clearInterval(this.state.autoplayInterval);
            this.state.autoplayInterval = null;
        }
        if (this.transitionTimeout !== null) {
            clearTimeout(this.transitionTimeout);
            this.transitionTimeout = null;
        }
        if (this.resizeFrame !== null) {
            cancelAnimationFrame(this.resizeFrame);
            this.resizeFrame = null;
        }
        if (this.abortController) {
            this.abortController.abort();
        }
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
            this.resizeObserver = null;
        }

        // Remove elements SWF generated; consumer-owned nodes stay.
        if (this.createdPauseButton && this.pauseButton) {
            this.pauseButton.remove();
        }
        if (this.createdControls) {
            if (this.prevButton) this.prevButton.remove();
            if (this.nextButton) this.nextButton.remove();
        }
        if (this.indicatorButtons && this.indicatorButtons.length) {
            this.indicatorButtons.forEach(button => button.remove());
        }
        this.indicatorButtons = [];

        // Remove seamless-loop clones.
        if (this.clonedSlidesPrepend) {
            this.clonedSlidesPrepend.forEach(clone => clone.remove());
            this.clonedSlidesPrepend = [];
        }
        if (this.clonedSlidesAppend) {
            this.clonedSlidesAppend.forEach(clone => clone.remove());
            this.clonedSlidesAppend = [];
        }

        // Restore visibility attributes SWF set on original slides.
        if (this.slides) {
            this.slides.forEach(slide => {
                slide.removeAttribute('inert');
                slide.removeAttribute('aria-hidden');
            });
        }

        // Unwrap an internally created track.
        if (this.createdTrack && this.track) {
            this.slides.forEach(slide => {
                try {
                    this.container.appendChild(slide);
                } catch (e) {
                    // Slide may already be detached by the application.
                }
            });
            this.track.remove();
            this.createdTrack = false;
        }

        // Restore only the inline styles SWF captured before mutating.
        if (this.originalStyles) {
            for (const [node, style] of this.originalStyles) {
                try {
                    if (style === null) {
                        node.removeAttribute('style');
                    } else {
                        node.setAttribute('style', style);
                    }
                } catch (e) {
                    // Node may be detached; ignore.
                }
            }
            this.originalStyles = null;
        }

        if (this.wrapper && this.wrapper._swf === this) {
            delete this.wrapper._swf;
        }
    }

    // ---------------------------------------------------------------------
    // Automatic initialization
    // ---------------------------------------------------------------------

    static initializeAll() {
        document.querySelectorAll('[data-swf]').forEach(wrapper => {
            if (wrapper._swf instanceof SWF) return;
            try {
                new SWF(wrapper);
            } catch (error) {
                // One broken slider must not prevent the others on the page.
                console.error('SWF: failed to initialize slider on wrapper:', wrapper, error);
            }
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
