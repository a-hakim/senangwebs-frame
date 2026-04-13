(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SWF"] = factory();
	else
		root["SWF"] = factory();
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * SenangWebs Frame - A lightweight, touch-friendly slider library
 * Version 1.2.2
 */
var SWF = /*#__PURE__*/function () {
  function SWF(element) {
    var userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, SWF);
    if (!(element instanceof HTMLElement)) {
      userConfig = element;
      element = null;
    }
    this.wrapper = element || document.querySelector('[data-swf]');
    if (!this.wrapper) return;

    // Check if instance already exists
    if (this.wrapper._swf) {
      this.wrapper._swf.destroy();
    }
    this.wrapper._swf = this;
    this.container = this.wrapper.querySelector('[data-swf-items]');
    if (!this.container) return;
    var dataConfig = this.parseDataAttributes(this.container);
    this.config = _objectSpread(_objectSpread({
      autoplay: false,
      autoplayDelay: 3000,
      animationSpeed: 300,
      infinite: true,
      infinityLoop: false,
      startIndex: 0,
      responsive: [{
        breakpoint: 4000,
        slidesPerView: 1,
        spacing: 0
      }]
    }, dataConfig), userConfig);
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
    this.indicators = null;
    this.indicatorButtons = [];
    this.init();
  }
  return _createClass(SWF, [{
    key: "parseDataAttributes",
    value: function parseDataAttributes(element) {
      var config = {};
      var booleanAttrs = ['autoplay', 'infinite', 'infinityLoop'];
      var numberAttrs = ['autoplayDelay', 'animationSpeed', 'startIndex'];
      booleanAttrs.forEach(function (attr) {
        var value = element.dataset["swf".concat(attr.charAt(0).toUpperCase()).concat(attr.slice(1))];
        if (value !== undefined) {
          config[attr] = value === 'true';
        }
      });
      numberAttrs.forEach(function (attr) {
        var value = element.dataset["swf".concat(attr.charAt(0).toUpperCase()).concat(attr.slice(1))];
        if (value !== undefined) {
          config[attr] = Number(value);
        }
      });
      try {
        var responsiveAttr = element.dataset.swfResponsive;
        if (responsiveAttr) {
          config.responsive = JSON.parse(responsiveAttr);
        }
      } catch (e) {
        console.warn('Invalid responsive configuration:', e);
      }
      return config;
    }
  }, {
    key: "normalizeResponsiveConfig",
    value: function normalizeResponsiveConfig() {
      if (!Array.isArray(this.config.responsive)) {
        this.config.responsive = [{
          breakpoint: 4000,
          slidesPerView: 1,
          spacing: 0
        }];
        return;
      }

      // Sort breakpoints in descending order
      this.config.responsive.sort(function (a, b) {
        return b.breakpoint - a.breakpoint;
      });
    }
  }, {
    key: "init",
    value: function init() {
      var _this = this;
      this.track = this.container.querySelector('[data-swf-track]');
      if (!this.track) {
        this.track = document.createElement('div');
        this.track.setAttribute('data-swf-track', '');
        var items = Array.from(this.container.children);
        items.forEach(function (item) {
          if (item.hasAttribute('data-swf-item')) {
            _this.track.appendChild(item);
          }
        });
        this.container.appendChild(this.track);
      }
      this.slides = Array.from(this.track.querySelectorAll('[data-swf-item]'));
      if (!this.slides.length) return;
      if (this.config.infinityLoop) {
        this.setupClones();
      }

      // First check for data-swf-controls
      var controls = this.wrapper.querySelector('[data-swf-controls]');
      if (controls) {
        // Create and append default arrow buttons to the controls
        this.createDefaultControls(controls);
      } else {
        // Look for existing prev/next buttons
        this.prevButton = this.wrapper.querySelector('[data-swf-prev]');
        this.nextButton = this.wrapper.querySelector('[data-swf-next]');
      }

      // Setup indicators if they exist
      var indicators = this.wrapper.querySelector('[data-swf-indicators]');
      if (indicators) {
        this.indicators = indicators;
        this.setupIndicators();
      }
      this.container.style.setProperty('--swf-transition-speed', "".concat(this.config.animationSpeed, "ms"));
      this.setupResponsive();
      this.setupStyles();
      this.bindEvents();
      if (this.config.autoplay) {
        this.startAutoplay();
      }
      this.updateSlidePositions(false);
      this.resizeObserver = new ResizeObserver(function () {
        _this.handleResize();
      });
      this.resizeObserver.observe(this.container);
    }
  }, {
    key: "setupClones",
    value: function setupClones() {
      var _this2 = this;
      this.clonedSlidesPrepend = [];
      this.clonedSlidesAppend = [];

      // Clone and prepend (to preserve visual order, insert backwards)
      for (var i = this.slides.length - 1; i >= 0; i--) {
        var clone = this.slides[i].cloneNode(true);
        clone.setAttribute('data-swf-clone', 'true');
        clone.setAttribute('aria-hidden', 'true');
        this.track.insertBefore(clone, this.track.firstChild);
        this.clonedSlidesPrepend.push(clone);
      }

      // Clone and append
      this.slides.forEach(function (slide) {
        var clone = slide.cloneNode(true);
        clone.setAttribute('data-swf-clone', 'true');
        clone.setAttribute('aria-hidden', 'true');
        _this2.track.appendChild(clone);
        _this2.clonedSlidesAppend.push(clone);
      });
    }
  }, {
    key: "createDefaultControls",
    value: function createDefaultControls(controls) {
      // Create prev button
      this.prevButton = document.createElement('button');
      this.prevButton.setAttribute('data-swf-prev', '');
      this.prevButton.setAttribute('aria-label', 'Previous slide');
      this.prevButton.classList.add('swf-default-arrow');

      // Create next button
      this.nextButton = document.createElement('button');
      this.nextButton.setAttribute('data-swf-next', '');
      this.nextButton.setAttribute('aria-label', 'Next slide');
      this.nextButton.classList.add('swf-default-arrow');

      // Add buttons to existing controls
      controls.appendChild(this.prevButton);
      controls.appendChild(this.nextButton);
    }
  }, {
    key: "setupIndicators",
    value: function setupIndicators() {
      var _this3 = this;
      // Clear existing indicators
      this.indicators.innerHTML = '';
      this.indicatorButtons = [];

      // Create indicator buttons
      this.slides.forEach(function (_, index) {
        var button = document.createElement('button');
        button.setAttribute('data-swf-indicator', '');
        button.setAttribute('aria-label', "Go to slide ".concat(index + 1));
        if (index === _this3.state.currentIndex) {
          button.classList.add('active');
        }
        button.addEventListener('click', function () {
          return _this3.goToSlide(index);
        });
        _this3.indicators.appendChild(button);
        _this3.indicatorButtons.push(button);
      });
    }
  }, {
    key: "updateIndicators",
    value: function updateIndicators() {
      var activeIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.currentIndex;
      if (!this.indicatorButtons) return;
      this.indicatorButtons.forEach(function (button, index) {
        if (index === activeIndex) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }
  }, {
    key: "setupResponsive",
    value: function setupResponsive() {
      var width = window.innerWidth;
      var matchedBreakpoint = this.config.responsive[0];
      var _iterator = _createForOfIteratorHelper(this.config.responsive),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var bp = _step.value;
          if (width <= bp.breakpoint) {
            matchedBreakpoint = bp;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      var breakpointChanged = matchedBreakpoint !== this.state.currentBreakpoint;
      if (breakpointChanged) {
        this.state.currentBreakpoint = matchedBreakpoint;
        this.state.slidesPerView = matchedBreakpoint.slidesPerView;
        this.state.spacing = matchedBreakpoint.spacing;
      }
      return breakpointChanged;
    }
  }, {
    key: "setupStyles",
    value: function setupStyles() {
      if (!this.container || !this.track || !this.slides.length) return;
      var containerWidth = this.container.offsetWidth;
      var _this$state = this.state,
        slidesPerView = _this$state.slidesPerView,
        spacing = _this$state.spacing;

      // Calculate individual slide width
      var availableWidth = containerWidth - spacing * (slidesPerView - 1);
      var slideWidth = availableWidth / slidesPerView;

      // Calculate total track width needed for all slides
      var totalItems = this.slides.length;
      if (this.config.infinityLoop) {
        totalItems = this.slides.length * 3;
      }
      var totalWidth = slideWidth * totalItems + spacing * (totalItems - 1);

      // Update track styles
      this.track.style.display = 'flex';
      this.track.style.width = "".concat(totalWidth, "px");
      this.track.style.gap = "".concat(spacing, "px");

      // Update slides styles
      var allSlides = Array.from(this.track.children);
      allSlides.forEach(function (slide) {
        slide.style.flex = "0 0 ".concat(slideWidth, "px");
        slide.style.maxWidth = "".concat(slideWidth, "px");
      });

      // Store calculated dimensions
      this.state.dimensions = {
        containerWidth: containerWidth,
        slideWidth: slideWidth,
        spacing: spacing,
        slidesPerView: slidesPerView,
        totalWidth: totalWidth,
        slidesCount: this.slides.length
      };
    }
  }, {
    key: "updateSlidePositions",
    value: function updateSlidePositions() {
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.state.dimensions) return;
      var _this$state$dimension = this.state.dimensions,
        slideWidth = _this$state$dimension.slideWidth,
        spacing = _this$state$dimension.spacing,
        slidesCount = _this$state$dimension.slidesCount;
      var slideAndSpacing = slideWidth + spacing;
      var position = -this.state.currentIndex * slideAndSpacing;
      if (this.config.infinityLoop) {
        position -= slidesCount * slideAndSpacing;
      }

      // Prevent overscroll
      var clampedPosition = position;
      if (!this.config.infinityLoop) {
        var maxScroll = -(slideAndSpacing * (slidesCount - this.state.slidesPerView));
        clampedPosition = Math.max(Math.min(position, 0), maxScroll);
      }
      if (!animate) {
        this.track.style.transition = 'none';
      } else {
        this.track.style.transition = "transform ".concat(this.config.animationSpeed, "ms ease");
      }
      this.track.style.transform = "translateX(".concat(clampedPosition, "px)");
      if (!animate) {
        // Force reflow
        this.track.offsetHeight;
        this.track.style.transition = '';
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
  }, {
    key: "getMaxIndex",
    value: function getMaxIndex() {
      if (!this.slides.length || !this.state.slidesPerView) return 0;
      return Math.max(0, this.slides.length - this.state.slidesPerView);
    }
  }, {
    key: "goToSlide",
    value: function goToSlide(index) {
      var _this4 = this;
      if (this.state.isAnimating) return;
      var maxIndex = this.getMaxIndex();
      var targetIndex = index;
      if (this.config.infinityLoop) {
        targetIndex = index;
      } else if (this.config.infinite) {
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
      setTimeout(function () {
        if (_this4.config.infinityLoop) {
          if (_this4.state.currentIndex < 0) {
            _this4.state.currentIndex = _this4.slides.length + _this4.state.currentIndex % _this4.slides.length;
            // Handle edge case where % perfectly divides
            if (_this4.state.currentIndex === _this4.slides.length) _this4.state.currentIndex = 0;
            _this4.updateSlidePositions(false);
          } else if (_this4.state.currentIndex >= _this4.slides.length) {
            _this4.state.currentIndex = _this4.state.currentIndex % _this4.slides.length;
            _this4.updateSlidePositions(false);
          }
        }
        _this4.state.isAnimating = false;
        var normalizedIndex = _this4.state.currentIndex;
        if (_this4.config.infinityLoop) {
          if (normalizedIndex < 0) {
            normalizedIndex = _this4.slides.length + normalizedIndex % _this4.slides.length;
            if (normalizedIndex === _this4.slides.length) normalizedIndex = 0;
          } else if (normalizedIndex >= _this4.slides.length) {
            normalizedIndex = normalizedIndex % _this4.slides.length;
          }
        }
        _this4.updateIndicators(normalizedIndex);
        _this4.container.dispatchEvent(new CustomEvent('swf:change', {
          detail: {
            index: normalizedIndex,
            slide: _this4.slides[normalizedIndex]
          }
        }));
      }, this.config.animationSpeed);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this5 = this;
      if (this.prevButton) {
        this.prevButton.addEventListener('click', function () {
          return _this5.prev();
        });
      }
      if (this.nextButton) {
        this.nextButton.addEventListener('click', function () {
          return _this5.next();
        });
      }
      this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), {
        passive: true
      });
      this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), {
        passive: true
      });
      this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));
      window.addEventListener('resize', this.handleResize.bind(this));
      document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(e) {
      if (this.state.isAnimating) return;
      this.state.isTouching = true;
      this.state.touchStartX = e.touches[0].clientX;
      if (this.config.autoplay) {
        this.pauseAutoplay();
      }
    }
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(e) {
      if (!this.state.isTouching || !this.state.dimensions) return;
      var currentX = e.touches[0].clientX;
      var diff = this.state.touchStartX - currentX;
      var _this$state$dimension2 = this.state.dimensions,
        slideWidth = _this$state$dimension2.slideWidth,
        spacing = _this$state$dimension2.spacing,
        slidesCount = _this$state$dimension2.slidesCount;
      var slideAndSpacing = slideWidth + spacing;
      var basePosition = -this.state.currentIndex * slideAndSpacing;
      if (this.config.infinityLoop) {
        basePosition -= slidesCount * slideAndSpacing;
      }
      var newPosition = basePosition - diff;

      // Calculate bounds
      var clampedPosition = newPosition;
      if (!this.config.infinityLoop) {
        var maxScroll = -(slideAndSpacing * (slidesCount - this.state.slidesPerView));
        clampedPosition = Math.max(Math.min(newPosition, 0), maxScroll);
      } else {
        var _maxScroll = -(slideAndSpacing * (slidesCount * 3 - this.state.slidesPerView));
        clampedPosition = Math.max(Math.min(newPosition, 0), _maxScroll);
      }
      this.track.style.transform = "translateX(".concat(clampedPosition, "px)");
    }
  }, {
    key: "handleTouchEnd",
    value: function handleTouchEnd(e) {
      if (!this.state.isTouching) return;
      var diff = this.state.touchStartX - e.changedTouches[0].clientX;
      var _this$state$dimension3 = this.state.dimensions,
        slideWidth = _this$state$dimension3.slideWidth,
        spacing = _this$state$dimension3.spacing;
      var slideAndSpacing = slideWidth + spacing;

      // Calculate movement threshold (20% of slide width)
      var threshold = slideAndSpacing * 0.2;
      if (Math.abs(diff) > threshold) {
        // Calculate how many slides to move
        var slidesToMove = Math.max(1, Math.round(Math.abs(diff) / slideAndSpacing));
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
  }, {
    key: "handleResize",
    value: function handleResize() {
      if (this.setupResponsive()) {
        this.setupStyles();

        // Ensure current index is valid after resize
        var maxIndex = this.getMaxIndex();
        // In infinityLoop, we don't strictly constrain to maxIndex when calculating positioning smoothly,
        // but we should ensure valid index.
        if (!this.config.infinityLoop && this.state.currentIndex > maxIndex) {
          this.state.currentIndex = maxIndex;
        }
        this.updateSlidePositions(false);
      }
    }
  }, {
    key: "handleVisibilityChange",
    value: function handleVisibilityChange() {
      if (document.hidden) {
        this.pauseAutoplay();
      } else if (this.config.autoplay) {
        this.startAutoplay();
      }
    }
  }, {
    key: "next",
    value: function next() {
      this.goToSlide(this.state.currentIndex + 1);
    }
  }, {
    key: "prev",
    value: function prev() {
      this.goToSlide(this.state.currentIndex - 1);
    }
  }, {
    key: "startAutoplay",
    value: function startAutoplay() {
      var _this6 = this;
      if (this.state.autoplayInterval) return;
      this.state.autoplayInterval = setInterval(function () {
        return _this6.next();
      }, this.config.autoplayDelay);
    }
  }, {
    key: "pauseAutoplay",
    value: function pauseAutoplay() {
      if (this.state.autoplayInterval) {
        clearInterval(this.state.autoplayInterval);
        this.state.autoplayInterval = null;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
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
      if (this.indicators) {
        this.indicators.innerHTML = '';
        this.indicatorButtons = [];
      }
      this.container.removeEventListener('touchstart', this.handleTouchStart);
      this.container.removeEventListener('touchmove', this.handleTouchMove);
      this.container.removeEventListener('touchend', this.handleTouchEnd);
      window.removeEventListener('resize', this.handleResize);
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);

      // Reset styles and clones
      this.wrapper.style = '';
      this.container.style = '';
      this.track.style = '';
      if (this.config.infinityLoop && this.clonedSlidesPrepend && this.clonedSlidesAppend) {
        this.clonedSlidesPrepend.forEach(function (clone) {
          return clone.remove();
        });
        this.clonedSlidesAppend.forEach(function (clone) {
          return clone.remove();
        });
      }
      this.slides.forEach(function (slide) {
        slide.style = '';
      });
    }
  }], [{
    key: "initializeAll",
    value: function initializeAll() {
      document.querySelectorAll('[data-swf]').forEach(function (wrapper) {
        // Only initialize if no instance exists
        if (!wrapper._swf) {
          new SWF(wrapper);
        }
      });
    }
  }]);
}();
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (SWF)));
if (typeof window !== 'undefined') {
  window.SWF = SWF;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SWF.initializeAll);
  } else {
    SWF.initializeAll();
  }
}
})();

// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});