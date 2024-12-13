/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
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
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/swf.js":
/*!***********************!*\
  !*** ./src/js/swf.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction _typeof(o) { \"@babel/helpers - typeof\"; return _typeof = \"function\" == typeof Symbol && \"symbol\" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && \"function\" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? \"symbol\" : typeof o; }, _typeof(o); }\nfunction _createForOfIteratorHelper(r, e) { var t = \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && \"number\" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t[\"return\"] || t[\"return\"](); } finally { if (u) throw o; } } }; }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }\nfunction _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }\nfunction _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }\nfunction _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError(\"Cannot call a class as a function\"); }\nfunction _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, \"value\" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }\nfunction _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, \"prototype\", { writable: !1 }), e; }\nfunction _toPropertyKey(t) { var i = _toPrimitive(t, \"string\"); return \"symbol\" == _typeof(i) ? i : i + \"\"; }\nfunction _toPrimitive(t, r) { if (\"object\" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || \"default\"); if (\"object\" != _typeof(i)) return i; throw new TypeError(\"@@toPrimitive must return a primitive value.\"); } return (\"string\" === r ? String : Number)(t); }\n/**\r\n * SenangWebs Frame - A lightweight, touch-friendly slider library\r\n * Version 1.2.1\r\n */\nvar SWF = /*#__PURE__*/function () {\n  function SWF(element) {\n    var userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n    _classCallCheck(this, SWF);\n    if (!(element instanceof HTMLElement)) {\n      userConfig = element;\n      element = null;\n    }\n    this.wrapper = element || document.querySelector('[data-swf]');\n    if (!this.wrapper) return;\n    this.container = this.wrapper.querySelector('[data-swf-items]');\n    if (!this.container) return;\n    var dataConfig = this.parseDataAttributes(this.container);\n    this.config = _objectSpread(_objectSpread({\n      autoplay: false,\n      autoplayDelay: 3000,\n      animationSpeed: 300,\n      infinite: true,\n      startIndex: 0,\n      responsive: [{\n        breakpoint: 4000,\n        slidesPerView: 1,\n        spacing: 0\n      }]\n    }, dataConfig), userConfig);\n    this.normalizeResponsiveConfig();\n    this.state = {\n      currentIndex: this.config.startIndex,\n      isAnimating: false,\n      autoplayInterval: null,\n      touchStartX: 0,\n      touchEndX: 0,\n      isTouching: false,\n      currentBreakpoint: null,\n      slidesPerView: 1,\n      spacing: 0,\n      slideWidth: 0,\n      trackWidth: 0\n    };\n    this.init();\n  }\n  return _createClass(SWF, [{\n    key: \"parseDataAttributes\",\n    value: function parseDataAttributes(element) {\n      var config = {};\n      var booleanAttrs = ['autoplay', 'infinite'];\n      var numberAttrs = ['autoplayDelay', 'animationSpeed', 'startIndex'];\n      booleanAttrs.forEach(function (attr) {\n        var value = element.dataset[\"swf\".concat(attr.charAt(0).toUpperCase()).concat(attr.slice(1))];\n        if (value !== undefined) {\n          config[attr] = value === 'true';\n        }\n      });\n      numberAttrs.forEach(function (attr) {\n        var value = element.dataset[\"swf\".concat(attr.charAt(0).toUpperCase()).concat(attr.slice(1))];\n        if (value !== undefined) {\n          config[attr] = Number(value);\n        }\n      });\n      try {\n        var responsiveAttr = element.dataset.swfResponsive;\n        if (responsiveAttr) {\n          config.responsive = JSON.parse(responsiveAttr);\n        }\n      } catch (e) {\n        console.warn('Invalid responsive configuration:', e);\n      }\n      return config;\n    }\n  }, {\n    key: \"normalizeResponsiveConfig\",\n    value: function normalizeResponsiveConfig() {\n      if (!Array.isArray(this.config.responsive)) {\n        this.config.responsive = [{\n          breakpoint: 4000,\n          slidesPerView: 1,\n          spacing: 0\n        }];\n        return;\n      }\n      this.config.responsive.sort(function (a, b) {\n        return b.breakpoint - a.breakpoint;\n      });\n    }\n  }, {\n    key: \"init\",\n    value: function init() {\n      var _this = this;\n      this.track = this.container.querySelector('[data-swf-track]');\n      if (!this.track) {\n        this.track = document.createElement('div');\n        this.track.setAttribute('data-swf-track', '');\n        var items = Array.from(this.container.children);\n        items.forEach(function (item) {\n          if (item.hasAttribute('data-swf-item')) {\n            _this.track.appendChild(item);\n          }\n        });\n        this.container.appendChild(this.track);\n      }\n      this.slides = Array.from(this.track.querySelectorAll('[data-swf-item]'));\n      if (!this.slides.length) return;\n      var controls = this.wrapper.querySelector('[data-swf-controls]');\n      if (controls) {\n        this.prevButton = controls.querySelector('[data-swf-prev]');\n        this.nextButton = controls.querySelector('[data-swf-next]');\n      }\n      this.container.style.setProperty('--swf-transition-speed', \"\".concat(this.config.animationSpeed, \"ms\"));\n      this.setupResponsive();\n      this.setupStyles();\n      this.bindEvents();\n      if (this.config.autoplay) {\n        this.startAutoplay();\n      }\n      this.updateSlidePositions(false);\n      this.resizeObserver = new ResizeObserver(function () {\n        _this.handleResize();\n      });\n      this.resizeObserver.observe(this.container);\n    }\n  }, {\n    key: \"setupResponsive\",\n    value: function setupResponsive() {\n      var width = window.innerWidth;\n      var matchedBreakpoint = this.config.responsive[0];\n      var _iterator = _createForOfIteratorHelper(this.config.responsive),\n        _step;\n      try {\n        for (_iterator.s(); !(_step = _iterator.n()).done;) {\n          var bp = _step.value;\n          if (width <= bp.breakpoint) {\n            matchedBreakpoint = bp;\n          }\n        }\n      } catch (err) {\n        _iterator.e(err);\n      } finally {\n        _iterator.f();\n      }\n      var breakpointChanged = matchedBreakpoint !== this.state.currentBreakpoint;\n      if (breakpointChanged) {\n        this.state.currentBreakpoint = matchedBreakpoint;\n        this.state.slidesPerView = matchedBreakpoint.slidesPerView;\n        this.state.spacing = matchedBreakpoint.spacing;\n      }\n      return breakpointChanged;\n    }\n  }, {\n    key: \"setupStyles\",\n    value: function setupStyles() {\n      if (!this.container || !this.track || !this.slides.length) return;\n      var containerWidth = this.container.offsetWidth;\n      var _this$state = this.state,\n        slidesPerView = _this$state.slidesPerView,\n        spacing = _this$state.spacing;\n\n      // Calculate individual slide width\n      var availableWidth = containerWidth - spacing * (slidesPerView - 1);\n      var slideWidth = availableWidth / slidesPerView;\n\n      // Calculate total track width needed for all slides\n      var totalSlides = this.slides.length;\n      var totalWidth = slideWidth * totalSlides + spacing * (totalSlides - 1);\n\n      // Update track styles\n      this.track.style.display = 'flex';\n      this.track.style.width = \"\".concat(totalWidth, \"px\");\n      this.track.style.gap = \"\".concat(spacing, \"px\");\n\n      // Update slides styles\n      this.slides.forEach(function (slide) {\n        slide.style.flex = \"0 0 \".concat(slideWidth, \"px\");\n        slide.style.maxWidth = \"\".concat(slideWidth, \"px\");\n      });\n\n      // Store calculated dimensions\n      this.state.dimensions = {\n        containerWidth: containerWidth,\n        slideWidth: slideWidth,\n        spacing: spacing,\n        slidesPerView: slidesPerView,\n        totalWidth: totalWidth,\n        slidesCount: totalSlides\n      };\n    }\n  }, {\n    key: \"updateSlidePositions\",\n    value: function updateSlidePositions() {\n      var animate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;\n      if (!this.state.dimensions) return;\n      var _this$state$dimension = this.state.dimensions,\n        slideWidth = _this$state$dimension.slideWidth,\n        spacing = _this$state$dimension.spacing,\n        slidesCount = _this$state$dimension.slidesCount;\n      var slideAndSpacing = slideWidth + spacing;\n      var position = -this.state.currentIndex * slideAndSpacing;\n\n      // Prevent overscroll\n      var maxScroll = -(slideAndSpacing * (slidesCount - this.state.slidesPerView));\n      var clampedPosition = Math.max(Math.min(position, 0), maxScroll);\n      if (!animate) {\n        this.track.style.transition = 'none';\n      }\n      this.track.style.transform = \"translateX(\".concat(clampedPosition, \"px)\");\n      if (!animate) {\n        // Force reflow\n        this.track.offsetHeight;\n        this.track.style.transition = '';\n      }\n\n      // Update navigation buttons\n      if (!this.config.infinite) {\n        if (this.prevButton) {\n          this.prevButton.disabled = this.state.currentIndex <= 0;\n        }\n        if (this.nextButton) {\n          this.nextButton.disabled = this.state.currentIndex >= this.getMaxIndex();\n        }\n      }\n    }\n  }, {\n    key: \"getMaxIndex\",\n    value: function getMaxIndex() {\n      if (!this.slides.length || !this.state.slidesPerView) return 0;\n      return Math.max(0, this.slides.length - this.state.slidesPerView);\n    }\n  }, {\n    key: \"goToSlide\",\n    value: function goToSlide(index) {\n      var _this2 = this;\n      if (this.state.isAnimating) return;\n      var maxIndex = this.getMaxIndex();\n      var targetIndex = index;\n      if (this.config.infinite) {\n        if (index < 0) {\n          targetIndex = maxIndex;\n        } else if (index > maxIndex) {\n          targetIndex = 0;\n        }\n      } else {\n        if (index < 0) {\n          targetIndex = 0;\n        } else if (index > maxIndex) {\n          targetIndex = maxIndex;\n        }\n      }\n      this.state.isAnimating = true;\n      this.state.currentIndex = targetIndex;\n      this.updateSlidePositions();\n      setTimeout(function () {\n        _this2.state.isAnimating = false;\n        _this2.container.dispatchEvent(new CustomEvent('swf:change', {\n          detail: {\n            index: targetIndex,\n            slide: _this2.slides[targetIndex]\n          }\n        }));\n      }, this.config.animationSpeed);\n    }\n  }, {\n    key: \"bindEvents\",\n    value: function bindEvents() {\n      var _this3 = this;\n      if (this.prevButton) {\n        this.prevButton.addEventListener('click', function () {\n          return _this3.prev();\n        });\n      }\n      if (this.nextButton) {\n        this.nextButton.addEventListener('click', function () {\n          return _this3.next();\n        });\n      }\n      this.container.addEventListener('touchstart', this.handleTouchStart.bind(this), {\n        passive: true\n      });\n      this.container.addEventListener('touchmove', this.handleTouchMove.bind(this), {\n        passive: true\n      });\n      this.container.addEventListener('touchend', this.handleTouchEnd.bind(this));\n      window.addEventListener('resize', this.handleResize.bind(this));\n      document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));\n    }\n  }, {\n    key: \"handleTouchStart\",\n    value: function handleTouchStart(e) {\n      if (this.state.isAnimating) return;\n      this.state.isTouching = true;\n      this.state.touchStartX = e.touches[0].clientX;\n      if (this.config.autoplay) {\n        this.pauseAutoplay();\n      }\n    }\n  }, {\n    key: \"handleTouchMove\",\n    value: function handleTouchMove(e) {\n      if (!this.state.isTouching || !this.state.dimensions) return;\n      var currentX = e.touches[0].clientX;\n      var diff = this.state.touchStartX - currentX;\n      var _this$state$dimension2 = this.state.dimensions,\n        slideWidth = _this$state$dimension2.slideWidth,\n        spacing = _this$state$dimension2.spacing,\n        slidesCount = _this$state$dimension2.slidesCount;\n      var slideAndSpacing = slideWidth + spacing;\n      var basePosition = -this.state.currentIndex * slideAndSpacing;\n      var newPosition = basePosition - diff;\n\n      // Calculate bounds\n      var maxScroll = -(slideAndSpacing * (slidesCount - this.state.slidesPerView));\n      var clampedPosition = Math.max(Math.min(newPosition, 0), maxScroll);\n      this.track.style.transform = \"translateX(\".concat(clampedPosition, \"px)\");\n    }\n  }, {\n    key: \"handleTouchEnd\",\n    value: function handleTouchEnd(e) {\n      if (!this.state.isTouching) return;\n      var diff = this.state.touchStartX - e.changedTouches[0].clientX;\n      var _this$state$dimension3 = this.state.dimensions,\n        slideWidth = _this$state$dimension3.slideWidth,\n        spacing = _this$state$dimension3.spacing;\n      var slideAndSpacing = slideWidth + spacing;\n\n      // Calculate movement threshold (20% of slide width)\n      var threshold = slideAndSpacing * 0.2;\n      if (Math.abs(diff) > threshold) {\n        // Calculate how many slides to move\n        var slidesToMove = Math.max(1, Math.round(Math.abs(diff) / slideAndSpacing));\n        if (diff > 0) {\n          this.goToSlide(this.state.currentIndex + slidesToMove);\n        } else {\n          this.goToSlide(this.state.currentIndex - slidesToMove);\n        }\n      } else {\n        // Snap back to current position\n        this.updateSlidePositions();\n      }\n      this.state.isTouching = false;\n      if (this.config.autoplay) {\n        this.startAutoplay();\n      }\n    }\n  }, {\n    key: \"handleResize\",\n    value: function handleResize() {\n      if (this.setupResponsive()) {\n        this.setupStyles();\n\n        // Ensure current index is valid after resize\n        var maxIndex = this.getMaxIndex();\n        if (this.state.currentIndex > maxIndex) {\n          this.state.currentIndex = maxIndex;\n        }\n        this.updateSlidePositions(false);\n      }\n    }\n  }, {\n    key: \"handleVisibilityChange\",\n    value: function handleVisibilityChange() {\n      if (document.hidden) {\n        this.pauseAutoplay();\n      } else if (this.config.autoplay) {\n        this.startAutoplay();\n      }\n    }\n  }, {\n    key: \"next\",\n    value: function next() {\n      this.goToSlide(this.state.currentIndex + 1);\n    }\n  }, {\n    key: \"prev\",\n    value: function prev() {\n      this.goToSlide(this.state.currentIndex - 1);\n    }\n  }, {\n    key: \"startAutoplay\",\n    value: function startAutoplay() {\n      var _this4 = this;\n      if (this.state.autoplayInterval) return;\n      this.state.autoplayInterval = setInterval(function () {\n        return _this4.next();\n      }, this.config.autoplayDelay);\n    }\n  }, {\n    key: \"pauseAutoplay\",\n    value: function pauseAutoplay() {\n      if (this.state.autoplayInterval) {\n        clearInterval(this.state.autoplayInterval);\n        this.state.autoplayInterval = null;\n      }\n    }\n  }, {\n    key: \"destroy\",\n    value: function destroy() {\n      this.pauseAutoplay();\n      if (this.resizeObserver) {\n        this.resizeObserver.disconnect();\n      }\n      if (this.prevButton) {\n        this.prevButton.removeEventListener('click', this.prev);\n      }\n      if (this.nextButton) {\n        this.nextButton.removeEventListener('click', this.next);\n      }\n      this.container.removeEventListener('touchstart', this.handleTouchStart);\n      this.container.removeEventListener('touchmove', this.handleTouchMove);\n      this.container.removeEventListener('touchend', this.handleTouchEnd);\n      window.removeEventListener('resize', this.handleResize);\n      document.removeEventListener('visibilitychange', this.handleVisibilityChange);\n\n      // Reset styles\n      this.wrapper.style = '';\n      this.container.style = '';\n      this.track.style = '';\n      this.slides.forEach(function (slide) {\n        slide.style = '';\n      });\n    }\n  }], [{\n    key: \"initializeAll\",\n    value: function initializeAll() {\n      document.querySelectorAll('[data-swf]').forEach(function (wrapper) {\n        new SWF(wrapper);\n      });\n    }\n  }]);\n}();\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SWF);\nif (typeof window !== 'undefined') {\n  window.SWF = SWF;\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', SWF.initializeAll);\n  } else {\n    SWF.initializeAll();\n  }\n}\n\n//# sourceURL=webpack://SWF/./src/js/swf.js?");

/***/ })

/******/ 	});
/************************************************************************/
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
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/swf.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});