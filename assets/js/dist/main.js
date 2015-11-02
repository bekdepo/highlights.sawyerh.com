/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var _forEach = __webpack_require__(7),
	    animate = __webpack_require__(4),
	    books = document.querySelectorAll('.book'),
	    bookLinks = document.querySelectorAll('.books__nav__link'),
	    booksNav = document.querySelector('.books__nav'),
	    booksToggle = document.querySelector('.books__nav__toggle'),
	    container = document.querySelector('.container'),
	    nav = document.querySelector('.nav'),
	    next = document.querySelector('.nav--next'),
	    prev = document.querySelector('.nav--prev');

	var flkty = new Flickity(container, {
	  cellAlign: 'left',
	  contain: true,
	  pageDots: false,
	  draggable: false,
	  prevNextButtons: false
	});

	var state = {
	  showingBooksNav: false,
	  hashChecked: false
	};

	var handleKeyDown = function (event) {
	  // Flickity only fires key navigation events when the container is in focus,
	  // but we want it to always fire...
	  if (document.activeElement && document.activeElement == container) return;

	  if (event.keyCode == 37) {
	    flkty.previous();
	  } else if (event.keyCode == 39) {
	    flkty.next();
	  }
	};

	var handleBookLinkClick = function (event) {
	  selectByHash(event.target.href);
	  handleBooksToggle();
	};

	var selectByHash = function (hash) {
	  _forEach(books, (book, i) => {
	    if (book.getAttribute('data-path') == hash.split('#')[1]) flkty.select(i);
	  });
	};

	var handleBooksToggle = function (event) {
	  state.showingBooksNav ? hideBooksNav() : showBooksNav();
	  state.showingBooksNav = !state.showingBooksNav;
	};

	var hideBooksNav = function () {
	  var top = nav.offsetTop;

	  animate({
	    el: nav,
	    translateY: [top * -1, 0],
	    easing: 'easeOutExpo',
	    duration: 750,
	    begin: () => {
	      nav.classList.remove('showing-books-nav');
	    },
	    complete: () => {
	      booksNav.style.display = 'none';
	      nav.style.top = 'auto';
	      nav.style.bottom = '0';
	    }
	  });
	};

	var showBooksNav = function () {
	  var top = nav.offsetTop;

	  animate({
	    el: nav,
	    translateY: top * -1,
	    easing: 'easeOutExpo',
	    duration: 750,
	    begin: () => {
	      nav.style.top = top + 'px';
	      nav.style.bottom = 'auto';
	      nav.classList.add('showing-books-nav');
	      booksNav.style.display = 'block';
	    }
	  });
	};

	eventie.bind(document, 'keydown', handleKeyDown);
	eventie.bind(booksToggle, 'click', handleBooksToggle);
	eventie.bind(document.querySelector('.nav--collapse'), 'click', handleBooksToggle);
	eventie.bind(next, 'click', () => flkty.next());
	eventie.bind(prev, 'click', () => flkty.previous());
	_forEach(bookLinks, link => eventie.bind(link, 'click', handleBookLinkClick));

	flkty.on('settle', () => {
	  if (!state.hashChecked) {
	    state.hashChecked = true;

	    if (window.location.hash && window.location.hash != '') selectByHash(window.location.hash);
	  }

	  if (flkty.selectedIndex == 0) {
	    prev.classList.add('is-inactive');
	  } else {
	    prev.classList.remove('is-inactive');
	  }

	  if (flkty.selectedIndex == books.length - 1) {
	    next.classList.add('is-inactive');
	  } else {
	    next.classList.remove('is-inactive');
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(2)(__webpack_require__(3))

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	module.exports = function(src) {
		if (typeof execScript === "function")
			execScript(src);
		else
			eval.call(null, src);
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = "/*!\n * Flickity PACKAGED v1.1.1\n * Touch, responsive, flickable galleries\n *\n * Licensed GPLv3 for open source use\n * or Flickity Commercial License for commercial use\n *\n * http://flickity.metafizzy.co\n * Copyright 2015 Metafizzy\n */\n\n!function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function o(e,i){t.fn[e]=function(o){if(\"string\"==typeof o){for(var s=n.call(arguments,1),a=0,l=this.length;l>a;a++){var c=this[a],h=t.data(c,e);if(h)if(t.isFunction(h[o])&&\"_\"!==o.charAt(0)){var p=h[o].apply(h,s);if(void 0!==p)return p}else r(\"no such method '\"+o+\"' for \"+e+\" instance\");else r(\"cannot call methods on \"+e+\" prior to initialization; attempted to call '\"+o+\"'\")}return this}return this.each(function(){var n=t.data(this,e);n?(n.option(o),n._init()):(n=new i(this,o),t.data(this,e,n))})}}if(t){var r=\"undefined\"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),o(t,e)},t.bridget}}var n=Array.prototype.slice;\"function\"==typeof define&&define.amd?define(\"jquery-bridget/jquery.bridget\",[\"jquery\"],i):i(\"object\"==typeof exports?require(\"jquery\"):t.jQuery)}(window),function(t){function e(t){return new RegExp(\"(^|\\\\s+)\"+t+\"(\\\\s+|$)\")}function i(t,e){var i=n(t,e)?r:o;i(t,e)}var n,o,r;\"classList\"in document.documentElement?(n=function(t,e){return t.classList.contains(e)},o=function(t,e){t.classList.add(e)},r=function(t,e){t.classList.remove(e)}):(n=function(t,i){return e(i).test(t.className)},o=function(t,e){n(t,e)||(t.className=t.className+\" \"+e)},r=function(t,i){t.className=t.className.replace(e(i),\" \")});var s={hasClass:n,addClass:o,removeClass:r,toggleClass:i,has:n,add:o,remove:r,toggle:i};\"function\"==typeof define&&define.amd?define(\"classie/classie\",s):\"object\"==typeof exports?module.exports=s:t.classie=s}(window),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var n=t.prototype,o=this,r=o.EventEmitter;n.getListeners=function(t){var e,i,n=this._getEvents();if(t instanceof RegExp){e={};for(i in n)n.hasOwnProperty(i)&&t.test(i)&&(e[i]=n[i])}else e=n[t]||(n[t]=[]);return e},n.flattenListeners=function(t){var e,i=[];for(e=0;e<t.length;e+=1)i.push(t[e].listener);return i},n.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},n.addListener=function(t,i){var n,o=this.getListenersAsObject(t),r=\"object\"==typeof i;for(n in o)o.hasOwnProperty(n)&&-1===e(o[n],i)&&o[n].push(r?i:{listener:i,once:!1});return this},n.on=i(\"addListener\"),n.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},n.once=i(\"addOnceListener\"),n.defineEvent=function(t){return this.getListeners(t),this},n.defineEvents=function(t){for(var e=0;e<t.length;e+=1)this.defineEvent(t[e]);return this},n.removeListener=function(t,i){var n,o,r=this.getListenersAsObject(t);for(o in r)r.hasOwnProperty(o)&&(n=e(r[o],i),-1!==n&&r[o].splice(n,1));return this},n.off=i(\"removeListener\"),n.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},n.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},n.manipulateListeners=function(t,e,i){var n,o,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if(\"object\"!=typeof e||e instanceof RegExp)for(n=i.length;n--;)r.call(this,e,i[n]);else for(n in e)e.hasOwnProperty(n)&&(o=e[n])&&(\"function\"==typeof o?r.call(this,n,o):s.call(this,n,o));return this},n.removeEvent=function(t){var e,i=typeof t,n=this._getEvents();if(\"string\"===i)delete n[t];else if(t instanceof RegExp)for(e in n)n.hasOwnProperty(e)&&t.test(e)&&delete n[e];else delete this._events;return this},n.removeAllListeners=i(\"removeEvent\"),n.emitEvent=function(t,e){var i,n,o,r,s=this.getListenersAsObject(t);for(o in s)if(s.hasOwnProperty(o))for(n=s[o].length;n--;)i=s[o][n],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},n.trigger=i(\"emitEvent\"),n.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},n.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},n._getOnceReturnValue=function(){return this.hasOwnProperty(\"_onceReturnValue\")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return o.EventEmitter=r,t},\"function\"==typeof define&&define.amd?define(\"eventEmitter/EventEmitter\",[],function(){return t}):\"object\"==typeof module&&module.exports?module.exports=t:o.EventEmitter=t}.call(this),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,n=function(){};i.addEventListener?n=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(n=function(t,i,n){t[i+n]=n.handleEvent?function(){var i=e(t);n.handleEvent.call(n,i)}:function(){var i=e(t);n.call(t,i)},t.attachEvent(\"on\"+i,t[i+n])});var o=function(){};i.removeEventListener?o=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(o=function(t,e,i){t.detachEvent(\"on\"+e,t[e+i]);try{delete t[e+i]}catch(n){t[e+i]=void 0}});var r={bind:n,unbind:o};\"function\"==typeof define&&define.amd?define(\"eventie/eventie\",r):\"object\"==typeof exports?module.exports=r:t.eventie=r}(window),function(t){function e(t){if(t){if(\"string\"==typeof n[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,o=0,r=i.length;r>o;o++)if(e=i[o]+t,\"string\"==typeof n[e])return e}}var i=\"Webkit Moz ms Ms O\".split(\" \"),n=document.documentElement.style;\"function\"==typeof define&&define.amd?define(\"get-style-property/get-style-property\",[],function(){return e}):\"object\"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf(\"%\")&&!isNaN(e);return i&&e}function i(){}function n(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var n=s[e];t[n]=0}return t}function o(i){function o(){if(!d){d=!0;var n=t.getComputedStyle;if(c=function(){var t=n?function(t){return n(t,null)}:function(t){return t.currentStyle};return function(e){var i=t(e);return i||r(\"Style returned \"+i+\". Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1\"),i}}(),h=i(\"boxSizing\")){var o=document.createElement(\"div\");o.style.width=\"200px\",o.style.padding=\"1px 2px 3px 4px\",o.style.borderStyle=\"solid\",o.style.borderWidth=\"1px 2px 3px 4px\",o.style[h]=\"border-box\";var s=document.body||document.documentElement;s.appendChild(o);var a=c(o);p=200===e(a.width),s.removeChild(o)}}}function a(t){if(o(),\"string\"==typeof t&&(t=document.querySelector(t)),t&&\"object\"==typeof t&&t.nodeType){var i=c(t);if(\"none\"===i.display)return n();var r={};r.width=t.offsetWidth,r.height=t.offsetHeight;for(var a=r.isBorderBox=!(!h||!i[h]||\"border-box\"!==i[h]),d=0,u=s.length;u>d;d++){var f=s[d],v=i[f];v=l(t,v);var y=parseFloat(v);r[f]=isNaN(y)?0:y}var g=r.paddingLeft+r.paddingRight,m=r.paddingTop+r.paddingBottom,b=r.marginLeft+r.marginRight,S=r.marginTop+r.marginBottom,x=r.borderLeftWidth+r.borderRightWidth,w=r.borderTopWidth+r.borderBottomWidth,C=a&&p,E=e(i.width);E!==!1&&(r.width=E+(C?0:g+x));var P=e(i.height);return P!==!1&&(r.height=P+(C?0:m+w)),r.innerWidth=r.width-(g+x),r.innerHeight=r.height-(m+w),r.outerWidth=r.width+b,r.outerHeight=r.height+S,r}}function l(e,i){if(t.getComputedStyle||-1===i.indexOf(\"%\"))return i;var n=e.style,o=n.left,r=e.runtimeStyle,s=r&&r.left;return s&&(r.left=e.currentStyle.left),n.left=i,i=n.pixelLeft,n.left=o,s&&(r.left=s),i}var c,h,p,d=!1;return a}var r=\"undefined\"==typeof console?i:function(t){console.error(t)},s=[\"paddingLeft\",\"paddingRight\",\"paddingTop\",\"paddingBottom\",\"marginLeft\",\"marginRight\",\"marginTop\",\"marginBottom\",\"borderLeftWidth\",\"borderRightWidth\",\"borderTopWidth\",\"borderBottomWidth\"];\"function\"==typeof define&&define.amd?define(\"get-size/get-size\",[\"get-style-property/get-style-property\"],o):\"object\"==typeof exports?module.exports=o(require(\"desandro-get-style-property\")):t.getSize=o(t.getStyleProperty)}(window),function(t){function e(t){\"function\"==typeof t&&(e.isReady?t():s.push(t))}function i(t){var i=\"readystatechange\"===t.type&&\"complete\"!==r.readyState;e.isReady||i||n()}function n(){e.isReady=!0;for(var t=0,i=s.length;i>t;t++){var n=s[t];n()}}function o(o){return\"complete\"===r.readyState?n():(o.bind(r,\"DOMContentLoaded\",i),o.bind(r,\"readystatechange\",i),o.bind(t,\"load\",i)),e}var r=t.document,s=[];e.isReady=!1,\"function\"==typeof define&&define.amd?define(\"doc-ready/doc-ready\",[\"eventie/eventie\"],o):\"object\"==typeof exports?module.exports=o(require(\"eventie\")):t.docReady=o(t.eventie)}(window),function(t){function e(t,e){return t[s](e)}function i(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){i(t);for(var n=t.parentNode.querySelectorAll(e),o=0,r=n.length;r>o;o++)if(n[o]===t)return!0;return!1}function o(t,n){return i(t),e(t,n)}var r,s=function(){if(t.matches)return\"matches\";if(t.matchesSelector)return\"matchesSelector\";for(var e=[\"webkit\",\"moz\",\"ms\",\"o\"],i=0,n=e.length;n>i;i++){var o=e[i],r=o+\"MatchesSelector\";if(t[r])return r}}();if(s){var a=document.createElement(\"div\"),l=e(a,\"div\");r=l?e:o}else r=n;\"function\"==typeof define&&define.amd?define(\"matches-selector/matches-selector\",[],function(){return r}):\"object\"==typeof exports?module.exports=r:window.matchesSelector=r}(Element.prototype),function(t,e){\"function\"==typeof define&&define.amd?define(\"fizzy-ui-utils/utils\",[\"doc-ready/doc-ready\",\"matches-selector/matches-selector\"],function(i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(t,require(\"doc-ready\"),require(\"desandro-matches-selector\")):t.fizzyUIUtils=e(t,t.docReady,t.matchesSelector)}(window,function(t,e,i){var n={};n.extend=function(t,e){for(var i in e)t[i]=e[i];return t},n.modulo=function(t,e){return(t%e+e)%e};var o=Object.prototype.toString;n.isArray=function(t){return\"[object Array]\"==o.call(t)},n.makeArray=function(t){var e=[];if(n.isArray(t))e=t;else if(t&&\"number\"==typeof t.length)for(var i=0,o=t.length;o>i;i++)e.push(t[i]);else e.push(t);return e},n.indexOf=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1},n.removeFrom=function(t,e){var i=n.indexOf(t,e);-1!=i&&t.splice(i,1)},n.isElement=\"function\"==typeof HTMLElement||\"object\"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&\"object\"==typeof t&&1==t.nodeType&&\"string\"==typeof t.nodeName},n.setText=function(){function t(t,i){e=e||(void 0!==document.documentElement.textContent?\"textContent\":\"innerText\"),t[e]=i}var e;return t}(),n.getParent=function(t,e){for(;t!=document.body;)if(t=t.parentNode,i(t,e))return t},n.getQueryElement=function(t){return\"string\"==typeof t?document.querySelector(t):t},n.handleEvent=function(t){var e=\"on\"+t.type;this[e]&&this[e](t)},n.filterFindElements=function(t,e){t=n.makeArray(t);for(var o=[],r=0,s=t.length;s>r;r++){var a=t[r];if(n.isElement(a))if(e){i(a,e)&&o.push(a);for(var l=a.querySelectorAll(e),c=0,h=l.length;h>c;c++)o.push(l[c])}else o.push(a)}return o},n.debounceMethod=function(t,e,i){var n=t.prototype[e],o=e+\"Timeout\";t.prototype[e]=function(){var t=this[o];t&&clearTimeout(t);var e=arguments,r=this;this[o]=setTimeout(function(){n.apply(r,e),delete r[o]},i||100)}},n.toDashed=function(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+\"-\"+i}).toLowerCase()};var r=t.console;return n.htmlInit=function(i,o){e(function(){for(var e=n.toDashed(o),s=document.querySelectorAll(\".js-\"+e),a=\"data-\"+e+\"-options\",l=0,c=s.length;c>l;l++){var h,p=s[l],d=p.getAttribute(a);try{h=d&&JSON.parse(d)}catch(u){r&&r.error(\"Error parsing \"+a+\" on \"+p.nodeName.toLowerCase()+(p.id?\"#\"+p.id:\"\")+\": \"+u);continue}var f=new i(p,h),v=t.jQuery;v&&v.data(p,o,f)}})},n}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/cell\",[\"get-size/get-size\"],function(i){return e(t,i)}):\"object\"==typeof exports?module.exports=e(t,require(\"get-size\")):(t.Flickity=t.Flickity||{},t.Flickity.Cell=e(t,t.getSize))}(window,function(t,e){function i(t,e){this.element=t,this.parent=e,this.create()}var n=\"attachEvent\"in t;return i.prototype.create=function(){this.element.style.position=\"absolute\",n&&this.element.setAttribute(\"unselectable\",\"on\"),this.x=0,this.shift=0},i.prototype.destroy=function(){this.element.style.position=\"\";var t=this.parent.originSide;this.element.style[t]=\"\"},i.prototype.getSize=function(){this.size=e(this.element)},i.prototype.setPosition=function(t){this.x=t,this.setDefaultTarget(),this.renderPosition(t)},i.prototype.setDefaultTarget=function(){var t=\"left\"==this.parent.originSide?\"marginLeft\":\"marginRight\";this.target=this.x+this.size[t]+this.size.width*this.parent.cellAlign},i.prototype.renderPosition=function(t){var e=this.parent.originSide;this.element.style[e]=this.parent.getPositionValue(t)},i.prototype.wrapShift=function(t){this.shift=t,this.renderPosition(this.x+this.parent.slideableWidth*t)},i.prototype.remove=function(){this.element.parentNode.removeChild(this.element)},i}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/animate\",[\"get-style-property/get-style-property\",\"fizzy-ui-utils/utils\"],function(i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(t,require(\"desandro-get-style-property\"),require(\"fizzy-ui-utils\")):(t.Flickity=t.Flickity||{},t.Flickity.animatePrototype=e(t,t.getStyleProperty,t.fizzyUIUtils))}(window,function(t,e,i){for(var n,o=0,r=\"webkit moz ms o\".split(\" \"),s=t.requestAnimationFrame,a=t.cancelAnimationFrame,l=0;l<r.length&&(!s||!a);l++)n=r[l],s=s||t[n+\"RequestAnimationFrame\"],a=a||t[n+\"CancelAnimationFrame\"]||t[n+\"CancelRequestAnimationFrame\"];s&&a||(s=function(e){var i=(new Date).getTime(),n=Math.max(0,16-(i-o)),r=t.setTimeout(function(){e(i+n)},n);return o=i+n,r},a=function(e){t.clearTimeout(e)});var c={};c.startAnimation=function(){this.isAnimating||(this.isAnimating=!0,this.restingFrames=0,this.animate())},c.animate=function(){this.applyDragForce(),this.applySelectedAttraction();var t=this.x;if(this.integratePhysics(),this.positionSlider(),this.settle(t),this.isAnimating){var e=this;s(function(){e.animate()})}};var h=e(\"transform\"),p=!!e(\"perspective\");return c.positionSlider=function(){var t=this.x;this.options.wrapAround&&this.cells.length>1&&(t=i.modulo(t,this.slideableWidth),t-=this.slideableWidth,this.shiftWrapCells(t)),t+=this.cursorPosition,t=this.options.rightToLeft&&h?-t:t;var e=this.getPositionValue(t);h?this.slider.style[h]=p&&this.isAnimating?\"translate3d(\"+e+\",0,0)\":\"translateX(\"+e+\")\":this.slider.style[this.originSide]=e},c.positionSliderAtSelected=function(){if(this.cells.length){var t=this.cells[this.selectedIndex];this.x=-t.target,this.positionSlider()}},c.getPositionValue=function(t){return this.options.percentPosition?.01*Math.round(t/this.size.innerWidth*1e4)+\"%\":Math.round(t)+\"px\"},c.settle=function(t){this.isPointerDown||Math.round(100*this.x)!=Math.round(100*t)||this.restingFrames++,this.restingFrames>2&&(this.isAnimating=!1,delete this.isFreeScrolling,p&&this.positionSlider(),this.dispatchEvent(\"settle\"))},c.shiftWrapCells=function(t){var e=this.cursorPosition+t;this._shiftCells(this.beforeShiftCells,e,-1);var i=this.size.innerWidth-(t+this.slideableWidth+this.cursorPosition);this._shiftCells(this.afterShiftCells,i,1)},c._shiftCells=function(t,e,i){for(var n=0,o=t.length;o>n;n++){var r=t[n],s=e>0?i:0;r.wrapShift(s),e-=r.size.outerWidth}},c._unshiftCells=function(t){if(t&&t.length)for(var e=0,i=t.length;i>e;e++)t[e].wrapShift(0)},c.integratePhysics=function(){this.velocity+=this.accel,this.x+=this.velocity,this.velocity*=this.getFrictionFactor(),this.accel=0},c.applyForce=function(t){this.accel+=t},c.getFrictionFactor=function(){return 1-this.options[this.isFreeScrolling?\"freeScrollFriction\":\"friction\"]},c.getRestingPosition=function(){return this.x+this.velocity/(1-this.getFrictionFactor())},c.applyDragForce=function(){if(this.isPointerDown){var t=this.dragX-this.x,e=t-this.velocity;this.applyForce(e)}},c.applySelectedAttraction=function(){var t=this.cells.length;if(!this.isPointerDown&&!this.isFreeScrolling&&t){var e=this.cells[this.selectedIndex],i=this.options.wrapAround&&t>1?this.slideableWidth*Math.floor(this.selectedIndex/t):0,n=-1*(e.target+i)-this.x,o=n*this.options.selectedAttraction;this.applyForce(o)}},c}),function(t,e){if(\"function\"==typeof define&&define.amd)define(\"flickity/js/flickity\",[\"classie/classie\",\"eventEmitter/EventEmitter\",\"eventie/eventie\",\"get-size/get-size\",\"fizzy-ui-utils/utils\",\"./cell\",\"./animate\"],function(i,n,o,r,s,a,l){return e(t,i,n,o,r,s,a,l)});else if(\"object\"==typeof exports)module.exports=e(t,require(\"desandro-classie\"),require(\"wolfy87-eventemitter\"),require(\"eventie\"),require(\"get-size\"),require(\"fizzy-ui-utils\"),require(\"./cell\"),require(\"./animate\"));else{var i=t.Flickity;t.Flickity=e(t,t.classie,t.EventEmitter,t.eventie,t.getSize,t.fizzyUIUtils,i.Cell,i.animatePrototype)}}(window,function(t,e,i,n,o,r,s,a){function l(t,e){for(t=r.makeArray(t);t.length;)e.appendChild(t.shift())}function c(t,e){var i=r.getQueryElement(t);return i?(this.element=i,h&&(this.$element=h(this.element)),this.options=r.extend({},this.constructor.defaults),this.option(e),void this._create()):void(d&&d.error(\"Bad element for Flickity: \"+(i||t)))}var h=t.jQuery,p=t.getComputedStyle,d=t.console,u=0,f={};c.defaults={accessibility:!0,cellAlign:\"center\",freeScrollFriction:.075,friction:.28,percentPosition:!0,resize:!0,selectedAttraction:.025,setGallerySize:!0},c.createMethods=[],r.extend(c.prototype,i.prototype),c.prototype._create=function(){var e=this.guid=++u;this.element.flickityGUID=e,f[e]=this,this.selectedIndex=this.options.initialIndex||0,this.restingFrames=0,this.x=0,this.velocity=0,this.accel=0,this.originSide=this.options.rightToLeft?\"right\":\"left\",this.viewport=document.createElement(\"div\"),this.viewport.className=\"flickity-viewport\",c.setUnselectable(this.viewport),this._createSlider(),(this.options.resize||this.options.watchCSS)&&(n.bind(t,\"resize\",this),this.isResizeBound=!0);for(var i=0,o=c.createMethods.length;o>i;i++){var r=c.createMethods[i];this[r]()}this.options.watchCSS?this.watchCSS():this.activate()},c.prototype.option=function(t){r.extend(this.options,t)},c.prototype.activate=function(){if(!this.isActive){this.isActive=!0,e.add(this.element,\"flickity-enabled\"),this.options.rightToLeft&&e.add(this.element,\"flickity-rtl\"),this.getSize();var t=this._filterFindCellElements(this.element.children);l(t,this.slider),this.viewport.appendChild(this.slider),this.element.appendChild(this.viewport),this.reloadCells(),this.options.accessibility&&(this.element.tabIndex=0,n.bind(this.element,\"keydown\",this)),this.emit(\"activate\"),this.positionSliderAtSelected(),this.select(this.selectedIndex)}},c.prototype._createSlider=function(){var t=document.createElement(\"div\");t.className=\"flickity-slider\",t.style[this.originSide]=0,this.slider=t},c.prototype._filterFindCellElements=function(t){return r.filterFindElements(t,this.options.cellSelector)},c.prototype.reloadCells=function(){this.cells=this._makeCells(this.slider.children),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize()},c.prototype._makeCells=function(t){for(var e=this._filterFindCellElements(t),i=[],n=0,o=e.length;o>n;n++){var r=e[n],a=new s(r,this);i.push(a)}return i},c.prototype.getLastCell=function(){return this.cells[this.cells.length-1]},c.prototype.positionCells=function(){this._sizeCells(this.cells),this._positionCells(0)},c.prototype._positionCells=function(t){t=t||0,this.maxCellHeight=t?this.maxCellHeight||0:0;var e=0;if(t>0){var i=this.cells[t-1];e=i.x+i.size.outerWidth}for(var n,o=this.cells.length,r=t;o>r;r++)n=this.cells[r],n.setPosition(e),e+=n.size.outerWidth,this.maxCellHeight=Math.max(n.size.outerHeight,this.maxCellHeight);this.slideableWidth=e,this._containCells()},c.prototype._sizeCells=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];n.getSize()}},c.prototype._init=c.prototype.reposition=function(){this.positionCells(),this.positionSliderAtSelected()},c.prototype.getSize=function(){this.size=o(this.element),this.setCellAlign(),this.cursorPosition=this.size.innerWidth*this.cellAlign};var v={center:{left:.5,right:.5},left:{left:0,right:1},right:{right:0,left:1}};c.prototype.setCellAlign=function(){var t=v[this.options.cellAlign];this.cellAlign=t?t[this.originSide]:this.options.cellAlign},c.prototype.setGallerySize=function(){this.options.setGallerySize&&(this.viewport.style.height=this.maxCellHeight+\"px\")},c.prototype._getWrapShiftCells=function(){if(this.options.wrapAround){this._unshiftCells(this.beforeShiftCells),this._unshiftCells(this.afterShiftCells);var t=this.cursorPosition,e=this.cells.length-1;this.beforeShiftCells=this._getGapCells(t,e,-1),t=this.size.innerWidth-this.cursorPosition,this.afterShiftCells=this._getGapCells(t,0,1)}},c.prototype._getGapCells=function(t,e,i){for(var n=[];t>0;){var o=this.cells[e];if(!o)break;n.push(o),e+=i,t-=o.size.outerWidth}return n},c.prototype._containCells=function(){if(this.options.contain&&!this.options.wrapAround&&this.cells.length)for(var t=this.options.rightToLeft?\"marginRight\":\"marginLeft\",e=this.options.rightToLeft?\"marginLeft\":\"marginRight\",i=this.cells[0].size[t],n=this.getLastCell(),o=this.slideableWidth-n.size[e],r=o-this.size.innerWidth*(1-this.cellAlign),s=o<this.size.innerWidth,a=0,l=this.cells.length;l>a;a++){var c=this.cells[a];c.setDefaultTarget(),s?c.target=o*this.cellAlign:(c.target=Math.max(c.target,this.cursorPosition+i),c.target=Math.min(c.target,r))}},c.prototype.dispatchEvent=function(t,e,i){var n=[e].concat(i);if(this.emitEvent(t,n),h&&this.$element)if(e){var o=h.Event(e);o.type=t,this.$element.trigger(o,i)}else this.$element.trigger(t,i)},c.prototype.select=function(t,e){if(this.isActive){var i=this.cells.length;this.options.wrapAround&&i>1&&(0>t?this.x-=this.slideableWidth:t>=i&&(this.x+=this.slideableWidth)),(this.options.wrapAround||e)&&(t=r.modulo(t,i)),this.cells[t]&&(this.selectedIndex=t,this.setSelectedCell(),this.startAnimation(),this.dispatchEvent(\"cellSelect\"))}},c.prototype.previous=function(t){this.select(this.selectedIndex-1,t)},c.prototype.next=function(t){this.select(this.selectedIndex+1,t)},c.prototype.setSelectedCell=function(){this._removeSelectedCellClass(),this.selectedCell=this.cells[this.selectedIndex],this.selectedElement=this.selectedCell.element,e.add(this.selectedElement,\"is-selected\")},c.prototype._removeSelectedCellClass=function(){this.selectedCell&&e.remove(this.selectedCell.element,\"is-selected\")},c.prototype.getCell=function(t){for(var e=0,i=this.cells.length;i>e;e++){var n=this.cells[e];if(n.element==t)return n}},c.prototype.getCells=function(t){t=r.makeArray(t);for(var e=[],i=0,n=t.length;n>i;i++){var o=t[i],s=this.getCell(o);s&&e.push(s)}return e},c.prototype.getCellElements=function(){for(var t=[],e=0,i=this.cells.length;i>e;e++)t.push(this.cells[e].element);return t},c.prototype.getParentCell=function(t){var e=this.getCell(t);return e?e:(t=r.getParent(t,\".flickity-slider > *\"),this.getCell(t))},c.prototype.getAdjacentCellElements=function(t,e){if(!t)return[this.selectedElement];e=void 0===e?this.selectedIndex:e;var i=this.cells.length;if(1+2*t>=i)return this.getCellElements();for(var n=[],o=e-t;e+t>=o;o++){var s=this.options.wrapAround?r.modulo(o,i):o,a=this.cells[s];a&&n.push(a.element)}return n},c.prototype.uiChange=function(){this.emit(\"uiChange\")},c.prototype.childUIPointerDown=function(t){this.emitEvent(\"childUIPointerDown\",[t])},c.prototype.onresize=function(){this.watchCSS(),this.resize()},r.debounceMethod(c,\"onresize\",150),c.prototype.resize=function(){this.isActive&&(this.getSize(),this.options.wrapAround&&(this.x=r.modulo(this.x,this.slideableWidth)),this.positionCells(),this._getWrapShiftCells(),this.setGallerySize(),this.positionSliderAtSelected())};var y=c.supportsConditionalCSS=function(){var t;return function(){if(void 0!==t)return t;if(!p)return void(t=!1);var e=document.createElement(\"style\"),i=document.createTextNode('body:after { content: \"foo\"; display: none; }');e.appendChild(i),document.head.appendChild(e);var n=p(document.body,\":after\").content;return t=-1!=n.indexOf(\"foo\"),document.head.removeChild(e),t}}();c.prototype.watchCSS=function(){var t=this.options.watchCSS;if(t){var e=y();if(!e){var i=\"fallbackOn\"==t?\"activate\":\"deactivate\";return void this[i]()}var n=p(this.element,\":after\").content;-1!=n.indexOf(\"flickity\")?this.activate():this.deactivate()}},c.prototype.onkeydown=function(t){if(this.options.accessibility&&(!document.activeElement||document.activeElement==this.element))if(37==t.keyCode){var e=this.options.rightToLeft?\"next\":\"previous\";this.uiChange(),this[e]()}else if(39==t.keyCode){var i=this.options.rightToLeft?\"previous\":\"next\";this.uiChange(),this[i]()}},c.prototype.deactivate=function(){if(this.isActive){e.remove(this.element,\"flickity-enabled\"),e.remove(this.element,\"flickity-rtl\");for(var t=0,i=this.cells.length;i>t;t++){var o=this.cells[t];o.destroy()}this._removeSelectedCellClass(),this.element.removeChild(this.viewport),l(this.slider.children,this.element),this.options.accessibility&&(this.element.removeAttribute(\"tabIndex\"),n.unbind(this.element,\"keydown\",this)),this.isActive=!1,this.emit(\"deactivate\")}},c.prototype.destroy=function(){this.deactivate(),this.isResizeBound&&n.unbind(t,\"resize\",this),this.emit(\"destroy\"),h&&this.$element&&h.removeData(this.element,\"flickity\"),delete this.element.flickityGUID,delete f[this.guid]},r.extend(c.prototype,a);var g=\"attachEvent\"in t;return c.setUnselectable=function(t){g&&t.setAttribute(\"unselectable\",\"on\")},c.data=function(t){t=r.getQueryElement(t);var e=t&&t.flickityGUID;return e&&f[e]},r.htmlInit(c,\"flickity\"),h&&h.bridget&&h.bridget(\"flickity\",c),c.Cell=s,c}),function(t,e){\"function\"==typeof define&&define.amd?define(\"unipointer/unipointer\",[\"eventEmitter/EventEmitter\",\"eventie/eventie\"],function(i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(t,require(\"wolfy87-eventemitter\"),require(\"eventie\")):t.Unipointer=e(t,t.EventEmitter,t.eventie)}(window,function(t,e,i){function n(){}function o(){}o.prototype=new e,o.prototype.bindStartEvent=function(t){this._bindStartEvent(t,!0)},o.prototype.unbindStartEvent=function(t){this._bindStartEvent(t,!1)},o.prototype._bindStartEvent=function(e,n){n=void 0===n?!0:!!n;var o=n?\"bind\":\"unbind\";t.navigator.pointerEnabled?i[o](e,\"pointerdown\",this):t.navigator.msPointerEnabled?i[o](e,\"MSPointerDown\",this):(i[o](e,\"mousedown\",this),i[o](e,\"touchstart\",this))},o.prototype.handleEvent=function(t){var e=\"on\"+t.type;this[e]&&this[e](t)},o.prototype.getTouch=function(t){for(var e=0,i=t.length;i>e;e++){var n=t[e];if(n.identifier==this.pointerIdentifier)return n}},o.prototype.onmousedown=function(t){var e=t.button;e&&0!==e&&1!==e||this._pointerDown(t,t)},o.prototype.ontouchstart=function(t){this._pointerDown(t,t.changedTouches[0])},o.prototype.onMSPointerDown=o.prototype.onpointerdown=function(t){this._pointerDown(t,t)},o.prototype._pointerDown=function(t,e){this.isPointerDown||(this.isPointerDown=!0,this.pointerIdentifier=void 0!==e.pointerId?e.pointerId:e.identifier,this.pointerDown(t,e))},o.prototype.pointerDown=function(t,e){this._bindPostStartEvents(t),this.emitEvent(\"pointerDown\",[t,e])};var r={mousedown:[\"mousemove\",\"mouseup\"],touchstart:[\"touchmove\",\"touchend\",\"touchcancel\"],pointerdown:[\"pointermove\",\"pointerup\",\"pointercancel\"],MSPointerDown:[\"MSPointerMove\",\"MSPointerUp\",\"MSPointerCancel\"]};return o.prototype._bindPostStartEvents=function(e){if(e){for(var n=r[e.type],o=e.preventDefault?t:document,s=0,a=n.length;a>s;s++){var l=n[s];i.bind(o,l,this)}this._boundPointerEvents={events:n,node:o}}},o.prototype._unbindPostStartEvents=function(){var t=this._boundPointerEvents;if(t&&t.events){for(var e=0,n=t.events.length;n>e;e++){var o=t.events[e];i.unbind(t.node,o,this)}delete this._boundPointerEvents}},o.prototype.onmousemove=function(t){this._pointerMove(t,t)},o.prototype.onMSPointerMove=o.prototype.onpointermove=function(t){t.pointerId==this.pointerIdentifier&&this._pointerMove(t,t)},o.prototype.ontouchmove=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerMove(t,e)},o.prototype._pointerMove=function(t,e){this.pointerMove(t,e)},o.prototype.pointerMove=function(t,e){this.emitEvent(\"pointerMove\",[t,e])},o.prototype.onmouseup=function(t){this._pointerUp(t,t)},o.prototype.onMSPointerUp=o.prototype.onpointerup=function(t){t.pointerId==this.pointerIdentifier&&this._pointerUp(t,t)},o.prototype.ontouchend=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerUp(t,e)},o.prototype._pointerUp=function(t,e){this._pointerDone(),this.pointerUp(t,e)},o.prototype.pointerUp=function(t,e){this.emitEvent(\"pointerUp\",[t,e])},o.prototype._pointerDone=function(){this.isPointerDown=!1,delete this.pointerIdentifier,this._unbindPostStartEvents(),this.pointerDone()},o.prototype.pointerDone=n,o.prototype.onMSPointerCancel=o.prototype.onpointercancel=function(t){t.pointerId==this.pointerIdentifier&&this._pointerCancel(t,t)},o.prototype.ontouchcancel=function(t){var e=this.getTouch(t.changedTouches);e&&this._pointerCancel(t,e)},o.prototype._pointerCancel=function(t,e){this._pointerDone(),this.pointerCancel(t,e)},o.prototype.pointerCancel=function(t,e){this.emitEvent(\"pointerCancel\",[t,e])},o.getPointerPoint=function(t){return{x:void 0!==t.pageX?t.pageX:t.clientX,y:void 0!==t.pageY?t.pageY:t.clientY}},o}),function(t,e){\"function\"==typeof define&&define.amd?define(\"unidragger/unidragger\",[\"eventie/eventie\",\"unipointer/unipointer\"],function(i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(t,require(\"eventie\"),require(\"unipointer\")):t.Unidragger=e(t,t.eventie,t.Unipointer)}(window,function(t,e,i){function n(){}function o(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function r(){}function s(){return!1}r.prototype=new i,r.prototype.bindHandles=function(){this._bindHandles(!0)},r.prototype.unbindHandles=function(){this._bindHandles(!1)};var a=t.navigator;r.prototype._bindHandles=function(t){t=void 0===t?!0:!!t;var i;i=a.pointerEnabled?function(e){e.style.touchAction=t?\"none\":\"\"}:a.msPointerEnabled?function(e){e.style.msTouchAction=t?\"none\":\"\"}:function(){t&&c(s)};for(var n=t?\"bind\":\"unbind\",o=0,r=this.handles.length;r>o;o++){var s=this.handles[o];this._bindStartEvent(s,t),i(s),e[n](s,\"click\",this)}};var l=\"attachEvent\"in document.documentElement,c=l?function(t){\"IMG\"==t.nodeName&&(t.ondragstart=s);for(var e=t.querySelectorAll(\"img\"),i=0,n=e.length;n>i;i++){var o=e[i];o.ondragstart=s}}:n;r.prototype.pointerDown=function(i,n){if(\"INPUT\"==i.target.nodeName&&\"range\"==i.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(i,n);var o=document.activeElement;o&&o.blur&&o.blur(),this._bindPostStartEvents(i),this.pointerDownScroll=r.getScrollPosition(),e.bind(t,\"scroll\",this),this.emitEvent(\"pointerDown\",[i,n])},r.prototype._dragPointerDown=function(t,e){this.pointerDownPoint=i.getPointerPoint(e);var n=\"touchstart\"==t.type,r=t.target.nodeName;n||\"SELECT\"==r||o(t)},r.prototype.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.emitEvent(\"pointerMove\",[t,e,i]),this._dragMove(t,e,i)},r.prototype._dragPointerMove=function(t,e){var n=i.getPointerPoint(e),o={x:n.x-this.pointerDownPoint.x,y:n.y-this.pointerDownPoint.y};return!this.isDragging&&this.hasDragStarted(o)&&this._dragStart(t,e),o},r.prototype.hasDragStarted=function(t){return Math.abs(t.x)>3||Math.abs(t.y)>3},r.prototype.pointerUp=function(t,e){this.emitEvent(\"pointerUp\",[t,e]),this._dragPointerUp(t,e)},r.prototype._dragPointerUp=function(t,e){this.isDragging?this._dragEnd(t,e):this._staticClick(t,e)},i.prototype.pointerDone=function(){e.unbind(t,\"scroll\",this)},r.prototype._dragStart=function(t,e){this.isDragging=!0,this.dragStartPoint=r.getPointerPoint(e),this.isPreventingClicks=!0,this.dragStart(t,e)},r.prototype.dragStart=function(t,e){this.emitEvent(\"dragStart\",[t,e])},r.prototype._dragMove=function(t,e,i){this.isDragging&&this.dragMove(t,e,i)\n},r.prototype.dragMove=function(t,e,i){o(t),this.emitEvent(\"dragMove\",[t,e,i])},r.prototype._dragEnd=function(t,e){this.isDragging=!1;var i=this;setTimeout(function(){delete i.isPreventingClicks}),this.dragEnd(t,e)},r.prototype.dragEnd=function(t,e){this.emitEvent(\"dragEnd\",[t,e])},r.prototype.pointerDone=function(){e.unbind(t,\"scroll\",this),delete this.pointerDownScroll},r.prototype.onclick=function(t){this.isPreventingClicks&&o(t)},r.prototype._staticClick=function(t,e){if(!this.isIgnoringMouseUp||\"mouseup\"!=t.type){var i=t.target.nodeName;if((\"INPUT\"==i||\"TEXTAREA\"==i)&&t.target.focus(),this.staticClick(t,e),\"mouseup\"!=t.type){this.isIgnoringMouseUp=!0;var n=this;setTimeout(function(){delete n.isIgnoringMouseUp},400)}}},r.prototype.staticClick=function(t,e){this.emitEvent(\"staticClick\",[t,e])},r.prototype.onscroll=function(){var t=r.getScrollPosition(),e=this.pointerDownScroll.x-t.x,i=this.pointerDownScroll.y-t.y;(Math.abs(e)>3||Math.abs(i)>3)&&this._pointerDone()},r.getPointerPoint=function(t){return{x:void 0!==t.pageX?t.pageX:t.clientX,y:void 0!==t.pageY?t.pageY:t.clientY}};var h=void 0!==t.pageYOffset;return r.getScrollPosition=function(){return{x:h?t.pageXOffset:document.body.scrollLeft,y:h?t.pageYOffset:document.body.scrollTop}},r.getPointerPoint=i.getPointerPoint,r}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/drag\",[\"classie/classie\",\"eventie/eventie\",\"./flickity\",\"unidragger/unidragger\",\"fizzy-ui-utils/utils\"],function(i,n,o,r,s){return e(t,i,n,o,r,s)}):\"object\"==typeof exports?module.exports=e(t,require(\"desandro-classie\"),require(\"eventie\"),require(\"./flickity\"),require(\"unidragger\"),require(\"fizzy-ui-utils\")):t.Flickity=e(t,t.classie,t.eventie,t.Flickity,t.Unidragger,t.fizzyUIUtils)}(window,function(t,e,i,n,o,r){function s(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function a(e){var i=o.getPointerPoint(e);return i.y-t.pageYOffset}r.extend(n.defaults,{draggable:!0,touchVerticalScroll:!0}),n.createMethods.push(\"_createDrag\"),r.extend(n.prototype,o.prototype),n.prototype._createDrag=function(){this.on(\"activate\",this.bindDrag),this.on(\"uiChange\",this._uiChangeDrag),this.on(\"childUIPointerDown\",this._childUIPointerDownDrag),this.on(\"deactivate\",this.unbindDrag)},n.prototype.bindDrag=function(){this.options.draggable&&!this.isDragBound&&(e.add(this.element,\"is-draggable\"),this.handles=[this.viewport],this.bindHandles(),this.isDragBound=!0)},n.prototype.unbindDrag=function(){this.isDragBound&&(e.remove(this.element,\"is-draggable\"),this.unbindHandles(),delete this.isDragBound)},n.prototype._uiChangeDrag=function(){delete this.isFreeScrolling},n.prototype._childUIPointerDownDrag=function(t){s(t),this.pointerDownFocus(t)},n.prototype.pointerDown=function(n,r){if(\"INPUT\"==n.target.nodeName&&\"range\"==n.target.type)return this.isPointerDown=!1,void delete this.pointerIdentifier;this._dragPointerDown(n,r);var s=document.activeElement;s&&s.blur&&s!=this.element&&s!=document.body&&s.blur(),this.pointerDownFocus(n),this.dragX=this.x,e.add(this.viewport,\"is-pointer-down\"),this._bindPostStartEvents(n),this.pointerDownScroll=o.getScrollPosition(),i.bind(t,\"scroll\",this),this.dispatchEvent(\"pointerDown\",n,[r])};var l={touchstart:!0,MSPointerDown:!0},c={INPUT:!0,SELECT:!0};n.prototype.pointerDownFocus=function(t){!this.options.accessibility||l[t.type]||c[t.target.nodeName]||this.element.focus()},n.prototype.pointerMove=function(t,e){var i=this._dragPointerMove(t,e);this.touchVerticalScrollMove(t,e,i),this._dragMove(t,e,i),this.dispatchEvent(\"pointerMove\",t,[e,i])},n.prototype.hasDragStarted=function(t){return!this.isTouchScrolling&&Math.abs(t.x)>3},n.prototype.pointerUp=function(t,i){delete this.isTouchScrolling,e.remove(this.viewport,\"is-pointer-down\"),this.dispatchEvent(\"pointerUp\",t,[i]),this._dragPointerUp(t,i)};var h={touchmove:!0,MSPointerMove:!0};return n.prototype.touchVerticalScrollMove=function(e,i,n){var o=this.options.touchVerticalScroll,r=\"withDrag\"==o?!o:this.isDragging||!o;!r&&h[e.type]&&!this.isTouchScrolling&&Math.abs(n.y)>10&&(this.startScrollY=t.pageYOffset,this.pointerWindowStartY=a(i),this.isTouchScrolling=!0)},n.prototype.dragStart=function(t,e){this.dragStartPosition=this.x,this.startAnimation(),this.dispatchEvent(\"dragStart\",t,[e])},n.prototype.dragMove=function(t,e,i){s(t),this.previousDragX=this.dragX;var n=this.options.rightToLeft?-1:1,o=this.dragStartPosition+i.x*n;if(!this.options.wrapAround&&this.cells.length){var r=Math.max(-this.cells[0].target,this.dragStartPosition);o=o>r?.5*(o+r):o;var a=Math.min(-this.getLastCell().target,this.dragStartPosition);o=a>o?.5*(o+a):o}this.dragX=o,this.dragMoveTime=new Date,this.dispatchEvent(\"dragMove\",t,[e,i])},n.prototype.dragEnd=function(t,e){this.options.freeScroll&&(this.isFreeScrolling=!0);var i=this.dragEndRestingSelect();if(this.options.freeScroll&&!this.options.wrapAround){var n=this.getRestingPosition();this.isFreeScrolling=-n>this.cells[0].target&&-n<this.getLastCell().target}else this.options.freeScroll||i!=this.selectedIndex||(i+=this.dragEndBoostSelect());delete this.previousDragX,this.select(i),this.dispatchEvent(\"dragEnd\",t,[e])},n.prototype.dragEndRestingSelect=function(){var t=this.getRestingPosition(),e=Math.abs(this.getCellDistance(-t,this.selectedIndex)),i=this._getClosestResting(t,e,1),n=this._getClosestResting(t,e,-1),o=i.distance<n.distance?i.index:n.index;return o},n.prototype._getClosestResting=function(t,e,i){for(var n=this.selectedIndex,o=1/0,r=this.options.contain&&!this.options.wrapAround?function(t,e){return e>=t}:function(t,e){return e>t};r(e,o)&&(n+=i,o=e,e=this.getCellDistance(-t,n),null!==e);)e=Math.abs(e);return{distance:o,index:n-i}},n.prototype.getCellDistance=function(t,e){var i=this.cells.length,n=this.options.wrapAround&&i>1,o=n?r.modulo(e,i):e,s=this.cells[o];if(!s)return null;var a=n?this.slideableWidth*Math.floor(e/i):0;return t-(s.target+a)},n.prototype.dragEndBoostSelect=function(){if(void 0===this.previousDragX||!this.dragMoveTime||new Date-this.dragMoveTime>100)return 0;var t=this.getCellDistance(-this.dragX,this.selectedIndex),e=this.previousDragX-this.dragX;return t>0&&e>0?1:0>t&&0>e?-1:0},n.prototype.staticClick=function(t,e){var i=this.getParentCell(t.target),n=i&&i.element,o=i&&r.indexOf(this.cells,i);this.dispatchEvent(\"staticClick\",t,[e,n,o])},n}),function(t,e){\"function\"==typeof define&&define.amd?define(\"tap-listener/tap-listener\",[\"unipointer/unipointer\"],function(i){return e(t,i)}):\"object\"==typeof exports?module.exports=e(t,require(\"unipointer\")):t.TapListener=e(t,t.Unipointer)}(window,function(t,e){function i(t){t.preventDefault?t.preventDefault():t.returnValue=!1}function n(t){this.bindTap(t)}n.prototype=new e,n.prototype.bindTap=function(t){t&&(this.unbindTap(),this.tapElement=t,this._bindStartEvent(t,!0))},n.prototype.unbindTap=function(){this.tapElement&&(this._bindStartEvent(this.tapElement,!0),delete this.tapElement)};var o=n.prototype.pointerDown;n.prototype.pointerDown=function(t){\"touchstart\"==t.type&&i(t),o.apply(this,arguments)};var r=void 0!==t.pageYOffset;return n.prototype.pointerUp=function(i,n){var o=e.getPointerPoint(n),s=this.tapElement.getBoundingClientRect(),a=r?t.pageXOffset:document.body.scrollLeft,l=r?t.pageYOffset:document.body.scrollTop,c=o.x>=s.left+a&&o.x<=s.right+a&&o.y>=s.top+l&&o.y<=s.bottom+l;c&&this.emitEvent(\"tap\",[i,n])},n.prototype.destroy=function(){this.pointerDone(),this.unbindTap()},n}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/prev-next-button\",[\"eventie/eventie\",\"./flickity\",\"tap-listener/tap-listener\",\"fizzy-ui-utils/utils\"],function(i,n,o,r){return e(t,i,n,o,r)}):\"object\"==typeof exports?module.exports=e(t,require(\"eventie\"),require(\"./flickity\"),require(\"tap-listener\"),require(\"fizzy-ui-utils\")):e(t,t.eventie,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n,o){function r(t,e){this.direction=t,this.parent=e,this._create()}function s(t){return\"string\"==typeof t?t:\"M \"+t.x0+\",50 L \"+t.x1+\",\"+(t.y1+50)+\" L \"+t.x2+\",\"+(t.y2+50)+\" L \"+t.x3+\",50  L \"+t.x2+\",\"+(50-t.y2)+\" L \"+t.x1+\",\"+(50-t.y1)+\" Z\"}var a=\"http://www.w3.org/2000/svg\",l=function(){function t(){if(void 0!==e)return e;var t=document.createElement(\"div\");return t.innerHTML=\"<svg/>\",e=(t.firstChild&&t.firstChild.namespaceURI)==a}var e;return t}();return r.prototype=new n,r.prototype._create=function(){this.isEnabled=!0,this.isPrevious=-1==this.direction;var t=this.parent.options.rightToLeft?1:-1;this.isLeft=this.direction==t;var e=this.element=document.createElement(\"button\");if(e.className=\"flickity-prev-next-button\",e.className+=this.isPrevious?\" previous\":\" next\",e.setAttribute(\"type\",\"button\"),i.setUnselectable(e),l()){var n=this.createSVG();e.appendChild(n)}else this.setArrowText(),e.className+=\" no-svg\";var o=this;this.onCellSelect=function(){o.update()},this.parent.on(\"cellSelect\",this.onCellSelect),this.on(\"tap\",this.onTap),this.on(\"pointerDown\",function(t,e){o.parent.childUIPointerDown(e)})},r.prototype.activate=function(){this.update(),this.bindTap(this.element),e.bind(this.element,\"click\",this),this.parent.element.appendChild(this.element)},r.prototype.deactivate=function(){this.parent.element.removeChild(this.element),n.prototype.destroy.call(this),e.unbind(this.element,\"click\",this)},r.prototype.createSVG=function(){var t=document.createElementNS(a,\"svg\");t.setAttribute(\"viewBox\",\"0 0 100 100\");var e=document.createElementNS(a,\"path\"),i=s(this.parent.options.arrowShape);return e.setAttribute(\"d\",i),e.setAttribute(\"class\",\"arrow\"),this.isLeft||e.setAttribute(\"transform\",\"translate(100, 100) rotate(180) \"),t.appendChild(e),t},r.prototype.setArrowText=function(){var t=this.parent.options,e=this.isLeft?t.leftArrowText:t.rightArrowText;o.setText(this.element,e)},r.prototype.onTap=function(){if(this.isEnabled){this.parent.uiChange();var t=this.isPrevious?\"previous\":\"next\";this.parent[t]()}},r.prototype.handleEvent=o.handleEvent,r.prototype.onclick=function(){var t=document.activeElement;t&&t==this.element&&this.onTap()},r.prototype.enable=function(){this.isEnabled||(this.element.disabled=!1,this.isEnabled=!0)},r.prototype.disable=function(){this.isEnabled&&(this.element.disabled=!0,this.isEnabled=!1)},r.prototype.update=function(){var t=this.parent.cells;if(this.parent.options.wrapAround&&t.length>1)return void this.enable();var e=t.length?t.length-1:0,i=this.isPrevious?0:e,n=this.parent.selectedIndex==i?\"disable\":\"enable\";this[n]()},r.prototype.destroy=function(){this.deactivate()},o.extend(i.defaults,{prevNextButtons:!0,leftArrowText:\"‹\",rightArrowText:\"›\",arrowShape:{x0:10,x1:60,y1:50,x2:70,y2:40,x3:30}}),i.createMethods.push(\"_createPrevNextButtons\"),i.prototype._createPrevNextButtons=function(){this.options.prevNextButtons&&(this.prevButton=new r(-1,this),this.nextButton=new r(1,this),this.on(\"activate\",this.activatePrevNextButtons))},i.prototype.activatePrevNextButtons=function(){this.prevButton.activate(),this.nextButton.activate(),this.on(\"deactivate\",this.deactivatePrevNextButtons)},i.prototype.deactivatePrevNextButtons=function(){this.prevButton.deactivate(),this.nextButton.deactivate(),this.off(\"deactivate\",this.deactivatePrevNextButtons)},i.PrevNextButton=r,i}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/page-dots\",[\"eventie/eventie\",\"./flickity\",\"tap-listener/tap-listener\",\"fizzy-ui-utils/utils\"],function(i,n,o,r){return e(t,i,n,o,r)}):\"object\"==typeof exports?module.exports=e(t,require(\"eventie\"),require(\"./flickity\"),require(\"tap-listener\"),require(\"fizzy-ui-utils\")):e(t,t.eventie,t.Flickity,t.TapListener,t.fizzyUIUtils)}(window,function(t,e,i,n,o){function r(t){this.parent=t,this._create()}return r.prototype=new n,r.prototype._create=function(){this.holder=document.createElement(\"ol\"),this.holder.className=\"flickity-page-dots\",i.setUnselectable(this.holder),this.dots=[];var t=this;this.onCellSelect=function(){t.updateSelected()},this.parent.on(\"cellSelect\",this.onCellSelect),this.on(\"tap\",this.onTap),this.on(\"pointerDown\",function(e,i){t.parent.childUIPointerDown(i)})},r.prototype.activate=function(){this.setDots(),this.updateSelected(),this.bindTap(this.holder),this.parent.element.appendChild(this.holder)},r.prototype.deactivate=function(){this.parent.element.removeChild(this.holder),n.prototype.destroy.call(this)},r.prototype.setDots=function(){var t=this.parent.cells.length-this.dots.length;t>0?this.addDots(t):0>t&&this.removeDots(-t)},r.prototype.addDots=function(t){for(var e=document.createDocumentFragment(),i=[];t;){var n=document.createElement(\"li\");n.className=\"dot\",e.appendChild(n),i.push(n),t--}this.holder.appendChild(e),this.dots=this.dots.concat(i)},r.prototype.removeDots=function(t){for(var e=this.dots.splice(this.dots.length-t,t),i=0,n=e.length;n>i;i++){var o=e[i];this.holder.removeChild(o)}},r.prototype.updateSelected=function(){this.selectedDot&&(this.selectedDot.className=\"dot\"),this.dots.length&&(this.selectedDot=this.dots[this.parent.selectedIndex],this.selectedDot.className=\"dot is-selected\")},r.prototype.onTap=function(t){var e=t.target;if(\"LI\"==e.nodeName){this.parent.uiChange();var i=o.indexOf(this.dots,e);this.parent.select(i)}},r.prototype.destroy=function(){this.deactivate()},i.PageDots=r,o.extend(i.defaults,{pageDots:!0}),i.createMethods.push(\"_createPageDots\"),i.prototype._createPageDots=function(){this.options.pageDots&&(this.pageDots=new r(this),this.on(\"activate\",this.activatePageDots),this.on(\"cellAddedRemoved\",this.onCellAddedRemovedPageDots),this.on(\"deactivate\",this.deactivatePageDots))},i.prototype.activatePageDots=function(){this.pageDots.activate()},i.prototype.onCellAddedRemovedPageDots=function(){this.pageDots.setDots()},i.prototype.deactivatePageDots=function(){this.pageDots.deactivate()},i.PageDots=r,i}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/player\",[\"eventEmitter/EventEmitter\",\"eventie/eventie\",\"./flickity\"],function(t,i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(require(\"wolfy87-eventemitter\"),require(\"eventie\"),require(\"./flickity\")):e(t.EventEmitter,t.eventie,t.Flickity)}(window,function(t,e,i){function n(t){if(this.isPlaying=!1,this.parent=t,r){var e=this;this.onVisibilityChange=function(){e.visibilityChange()}}}var o,r;return\"hidden\"in document?(o=\"hidden\",r=\"visibilitychange\"):\"webkitHidden\"in document&&(o=\"webkitHidden\",r=\"webkitvisibilitychange\"),n.prototype=new t,n.prototype.play=function(){this.isPlaying=!0,delete this.isPaused,r&&document.addEventListener(r,this.onVisibilityChange,!1),this.tick()},n.prototype.tick=function(){if(this.isPlaying&&!this.isPaused){this.tickTime=new Date;var t=this.parent.options.autoPlay;t=\"number\"==typeof t?t:3e3;var e=this;this.timeout=setTimeout(function(){e.parent.next(!0),e.tick()},t)}},n.prototype.stop=function(){this.isPlaying=!1,delete this.isPaused,this.clear(),r&&document.removeEventListener(r,this.onVisibilityChange,!1)},n.prototype.clear=function(){clearTimeout(this.timeout)},n.prototype.pause=function(){this.isPlaying&&(this.isPaused=!0,this.clear())},n.prototype.unpause=function(){this.isPaused&&this.play()},n.prototype.visibilityChange=function(){var t=document[o];this[t?\"pause\":\"unpause\"]()},i.createMethods.push(\"_createPlayer\"),i.prototype._createPlayer=function(){this.player=new n(this),this.on(\"activate\",this.activatePlayer),this.on(\"uiChange\",this.stopPlayer),this.on(\"pointerDown\",this.stopPlayer),this.on(\"deactivate\",this.deactivatePlayer)},i.prototype.activatePlayer=function(){this.options.autoPlay&&(this.player.play(),e.bind(this.element,\"mouseenter\",this),this.isMouseenterBound=!0)},i.prototype.stopPlayer=function(){this.player.stop()},i.prototype.deactivatePlayer=function(){this.player.stop(),this.isMouseenterBound&&(e.unbind(this.element,\"mouseenter\",this),delete this.isMouseenterBound)},i.prototype.onmouseenter=function(){this.player.pause(),e.bind(this.element,\"mouseleave\",this)},i.prototype.onmouseleave=function(){this.player.unpause(),e.unbind(this.element,\"mouseleave\",this)},i.Player=n,i}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/add-remove-cell\",[\"./flickity\",\"fizzy-ui-utils/utils\"],function(i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(t,require(\"./flickity\"),require(\"fizzy-ui-utils\")):e(t,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i){function n(t){for(var e=document.createDocumentFragment(),i=0,n=t.length;n>i;i++){var o=t[i];e.appendChild(o.element)}return e}return e.prototype.insert=function(t,e){var i=this._makeCells(t);if(i&&i.length){var o=this.cells.length;e=void 0===e?o:e;var r=n(i),s=e==o;if(s)this.slider.appendChild(r);else{var a=this.cells[e].element;this.slider.insertBefore(r,a)}if(0===e)this.cells=i.concat(this.cells);else if(s)this.cells=this.cells.concat(i);else{var l=this.cells.splice(e,o-e);this.cells=this.cells.concat(i).concat(l)}this._sizeCells(i);var c=e>this.selectedIndex?0:i.length;this._cellAddedRemoved(e,c)}},e.prototype.append=function(t){this.insert(t,this.cells.length)},e.prototype.prepend=function(t){this.insert(t,0)},e.prototype.remove=function(t){var e,n,o,r=this.getCells(t),s=0;for(e=0,n=r.length;n>e;e++){o=r[e];var a=i.indexOf(this.cells,o)<this.selectedIndex;s-=a?1:0}for(e=0,n=r.length;n>e;e++)o=r[e],o.remove(),i.removeFrom(this.cells,o);r.length&&this._cellAddedRemoved(0,s)},e.prototype._cellAddedRemoved=function(t,e){e=e||0,this.selectedIndex+=e,this.selectedIndex=Math.max(0,Math.min(this.cells.length-1,this.selectedIndex)),this.emitEvent(\"cellAddedRemoved\",[t,e]),this.cellChange(t,!0)},e.prototype.cellSizeChange=function(t){var e=this.getCell(t);if(e){e.getSize();var n=i.indexOf(this.cells,e);this.cellChange(n)}},e.prototype.cellChange=function(t,e){var i=this.slideableWidth;this._positionCells(t),this._getWrapShiftCells(),this.setGallerySize(),this.options.freeScroll?(this.x+=i-this.slideableWidth,this.positionSlider()):(e&&this.positionSliderAtSelected(),this.select(this.selectedIndex))},e}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/lazyload\",[\"classie/classie\",\"eventie/eventie\",\"./flickity\",\"fizzy-ui-utils/utils\"],function(i,n,o,r){return e(t,i,n,o,r)}):\"object\"==typeof exports?module.exports=e(t,require(\"desandro-classie\"),require(\"eventie\"),require(\"./flickity\"),require(\"fizzy-ui-utils\")):e(t,t.classie,t.eventie,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i,n,o){function r(t){if(\"IMG\"==t.nodeName&&t.getAttribute(\"data-flickity-lazyload\"))return[t];var e=t.querySelectorAll(\"img[data-flickity-lazyload]\");return o.makeArray(e)}function s(t,e){this.img=t,this.flickity=e,this.load()}return n.createMethods.push(\"_createLazyload\"),n.prototype._createLazyload=function(){this.on(\"cellSelect\",this.lazyLoad)},n.prototype.lazyLoad=function(){var t=this.options.lazyLoad;if(t){for(var e=\"number\"==typeof t?t:0,i=this.getAdjacentCellElements(e),n=[],o=0,a=i.length;a>o;o++){var l=i[o],c=r(l);n=n.concat(c)}for(o=0,a=n.length;a>o;o++){var h=n[o];new s(h,this)}}},s.prototype.handleEvent=o.handleEvent,s.prototype.load=function(){i.bind(this.img,\"load\",this),i.bind(this.img,\"error\",this),this.img.src=this.img.getAttribute(\"data-flickity-lazyload\"),this.img.removeAttribute(\"data-flickity-lazyload\")},s.prototype.onload=function(t){this.complete(t,\"flickity-lazyloaded\")},s.prototype.onerror=function(){this.complete(event,\"flickity-lazyerror\")},s.prototype.complete=function(t,n){i.unbind(this.img,\"load\",this),i.unbind(this.img,\"error\",this);var o=this.flickity.getParentCell(this.img),r=o&&o.element;this.flickity.cellSizeChange(r),e.add(this.img,n),this.flickity.dispatchEvent(\"lazyLoad\",t,r)},n.LazyLoader=s,n}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity/js/index\",[\"./flickity\",\"./drag\",\"./prev-next-button\",\"./page-dots\",\"./player\",\"./add-remove-cell\",\"./lazyload\"],e):\"object\"==typeof exports&&(module.exports=e(require(\"./flickity\"),require(\"./drag\"),require(\"./prev-next-button\"),require(\"./page-dots\"),require(\"./player\"),require(\"./add-remove-cell\"),require(\"./lazyload\")))}(window,function(t){return t}),function(t,e){\"function\"==typeof define&&define.amd?define(\"flickity-as-nav-for/as-nav-for\",[\"classie/classie\",\"flickity/js/index\",\"fizzy-ui-utils/utils\"],function(i,n,o){return e(t,i,n,o)}):\"object\"==typeof exports?module.exports=e(t,require(\"desandro-classie\"),require(\"flickity\"),require(\"fizzy-ui-utils\")):t.Flickity=e(t,t.classie,t.Flickity,t.fizzyUIUtils)}(window,function(t,e,i,n){return i.createMethods.push(\"_createAsNavFor\"),i.prototype._createAsNavFor=function(){this.on(\"activate\",this.activateAsNavFor),this.on(\"deactivate\",this.deactivateAsNavFor),this.on(\"destroy\",this.destroyAsNavFor);var t=this.options.asNavFor;if(t){var e=this;setTimeout(function(){e.setNavCompanion(t)})}},i.prototype.setNavCompanion=function(t){t=n.getQueryElement(t);var e=i.data(t);if(e&&e!=this){this.navCompanion=e;var o=this;this.onNavCompanionSelect=function(){o.navCompanionSelect()},e.on(\"cellSelect\",this.onNavCompanionSelect),this.on(\"staticClick\",this.onNavStaticClick),this.navCompanionSelect()}},i.prototype.navCompanionSelect=function(){if(this.navCompanion){var t=this.navCompanion.selectedIndex;this.select(t),this.removeNavSelectedElement(),this.selectedIndex==t&&(this.navSelectedElement=this.cells[t].element,e.add(this.navSelectedElement,\"is-nav-selected\"))}},i.prototype.activateAsNavFor=function(){this.navCompanionSelect()},i.prototype.removeNavSelectedElement=function(){this.navSelectedElement&&(e.remove(this.navSelectedElement,\"is-nav-selected\"),delete this.navSelectedElement)},i.prototype.onNavStaticClick=function(t,e,i,n){\"number\"==typeof n&&this.navCompanion.select(n)},i.prototype.deactivateAsNavFor=function(){this.removeNavSelectedElement()},i.prototype.destroyAsNavFor=function(){this.navCompanion&&(this.navCompanion.off(\"cellSelect\",this.onNavCompanionSelect),this.off(\"staticClick\",this.onNavStaticClick),delete this.navCompanion)},i}),function(t,e){\"function\"==typeof define&&define.amd?define(\"imagesloaded/imagesloaded\",[\"eventEmitter/EventEmitter\",\"eventie/eventie\"],function(i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(t,require(\"wolfy87-eventemitter\"),require(\"eventie\")):t.imagesLoaded=e(t,t.EventEmitter,t.eventie)}(window,function(t,e,i){function n(t,e){for(var i in e)t[i]=e[i];return t}function o(t){return\"[object Array]\"===d.call(t)}function r(t){var e=[];if(o(t))e=t;else if(\"number\"==typeof t.length)for(var i=0,n=t.length;n>i;i++)e.push(t[i]);else e.push(t);return e}function s(t,e,i){if(!(this instanceof s))return new s(t,e);\"string\"==typeof t&&(t=document.querySelectorAll(t)),this.elements=r(t),this.options=n({},this.options),\"function\"==typeof e?i=e:n(this.options,e),i&&this.on(\"always\",i),this.getImages(),c&&(this.jqDeferred=new c.Deferred);var o=this;setTimeout(function(){o.check()})}function a(t){this.img=t}function l(t){this.src=t,u[t]=this}var c=t.jQuery,h=t.console,p=\"undefined\"!=typeof h,d=Object.prototype.toString;s.prototype=new e,s.prototype.options={},s.prototype.getImages=function(){this.images=[];for(var t=0,e=this.elements.length;e>t;t++){var i=this.elements[t];\"IMG\"===i.nodeName&&this.addImage(i);var n=i.nodeType;if(n&&(1===n||9===n||11===n))for(var o=i.querySelectorAll(\"img\"),r=0,s=o.length;s>r;r++){var a=o[r];this.addImage(a)}}},s.prototype.addImage=function(t){var e=new a(t);this.images.push(e)},s.prototype.check=function(){function t(t,o){return e.options.debug&&p&&h.log(\"confirm\",t,o),e.progress(t),i++,i===n&&e.complete(),!0}var e=this,i=0,n=this.images.length;if(this.hasAnyBroken=!1,!n)return void this.complete();for(var o=0;n>o;o++){var r=this.images[o];r.on(\"confirm\",t),r.check()}},s.prototype.progress=function(t){this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded;var e=this;setTimeout(function(){e.emit(\"progress\",e,t),e.jqDeferred&&e.jqDeferred.notify&&e.jqDeferred.notify(e,t)})},s.prototype.complete=function(){var t=this.hasAnyBroken?\"fail\":\"done\";this.isComplete=!0;var e=this;setTimeout(function(){if(e.emit(t,e),e.emit(\"always\",e),e.jqDeferred){var i=e.hasAnyBroken?\"reject\":\"resolve\";e.jqDeferred[i](e)}})},c&&(c.fn.imagesLoaded=function(t,e){var i=new s(this,t,e);return i.jqDeferred.promise(c(this))}),a.prototype=new e,a.prototype.check=function(){var t=u[this.img.src]||new l(this.img.src);if(t.isConfirmed)return void this.confirm(t.isLoaded,\"cached was confirmed\");if(this.img.complete&&void 0!==this.img.naturalWidth)return void this.confirm(0!==this.img.naturalWidth,\"naturalWidth\");var e=this;t.on(\"confirm\",function(t,i){return e.confirm(t.isLoaded,i),!0}),t.check()},a.prototype.confirm=function(t,e){this.isLoaded=t,this.emit(\"confirm\",this,e)};var u={};return l.prototype=new e,l.prototype.check=function(){if(!this.isChecked){var t=new Image;i.bind(t,\"load\",this),i.bind(t,\"error\",this),t.src=this.src,this.isChecked=!0}},l.prototype.handleEvent=function(t){var e=\"on\"+t.type;this[e]&&this[e](t)},l.prototype.onload=function(t){this.confirm(!0,\"onload\"),this.unbindProxyEvents(t)},l.prototype.onerror=function(t){this.confirm(!1,\"onerror\"),this.unbindProxyEvents(t)},l.prototype.confirm=function(t,e){this.isConfirmed=!0,this.isLoaded=t,this.emit(\"confirm\",this,e)},l.prototype.unbindProxyEvents=function(t){i.unbind(t.target,\"load\",this),i.unbind(t.target,\"error\",this)},s}),function(t,e){\"function\"==typeof define&&define.amd?define([\"flickity/js/index\",\"imagesloaded/imagesloaded\"],function(i,n){return e(t,i,n)}):\"object\"==typeof exports?module.exports=e(t,require(\"flickity\"),require(\"imagesloaded\")):t.Flickity=e(t,t.Flickity,t.imagesLoaded)}(window,function(t,e,i){return e.createMethods.push(\"_createImagesLoaded\"),e.prototype._createImagesLoaded=function(){this.on(\"activate\",this.imagesLoaded)},e.prototype.imagesLoaded=function(){function t(t,i){var n=e.getParentCell(i.img);e.cellSizeChange(n&&n.element),e.options.freeScroll||e.positionSliderAtSelected()}if(this.options.imagesLoaded){var e=this;i(this.slider).on(\"progress\",t)}},e});"

/***/ },
/* 4 */
/***/ function(module, exports) {

	var animate=function(){function F(a){return Array.isArray(a)?a:Array.prototype.slice.call(a)}var m=function(a){var c=a.length;return function d(){for(var e=arguments.length,f=Array(e),g=0;g<e;g++)f[g]=arguments[g];return f.length<c?function(){for(var a=arguments.length,c=Array(a),e=0;e<a;e++)c[e]=arguments[e];return d.apply(void 0,f.concat(c))}:a.apply(void 0,f)}},r=function(){for(var a=arguments.length,c=Array(a),b=0;b<a;b++)c[b]=arguments[b];return function(a){return c.reduce(function(a,b){return b(a)},
	a)}},t=function(a){return function(){return!a.apply(void 0,arguments)}},H={linear:function(a,c,b,d){return c+a/d*b},easeInQuad:function(a,c,b,d){return b*(a/=d)*a+c},easeInCubic:function(a,c,b,d){return b*(a/=d)*a*a+c},easeInQuart:function(a,c,b,d){return b*(a/=d)*a*a*a+c},easeInQuint:function(a,c,b,d){return b*(a/=d)*a*a*a*a+c},easeInSine:function(a,c,b,d){return-b*Math.cos(a/d*(Math.PI/2))+b+c},easeInExpo:function(a,c,b,d){return 0==a?c:b*Math.pow(2,10*(a/d-1))+c},easeInCirc:function(a,c,b,d){return-b*
	(Math.sqrt(1-(a/=d)*a)-1)+c},easeInElastic:function(a,c,b,d){var e=4>=arguments.length||void 0===arguments[4]?500:arguments[4];if(0==a)return c;if(1==(a/=d))return c+b;var e=d*(1-Math.min(e,999)/1E3),f=b<Math.abs(b)?e/4:e/(2*Math.PI)*Math.asin(b/b);return-(b*Math.pow(2,10*--a)*Math.sin(2*(a*d-f)*Math.PI/e))+c},easeInBack:function(a,c,b,d){return b*(a/=d)*a*(2.70158*a-1.70158)+c},easeOutQuad:function(a,c,b,d){return-b*(a/=d)*(a-2)+c},easeOutCubic:function(a,c,b,d){return b*((a=a/d-1)*a*a+1)+c},easeOutQuart:function(a,
	c,b,d){return-b*((a=a/d-1)*a*a*a-1)+c},easeOutQuint:function(a,c,b,d){return b*((a=a/d-1)*a*a*a*a+1)+c},easeOutSine:function(a,c,b,d){return b*Math.sin(a/d*(Math.PI/2))+c},easeOutExpo:function(a,c,b,d){return a==d?c+b:b*(-Math.pow(2,-10*a/d)+1)+c},easeOutCirc:function(a,c,b,d){return b*Math.sqrt(1-(a=a/d-1)*a)+c},easeOutElastic:function(a,c,b,d){var e=4>=arguments.length||void 0===arguments[4]?500:arguments[4];if(0==a)return c;if(1==(a/=d))return c+b;var e=d*(1-Math.min(e,999)/1E3),f=b<Math.abs(b)?
	e/4:e/(2*Math.PI)*Math.asin(b/b);return b*Math.pow(2,-10*a)*Math.sin(2*(a*d-f)*Math.PI/e)+b+c},easeOutBack:function(a,c,b,d){return b*((a=a/d-1)*a*(2.70158*a+1.70158)+1)+c},easeOutBounce:function(a,c,b,d){return(a/=d)<1/2.75?7.5625*b*a*a+c:a<2/2.75?b*(7.5625*(a-=1.5/2.75)*a+.75)+c:a<2.5/2.75?b*(7.5625*(a-=2.25/2.75)*a+.9375)+c:b*(7.5625*(a-=2.625/2.75)*a+.984375)+c},easeInOutQuad:function(a,c,b,d){return 1>(a/=d/2)?b/2*a*a+c:-b/2*(--a*(a-2)-1)+c},easeInOutCubic:function(a,c,b,d){return 1>(a/=d/2)?
	b/2*a*a*a+c:b/2*((a-=2)*a*a+2)+c},easeInOutQuart:function(a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a+c:-b/2*((a-=2)*a*a*a-2)+c},easeInOutQuint:function(a,c,b,d){return 1>(a/=d/2)?b/2*a*a*a*a*a+c:b/2*((a-=2)*a*a*a*a+2)+c},easeInOutSine:function(a,c,b,d){return-b/2*(Math.cos(Math.PI*a/d)-1)+c},easeInOutExpo:function(a,c,b,d){return 0==a?c:a==d?c+b:1>(a/=d/2)?b/2*Math.pow(2,10*(a-1))+c:b/2*(-Math.pow(2,-10*--a)+2)+c},easeInOutCirc:function(a,c,b,d){return 1>(a/=d/2)?-b/2*(Math.sqrt(1-a*a)-1)+c:b/2*(Math.sqrt(1-
	(a-=2)*a)+1)+c},easeInOutElastic:function(a,c,b,d){var e=4>=arguments.length||void 0===arguments[4]?500:arguments[4];if(0==a)return c;if(2==(a/=d/2))return c+b;var e=d*(1-Math.min(e,999)/1E3)*1.5,f=b<Math.abs(b)?e/4:e/(2*Math.PI)*Math.asin(b/b);return 1>a?-.5*b*Math.pow(2,10*--a)*Math.sin(2*(a*d-f)*Math.PI/e)+c:b*Math.pow(2,-10*--a)*Math.sin(2*(a*d-f)*Math.PI/e)*.5+b+c},easeInOutBack:function(a,c,b,d){var e=1.70158;return 1>(a/=d/2)?b/2*a*a*(((e*=1.525)+1)*a-e)+c:b/2*((a-=2)*a*(((e*=1.525)+1)*a+e)+
	2)+c}},x=function(a){return a[0]},I=function(a){return a.reduce(function(a,b){return a.concat(b)})},n=function(){return Array.prototype.includes?function(a,c){return a.includes(c)}:function(a,c){return a.some(function(a){return a===c})}}(),y=function(a){for(var c=arguments.length,b=Array(1<c?c-1:0),d=1;d<c;d++)b[d-1]=arguments[d];var e=I(b);return a.filter(function(a){return t(n)(e,a)})},p=function(){return Array.from?function(a){return Array.from(a.keys())}:function(a){var c=[];a.forEach(function(a,
	d){return c.push(d)});return c}}(),J=function(){var a=function(a){var b=new Map;Object.keys(a).forEach(function(d){return b.set(d,a[d])});return b};return function(c){return c instanceof Map?c:a(c)}}(),h=function(){try{if(!(new Map((new Map).set(null,null))).size)throw Error();}catch(a){return function(a){var b=new Map;a.forEach(function(a,c){return b.set(c,a)});return b}}return function(a){return new Map(a)}}(),K=function(a){return/^#/.test(a)},z=function(a){return/^rgb/.test(a)},L=function(){var a=
	function(a){return 7>a.length?a.split("").reduce(function(a,b){return a+b+b}):a},c=function(a){return a.match(/[\d\w]{2}/g).map(function(a){return parseInt(a,16)})};return function(b){if(z(b))return b;b=r(a,c)(b);return"rgb("+b[0]+", "+b[1]+", "+b[2]+")"}}(),A=function(a){a="string"==typeof a?/^[\#.]?[\w-]+$/.test(a)?"."==a[0]?document.getElementsByClassName(a.slice(1)):"#"==a[0]?document.getElementById(a.slice(1)):document.getElementsByTagName(a):document.querySelectorAll(a):a;return Array.isArray(a)?
	a:a.nodeType?[a]:a instanceof NodeList||a instanceof HTMLCollection?[].concat(F(a)):a.get()},k=new Map;"el delay begin complete loop direction".split(" ").forEach(function(a){return k.set(a,null)});k.set("duration",1E3);k.set("easing","easeOutElastic");var M=function(){var a=p(k).filter(function(a){return k.get(a)}),c=function(b){return a.every(function(a){return b.has(a)})},b=function(b){var c=h(b);a.forEach(function(a){c.has(a)||c.set(a,k.get(a))});return c};return function(a){return c(a)?a:b(a)}}(),
	N=function(){var a=m(function(a,b){return Array.isArray(a.get(b))}),c=function(b){return q(b).every(a(b))},b=function(b){return q(b).filter(t(a(b)))};return function(a){if(c(a))return a;var e=h(a);b(e).forEach(function(a){return e.set(a,[B.get(a),e.get(a)])});return e}}(),O=function(){var a=m(function(a,b){return a.get(b).some(K)}),c=function(b){return!C(b).some(a(b))},b=function(b){return C(b).filter(a(b))};return function(a){if(c(a))return a;var e=h(a);b(a).forEach(function(a){return e.set(a,e.get(a).map(L))});
	return e}}(),D=function(a){var c=h(a);u(a).forEach(function(a){return c.set(a,c.get(a).slice().reverse())});return c},P=r(J,M,N,O,function(a){var c=h(a);c.set("el",A(a.get("el")));return c},function(a){return"reverse"==a.get("direction")?D(a):a}),u=function(){var a=p(k),c=function(b){return t(n)(a,b)};return function(a){return p(a).filter(c)}}(),R=function(){var a=r(x,z),c=m(function(b,c){var e=b.get(c).map(Q),f=e[0],g=e[1],e=new Map;e.set("prop",c);e.set("from",f);e.set("to",g);e.set("isTransformFunction",
	E(c));e.set("isColor",e.get("isTransformFunction")?!1:a(b.get(c)));/\d$/.test(b.get("easing"))?(f=b.get("easing").split(" "),g=f[1],e.set("easing",f[0]),e.set("frequency",g)):e.set("easing",b.get("easing"));return e});return function(a,d){return u(a).map(c(a))}}(),q=function(){var a=function(a){return n(v,a)};return function(c){return p(c).filter(a)}}(),C=function(a){return y(u(a),q(a))},v="opacity translateX translateY scale rotate scaleX scaleY rotateX rotateY perspective skewX skewY translateZ rotateZ scaleZ".split(" "),
	B=new Map;v.forEach(function(a){return B.set(a,n(["opacity","scale","scaleX","scaleY"],a)?1:0)});var S=function(a){var c=q(a);if(c.length){var b=[];c.some(E)&&b.push("transform");n(c,"opacity")&&b.push("opacity");var d=b.join();a.get("el").forEach(function(a){a.style.willChange||(a.style.willChange=d)})}},E=function(){var a=v.filter(function(a){return"opacity"!=a});return function(c){return n(a,c)}}(),U=function(a,c){return a.reduce(function(a,d,e){d=d+"("+T(d,c[e])+")";return a?a+" "+d:d},null)},
	T=function(){return function(a,c){return/\D$/.test(c)||/scale/.test(a)?c:/rotate|skew/.test(a)?c+"deg":c+"px"}}(),V=function(a,c){return c.reduce(function(b,c,e){return b+a[e-1]+c})},Q=function(){var a=/-?\d*\.?\d+/g;return function(c){var b=new Map;b.set("digits",("string"==typeof c?c:String(c)).match(a).map(Number));b.set("others",("string"==typeof c?c:String(c)).split(a));return b}}(),W=m(function(a,c,b){var d=b.get("to").get("digits").map(function(d,f){var g=b.get("from").get("digits")[f];if(g==
	d)return g;var G=d-g,g=H[b.get("easing")](c,g,G,a.get("duration"),b.get("frequency"));return b.get("isColor")?Math.round(g):g});return V(d,b.get("to").get("others"))}),X=m(function(a,c){var b=a.get(c.get("prop"));return x(b.slice(-1))}),Y=function(){var a=void 0;return m(function(c,b,d){var e=void 0;c.forEach(function(a,c){a.get("isTransformFunction")?(e||(e=new Map,e.set("functions",[]),e.set("values",[])),e.get("functions").push(a.get("prop")),e.get("values").push(b[c])):"opacity"==a.get("prop")?
	d.style.opacity=b[c]:d.setAttribute(a.get("prop"),b[c])});e&&(a||(a="transform"in document.body.style?"transform":"-webkit-transform"),d.style[a]=U(e.get("functions"),e.get("values")))})}(),Z=function(){var a=function(a,b){b.get("begin")&&b.get("begin")(b.get("el"));requestAnimationFrame(a)};return function(c,b){return b.get("delay")?setTimeout(function(){return a(c,b)},b.get("delay")):a(c,b)}}(),aa=function(a){return w(function(){if("alternate"==a.get("direction"))return D(a);if("reverse"==a.get("direction")){var c=
	h(a);c["delete"]("direction");return c}return a}())},l=new Map,ba=function(){var a=0;return function(c){var b=a++,d=h(l);d.set(b,c);l=d;return b}}(),w=function(a){var c=P(a),b=R(c),d=ba(c.get("el")),e=new Map;S(c);Z(function g(a){if(l.has(d)){e.has("start")||e.set("start",a);e.set("elapsed",a-e.get("start"));a=e.get("elapsed")<c.get("duration");var k=b.map(a?W(c,e.get("elapsed")):X(c));l.get(d).forEach(Y(b,k));a?requestAnimationFrame(g):(a=h(l),a["delete"](d),l=a,c.get("complete")&&c.get("complete")(c.get("el")),
	c.get("loop")&&aa(c))}},c)};w.stop=function(a){var c=A(a),b=h(l);b.forEach(function(a,e){var f=y(a,c);f.length?b.set(e,f):b["delete"](e)});l=b};return w}();"undefined"!=typeof module&&module.exports&&(module.exports=animate);

/***/ },
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var arrayEach = __webpack_require__(8),
	    baseEach = __webpack_require__(9),
	    createForEach = __webpack_require__(30);

	/**
	 * Iterates over elements of `collection` invoking `iteratee` for each element.
	 * The `iteratee` is bound to `thisArg` and invoked with three arguments:
	 * (value, index|key, collection). Iteratee functions may exit iteration early
	 * by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length" property
	 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
	 * may be used for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @alias each
	 * @category Collection
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @param {*} [thisArg] The `this` binding of `iteratee`.
	 * @returns {Array|Object|string} Returns `collection`.
	 * @example
	 *
	 * _([1, 2]).forEach(function(n) {
	 *   console.log(n);
	 * }).value();
	 * // => logs each value from left to right and returns the array
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
	 *   console.log(n, key);
	 * });
	 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
	 */
	var forEach = createForEach(arrayEach, baseEach);

	module.exports = forEach;


/***/ },
/* 8 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.forEach` for arrays without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */
	function arrayEach(array, iteratee) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	module.exports = arrayEach;


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(10),
	    createBaseEach = __webpack_require__(29);

	/**
	 * The base implementation of `_.forEach` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Array|Object|string} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object|string} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(11),
	    keys = __webpack_require__(15);

	/**
	 * The base implementation of `_.forOwn` without support for callback
	 * shorthands and `this` binding.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(12);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var toObject = __webpack_require__(13);

	/**
	 * Creates a base function for `_.forIn` or `_.forInRight`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var iterable = toObject(object),
	        props = keysFunc(object),
	        length = props.length,
	        index = fromRight ? length : -1;

	    while ((fromRight ? index-- : ++index < length)) {
	      var key = props[index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);

	/**
	 * Converts `value` to an object if it's not one.
	 *
	 * @private
	 * @param {*} value The value to process.
	 * @returns {Object} Returns the object.
	 */
	function toObject(value) {
	  return isObject(value) ? value : Object(value);
	}

	module.exports = toObject;


/***/ },
/* 14 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(1);
	 * // => false
	 */
	function isObject(value) {
	  // Avoid a V8 JIT bug in Chrome 19-20.
	  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(16),
	    isArrayLike = __webpack_require__(20),
	    isObject = __webpack_require__(14),
	    shimKeys = __webpack_require__(24);

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeKeys = getNative(Object, 'keys');

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	var keys = !nativeKeys ? shimKeys : function(object) {
	  var Ctor = object == null ? undefined : object.constructor;
	  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
	      (typeof object != 'function' && isArrayLike(object))) {
	    return shimKeys(object);
	  }
	  return isObject(object) ? nativeKeys(object) : [];
	};

	module.exports = keys;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(17);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(18),
	    isObjectLike = __webpack_require__(19);

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var fnToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(fnToString.call(value));
	  }
	  return isObjectLike(value) && reIsHostCtor.test(value);
	}

	module.exports = isNative;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);

	/** `Object#toString` result references. */
	var funcTag = '[object Function]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in older versions of Chrome and Safari which return 'function' for regexes
	  // and Safari 8 which returns 'object' for typed array constructors.
	  return isObject(value) && objToString.call(value) == funcTag;
	}

	module.exports = isFunction;


/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(21),
	    isLength = __webpack_require__(23);

	/**
	 * Checks if `value` is array-like.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 */
	function isArrayLike(value) {
	  return value != null && isLength(getLength(value));
	}

	module.exports = isArrayLike;


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(22);

	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');

	module.exports = getLength;


/***/ },
/* 22 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	module.exports = baseProperty;


/***/ },
/* 23 */
/***/ function(module, exports) {

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 */
	function isLength(value) {
	  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(25),
	    isArray = __webpack_require__(26),
	    isIndex = __webpack_require__(27),
	    isLength = __webpack_require__(23),
	    keysIn = __webpack_require__(28);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A fallback implementation of `Object.keys` which creates an array of the
	 * own enumerable property names of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function shimKeys(object) {
	  var props = keysIn(object),
	      propsLength = props.length,
	      length = propsLength && object.length;

	  var allowIndexes = !!length && isLength(length) &&
	    (isArray(object) || isArguments(object));

	  var index = -1,
	      result = [];

	  while (++index < propsLength) {
	    var key = props[index];
	    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = shimKeys;


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(20),
	    isObjectLike = __webpack_require__(19);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Native method references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is classified as an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  return isObjectLike(value) && isArrayLike(value) &&
	    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
	}

	module.exports = isArguments;


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(16),
	    isLength = __webpack_require__(23),
	    isObjectLike = __webpack_require__(19);

	/** `Object#toString` result references. */
	var arrayTag = '[object Array]';

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objToString = objectProto.toString;

	/* Native method references for those with the same name as other `lodash` methods. */
	var nativeIsArray = getNative(Array, 'isArray');

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(function() { return arguments; }());
	 * // => false
	 */
	var isArray = nativeIsArray || function(value) {
	  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
	};

	module.exports = isArray;


/***/ },
/* 27 */
/***/ function(module, exports) {

	/** Used to detect unsigned integer values. */
	var reIsUint = /^\d+$/;

	/**
	 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
	 * of an array-like value.
	 */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}

	module.exports = isIndex;


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var isArguments = __webpack_require__(25),
	    isArray = __webpack_require__(26),
	    isIndex = __webpack_require__(27),
	    isLength = __webpack_require__(23),
	    isObject = __webpack_require__(14);

	/** Used for native method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn(object) {
	  if (object == null) {
	    return [];
	  }
	  if (!isObject(object)) {
	    object = Object(object);
	  }
	  var length = object.length;
	  length = (length && isLength(length) &&
	    (isArray(object) || isArguments(object)) && length) || 0;

	  var Ctor = object.constructor,
	      index = -1,
	      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
	      result = Array(length),
	      skipIndexes = length > 0;

	  while (++index < length) {
	    result[index] = (index + '');
	  }
	  for (var key in object) {
	    if (!(skipIndexes && isIndex(key, length)) &&
	        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = keysIn;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(21),
	    isLength = __webpack_require__(23),
	    toObject = __webpack_require__(13);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    var length = collection ? getLength(collection) : 0;
	    if (!isLength(length)) {
	      return eachFunc(collection, iteratee);
	    }
	    var index = fromRight ? length : -1,
	        iterable = toObject(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var bindCallback = __webpack_require__(31),
	    isArray = __webpack_require__(26);

	/**
	 * Creates a function for `_.forEach` or `_.forEachRight`.
	 *
	 * @private
	 * @param {Function} arrayFunc The function to iterate over an array.
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @returns {Function} Returns the new each function.
	 */
	function createForEach(arrayFunc, eachFunc) {
	  return function(collection, iteratee, thisArg) {
	    return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
	      ? arrayFunc(collection, iteratee)
	      : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
	  };
	}

	module.exports = createForEach;


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var identity = __webpack_require__(32);

	/**
	 * A specialized version of `baseCallback` which only supports `this` binding
	 * and specifying the number of arguments to provide to `func`.
	 *
	 * @private
	 * @param {Function} func The function to bind.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {number} [argCount] The number of arguments to provide to `func`.
	 * @returns {Function} Returns the callback.
	 */
	function bindCallback(func, thisArg, argCount) {
	  if (typeof func != 'function') {
	    return identity;
	  }
	  if (thisArg === undefined) {
	    return func;
	  }
	  switch (argCount) {
	    case 1: return function(value) {
	      return func.call(thisArg, value);
	    };
	    case 3: return function(value, index, collection) {
	      return func.call(thisArg, value, index, collection);
	    };
	    case 4: return function(accumulator, value, index, collection) {
	      return func.call(thisArg, accumulator, value, index, collection);
	    };
	    case 5: return function(value, other, key, object, source) {
	      return func.call(thisArg, value, other, key, object, source);
	    };
	  }
	  return function() {
	    return func.apply(thisArg, arguments);
	  };
	}

	module.exports = bindCallback;


/***/ },
/* 32 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument provided to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Utility
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ }
/******/ ]);