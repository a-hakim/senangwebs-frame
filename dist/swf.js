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
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
// extracted by mini-css-extract-plugin

})();

// This entry needs to be wrapped in an IIFE because it needs to be isolated against other entry modules.
(() => {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * SenangWebs Frame - A lightweight, touch-friendly slider library
 * Version 1.2.6
 */

var DEFAULT_RESPONSIVE = function DEFAULT_RESPONSIVE() {
  return [{
    breakpoint: 4000,
    slidesPerView: 1,
    spacing: 0
  }];
};
function toFiniteNumber(value, fallback) {
  var n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}
function toNonNegativeInteger(value, fallback) {
  var n = Math.trunc(toFiniteNumber(value, fallback));
  return n >= 0 ? n : fallback;
}
function toPositiveInteger(value, fallback) {
  var n = Math.trunc(toFiniteNumber(value, fallback));
  return n >= 1 ? n : fallback;
}
var SWF = /*#__PURE__*/function () {
  function SWF(element) {
    var _this = this;
    var userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, SWF);
    if (!(element instanceof HTMLElement)) {
      if (element && _typeof(element) === 'object') {
        userConfig = element;
        element = null;
      } else {
        throw new TypeError('SWF: expected an HTMLElement as the first argument, or a configuration object. A null/undefined element is not supported.');
      }
    }
    this.wrapper = element || document.querySelector('[data-swf]');
    if (!(this.wrapper instanceof HTMLElement)) {
      throw new Error('SWF: no slider wrapper ([data-swf]) was found in the document.');
    }

    // Replace any existing instance on this wrapper.
    var existing = this.wrapper._swf;
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
    var _iterator = _createForOfIteratorHelper(this.container.querySelectorAll('[data-swf-track]')),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var candidate = _step.value;
        if (candidate.closest('[data-swf-items]') === this.container) {
          this.track = candidate;
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    this.slides = this.collectSlides();
    if (!this.slides.length) {
      throw new Error('SWF: no [data-swf-item] slides were found inside the [data-swf-items] container.');
    }
    var dataConfig = this.parseDataAttributes(this.container);
    this.config = _objectSpread(_objectSpread({
      autoplay: false,
      autoplayDelay: 3000,
      animationSpeed: 300,
      infinite: true,
      infinityLoop: false,
      startIndex: 0,
      responsive: DEFAULT_RESPONSIVE()
    }, dataConfig), userConfig);
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
      this.slides.forEach(function (slide) {
        return _this.track.appendChild(slide);
      });
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
  return _createClass(SWF, [{
    key: "parseDataAttributes",
    value:
    // ---------------------------------------------------------------------
    // Configuration
    // ---------------------------------------------------------------------

    function parseDataAttributes(element) {
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
        console.warn('SWF: invalid data-swf-responsive JSON, ignoring it:', e);
      }
      return config;
    }
  }, {
    key: "normalizeResponsiveConfig",
    value: function normalizeResponsiveConfig(responsive) {
      var fallback = DEFAULT_RESPONSIVE();
      if (!Array.isArray(responsive)) {
        return fallback;
      }
      var entries = responsive.filter(function (bp) {
        return bp && _typeof(bp) === 'object' && !Array.isArray(bp);
      }).map(function (bp) {
        return {
          breakpoint: toFiniteNumber(bp.breakpoint, NaN),
          slidesPerView: Math.trunc(toFiniteNumber(bp.slidesPerView, NaN)),
          spacing: toFiniteNumber(bp.spacing, 0)
        };
      }).filter(function (bp) {
        return Number.isFinite(bp.breakpoint) && bp.slidesPerView >= 1 && Number.isFinite(bp.spacing) && bp.spacing >= 0;
      });
      if (!entries.length) {
        console.warn('SWF: no valid responsive entries found, falling back to the default configuration.');
        return fallback;
      }

      // Sort a copy in descending order; never mutate the caller's array.
      entries.sort(function (a, b) {
        return b.breakpoint - a.breakpoint;
      });
      return entries;
    }

    // ---------------------------------------------------------------------
    // DOM ownership helpers (nested carousels are excluded)
    // ---------------------------------------------------------------------
  }, {
    key: "findOwned",
    value: function findOwned(selector) {
      var _iterator2 = _createForOfIteratorHelper(this.wrapper.querySelectorAll(selector)),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var el = _step2.value;
          if (el.closest('[data-swf]') === this.wrapper) {
            return el;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      return null;
    }
  }, {
    key: "collectSlides",
    value: function collectSlides() {
      var _this2 = this;
      if (this.track) {
        return Array.from(this.track.querySelectorAll('[data-swf-item]')).filter(function (item) {
          return item.closest('[data-swf-track]') === _this2.track;
        });
      }
      return Array.from(this.container.querySelectorAll('[data-swf-item]')).filter(function (item) {
        return item.closest('[data-swf-items]') === _this2.container;
      });
    }
  }, {
    key: "captureOriginalStyles",
    value: function captureOriginalStyles() {
      this.originalStyles = [];
      var nodes = [this.wrapper, this.container].concat(_toConsumableArray(this.slides));
      if (this.track) nodes.push(this.track);
      var _iterator3 = _createForOfIteratorHelper(nodes),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var node = _step3.value;
          this.originalStyles.push([node, node.getAttribute('style')]);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    // ---------------------------------------------------------------------
    // Initialization
    // ---------------------------------------------------------------------
  }, {
    key: "init",
    value: function init() {
      var _this3 = this;
      if (this.config.infinityLoop) {
        this.setupClones();
      }
      this.setupControls();
      this.container.style.setProperty('--swf-transition-speed', "".concat(this.config.animationSpeed, "ms"));
      this.setupAria();

      // Normalize the starting index against the real slide count.
      var len = this.slides.length;
      var startIndex = Math.trunc(this.config.startIndex);
      if (this.config.infinityLoop) {
        this.state.currentIndex = (startIndex % len + len) % len;
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
        this.resizeObserver = new ResizeObserver(function () {
          return _this3.scheduleResize();
        });
        this.resizeObserver.observe(this.container);
      } else {
        console.warn('SWF: ResizeObserver is not available; responsive layout updates rely on window resize events only.');
      }
    }
  }, {
    key: "setupAria",
    value: function setupAria() {
      if (!this.container.hasAttribute('role')) {
        this.container.setAttribute('role', 'region');
      }
      if (!this.container.hasAttribute('aria-roledescription')) {
        this.container.setAttribute('aria-roledescription', 'carousel');
      }
      if (!this.container.hasAttribute('aria-label')) {
        this.container.setAttribute('aria-label', 'carousel');
      }
      var len = this.slides.length;
      this.slides.forEach(function (slide, index) {
        if (!slide.hasAttribute('role')) {
          slide.setAttribute('role', 'group');
        }
        if (!slide.hasAttribute('aria-roledescription')) {
          slide.setAttribute('aria-roledescription', 'slide');
        }
        if (!slide.hasAttribute('aria-label')) {
          slide.setAttribute('aria-label', "Slide ".concat(index + 1, " of ").concat(len));
        }
      });
    }
  }, {
    key: "setupClones",
    value: function setupClones() {
      var _this4 = this;
      this.clonedSlidesPrepend = [];
      this.clonedSlidesAppend = [];

      // Clones are visual-only: they are hidden from assistive technology,
      // removed from the tab order and form submission, and stripped of
      // IDs/names so they cannot create duplicate references.
      var makeClone = function makeClone(slide) {
        var clone = slide.cloneNode(true);
        clone.setAttribute('data-swf-clone', 'true');
        clone.setAttribute('aria-hidden', 'true');
        clone.setAttribute('inert', '');
        clone.removeAttribute('id');
        clone.querySelectorAll('[id]').forEach(function (el) {
          return el.removeAttribute('id');
        });
        clone.querySelectorAll('[name]').forEach(function (el) {
          return el.removeAttribute('name');
        });
        clone.querySelectorAll('[for]').forEach(function (el) {
          return el.removeAttribute('for');
        });
        clone.querySelectorAll('[aria-labelledby]').forEach(function (el) {
          return el.removeAttribute('aria-labelledby');
        });
        clone.querySelectorAll('[aria-describedby]').forEach(function (el) {
          return el.removeAttribute('aria-describedby');
        });
        clone.querySelectorAll('[autofocus]').forEach(function (el) {
          return el.removeAttribute('autofocus');
        });
        return clone;
      };

      // Clone and prepend (to preserve visual order, insert backwards)
      for (var i = this.slides.length - 1; i >= 0; i--) {
        var clone = makeClone(this.slides[i]);
        this.track.insertBefore(clone, this.track.firstChild);
        this.clonedSlidesPrepend.push(clone);
      }

      // Clone and append
      this.slides.forEach(function (slide) {
        var clone = makeClone(slide);
        _this4.track.appendChild(clone);
        _this4.clonedSlidesAppend.push(clone);
      });
    }
  }, {
    key: "setupControls",
    value: function setupControls() {
      this.prevButton = this.findOwned('[data-swf-prev]');
      this.nextButton = this.findOwned('[data-swf-next]');
      var controls = this.findOwned('[data-swf-controls]');
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
  }, {
    key: "getIndicatorCount",
    value: function getIndicatorCount() {
      if (this.config.infinityLoop) {
        return this.slides.length;
      }
      return this.getMaxIndex() + 1;
    }
  }, {
    key: "rebuildIndicators",
    value: function rebuildIndicators() {
      var _this5 = this;
      if (!this.indicators) return;
      this.indicators.innerHTML = '';
      this.indicatorButtons = [];
      var count = this.getIndicatorCount();
      var _loop = function _loop(i) {
        var button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('data-swf-indicator', '');
        button.setAttribute('aria-label', "Go to slide ".concat(i + 1));
        button.addEventListener('click', function () {
          return _this5.goToSlide(i);
        }, {
          signal: _this5.abortController.signal
        });
        _this5.indicators.appendChild(button);
        _this5.indicatorButtons.push(button);
      };
      for (var i = 0; i < count; i++) {
        _loop(i);
      }
      this.updateIndicators();
    }
  }, {
    key: "updateIndicators",
    value: function updateIndicators() {
      var activeIndex = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.state.currentIndex;
      if (!this.indicatorButtons) return;
      this.indicatorButtons.forEach(function (button, index) {
        var active = index === activeIndex;
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
  }, {
    key: "updateBreakpoint",
    value: function updateBreakpoint() {
      var width = typeof window !== 'undefined' ? window.innerWidth : 1024;
      var matchedBreakpoint = this.config.responsive[0];
      var _iterator4 = _createForOfIteratorHelper(this.config.responsive),
        _step4;
      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var bp = _step4.value;
          if (width <= bp.breakpoint) {
            matchedBreakpoint = bp;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      if (matchedBreakpoint !== this.state.currentBreakpoint) {
        this.state.currentBreakpoint = matchedBreakpoint;
        this.state.slidesPerView = matchedBreakpoint.slidesPerView;
        this.state.spacing = matchedBreakpoint.spacing;
        return true;
      }
      return false;
    }
  }, {
    key: "scheduleResize",
    value: function scheduleResize() {
      var _this6 = this;
      if (this.destroyed || this.resizeFrame !== null) return;
      this.resizeFrame = requestAnimationFrame(function () {
        _this6.resizeFrame = null;
        if (!_this6.destroyed) {
          _this6.applyLayout();
        }
      });
    }
  }, {
    key: "applyLayout",
    value: function applyLayout() {
      var force = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (this.destroyed || !this.container || !this.track) return;
      var breakpointChanged = this.updateBreakpoint();
      var containerWidth = this.container.offsetWidth;

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
      var slidesPerViewChanged = this.state.slidesPerView !== this.state.renderedSlidesPerView;
      this.state.renderedSlidesPerView = this.state.slidesPerView;
      this.setupStyles();
      var maxIndex = this.getMaxIndex();
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
    key: "updateSlideVisibility",
    value: function updateSlideVisibility() {
      var _this7 = this;
      if (!this.slides || this.destroyed) return;
      var len = this.slides.length;
      var slidesPerView = this.state.slidesPerView;
      var current = this.state.currentIndex;
      this.slides.forEach(function (slide, index) {
        var visible = _this7.config.infinityLoop ? (index - current + len) % len < slidesPerView : index >= current && index < current + slidesPerView;
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
  }, {
    key: "getMaxIndex",
    value: function getMaxIndex() {
      if (!this.slides.length || !this.state.slidesPerView) return 0;
      return Math.max(0, this.slides.length - this.state.slidesPerView);
    }
  }, {
    key: "getAnimationSpeed",
    value: function getAnimationSpeed() {
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return 0;
      }
      return Math.max(0, Math.trunc(this.config.animationSpeed));
    }
  }, {
    key: "updateSlidePositions",
    value: function updateSlidePositions() {
      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      if (!this.state.dimensions || this.destroyed) return;
      var _this$state$dimension = this.state.dimensions,
        slideWidth = _this$state$dimension.slideWidth,
        spacing = _this$state$dimension.spacing,
        slidesCount = _this$state$dimension.slidesCount;
      var slideAndSpacing = slideWidth + spacing;
      var position = -this.state.currentIndex * slideAndSpacing;
      if (this.config.infinityLoop) {
        position -= slidesCount * slideAndSpacing;
      }

      // Prevent overscroll; carousels with fewer slides than
      // slidesPerView never scroll away from the start.
      var clampedPosition = position;
      if (!this.config.infinityLoop) {
        var scrollableSlides = Math.max(0, slidesCount - this.state.slidesPerView);
        var maxScroll = -(slideAndSpacing * scrollableSlides);
        clampedPosition = Math.max(Math.min(position, 0), maxScroll);
      }
      var speed = this.getAnimationSpeed();
      if (!animate || speed === 0) {
        this.track.style.transition = 'none';
        this.track.style.transform = "translateX(".concat(clampedPosition, "px)");
        // Force reflow so the next transform can animate.
        this.track.offsetHeight;
        this.track.style.transition = '';
      } else {
        this.track.style.transition = "transform ".concat(speed, "ms ease");
        this.track.style.transform = "translateX(".concat(clampedPosition, "px)");
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
    key: "goToSlide",
    value: function goToSlide(index) {
      var _this8 = this;
      if (this.destroyed || !this.slides.length) return false;
      if (this.state.isAnimating) return false;
      var requested = Math.trunc(Number(index));
      if (!Number.isFinite(requested)) {
        console.warn('SWF: goToSlide expects a finite number, received:', index);
        return false;
      }
      var len = this.slides.length;
      var maxIndex = this.getMaxIndex();
      var targetIndex;
      if (this.config.infinityLoop) {
        // Normalize up front so transitions are always bounded within
        // the clone window; distant targets never animate far away.
        targetIndex = (requested % len + len) % len;
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
      var speed = this.getAnimationSpeed();
      this.transitionTimeout = setTimeout(function () {
        _this8.transitionTimeout = null;
        if (_this8.destroyed) return;
        _this8.state.isAnimating = false;
        _this8.updateIndicators();
        _this8.updateSlideVisibility();
        _this8.container.dispatchEvent(new CustomEvent('swf:change', {
          detail: {
            index: _this8.state.currentIndex,
            slide: _this8.slides[_this8.state.currentIndex]
          }
        }));
      }, speed);
      return true;
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

    // ---------------------------------------------------------------------
    // Events
    // ---------------------------------------------------------------------
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this9 = this;
      var signal = this.abortController.signal;
      if (this.prevButton) {
        this.prevButton.addEventListener('click', function () {
          return _this9.prev();
        }, {
          signal: signal
        });
      }
      if (this.nextButton) {
        this.nextButton.addEventListener('click', function () {
          return _this9.next();
        }, {
          signal: signal
        });
      }
      if (this.pauseButton) {
        this.pauseButton.addEventListener('click', function () {
          return _this9.toggleAutoplay();
        }, {
          signal: signal
        });
      }
      this.container.addEventListener('touchstart', function (e) {
        return _this9.handleTouchStart(e);
      }, {
        signal: signal,
        passive: true
      });
      this.container.addEventListener('touchmove', function (e) {
        return _this9.handleTouchMove(e);
      }, {
        signal: signal,
        passive: true
      });
      this.container.addEventListener('touchend', function (e) {
        return _this9.handleTouchEnd(e);
      }, {
        signal: signal
      });
      this.container.addEventListener('touchcancel', function (e) {
        return _this9.handleTouchCancel(e);
      }, {
        signal: signal
      });
      window.addEventListener('resize', function () {
        return _this9.scheduleResize();
      }, {
        signal: signal
      });
      document.addEventListener('visibilitychange', function () {
        return _this9.handleVisibilityChange();
      }, {
        signal: signal
      });

      // Autoplay suspension while the reader interacts with the carousel.
      this.wrapper.addEventListener('mouseenter', function () {
        return _this9.suspendAutoplay('pointer');
      }, {
        signal: signal
      });
      this.wrapper.addEventListener('mouseleave', function () {
        return _this9.resumeAutoplay('pointer');
      }, {
        signal: signal
      });
      this.wrapper.addEventListener('focusin', function () {
        return _this9.suspendAutoplay('focus');
      }, {
        signal: signal
      });
      this.wrapper.addEventListener('focusout', function () {
        return _this9.resumeAutoplay('focus');
      }, {
        signal: signal
      });
    }
  }, {
    key: "handleVisibilityChange",
    value: function handleVisibilityChange() {
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
  }, {
    key: "findTouch",
    value: function findTouch(e) {
      if (!e.changedTouches || !e.changedTouches.length) return null;
      if (this.state.activeTouchId === null) return e.changedTouches[0];
      var _iterator5 = _createForOfIteratorHelper(e.changedTouches),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var touch = _step5.value;
          if (touch.identifier === this.state.activeTouchId) return touch;
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return null;
    }
  }, {
    key: "handleTouchStart",
    value: function handleTouchStart(e) {
      if (this.destroyed || this.state.isAnimating || this.state.isTouching) return;
      if (!e.changedTouches || !e.changedTouches.length) return;
      var touch = e.changedTouches[0];
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
  }, {
    key: "handleTouchMove",
    value: function handleTouchMove(e) {
      if (this.destroyed || !this.state.isTouching || !this.state.dimensions) return;
      var touch = this.findTouch(e);
      if (!touch) return;
      var diffX = this.state.touchStartX - touch.clientX;
      var diffY = this.state.touchStartY - touch.clientY;

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
      var _this$state$dimension2 = this.state.dimensions,
        slideWidth = _this$state$dimension2.slideWidth,
        spacing = _this$state$dimension2.spacing,
        slidesCount = _this$state$dimension2.slidesCount;
      var slideAndSpacing = slideWidth + spacing;
      var basePosition = -this.state.currentIndex * slideAndSpacing;
      if (this.config.infinityLoop) {
        basePosition -= slidesCount * slideAndSpacing;
      }
      var newPosition = basePosition - diffX;

      // Calculate bounds
      var clampedPosition = newPosition;
      if (!this.config.infinityLoop) {
        var scrollableSlides = Math.max(0, slidesCount - this.state.slidesPerView);
        var maxScroll = -(slideAndSpacing * scrollableSlides);
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
      if (this.destroyed || !this.state.isTouching) return;
      var touch = this.findTouch(e);
      if (!touch) return;
      var diff = this.state.touchStartX - touch.clientX;
      var _this$state$dimension3 = this.state.dimensions,
        slideWidth = _this$state$dimension3.slideWidth,
        spacing = _this$state$dimension3.spacing;
      var slideAndSpacing = slideWidth + spacing;

      // Calculate movement threshold (20% of slide width)
      var threshold = slideAndSpacing * 0.2;
      this.state.isTouching = false;
      this.state.activeTouchId = null;
      this.state.touchAxisLocked = false;
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
      this.resumeAutoplay('touch');
    }
  }, {
    key: "handleTouchCancel",
    value: function handleTouchCancel(e) {
      if (this.destroyed || !this.state.isTouching) return;
      if (!this.findTouch(e)) return;
      this.cancelTouchGesture();
    }
  }, {
    key: "cancelTouchGesture",
    value: function cancelTouchGesture() {
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
  }, {
    key: "startAutoplay",
    value: function startAutoplay() {
      this.autoplayRequested = true;
      this.syncAutoplay();
    }
  }, {
    key: "pauseAutoplay",
    value: function pauseAutoplay() {
      this.autoplayRequested = false;
      this.syncAutoplay();
    }
  }, {
    key: "toggleAutoplay",
    value: function toggleAutoplay() {
      if (this.autoplayRequested) {
        this.pauseAutoplay();
      } else {
        this.startAutoplay();
      }
    }
  }, {
    key: "suspendAutoplay",
    value: function suspendAutoplay(reason) {
      this.autoplaySuspensions.add(reason);
      this.syncAutoplay();
    }
  }, {
    key: "resumeAutoplay",
    value: function resumeAutoplay(reason) {
      this.autoplaySuspensions["delete"](reason);
      this.syncAutoplay();
    }
  }, {
    key: "syncAutoplay",
    value: function syncAutoplay() {
      var _this0 = this;
      if (this.destroyed) return;
      var shouldRun = this.config.autoplay && this.autoplayRequested && this.autoplaySuspensions.size === 0;
      if (shouldRun && this.state.autoplayInterval === null) {
        this.state.autoplayInterval = setInterval(function () {
          return _this0.autoplayTick();
        }, this.config.autoplayDelay);
      } else if (!shouldRun && this.state.autoplayInterval !== null) {
        clearInterval(this.state.autoplayInterval);
        this.state.autoplayInterval = null;
      }
      this.updatePauseControl();
    }
  }, {
    key: "autoplayTick",
    value: function autoplayTick() {
      if (this.destroyed) return;
      if (!this.config.infinite && !this.config.infinityLoop && this.state.currentIndex >= this.getMaxIndex()) {
        // Finite carousel reached its terminal position.
        this.pauseAutoplay();
        return;
      }
      this.next();
    }
  }, {
    key: "updatePauseControl",
    value: function updatePauseControl() {
      if (!this.pauseButton) return;
      var playing = this.config.autoplay && this.autoplayRequested;
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
  }, {
    key: "destroy",
    value: function destroy() {
      var _this1 = this;
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
        this.indicatorButtons.forEach(function (button) {
          return button.remove();
        });
      }
      this.indicatorButtons = [];

      // Remove seamless-loop clones.
      if (this.clonedSlidesPrepend) {
        this.clonedSlidesPrepend.forEach(function (clone) {
          return clone.remove();
        });
        this.clonedSlidesPrepend = [];
      }
      if (this.clonedSlidesAppend) {
        this.clonedSlidesAppend.forEach(function (clone) {
          return clone.remove();
        });
        this.clonedSlidesAppend = [];
      }

      // Restore visibility attributes SWF set on original slides.
      if (this.slides) {
        this.slides.forEach(function (slide) {
          slide.removeAttribute('inert');
          slide.removeAttribute('aria-hidden');
        });
      }

      // Unwrap an internally created track.
      if (this.createdTrack && this.track) {
        this.slides.forEach(function (slide) {
          try {
            _this1.container.appendChild(slide);
          } catch (e) {
            // Slide may already be detached by the application.
          }
        });
        this.track.remove();
        this.createdTrack = false;
      }

      // Restore only the inline styles SWF captured before mutating.
      if (this.originalStyles) {
        var _iterator6 = _createForOfIteratorHelper(this.originalStyles),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _step6$value = _slicedToArray(_step6.value, 2),
              node = _step6$value[0],
              style = _step6$value[1];
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
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
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
  }], [{
    key: "version",
    get: function get() {
      return '1.2.6';
    }
  }, {
    key: "initializeAll",
    value: function initializeAll() {
      document.querySelectorAll('[data-swf]').forEach(function (wrapper) {
        if (wrapper._swf instanceof SWF) return;
        try {
          new SWF(wrapper);
        } catch (error) {
          // One broken slider must not prevent the others on the page.
          console.error('SWF: failed to initialize slider on wrapper:', wrapper, error);
        }
      });
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SWF);
if (typeof window !== 'undefined') {
  window.SWF = SWF;
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', SWF.initializeAll);
  } else {
    SWF.initializeAll();
  }
}
})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});