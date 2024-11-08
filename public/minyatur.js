(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 305:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var config = {
  id: '',
  // Target ID, this element must contain items for sliding.
  aspectRatio: '2:1',
  // width:height,
  maxWidth: null,
  // If this value is null, slider tries expanded as much as parent width.
  maxHeight: null,
  // If this value is empty, the slider height continues to grow proportionally to the width according to the value specified in "aspectRatio".
  contentWidthLimit: '1250px',
  // If this value provided, the width of the button container element is limited according to this property.
  objectFit: 'scale-down',
  // Its same as css `object-fit` property. Specify how an <img> should be positioned within its container.
  fullScreen: true,
  // Can it be made full screen?
  transitionSpeed: 1000,
  // Animation speed.
  infinityAction: false,
  // Infinity loop.
  startSlideIndex: 0,
  // The number of the image selected by default. The first image is number 1.
  touchChangeCoefficient: 15,
  // A feature that indicates that on touch screens, the image will switch to the next image the more it is scrolled.
  styleAutoload: true,
  // Default styles are added to <head> automatically. If you want to add your own css, this field must be false.
  languageCode: 'tr',
  // Language code
  module: {
    'thumbnail/slider': {
      // dot, basic, slider
      id: 'thumbnail-example',
      // Target ID, this element must contain items for sliding.
      // type: 'slider',
      transitionSpeed: 100
    },
    fullscreen: true,
    control: {}
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (config);

/***/ }),

/***/ 176:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ slider)
});

;// ../sadrazam/source/javascript/library/message.js
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Message = /*#__PURE__*/function () {
  function Message() {
    _classCallCheck(this, Message);
  }
  return _createClass(Message, null, [{
    key: "insert",
    value: function insert(message) {
      var time = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4000;
      var insertMessage = document.createElement('div');
      insertMessage.setAttribute('class', 'popup-message');
      if (typeof time === 'number') {
        insertMessage.timing = setTimeout(function () {
          insertMessage.parentNode.removeChild(insertMessage);
        }, time);
      }
      if (_typeof(message) === 'object') {
        for (var i in message) {
          var ul = document.createElement('ul');
          ul.setAttribute('class', i);
          insertMessage.appendChild(ul);
          if (_typeof(message[i]) === 'object') {
            for (var k in message[i]) {
              var li = document.createElement('li');
              li.appendChild(document.createTextNode(message[i][k]));
              ul.appendChild(li);
            }
          } else {
            var _li = document.createElement('li');
            _li.appendChild(document.createTextNode(message[i]));
            ul.appendChild(_li);
          }
          var button = document.createElement('button');
          button.setAttribute('class', 'close');
          button.appendChild(document.createTextNode('x'));
          ul.appendChild(button);
        }
      }
      if (document.querySelector('.popup-message') != null) {
        var popupMessages = document.querySelectorAll('.popup-message');
        for (var _i = popupMessages.length - 1; _i >= 0; _i--) {
          clearTimeout(popupMessages[_i].timing);
          popupMessages[_i].parentNode.removeChild(popupMessages[_i]);
        }
      }
      document.body.appendChild(insertMessage);
      insertMessage.addEventListener('click', function (event) {
        if (event.target.tagName.toLowerCase() === 'button' && event.target.className === 'close') {
          this.removeChild(event.target.parentNode);
          if (!this.firstElementChild) {
            this.parentNode.removeChild(this);
            clearTimeout(insertMessage.timing);
          }
        }
      });
    }
  }]);
}();
/* harmony default export */ const message = (Message);
// EXTERNAL MODULE: ./source/javascript/language/language.js
var language = __webpack_require__(322);
// EXTERNAL MODULE: ./source/javascript/config.js
var config = __webpack_require__(305);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js?{"sourceMap":false,"exportType":"string"}!./node_modules/sass-loader/dist/cjs.js?{"api":"modern"}!./source/stylesheet/minyatur.scss
var minyatur = __webpack_require__(963);
;// ./source/javascript/engine/slider.js
function slider_typeof(o) { "@babel/helpers - typeof"; return slider_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, slider_typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = slider_toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function slider_classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function slider_defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, slider_toPropertyKey(o.key), o); } }
function slider_createClass(e, r, t) { return r && slider_defineProperties(e.prototype, r), t && slider_defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function slider_toPropertyKey(t) { var i = slider_toPrimitive(t, "string"); return "symbol" == slider_typeof(i) ? i : i + ""; }
function slider_toPrimitive(t, r) { if ("object" != slider_typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != slider_typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




// eslint-disable-next-line

var Slider = /*#__PURE__*/function () {
  function Slider() {
    var _this = this;
    var configObject = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var sliderDataObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    slider_classCallCheck(this, Slider);
    this.activeIndex = 0;
    this.boardListOnTransition = null;
    this.configObject = _objectSpread({}, config/* default */.A);

    // Overwrite user settings over default settings
    Object.keys(this.configObject).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(configObject, key)) {
        _this.configObject[key] = configObject[key];
      }
    });

    // Variables
    language["default"].load(this.configObject.languageCode);
    this.language = language["default"];

    // Insert default style first
    if (this.configObject.styleAutoload) {
      var styleElement = document.createElement('style');
      styleElement.setAttribute('type', 'text/css');
      styleElement.classList.add('minyatur-default-style');
      styleElement.innerHTML = minyatur/* default */.A;
      window.document.head.appendChild(styleElement);
    }

    // Generate main container
    this.mainContainer = document.getElementById(this.configObject.id);
    this.mainContainer.classList.add('minyatur');
    this.mainContainer.__minyatur = this;
    if (!this.mainContainer) {
      console.warn("Minyatur Error: There is no container with selector: ".concat(this.configObject.id));
      return;
    }

    // Slider items
    this.sliderDataObject = sliderDataObject;
    if (!this.sliderDataObject.length) {
      var sliderImages = this.mainContainer.firstElementChild.children;
      if (!sliderImages.length || !sliderImages[0].hasAttribute('data-src')) {
        console.warn('Minyatur Error: There is no image to show. Please insert `div` inside of `slider container element` and than insert images to the `div` with `img` tag.');
        return;
      }
      [].forEach.call(sliderImages, function (item) {
        _this.sliderDataObject.push({
          src: item.getAttribute('data-src'),
          wide: item.getAttribute('data-wide'),
          message: item.getAttribute('data-message')
        });
      });
    }

    // Empty the main container
    while (this.mainContainer.firstChild) {
      this.mainContainer.removeChild(this.mainContainer.lastChild);
    }

    // BroadWrapper, holder for slider items
    this.boardWrapper = document.createElement('div');
    this.boardWrapper.classList.add('minyatur-board');
    this.boardWrapper.style.visibility = 'hidden';
    this.mainContainer.appendChild(this.boardWrapper);

    // AspectRatio and width and height related settings.
    this.boardListContainer = document.createElement('div');
    this.boardListContainer.classList.add('minyatur-board-list-container');
    this.boardListContainer.style.overflow = 'hidden';
    this.boardListContainer.style.height = '0';
    this.boardWrapper.appendChild(this.boardListContainer);

    // Since the measurement properties return values after adding the BoardContainer as a child, values such as ratioPercent, maxWidth, maxHeight of the slider are calculated and evaluated here.
    if (this.configObject.maxWidth != null) {
      this.boardWrapper.style.maxWidth = this.configObject.maxWidth;
    }
    this.boardListContainerCalculateHeight();
    this._boardListContainerCalculateHeight = this.boardListContainerCalculateHeight.bind(this);
    window.addEventListener('resize', this._boardListContainerCalculateHeight);

    // Generate boardlist
    this.boardList = document.createElement('ul');
    this.boardList.positionX = 0;
    this.boardList.addEventListener('transitionstart', function () {
      _this.boardListOnTransition = true;
    });
    this.boardList.addEventListener('transitionend', function () {
      _this.boardListOnTransition = null;
    });
    this.boardListContainer.appendChild(this.boardList);

    // We assign it to different variables for practical access
    this.boardItems = this.boardList.children;

    // Inject items to the board
    this.sliderDataObject.forEach(function (item) {
      var boardListItem = document.createElement('li');
      _this.boardList.appendChild(boardListItem);
      var boardListItemImageContainer = document.createElement('img');
      boardListItemImageContainer.src = item.src;
      boardListItemImageContainer.style.objectFit = _this.configObject.objectFit;
      boardListItem.appendChild(boardListItemImageContainer);
      if (item.message) {
        var messageElement = new message(_this, item.message);
        boardListItem.appendChild(messageElement);
      }
    });

    // Add events
    this._touchStart = this.touchStart.bind(this);
    // https://chromestatus.com/feature/5745543795965952
    this.boardListContainer.addEventListener('touchstart', this._touchStart, {
      passive: true
    });
    this._touchMove = this.touchMove.bind(this);
    // https://chromestatus.com/feature/5745543795965952
    this.boardListContainer.addEventListener('touchmove', this._touchMove, {
      passive: true
    });
    this._touchEnd = this.touchEnd.bind(this);
    this.boardListContainer.addEventListener('touchend', this._touchEnd);
    this.boardListContainer.addEventListener('touchcancel', this._touchEnd);
    this._resizeBoardListPositionX = this.resizeBoardListPositionX.bind(this);
    window.addEventListener('resize', this._resizeBoardListPositionX);

    // Access to the modules then initialize
    this.modules = new Set();
    Object.keys(this.configObject.module).forEach(function (key) {
      var splitedPath = key.split('/');
      var _class;
      // If path length bigger than 2 means path contains class name. So must get class name.
      if (splitedPath.length > 1) {
        // Pop last element of array, last element class name.
        _class = splitedPath.pop();
        // Uppercase first letter because of class names start with uppercase.
        _class = "".concat(_class[0].toUpperCase()).concat(_class.slice(1));
      }
      __webpack_require__(664)("./".concat(splitedPath.join('/'))).then(function (exportedModule) {
        var Module = _class != null ? exportedModule[_class] : exportedModule["default"];
        var ModuleInstance = new Module(_this, _this.configObject.module[key]);
        _this.modules.add(ModuleInstance);
        if (ModuleInstance.append) {
          ModuleInstance.append();
        }
      })["catch"](function (error) {
        console.warn(error);
      });
    });

    // Set start index
    this.insertItem(this.configObject.startSlideIndex, {
      transition: false
    });

    // Finally make the slider visible
    this.boardWrapper.style.visibility = null;
  }
  return slider_createClass(Slider, [{
    key: "boardListPositionX",
    get: function get() {
      return this.boardList.positionX;
    },
    set: function set(position) {
      this.boardList.style.transform = "translateX(".concat(position, "px)");
      this.boardList.positionX = position;
    }
  }, {
    key: "resizeBoardListPositionX",
    value: function resizeBoardListPositionX() {
      this.transitionOff();
      this.boardListPositionX = -1 * this.boardList.offsetWidth * this.activeIndex;
    }
  }, {
    key: "transitionOn",
    value: function transitionOn() {
      var transitionSpeed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.configObject.transitionSpeed;
      this.boardList.style.transition = "all ".concat(transitionSpeed, "ms ease 0ms");
    }
  }, {
    key: "transitionOff",
    value: function transitionOff() {
      this.boardList.style.transition = null;
    }
  }, {
    key: "boardListContainerCalculateHeight",
    value: function boardListContainerCalculateHeight() {
      var ratioPercent = this.configObject.aspectRatio.split(':');
      var calculatedHeight = this.boardWrapper.offsetWidth / ratioPercent[0] * ratioPercent[1];
      if (this.configObject.maxHeight == null || this.boardListContainer.offsetHeight <= parseInt(this.configObject.maxHeight) && calculatedHeight <= parseInt(this.configObject.maxHeight)) {
        this.boardListContainer.style.paddingTop = "".concat(100 / ratioPercent[0], "%");
      } else {
        this.boardListContainer.style.paddingTop = this.configObject.maxHeight;
      }
    }
  }, {
    key: "insertItem",
    value: function insertItem(index) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$transition = _ref.transition,
        transition = _ref$transition === void 0 ? true : _ref$transition,
        _ref$transitionSpeed = _ref.transitionSpeed,
        transitionSpeed = _ref$transitionSpeed === void 0 ? this.configObject.transitionSpeed : _ref$transitionSpeed,
        _ref$source = _ref.source,
        source = _ref$source === void 0 ? null : _ref$source;
      if (index >= this.boardList.children.length) {
        index = this.boardList.children.length - 1;
        if (this.configObject.infinityAction) {
          this.nextItemInfinityMotion();
          return;
        }
        if (source !== 'touch') {
          this.nextItemEndMotion();
          return;
        }
      }
      if (index < 0) {
        index = 0;
        if (this.configObject.infinityAction) {
          this.prevItemInfinityMotion();
          return;
        }
        if (source !== 'touch') {
          this.prevItemEndMotion();
          return;
        }
      }
      if (transition === false) {
        this.transitionOff();
      } else {
        transitionSpeed *= Math.abs(this.activeIndex - index) ? Math.abs(this.activeIndex - index) : 1;
        this.transitionOn(transitionSpeed);
      }
      this.activeIndex = index;
      this.modules.forEach(function (v) {
        if (v.insertItem != null) {
          v.insertItem(index);
        }
      });
      this.boardListPositionX = -1 * this.boardList.offsetWidth * index;
    }
  }, {
    key: "prevItem",
    value: function prevItem() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var targetIndex = this.activeIndex - 1;
      this.insertItem(targetIndex, {
        source: source
      });
    }
  }, {
    key: "prevItemEndMotion",
    value: function prevItemEndMotion() {
      var _this2 = this;
      if (this.prevItemEndMotionTimeoutId != null) {
        window.clearTimeout(this.prevItemEndMotionTimeoutId);
      } else {
        this.transitionOn(this.configObject.transitionSpeed / 2);
        this.boardListPositionX = this.boardList.offsetWidth / 10;
      }
      this.prevItemEndMotionTimeoutId = window.setTimeout(function () {
        _this2.insertItem(0, {
          transitionSpeed: _this2.configObject.transitionSpeed / 2
        });
        _this2.prevItemEndMotionTimeoutId = null;
      }, this.configObject.transitionSpeed / 2);
    }
  }, {
    key: "prevItemInfinityMotion",
    value: function prevItemInfinityMotion() {
      var _this3 = this;
      if (this.boardListOnTransition != null) {
        return;
      }
      this.transitionOn();
      this.boardListPositionX = this.boardList.offsetWidth;
      window.setTimeout(function () {
        _this3.transitionOff();
        _this3.boardListPositionX = -1 * _this3.boardList.offsetWidth * _this3.boardList.children.length;
        window.setTimeout(function () {
          _this3.insertItem(_this3.boardList.children.length - 1);
        }, 100);
      }, this.configObject.transitionSpeed);
    }
  }, {
    key: "nextItem",
    value: function nextItem() {
      var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var targetIndex = this.activeIndex + 1;
      this.insertItem(targetIndex, {
        source: source
      });
    }
  }, {
    key: "nextItemEndMotion",
    value: function nextItemEndMotion() {
      var _this4 = this;
      if (this.nextItemEndMotionTimeoutId != null) {
        window.clearTimeout(this.nextItemEndMotionTimeoutId);
      } else {
        this.transitionOn(this.configObject.transitionSpeed / 2);
        this.boardListPositionX += -1 * this.boardList.offsetWidth / 10;
      }
      this.nextItemEndMotionTimeoutId = window.setTimeout(function () {
        _this4.insertItem(_this4.boardList.children.length - 1, {
          transitionSpeed: _this4.configObject.transitionSpeed / 2
        });
        _this4.nextItemEndMotionTimeoutId = null;
      }, this.configObject.transitionSpeed / 2);
    }
  }, {
    key: "nextItemInfinityMotion",
    value: function nextItemInfinityMotion() {
      var _this5 = this;
      if (this.boardListOnTransition != null) {
        return;
      }
      this.transitionOn();
      this.boardListPositionX = -1 * this.boardList.offsetWidth * this.boardList.children.length;
      window.setTimeout(function () {
        _this5.transitionOff();
        _this5.boardListPositionX = _this5.boardList.offsetWidth;
        window.setTimeout(function () {
          _this5.insertItem(0);
        }, 100);
      }, this.configObject.transitionSpeed);
    }
  }, {
    key: "touchStart",
    value: function touchStart(event) {
      if (this.boardListOnTransition != null) {
        return;
      }
      this.touchStartEvent = event;
      this.touchPositionData = {};
      this.touchPositionData.type = null;
      this.touchPositionData.touchStartBoardListPositionX = this.boardListPositionX;
      this.touchPositionData.touchXDiff = 0;
      this.touchPositionData.touchYDiff = 0;
      this.transitionOff();
    }
  }, {
    key: "touchMove",
    value: function touchMove(event) {
      if (this.boardListOnTransition != null) {
        return;
      }
      if (this.touchPositionData == null) {
        this.touchStart(event);
        return;
      }
      if (this.touchPositionData.type === 'horizontal') {
        return;
      }
      this.touchPositionData.touchXDiff = parseInt(event.changedTouches[0].clientX) - this.touchStartEvent.changedTouches[0].clientX;
      this.touchPositionData.touchYDiff = parseInt(event.changedTouches[0].clientY) - this.touchStartEvent.changedTouches[0].clientY;
      if (this.touchPositionData.type == null) {
        if (Math.abs(this.touchPositionData.touchYDiff) <= Math.abs(this.touchPositionData.touchXDiff)) {
          this.touchPositionData.type = 'vertical';
        } else {
          this.touchPositionData.type = 'horizontal';
        }
      }
      if (this.touchPositionData.type === 'vertical') {
        this.boardListPositionX = this.touchPositionData.touchStartBoardListPositionX + this.touchPositionData.touchXDiff;

        // event.preventDefault();

        return false;
      }
    }
  }, {
    key: "touchEnd",
    value: function touchEnd(event) {
      if (this.boardListOnTransition != null) {
        return;
      }
      if (this.touchPositionData == null) {
        return;
      }
      if (this.touchPositionData.type === 'horizontal') {
        return;
      }
      var target = event.target;
      if (target.parentNode.parentNode.offsetWidth / this.configObject.touchChangeCoefficient <= Math.abs(this.touchPositionData.touchXDiff) && this.touchPositionData.touchXDiff < 0) {
        this.nextItem('touch');
      } else if (target.parentNode.parentNode.offsetWidth / this.configObject.touchChangeCoefficient <= Math.abs(this.touchPositionData.touchXDiff) && this.touchPositionData.touchXDiff > 0) {
        this.prevItem('touch');
      } else {
        this.insertItem(this.activeIndex, {
          transition: false,
          source: 'touch'
        });
      }
      this.touchPositionData = null;
    }
  }]);
}();
/* harmony default export */ const slider = (Slider);

/***/ }),

/***/ 543:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var lang = {
  close: 'Close'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lang);

/***/ }),

/***/ 322:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Language = /*#__PURE__*/function () {
  function Language() {
    _classCallCheck(this, Language);
  }
  return _createClass(Language, null, [{
    key: "load",
    value: function load(languageCode) {
      var _this = this;
      __webpack_require__(29)("./".concat(languageCode, ".js")).then(function (exportedModule) {
        var translationObject = exportedModule["default"];
        _this.setAll(translationObject);
      })["catch"](function (error) {
        console.warn(error);
        __webpack_require__(29)("./".concat(_this.defaultLanguageCode, ".js")).then(function (exportedModule) {
          var translationObject = exportedModule["default"];
          _this.setAll(translationObject);
        });
      });
    }
  }, {
    key: "get",
    value: function get(key) {
      return Language.words.get(key);
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return Language.words;
    }
  }, {
    key: "set",
    value: function set(key, value) {
      return Language.words.set(key, value);
    }
  }, {
    key: "setAll",
    value: function setAll(translationObject) {
      var _this2 = this;
      Object.entries(translationObject).forEach(function (elem) {
        _this2.set(elem[0], elem[1]);
      });
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      return Language.words["delete"](key);
    }
  }]);
}();
_defineProperty(Language, "words", new Map());
_defineProperty(Language, "defaultLanguageCode", 'en');
if (globalThis.lang != null) {
  Language.load(globalThis.lang);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Language);

/***/ }),

/***/ 530:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var lang = {
  close: 'Kapat'
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lang);

/***/ }),

/***/ 982:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var Minyatur = (__webpack_require__(176)/* ["default"] */ .A);
globalThis.Minyatur = Minyatur;

// https://stackoverflow.com/questions/35971042/how-to-correctly-use-es6-export-default-with-commonjs-require
module.exports = Minyatur;

/***/ }),

/***/ 481:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Control = /*#__PURE__*/function () {
  function Control(sliderInstance) {
    _classCallCheck(this, Control);
    this.sliderInstance = sliderInstance;
    this.buttonContainer = document.createElement('div');
    this.buttonContainer.classList.add('minyatur-board-button-container');
    this.sliderInstance.boardWrapper.appendChild(this.buttonContainer);
    if (this.sliderInstance.configObject.contentWidthLimit) {
      this.buttonContainer.style.maxWidth = this.sliderInstance.configObject.contentWidthLimit;
    }
    this.prevButton = document.createElement('div');
    this.prevButton.classList.add('minyatur-board-prev-button');
    this.buttonContainer.appendChild(this.prevButton);
    this.nextButton = document.createElement('div');
    this.nextButton.classList.add('minyatur-board-next-button');
    this.buttonContainer.appendChild(this.nextButton);
    this._prevItem = this.prevItem.bind(this);
    this.prevButton.addEventListener('click', this._prevItem);
    this._nextItem = this.nextItem.bind(this);
    this.nextButton.addEventListener('click', this._nextItem);
  }
  return _createClass(Control, [{
    key: "prevItem",
    value: function prevItem(event) {
      this.sliderInstance.prevItem();
      event.stopPropagation();
    }
  }, {
    key: "nextItem",
    value: function nextItem(event) {
      this.sliderInstance.nextItem();
      event.stopPropagation();
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Control);

/***/ }),

/***/ 495:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// import _config from '../config';
var Fullscreen = /*#__PURE__*/function () {
  function Fullscreen(sliderInstance) {
    _classCallCheck(this, Fullscreen);
    this.sliderInstance = sliderInstance;
    this._show = this.show.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('click', this._show);
  }
  return _createClass(Fullscreen, [{
    key: "insert",
    value: function insert() {
      this.containerId = 'id-' + Math.floor((1 + Math.random()) * Math.pow(0x10, 10)).toString(16).substring(1);
      this.wrapper = document.createElement('div');
      this.wrapper.id = this.containerId;
      this.wrapper.classList.add('minyatur-fullscreen-wrapper');
      this.wrapper.addEventListener('dblclick', function (event) {
        return event.preventDefault();
      });
      this.wrapper.addEventListener('click', function (event) {
        return event.preventDefault();
      });
      this.wrapper.addEventListener('touchstart', function (event) {
        return event.preventDefault();
      });
      this.wrapper.addEventListener('touchmove', function (event) {
        return event.preventDefault();
      });
      this.wrapper.addEventListener('touchend', function (event) {
        return event.preventDefault();
      });
      this.closeButtonContainer = document.createElement('div');
      this.closeButtonContainer.classList.add('mfw-close-button-container');
      this.wrapper.appendChild(this.closeButtonContainer);
      this._hide = this.hide.bind(this);
      this.closeButton = document.createElement('button');
      this.closeButton.innerHTML = "<i class=\"fa-solid fa-xmark\"></i> ".concat(this.sliderInstance.language.get('close'));
      this.closeButton.addEventListener('touchstart', this._hide, false);
      this.closeButton.addEventListener('click', this._hide, false);
      // this.closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i> ${this.language.get('close')}`;
      this.closeButtonContainer.appendChild(this.closeButton);
      this.imageWrapper = document.createElement('div');
      this.imageWrapper.classList.add('mfw-image-wrapper');
      this.wrapper.appendChild(this.imageWrapper);
      this.imageContainer = document.createElement('div');
      this.imageContainer.classList.add('mfw-image-container');
      // this.wrapper.appendChild(this.imageContainer);
      this.imageWrapper.appendChild(this.imageContainer);
      this.imageDiv = document.createElement('div');
      this.imageDiv.classList.add('nfw-image-item');
      // this.wrapper.appendChild(this.imageContainer);
      this.imageContainer.appendChild(this.imageDiv);
      this.imageElem = document.createElement('img');
      this.imageElem.classList.add('nfw-image');
      this.imageElem.style.transform = null;
      this.imageDiv.appendChild(this.imageElem);
      this._imageClickHandler = this.imageClickHandler.bind(this);
      this.imageElem.addEventListener('click', this._imageClickHandler);
      this._imageMouseMoveHandler = this.imageMouseMoveHandler.bind(this);
      this.imageElem.addEventListener('mousemove', this._imageMouseMoveHandler);
      this._imageDoubleTapHandler = this.imageDoubleTapHandler.bind(this);
      this.imageElem.addEventListener('touchstart', this._imageDoubleTapHandler);
      this._imageTouchStartHandle = this.imageTouchStartHandle.bind(this);
      this.imageElem.addEventListener('touchstart', this._imageTouchStartHandle);
      this._imageTouchMoveHandle = this.imageTouchMoveHandle.bind(this);
      this.imageElem.addEventListener('touchmove', this._imageTouchMoveHandle);
      this._imageTouchEndHandle = this.imageTouchEndHandle.bind(this);
      this.imageElem.addEventListener('touchend', this._imageTouchEndHandle);
      this.imageElem.addEventListener('touchcancel', this._imageTouchEndHandle);
      document.body.appendChild(this.wrapper);
    }
  }, {
    key: "show",
    value: function show() {
      if (this.containerId == null) {
        this.insert();
      }
      var activeImage = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex].querySelector('img');
      this.imageElem.src = activeImage.src;
      this.imageElem.style.transform = null;
      this.scale = 1;
      this.positionX = 0;
      this.positionY = 0;
      this.wrapper.classList.remove('hidden');
    }
  }, {
    key: "hide",
    value: function hide(event) {
      this.wrapper.classList.add('hidden');
    }
  }, {
    key: "zoomToggle",
    value: function zoomToggle(event) {
      var _this = this;
      this.imageElem.removeEventListener('mousemove', this._imageMouseMoveHandler);
      // document.getElementById('log-div').appendChild(document.createTextNode('first-dist: doubleclick\n\n'));

      if (this.scale == null || this.scale > 1) {
        this.scale = 1;
        this.imageElem.classList.remove('nfw-zoom-in');
        this.imageElem.classList.add('nfw-zoom-out');
      } else {
        this.scale = 2;
        this.imageElem.classList.remove('nfw-zoom-out');
        this.imageElem.classList.add('nfw-zoom-in');
      }
      this.positionX = 0;
      this.positionY = 0;
      this.imageElem.style.transitionDuration = '200ms';
      this.imageElem.style.transitionTimingFunction = 'ease';
      this.imageElem.style.transform = "translate(".concat(-this.positionX, "px, ").concat(-this.positionY, "px) scale(").concat(this.scale, ")");
      window.setTimeout(function (f) {
        _this._imageMouseMoveHandler = _this.imageMouseMoveHandler.bind(_this);
        _this.imageElem.addEventListener('mousemove', _this._imageMouseMoveHandler);
      }, 200);
    }
  }, {
    key: "imageClickHandler",
    value: function imageClickHandler(event) {
      this.zoomToggle(event);
    }
  }, {
    key: "imageDoubleTapHandler",
    value: function imageDoubleTapHandler(event) {
      var _this2 = this;
      // Önce bir parmak koyup daha sonra ikinci parmağı koyunca da çift tıklama olarak algılamaması için.
      if (event.touches.length > 1) {
        return;
      }
      if (this.tapped) {
        this.zoomToggle(event);
        window.clearTimeout(this.tapTimeoutId);
        this.tapped = null;
      } else {
        this.tapped = true;
        this.tapTimeoutId = window.setTimeout(function () {
          _this2.tapped = null;
        }, 300);
      }
    }
  }, {
    key: "imageMouseMoveHandler",
    value: function imageMouseMoveHandler(event) {
      // https://codepen.io/pseudonymousUser/pen/poMKRag
      var imageContainerRect = this.imageContainer.getBoundingClientRect();
      var imageElemRect = this.imageElem.getBoundingClientRect();
      if (imageContainerRect.width < imageElemRect.width) {
        var katsayi = imageElemRect.width / imageContainerRect.width;
        this.positionX = (event.clientX - (imageContainerRect.x + imageContainerRect.width / 2)) * katsayi;
        if (this.positionX > 0 && this.positionX > (imageElemRect.width - imageContainerRect.width) / 2) {
          this.positionX = (imageElemRect.width - imageContainerRect.width) / 2;
        } else if (this.positionX < 0 && -this.positionX > (imageElemRect.width - imageContainerRect.width) / 2) {
          this.positionX = -(imageElemRect.width - imageContainerRect.width) / 2;
        }
      } else {
        this.positionX = 0;
      }
      if (imageContainerRect.height < imageElemRect.height) {
        var _katsayi = imageElemRect.height / imageContainerRect.height;
        this.positionY = (event.clientY - (imageContainerRect.y + imageContainerRect.height / 2)) * _katsayi;
        if (this.positionY > 0 && this.positionY > (imageElemRect.height - imageContainerRect.height) / 2) {
          this.positionY = (imageElemRect.height - imageContainerRect.height) / 2;
        } else if (this.positionY < 0 && -this.positionY > (imageElemRect.height - imageContainerRect.height) / 2) {
          this.positionY = -(imageElemRect.height - imageContainerRect.height) / 2;
        }
      } else {
        this.positionY = 0;
      }
      this.imageElem.style.transform = "translate(".concat(-this.positionX, "px, ").concat(-this.positionY, "px) scale(").concat(this.scale, ")");
    }
  }, {
    key: "imageTouchStartHandle",
    value: function imageTouchStartHandle(event) {
      this.lastTouchEvent = event;
    }
  }, {
    key: "imageTouchMoveHandle",
    value: function imageTouchMoveHandle(event) {
      this.imageElem.style.transitionDelay = null;
      this.imageElem.style.transitionDuration = null;
      if (this.lastTouchEvent.touches.length > 1 && event.touches.length > 1) {
        var lastDist = Math.hypot(this.lastTouchEvent.touches[0].pageX - this.lastTouchEvent.touches[1].pageX, this.lastTouchEvent.touches[0].pageY - this.lastTouchEvent.touches[1].pageY);
        var currentDist = Math.hypot(event.touches[0].pageX - event.touches[1].pageX, event.touches[0].pageY - event.touches[1].pageY);
        var distDiff = lastDist - currentDist;
        if (this.scale == null) {
          this.scale = 1;
        }
        var preScale = this.scale - distDiff / 50;
        if (preScale < 1) {
          preScale = this.scale - distDiff / 250;
        }
        if (preScale < 0.2) {
          preScale = 0.2;
        }
        if (preScale > 2.4) {
          preScale = 2.4;
        }
        this.scale = preScale;
      }

      // this.scale = 2.4;

      if (this.lastTouchEvent.touches.length < 2) {
        this.positionX += (this.lastTouchEvent.touches[0].pageX - event.touches[0].pageX) * (1 + this.scale * 0.25);
        this.positionY += (this.lastTouchEvent.touches[0].pageY - event.touches[0].pageY) * (1 + this.scale * 0.25);
      } else {
        this.positionX += this.lastTouchEvent.touches[1].pageX - event.touches[1].pageX;
        this.positionY += this.lastTouchEvent.touches[1].pageY - event.touches[1].pageY;
      }
      this.imageElem.style.transform = "translate(".concat(-this.positionX, "px, ").concat(-this.positionY, "px) scale(").concat(this.scale, ")");
      this.lastTouchEvent = event;
    }
  }, {
    key: "imageTouchEndHandle",
    value: function imageTouchEndHandle(event) {
      if (this.scale < 1) {
        this.scale = 1;
      }
      var imageContainerRect = this.imageContainer.getBoundingClientRect();
      var imageElemRect = this.imageElem.getBoundingClientRect();
      if (imageContainerRect.width > imageElemRect.width) {
        this.positionX = 0;
      } else {
        if (imageContainerRect.left < imageElemRect.left) this.positionX += imageElemRect.left - imageContainerRect.left;
        if (imageContainerRect.right > imageElemRect.right) this.positionX += imageElemRect.right - imageContainerRect.right;
      }
      if (imageContainerRect.height > imageElemRect.height) {
        this.positionY = 0;
      } else {
        if (imageContainerRect.top < imageElemRect.top) this.positionY += imageElemRect.top - imageContainerRect.top;
        if (imageContainerRect.bottom > imageElemRect.bottom) this.positionY += imageElemRect.bottom - imageContainerRect.bottom;
      }
      this.imageElem.style.transitionDuration = '200ms';
      this.imageElem.style.transitionTimingFunction = 'ease';
      this.imageElem.style.transform = "translate(".concat(-this.positionX, "px, ").concat(-this.positionY, "px) scale(").concat(this.scale, ")");
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Fullscreen);

/***/ }),

/***/ 411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Message = /*#__PURE__*/function () {
  function Message(sliderInstance, messsage) {
    _classCallCheck(this, Message);
    this.sliderInstance = sliderInstance;

    // Wrapper'ı buraya sadece contentWidthLimit ekleyebilmek için koyuyoruz. contentWidthLimit kaldırılırsa wrapper'de kaldırılabilir.
    this.boardListItemMessageWrapper = document.createElement('div');
    this.boardListItemMessageWrapper.classList.add('minyatur-on-image-message-wrapper');
    if (this.sliderInstance.configObject.contentWidthLimit) {
      this.boardListItemMessageWrapper.style.maxWidth = this.sliderInstance.configObject.contentWidthLimit;
    }
    this.boardListItemMessageContainer = document.createElement('div');
    this.boardListItemMessageContainer.classList.add('minyatur-on-image-message-container');
    this.boardListItemMessageContainer.appendChild(document.createTextNode(messsage));
    this.boardListItemMessageWrapper.appendChild(this.boardListItemMessageContainer);
    this._calculateFontSize = this.calculateFontSize.bind(this);
    window.addEventListener('resize', this._calculateFontSize);
    this.calculateFontSize();
    return this.boardListItemMessageWrapper;
  }
  return _createClass(Message, [{
    key: "calculateFontSize",
    value: function calculateFontSize() {
      var minimumLenght = Math.min(this.sliderInstance.boardWrapper.offsetWidth, this.sliderInstance.boardWrapper.offsetHeight);
      this.boardListItemMessageContainer.style.fontSize = "".concat(parseInt(minimumLenght) / 12, "px");
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Message);

/***/ }),

/***/ 876:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Basic: () => (/* binding */ Basic),
/* harmony export */   Dot: () => (/* binding */ Dot),
/* harmony export */   Slider: () => (/* binding */ Slider)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305);
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Thumbnail = /*#__PURE__*/function () {
  function Thumbnail(sliderInstance, configUser, path) {
    _classCallCheck(this, Thumbnail);
    this.sliderInstance = sliderInstance;
    this.activeIndex = null;
    this.loadConfig(configUser, path);
    if (this.configObject.id && document.getElementById(this.configObject.id)) {
      this.thumbnailWrapper = document.getElementById(this.configObject.id);
      while (this.thumbnailWrapper.firstChild) {
        this.thumbnailWrapper.removeChild(this.thumbnailWrapper.lastChild);
      }
    } else {
      this.thumbnailWrapper = document.createElement('div');
      this.sliderInstance.mainContainer.appendChild(this.thumbnailWrapper);
    }
  }
  return _createClass(Thumbnail, [{
    key: "loadConfig",
    value: function loadConfig(configUser, path) {
      var _this = this;
      this.configObject = _objectSpread({}, _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.module[path]);
      Object.keys(this.configObject).forEach(function (key) {
        if (Object.prototype.hasOwnProperty.call(configUser, key)) {
          _this.configObject[key] = configUser[key];
        }
      });
    }
  }, {
    key: "append",
    value: function append() {
      return true;
    }
  }, {
    key: "insertItem",
    value: function insertItem(index) {
      if (index < 0) {
        index = 0;
      }
      if (index >= this.thumbnailItems.length) {
        index = this.thumbnailItems.length - 1;
      }
      if (this.activeIndex === index) {
        return;
      }
      [].forEach.call(this.thumbnailItems, function (item) {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });
      if (this.thumbnailItems[index]) {
        this.activeIndex = index;
        this.thumbnailItems[index].classList.add('active');
      }
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(attachedElem, event) {
      var index = [].indexOf.call(this.thumbnailItems, attachedElem);
      if (index < 0) {
        return;
      }
      this.insertItem(index);
      this.sliderInstance.insertItem(index, {
        transitionSpeed: 100
      });
      event.preventDefault();
      return false;
    }
  }]);
}();
var Slider = /*#__PURE__*/function (_Thumbnail) {
  function Slider(sliderInstance, configUser) {
    var _this2;
    _classCallCheck(this, Slider);
    _this2 = _callSuper(this, Slider, [sliderInstance, configUser, 'thumbnail/slider']);
    _this2.thumbnailWrapper.classList.add('minyatur-thumbnail-slider');
    _this2.thumbnailContainer = document.createElement('div');
    _this2.thumbnailContainer.style.overflow = 'hidden';
    _this2.thumbnailWrapper.appendChild(_this2.thumbnailContainer);
    _this2.thumbnailList = document.createElement('ul');
    _this2.thumbnailList.positionX = 0;
    _this2.thumbnailContainer.appendChild(_this2.thumbnailList);
    _this2.thumbnailItems = _this2.thumbnailList.children;
    [].forEach.call(_this2.sliderInstance.boardItems, function (sliderItem) {
      var thumbnailListItem = document.createElement('li');
      _this2.thumbnailList.appendChild(thumbnailListItem);
      var thumbnailListItemImageContainer = document.createElement('img');
      thumbnailListItemImageContainer.src = sliderItem.querySelector('img').src;

      /* const thumbnailListItemImageContainer = document.createElement('a');
      thumbnailListItemImageContainer.href = sliderItem.querySelector('a').href;
      thumbnailListItemImageContainer.style.backgroundImage = 'url(' + sliderItem.querySelector('a').href + ')'; */

      _this2._clickHandler = _this2.clickHandler.bind(_this2, thumbnailListItem);
      thumbnailListItem.addEventListener('click', _this2._clickHandler);
      thumbnailListItem.appendChild(thumbnailListItemImageContainer);
    });
    _this2._touchStart = _this2.touchStart.bind(_this2);
    _this2.thumbnailList.addEventListener('touchstart', _this2._touchStart);
    _this2._touchMove = _this2.touchMove.bind(_this2);
    _this2.thumbnailList.addEventListener('touchmove', _this2._touchMove);
    _this2._touchEnd = _this2.touchEnd.bind(_this2);
    _this2.thumbnailList.addEventListener('touchend', _this2._touchEnd);
    _this2.thumbnailBackwardButton = document.createElement('div');
    _this2.thumbnailBackwardButton.classList.add('minyatur-thumbnail-slider-backward-button');
    _this2.thumbnailContainer.appendChild(_this2.thumbnailBackwardButton);
    _this2.thumbnailForwardButton = document.createElement('div');
    _this2.thumbnailForwardButton.classList.add('minyatur-thumbnail-slider-forward-button');
    _this2.thumbnailContainer.appendChild(_this2.thumbnailForwardButton);
    _this2._slideBackward = _this2.slideBackward.bind(_this2);
    _this2.thumbnailBackwardButton.addEventListener('click', _this2._slideBackward);
    _this2._slideForward = _this2.slideForward.bind(_this2);
    _this2.thumbnailForwardButton.addEventListener('click', _this2._slideForward);
    _this2._resized = _this2.resized.bind(_this2);
    window.addEventListener('resize', _this2._resized);
    _this2.resized();
    return _possibleConstructorReturn(_this2, _this2);
  }
  _inherits(Slider, _Thumbnail);
  return _createClass(Slider, [{
    key: "thumbnailListPositionX",
    get: function get() {
      return this.thumbnailList.positionX;
    },
    set: function set(position) {
      this.thumbnailList.style.transform = "translateX(".concat(position, "px)");
      this.thumbnailList.positionX = position;
    }
  }, {
    key: "resized",
    value: function resized() {
      if (this.thumbnailList.clientWidth < this.thumbnailList.scrollWidth) {
        this.thumbnailWrapper.classList.add('scrollOn');
      } else {
        this.thumbnailWrapper.classList.remove('scrollOn');
      }
    }
  }, {
    key: "transitionOn",
    value: function transitionOn() {
      var transitionSpeed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.configObject.transitionSpeed;
      this.thumbnailList.style.transition = "all ".concat(transitionSpeed, "ms ease 0ms");
    }
  }, {
    key: "transitionOff",
    value: function transitionOff() {
      this.thumbnailList.style.transition = null;
    }
  }, {
    key: "insertItem",
    value: function insertItem(index) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$transition = _ref.transition,
        transition = _ref$transition === void 0 ? true : _ref$transition,
        _ref$transitionSpeed = _ref.transitionSpeed,
        transitionSpeed = _ref$transitionSpeed === void 0 ? this.configObject.transitionSpeed : _ref$transitionSpeed;
      if (index < 0) {
        index = 0;
      }
      if (index >= this.thumbnailItems.length) {
        index = this.thumbnailItems.length - 1;
      }
      if (this.activeIndex === index) {
        return;
      }
      [].forEach.call(this.thumbnailItems, function (item) {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });
      if (this.thumbnailItems[index]) {
        this.activeIndex = index;
        this.thumbnailItems[index].classList.add('active');
      }
      if (transition === false) {
        this.transitionOff();
      } else {
        this.transitionOn(transitionSpeed);
      }

      // Item position check, If not visible change position to visible active item.
      if (Math.abs(this.thumbnailListPositionX) > this.thumbnailItems[index].offsetLeft) {
        this.thumbnailListPositionX = -this.thumbnailItems[index].offsetLeft;
      }
      if (this.thumbnailList.offsetWidth - this.thumbnailListPositionX < this.thumbnailItems[index].offsetLeft + this.thumbnailItems[index].offsetWidth) {
        this.thumbnailListPositionX = this.thumbnailList.offsetWidth - this.thumbnailItems[index].offsetLeft - this.thumbnailItems[index].offsetWidth;
      }
    }
  }, {
    key: "slideBackward",
    value: function slideBackward() {
      if (this.thumbnailListPositionX === 0) {
        this.slideBackwardEndMotion();
        return;
      }
      if (this.thumbnailListPositionX + this.thumbnailList.clientWidth < 0) {
        this.thumbnailListPositionX = this.thumbnailListPositionX + this.thumbnailList.clientWidth;
        return;
      }
      if (this.thumbnailListPositionX + this.thumbnailList.clientWidth >= 0) {
        this.thumbnailListPositionX = 0;
      }
    }
  }, {
    key: "slideBackwardEndMotion",
    value: function slideBackwardEndMotion() {
      var _this3 = this;
      if (this.slideBackwardEndMotionTimeoutId != null) {
        window.clearTimeout(this.slideBackwardEndMotionTimeoutId);
      } else {
        this.transitionOn(this.configObject.transitionSpeed / 2);
        this.thumbnailListPositionX += this.thumbnailList.offsetWidth / 10;
      }
      this.slideBackwardEndMotionTimeoutId = window.setTimeout(function () {
        _this3.thumbnailListPositionX = 0;
        _this3.slideBackwardEndMotionTimeoutId = null;
      }, this.configObject.transitionSpeed / 2);
    }
  }, {
    key: "slideForward",
    value: function slideForward() {
      this.transitionOn();
      if (this.thumbnailList.scrollWidth === Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth) {
        this.slideForwardEndMotion();
        return;
      }
      if (this.thumbnailList.scrollWidth > Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth * 2) {
        this.thumbnailListPositionX = -(Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth);
        return;
      }
      if (this.thumbnailList.scrollWidth <= Math.abs(this.thumbnailListPositionX) + this.thumbnailList.clientWidth * 2) {
        this.thumbnailListPositionX = -Math.abs(this.thumbnailList.scrollWidth - this.thumbnailList.clientWidth);
      }
    }
  }, {
    key: "slideForwardEndMotion",
    value: function slideForwardEndMotion() {
      var _this4 = this;
      if (this.slideForwardEndMotionTimeoutId != null) {
        window.clearTimeout(this.slideForwardEndMotionTimeoutId);
      } else {
        this.transitionOn(this.configObject.transitionSpeed / 2);
        this.thumbnailListPositionX += -1 * this.thumbnailList.offsetWidth / 10;
      }
      this.slideForwardEndMotionTimeoutId = window.setTimeout(function () {
        _this4.thumbnailListPositionX = -Math.abs(_this4.thumbnailList.scrollWidth - _this4.thumbnailList.clientWidth);
        _this4.slideForwardEndMotionTimeoutId = null;
      }, this.configObject.transitionSpeed / 2);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(attachedElem, event) {
      var index = [].indexOf.call(this.thumbnailItems, attachedElem);
      if (index < 0) {
        return;
      }
      this.insertItem(index);
      this.sliderInstance.insertItem(index);
      event.preventDefault();
      return false;
    }
  }, {
    key: "touchStart",
    value: function touchStart(event) {
      var touchObj = event.changedTouches[0];
      this.touchPositionData = {};
      this.touchPositionData.type = null;
      this.touchPositionData.touchStartX = parseInt(touchObj.clientX);
      this.touchPositionData.touchStartThumbnailListPositionX = this.thumbnailListPositionX;
      this.touchPositionData.touchXDiff = 0;
      this.touchPositionData.touchStartY = parseInt(touchObj.clientY);
      this.touchPositionData.touchYDiff = 0;
      this.transitionOff();
    }
  }, {
    key: "touchMove",
    value: function touchMove(event) {
      // console.log('burada 3');
      // return false; başta sadece aşağıya hareket tespit ederse bunu kullan;
      if (this.touchPositionData == null) {
        this.touchStart(event);
        return;
      }
      if (this.touchPositionData.type === 'horizontal') {
        return;
      }
      var touchObj = event.changedTouches[0];
      this.touchPositionData.touchXDiff = parseInt(touchObj.clientX) - this.touchPositionData.touchStartX;
      this.touchPositionData.touchYDiff = parseInt(touchObj.clientY) - this.touchPositionData.touchStartY;
      if (this.touchPositionData.type == null) {
        if (Math.abs(this.touchPositionData.touchYDiff) <= Math.abs(this.touchPositionData.touchXDiff)) {
          this.touchPositionData.type = 'vertical';
        } else {
          this.touchPositionData.type = 'horizontal';
        }
      }
      if (this.touchPositionData.type === 'vertical') {
        this.thumbnailListPositionX = this.touchPositionData.touchStartThumbnailListPositionX + this.touchPositionData.touchXDiff;
        event.preventDefault();
        return false;
      }
    }
  }, {
    key: "touchEnd",
    value: function touchEnd() {
      if (this.touchPositionData == null) {
        return;
      }
      if (this.touchPositionData.type === 'horizontal') {
        return;
      }
      this.touchPositionData = null;
      this.transitionOn();
      if (this.thumbnailListPositionX > 0) {
        this.thumbnailListPositionX = 0;
        return;
      }
      if (this.thumbnailList.scrollWidth <= this.thumbnailList.clientWidth && this.thumbnailListPositionX < 0) {
        this.thumbnailListPositionX = 0;
        return;
      }
      if (this.thumbnailList.scrollWidth > this.thumbnailList.clientWidth && Math.abs(this.thumbnailList.clientWidth - this.thumbnailListPositionX) > this.thumbnailList.scrollWidth) {
        this.thumbnailListPositionX = -Math.abs(this.thumbnailList.clientWidth - this.thumbnailList.scrollWidth);
      }
    }
  }]);
}(Thumbnail);
var Basic = /*#__PURE__*/function (_Thumbnail2) {
  function Basic(sliderInstance, configUser) {
    var _this5;
    _classCallCheck(this, Basic);
    _this5 = _callSuper(this, Basic, [sliderInstance, configUser, 'thumbnail/basic']);
    _this5.thumbnailWrapper.classList.add('minyatur-thumbnail-basic');
    _this5.thumbnailList = document.createElement('ul');
    _this5.thumbnailList.positionX = 0;
    _this5.thumbnailWrapper.appendChild(_this5.thumbnailList);
    _this5.thumbnailItems = _this5.thumbnailList.children;
    [].forEach.call(_this5.sliderInstance.boardItems, function (sliderItem) {
      var thumbnailListItem = document.createElement('li');
      _this5.thumbnailList.appendChild(thumbnailListItem);
      var thumbnailListItemImageContainer = document.createElement('img');
      thumbnailListItemImageContainer.src = sliderItem.querySelector('img').src;
      _this5._clickHandler = _this5.clickHandler.bind(_this5, thumbnailListItem);
      thumbnailListItem.addEventListener('click', _this5._clickHandler);
      thumbnailListItem.appendChild(thumbnailListItemImageContainer);
    });
    return _possibleConstructorReturn(_this5, _this5);
  }
  _inherits(Basic, _Thumbnail2);
  return _createClass(Basic);
}(Thumbnail);
var Dot = /*#__PURE__*/function (_Thumbnail3) {
  function Dot(sliderInstance, configUser) {
    var _this6;
    _classCallCheck(this, Dot);
    _this6 = _callSuper(this, Dot, [sliderInstance, configUser, 'thumbnail/dot']);
    _this6.thumbnailWrapper.classList.add('minyatur-thumbnail-dot');
    _this6.thumbnailList = document.createElement('ul');
    _this6.thumbnailWrapper.appendChild(_this6.thumbnailList);
    _this6.thumbnailItems = _this6.thumbnailList.children;
    [].forEach.call(_this6.sliderInstance.boardItems, function () {
      var thumbnailItem = document.createElement('li');
      _this6._clickHandler = _this6.clickHandler.bind(_this6, thumbnailItem);
      thumbnailItem.addEventListener('click', _this6._clickHandler);
      _this6.thumbnailList.appendChild(thumbnailItem);
    });
    return _this6;
  }
  _inherits(Dot, _Thumbnail3);
  return _createClass(Dot);
}(Thumbnail);


/***/ }),

/***/ 821:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Zoom = /*#__PURE__*/function () {
  function Zoom(sliderInstance, configUser) {
    var _this = this;
    _classCallCheck(this, Zoom);
    this.sliderInstance = sliderInstance;
    this.configObject = _objectSpread({}, _config__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A.module.zoom);
    Object.keys(this.configObject).forEach(function (key) {
      if (Object.prototype.hasOwnProperty.call(configUser, key)) {
        _this.configObject[key] = configUser[key];
      }
    });
    this.container = document.createElement('div');
    this.container.classList.add('minyatur-zoom-container');
    this.result = document.createElement('div');
    this.result.classList.add('minyatur-zoom-result');
    this.lens = document.createElement('div');
    this.lens.classList.add('minyatur-zoom-lens');
    this.sliderInstance.boardWrapper.appendChild(this.lens);
    this._zoomIn = this.zoomIn.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('mouseover', this._zoomIn);
    this._zoomOut = this.zoomOut.bind(this);
    this.sliderInstance.boardWrapper.addEventListener('mouseleave', this._zoomOut);
  }
  return _createClass(Zoom, [{
    key: "zoomIn",
    value: function zoomIn(event) {
      // Find the free range of screen for insert result window.
      this.activeImageContainer = this.sliderInstance.boardList.children[this.sliderInstance.activeIndex];
      this.activeImage = this.activeImageContainer.querySelector('img');
      if (this.activeImage.naturalWidth <= this.getRenderedSize().width && this.activeImage.naturalHeight <= this.getRenderedSize().height) {
        return;
      }
      if (this.eventAdded) {
        return;
      }
      this.eventAdded = true;
      this.sizingResult();
      this.sizingLens();

      // Calculate the ratio between result DIV and lens:
      this.cx = this.result.offsetWidth / this.lens.offsetWidth;
      this.cy = this.result.offsetHeight / this.lens.offsetHeight;

      // Set background properties for the result DIV
      this.result.style.backgroundSize = "".concat(this.getRenderedSize().width * this.cx, "px ").concat(this.getRenderedSize().height * this.cy, "px");

      // Execute a function when someone moves the cursor over the image, or the lens:
      this._moveLens = this.moveLens.bind(this);
      this.sliderInstance.boardWrapper.addEventListener('mousemove', this._moveLens);
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      this.eventAdded = null;
      this.sliderInstance.boardWrapper.removeEventListener('mousemove', this._moveLens);
      this.lens.style = null;
      this.result.style = null;
    }
  }, {
    key: "moveLens",
    value: function moveLens(e) {
      var x;
      var y;
      var correctionX = (this.sliderInstance.boardWrapper.offsetWidth - this.getRenderedSize().width) / 2;
      var correctionY = (this.sliderInstance.boardWrapper.offsetHeight - this.getRenderedSize().height) / 2;
      console.log(this.configObject.expandedZoom);
      if (this.configObject.expandedZoom === true) {
        correctionX = 0;
        correctionY = 0;
      }

      // Prevent any other actions that may occur when moving over the image
      e.preventDefault();

      // Get the cursor's x and y positions:
      var pos = this.getCursorPos(e);

      // Calculate the position of the lens:
      x = pos.x - this.lens.offsetWidth / 2;
      y = pos.y - this.lens.offsetHeight / 2;

      // Prevent the lens from being positioned outside the image:
      if (x > this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - correctionX) {
        x = this.sliderInstance.boardWrapper.offsetWidth - this.lens.offsetWidth - correctionX;
      }
      if (x < correctionX) {
        x = correctionX;
      }
      if (y > this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - correctionY) {
        y = this.sliderInstance.boardWrapper.offsetHeight - this.lens.offsetHeight - correctionY;
      }
      if (y < correctionY) {
        y = correctionY;
      }

      // Set the position of the lens:
      this.lens.style.left = "".concat(x, "px");
      this.lens.style.top = "".concat(y, "px");

      // If image small than container, center the image also in result, because image centered at slider
      var xCentDif = (this.sliderInstance.boardWrapper.clientWidth - this.getRenderedSize().width) / 2 * this.cx;
      var yCentDif = (this.sliderInstance.boardWrapper.clientHeight - this.getRenderedSize().height) / 2 * this.cy;

      // Display what the lens "sees":
      this.result.style.backgroundPosition = "".concat(xCentDif - x * this.cx, "px ").concat(yCentDif - y * this.cy, "px");
      this.result.style.visibility = 'visible';
      this.lens.style.visibility = 'visible';
    }
  }, {
    key: "getCursorPos",
    value: function getCursorPos(e) {
      var x = 0;
      var y = 0;
      e = e || window.event;

      // Get the x and y positions of the image:
      var a = this.sliderInstance.boardWrapper.getBoundingClientRect();

      // Calculate the cursor's x and y coordinates, relative to the image:
      x = e.pageX - a.left;
      y = e.pageY - a.top;

      // Consider any page scrolling:
      x = x - window.pageXOffset;
      y = y - window.pageYOffset;
      return {
        x: x,
        y: y
      };
    }
  }, {
    key: "getRenderedSize",
    value: function getRenderedSize() {
      var imageObjectFit = this.activeImage.style.objectFit;
      var naturalRatio = this.activeImage.naturalWidth / this.activeImage.naturalHeight;
      var visibleRatio = this.activeImage.width / this.activeImage.height;
      var size = {};
      if (imageObjectFit === 'none') {
        size.width = window.Math.min(this.activeImage.naturalWidth, this.activeImage.width);
        size.height = window.Math.min(this.activeImage.sourceHeight, this.activeImage.height);
      } else if (imageObjectFit === 'contain') {
        if (naturalRatio > visibleRatio) {
          size.width = this.activeImage.width;
          size.height = this.activeImage.width / naturalRatio;
        } else {
          size.height = this.activeImage.height;
          size.width = this.activeImage.height * naturalRatio;
        }
      } else if (imageObjectFit === 'scale-down') {
        if (naturalRatio > visibleRatio) {
          size.width = window.Math.min(this.activeImage.width, this.activeImage.naturalWidth);
          size.height = window.Math.min(this.activeImage.width, this.activeImage.naturalWidth) / naturalRatio;
        } else {
          size.width = window.Math.min(this.activeImage.height, this.activeImage.naturalHeight) * naturalRatio;
          size.height = window.Math.min(this.activeImage.height, this.activeImage.naturalHeight);
        }
      } else {
        // cover, fill, null etc.
        size.width = this.activeImage.width;
        size.height = this.activeImage.height;
      }
      return size;
    }
  }, {
    key: "sizingResult",
    value: function sizingResult() {
      if (this.configObject.zoomResultId) {
        var zoomResultContainer = document.getElementById(this.configObject.zoomResultId);
        zoomResultContainer.appendChild(this.result);
        var resultWidth = Math.min(this.activeImage.naturalWidth, zoomResultContainer.offsetWidth);
        var resultHeight = Math.min(this.activeImage.naturalHeight, zoomResultContainer.offsetHeight);
        this.result.style.width = "".concat(resultWidth, "px");
        this.result.style.height = "".concat(resultHeight, "px");
      } else {
        this.activeImageContainer.appendChild(this.result);
      }
      this.result.style.backgroundImage = "url(".concat(this.activeImage.src, ")");
    }
  }, {
    key: "sizingLens",
    value: function sizingLens() {
      var lensWidth = this.getRenderedSize().width / this.activeImage.naturalWidth * this.result.offsetWidth;
      var lensHeight = this.getRenderedSize().height / this.activeImage.naturalHeight * this.result.offsetHeight;
      this.lens.style.width = "".concat(lensWidth, "px");
      this.lens.style.height = "".concat(lensHeight, "px");
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Zoom);

/***/ }),

/***/ 963:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root{--color-text-black: rgb(0, 0, 0);--color-text-dark-primary: rgb(23, 23, 23);--color-text-dark-secondary: rgb(80, 80, 80);--color-text-dark-hint: rgb(132, 132, 132);--color-text-dark-divided: rgb(185, 185, 185);--color-text-white: rgb(255, 255, 255);--color-text-light-primary: rgb(235, 231, 222);--color-text-light-secondary: rgb(200, 195, 184);--color-text-light-hint: rgb(165, 158, 165);--color-text-light-divided: rgb(123, 123, 123);--color-text-link-dark: rgb(23, 23, 23);--color-text-link-dark-hover: rgb(28, 28, 28);--color-text-link-blue-dark: rgb(0, 102, 204);--color-text-link-blue-dark-hover: rgb(0, 102, 204);--color-text-link-light: rgb(235, 231, 222);--color-text-link-light-hover: rgba(229, 225, 216, 0.87);--color-text-link-blue-light: rgb(130, 130, 255);--color-text-link-blue-light-hover: rgb(130, 130, 255);--background-grey-light-zero: rgb(255, 255, 255);--background-grey-light-50: rgb(250, 250, 250);--background-grey-light-100: rgb(245, 245, 245);--background-grey-light-200: rgb(235, 235, 235);--background-grey-light-300: rgb(224, 224, 224);--background-grey-dark-zero: rgb(35, 35, 37);--background-grey-dark-870: rgb(42, 42, 45);--background-grey-dark-850: rgb(46, 46, 49);--background-grey-dark-800: rgb(55, 55, 56);--background-grey-dark-700: rgb(90, 90, 90);--bordercolor-grey-light-100: rgb(245, 245, 245);--bordercolor-grey-light-200: rgb(235, 235, 235);--bordercolor-grey-light-300: rgb(224, 224, 224);--bordercolor-grey-light-400: rgb(204, 204, 204);--bordercolor-grey-dark-870: rgb(42, 42, 45);--bordercolor-grey-dark-850: rgb(46, 46, 49);--bordercolor-grey-dark-800: rgb(55, 55, 56);--bordercolor-grey-dark-700: rgb(90, 90, 90);--color-text-danger-dark: rgb(80, 16, 16);--color-text-warning-dark: rgb(86, 47, 0);--color-text-caution-dark: rgb(61, 52, 0);--color-text-notice-dark: rgb(5, 31, 72);--color-text-safe-dark: rgb(38, 58, 0);--color-text-danger-base: rgb(170, 57, 57);--color-text-warning-base: rgb(235, 140, 27);--color-text-caution-base: rgb(179, 152, 0);--color-text-notice-base: rgb(4, 60, 150);--color-text-safe-base: rgb(92, 122, 31);--color-text-danger-light: rgb(255, 243, 243);--color-text-warning-light: rgb(255, 246, 235);--color-text-caution-light: rgb(255, 249, 221);--color-text-notice-light: rgb(238, 243, 251);--color-text-safe-light: rgb(238, 249, 216);--background-danger-light: rgb(255, 243, 243);--background-warning-light: rgb(255, 246, 235);--background-caution-light: rgb(255, 249, 221);--background-notice-light: rgb(238, 243, 251);--background-safe-light: rgb(238, 249, 216);--background-danger-base: rgb(170, 57, 57);--background-warning-base: rgb(235, 140, 27);--background-caution-base: rgb(179, 152, 0);--background-notice-base: rgb(4, 60, 150);--background-safe-base: rgb(92, 122, 31);--background-danger-dark: rgb(80, 16, 16);--background-warning-dark: rgb(86, 47, 0);--background-caution-dark: rgb(61, 52, 0);--background-notice-dark: rgb(5, 31, 72);--background-safe-dark: rgb(38, 58, 0);--opacity-backdrop: rgba(25, 25, 25, 0.4);--color-action-delete: rgb(239, 129, 119);--color-action-insert: rgb(166, 224, 148);--color-facebook-dark: rgb(66, 103, 178);--color-google-dark: rgb(221, 75, 57);--color-twitter-dark: rgb(85, 172, 238)}:root body.dark-mode{--color-text-black: rgb(255, 255, 255);--color-text-dark-primary: rgb(235, 231, 222);--color-text-dark-secondary: rgb(200, 195, 184);--color-text-dark-hint: rgb(165, 158, 165);--color-text-dark-divided: rgb(123, 123, 123)}:root body.dark-mode{--color-text-link-dark: rgb(235, 231, 222);--color-text-link-dark-hover: rgba(229, 225, 216, 0.87);--color-text-link-blue-dark: rgb(130, 130, 255);--color-text-link-blue-dark-hover: rgb(130, 130, 255)}:root body.dark-mode{--background-grey-light-zero: rgb(35, 35, 37);--background-grey-light-50: rgb(42, 42, 45);--background-grey-light-100: rgb(42, 42, 45);--background-grey-light-200: rgb(46, 46, 49);--background-grey-light-300: rgb(55, 55, 56)}:root body.dark-mode{--bordercolor-grey-light-100: rgb(42, 42, 45);--bordercolor-grey-light-200: rgb(46, 46, 49);--bordercolor-grey-light-300: rgb(55, 55, 56);--bordercolor-grey-light-400: rgb(90, 90, 90)}:root body.dark-mode{--color-text-danger-dark: rgb(255, 243, 243);--color-text-warning-dark: rgb(255, 246, 235);--color-text-caution-dark: rgb(255, 249, 221);--color-text-notice-dark: rgb(238, 243, 251);--color-text-safe-dark: rgb(238, 249, 216)}:root body.dark-mode{--background-danger-light: rgb(80, 16, 16);--background-warning-light: rgb(86, 47, 0);--background-caution-light: rgb(61, 52, 0);--background-notice-light: rgb(5, 31, 72);--background-safe-light: rgb(38, 58, 0)}:root body.dark-mode{--opacity-backdrop: rgba(25, 25, 25, 0.8)}:root{--color-theme-light: rgb(218, 215, 205);--color-theme-base: rgb(88, 129, 87);--color-theme-dark: rgb(52, 78, 65);--color-theme-second-light: rgb(182, 173, 144);--color-theme-second-base: rgb(147, 102, 57);--color-theme-second-dark: rgb(88, 47, 14);--color-image-background-color: rgb(35, 35, 37);--color-zoom-lens: rgba(19, 28, 209, 0.4);--color-thumbnail-inactive: rgb(235, 235, 235);--color-thumbnail-hover: rgb(182, 173, 144);--color-thumbnail-active: rgb(88, 129, 87);--color-arrow-inactive: rgb(204, 204, 204);--color-arrow-active: rgb(235, 235, 235)}:root body.dark-mode{--color-theme-light: rgb(52, 78, 65);--color-theme-base: rgb(88, 129, 87);--color-theme-dark: rgb(218, 215, 205)}:root body.dark-mode{--color-theme-second-light: rgb(88, 47, 14);--color-theme-second-base: rgb(147, 102, 57);--color-theme-second-dark: rgb(182, 173, 144)}:root body.dark-mode{--color-image-background-color: rgb(35, 35, 37);--color-zoom-lens: rgba(19, 28, 209, 0.4);--color-thumbnail-inactive: rgb(235, 235, 235);--color-thumbnail-hover: rgb(88, 47, 14);--color-thumbnail-active: rgb(88, 129, 87);--color-arrow-inactive: rgba(25, 25, 25, 0.8);--color-arrow-active: rgba(25, 25, 25, 0.4)}.minyatur{position:relative;width:100%;height:100%;overflow:hidden;box-sizing:border-box;margin:0 auto}.minyatur>div{position:relative;display:block;width:100%;margin:0 auto}.minyatur .minyatur-board{width:100%;margin:0 auto;font-size:0px;position:relative;box-sizing:border-box;overflow:hidden}.minyatur .minyatur-board ul{position:absolute;top:0;left:0;width:100%;height:100%;list-style:none;padding:0;box-sizing:border-box;z-index:1;display:flex;flex-wrap:nowrap}.minyatur .minyatur-board li{position:relative;display:block;width:100%;height:100%;background-color:var(--background-grey-dark-zero);font-size:12px;list-style:none;margin:0;padding:0;box-sizing:border-box;flex-shrink:0}.minyatur .minyatur-board li img,.minyatur .minyatur-board li i{position:relative;display:block;margin:0 auto;cursor:default;width:100%;height:100%}.minyatur .minyatur-board li .minyatur-on-image-message-wrapper{position:relative;margin:0 auto}.minyatur .minyatur-board li .minyatur-on-image-message-container{position:absolute;bottom:40px;left:40px;background-color:#fff;border-radius:3px;font-size:3vmin;font-weight:600;padding:.5vmin 1vmin}@media only screen and (max-width: 667px){.minyatur .minyatur-board li .minyatur-on-image-message-container{left:10px}}.minyatur .minyatur-board .minyatur-board-button-container{position:absolute;margin:0 auto;width:100%;height:0;top:50%;left:50%;transform:translateX(-50%);z-index:1}.minyatur .minyatur-board .minyatur-board-prev-button,.minyatur .minyatur-board .minyatur-board-next-button{position:absolute;display:flex;justify-content:center;align-items:center;width:52px;height:72px;top:50%;transform:translateY(-50%);overflow:hidden;white-space:nowrap;user-select:none;border-radius:2px;opacity:.8;cursor:pointer;align-items:center;-webkit-user-select:none;z-index:2}.minyatur .minyatur-board .minyatur-board-prev-button::before,.minyatur .minyatur-board .minyatur-board-next-button::before{position:absolute;content:"";width:30px;height:30px;border-left:3px solid var(--color-arrow-inactive);border-top:3px solid var(--color-arrow-inactive);border-radius:2px;transition:all .05s}.minyatur .minyatur-board .minyatur-board-prev-button:hover::before,.minyatur .minyatur-board .minyatur-board-next-button:hover::before{width:32px;height:32px;border-left:4px solid var(--color-arrow-active);border-top:4px solid var(--color-arrow-active)}.minyatur .minyatur-board .minyatur-board-prev-button{left:0}.minyatur .minyatur-board .minyatur-board-next-button{right:0}.minyatur .minyatur-board .minyatur-board-prev-button::before{-ms-transform:rotate(-45deg);-webkit-transform:rotate(-45deg);transform:rotate(-45deg);backface-visibility:hidden;right:4px}.minyatur .minyatur-board .minyatur-board-next-button::before{-ms-transform:rotate(135deg);-webkit-transform:rotate(135deg);transform:rotate(135deg);backface-visibility:hidden;left:4px}.minyatur .minyatur-board .minyatur-board-prev-button div,.minyatur .minyatur-board .minyatur-board-next-button div{display:none}.minyatur .minyatur-board .minyatur-board-prev-button,.minyatur .minyatur-board .minyatur-board-next-button{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none}@media only screen and (max-width: 667px){.minyatur .minyatur-board .minyatur-board-button-container{display:none}}.minyatur-thumbnail-dot{position:absolute;width:100%;left:0;bottom:0;background-color:rgba(0,0,0,0);z-index:1}.minyatur-thumbnail-dot ul{width:100%;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;list-style:none;gap:.5vw;padding:0;margin:0;box-sizing:border-box}.minyatur-thumbnail-dot li{height:.5vh;margin-top:0;background-color:var(--color-thumbnail-inactive);opacity:.8;cursor:pointer;transition:all .4s;flex-grow:1;margin-top:2px}.minyatur-thumbnail-dot li.active{background-color:var(--color-thumbnail-active);opacity:1}.minyatur-thumbnail-dot li.active:hover{background-color:var(--color-thumbnail-active)}.minyatur-thumbnail-dot li:hover{background-color:var(--color-thumbnail-hover)}.minyatur-thumbnail-basic{position:relative;width:100%;margin:0 auto;padding:0;overflow:hidden;box-sizing:border-box;user-select:none}.minyatur-thumbnail-basic ul{position:relative;display:flex;flex-wrap:nowrap;list-style:none;padding:6px;margin:0 auto}.minyatur-thumbnail-basic ul li{position:relative;display:flex;align-items:center;flex-shrink:0;cursor:pointer;height:50px;width:50px;border:2px solid var(--color-theme-base);opacity:1;list-style:none;transition:all .2s;transform:scale(1)}.minyatur-thumbnail-basic ul li+li{margin-left:6px}.minyatur-thumbnail-basic ul li.active,.minyatur-thumbnail-basic ul li.active:hover{border-color:var(--color-theme-dark)}.minyatur-thumbnail-basic ul li:hover{background-color:var(--color-theme-light)}.minyatur-thumbnail-basic ul li img{max-width:100%;max-height:100%;display:block}.minyatur-thumbnail-basic ul{flex-wrap:wrap}.minyatur-thumbnail-slider{position:relative;width:100%;margin:0 auto;padding:0;overflow:hidden;box-sizing:border-box;user-select:none}@media only screen and (max-width: 667px){.minyatur-thumbnail-slider{padding:0}}.minyatur-thumbnail-slider ul{position:relative;display:flex;flex-wrap:nowrap;list-style:none;padding:6px;margin:0 auto}.minyatur-thumbnail-slider ul li{position:relative;display:flex;align-items:center;flex-shrink:0;cursor:pointer;height:50px;width:50px;border:2px solid var(--color-theme-base);opacity:1;list-style:none;transition:all .2s;transform:scale(1)}.minyatur-thumbnail-slider ul li+li{margin-left:6px}.minyatur-thumbnail-slider ul li.active,.minyatur-thumbnail-slider ul li.active:hover{border-color:var(--color-theme-dark)}.minyatur-thumbnail-slider ul li:hover{background-color:var(--color-theme-light)}.minyatur-thumbnail-slider ul li img{max-width:100%;max-height:100%;display:block}.minyatur-thumbnail-slider .minyatur-thumbnail-slider-backward-button{position:absolute;display:none;justify-content:center;align-items:center;background-color:none;overflow:hidden;width:40px;height:50px;top:50%;transform:translateY(-50%);color:var(--color-text-white);z-index:10;cursor:pointer;opacity:1;background-color:var(--background-grey-light-300);left:0px;right:auto}.minyatur-thumbnail-slider .minyatur-thumbnail-slider-backward-button::before{position:absolute;content:" ";width:20px;height:20px;border-left:3px solid #ddd;border-top:3px solid #ddd;right:3px;transform:rotate(-45deg)}.minyatur-thumbnail-slider .minyatur-thumbnail-slider-forward-button{position:absolute;display:none;justify-content:center;align-items:center;background-color:none;overflow:hidden;width:40px;height:50px;top:50%;transform:translateY(-50%);color:var(--color-text-white);z-index:10;cursor:pointer;opacity:1;background-color:var(--background-grey-light-300);left:auto;right:0px}.minyatur-thumbnail-slider .minyatur-thumbnail-slider-forward-button::before{position:absolute;content:" ";width:20px;height:20px;border-left:3px solid #ddd;border-top:3px solid #ddd;left:3px;transform:rotate(135deg)}@media only screen and (min-width: 667px){.minyatur-thumbnail-slider.scrollOn{padding-right:44px;padding-left:44px}.minyatur-thumbnail-slider.scrollOn .minyatur-thumbnail-slider-backward-button,.minyatur-thumbnail-slider.scrollOn .minyatur-thumbnail-slider-forward-button{display:flex}}.minyatur-zoom-container{position:relative}.minyatur-zoom-lens{position:absolute;visibility:hidden;top:0;left:0;background-color:var(--color-zoom-lens);z-index:1}.minyatur-zoom-result{position:absolute;border:2px solid var(--bordercolor-grey-light-400);visibility:hidden;background-size:contain;background-position:center center;background-repeat:no-repeat;background-color:var(--color-image-background-color);width:100%;height:100%;top:0;left:0;z-index:1}.minyatur-fullscreen-wrapper{position:fixed;width:100%;height:100%;background-color:#282828;top:0;left:0;z-index:9999;animation-duration:.2s;animation-name:animeOpacityFadeIn}@keyframes animeOpacityFadeIn{from{opacity:0}to{opacity:1}}.minyatur-fullscreen-wrapper.hidden{display:none}.minyatur-fullscreen-wrapper .mfw-close-button-container{position:fixed;width:92%;margin:15px 4% 15px 4%;text-align:right;z-index:999}.minyatur-fullscreen-wrapper .mfw-close-button-container button{background-color:#fff;border:1px solid #ccc;border-radius:2px;padding:7px 14px;font-size:15px;font-weight:600}.minyatur-fullscreen-wrapper .mfw-image-wrapper{position:absolute;width:100%;height:100%;top:0;left:0;padding:60px 4% 4% 4%;box-sizing:border-box}.minyatur-fullscreen-wrapper .mfw-image-wrapper .mfw-image-container{position:relative;width:100%;height:100%;overflow:hidden;display:flex;align-items:center}.minyatur-fullscreen-wrapper .mfw-image-wrapper .mfw-image-container .nfw-image-item{margin:0 auto;position:relative}.minyatur-fullscreen-wrapper .mfw-image-wrapper .mfw-image-container .nfw-image-item .nfw-image{display:block;margin:0 auto;max-width:100%}.minyatur-fullscreen-wrapper .mfw-image-wrapper .mfw-image-container .nfw-image-item .nfw-image.nfw-zoom-out{cursor:zoom-in}.minyatur-fullscreen-wrapper .mfw-image-wrapper .mfw-image-container .nfw-image-item .nfw-image.nfw-zoom-in{cursor:zoom-out}`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___.toString());


/***/ }),

/***/ 314:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 601:
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 29:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./en.js": 543,
	"./language.js": 322,
	"./tr.js": 530
};

function webpackAsyncContext(req) {
	return Promise.resolve().then(() => {
		if(!__webpack_require__.o(map, req)) {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		}

		var id = map[req];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 29;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 664:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./control": 481,
	"./control.js": 481,
	"./fullscreen": 495,
	"./fullscreen.js": 495,
	"./message": 411,
	"./message.js": 411,
	"./thumbnail": 876,
	"./thumbnail.js": 876,
	"./zoom": 821,
	"./zoom.js": 821
};

function webpackAsyncContext(req) {
	return Promise.resolve().then(() => {
		if(!__webpack_require__.o(map, req)) {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		}

		var id = map[req];
		return __webpack_require__(id);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 664;
module.exports = webpackAsyncContext;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		// The chunk loading function for additional chunks
/******/ 		// Since all referenced chunks are already included
/******/ 		// in this file, this function is empty here.
/******/ 		__webpack_require__.e = () => (Promise.resolve());
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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(982);
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});