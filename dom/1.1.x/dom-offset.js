/*!
 * JRaiser 2 Javascript Library
 * dom-offset - v1.1.0 (2014-12-08T11:39:30+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("dom/1.1.x/dom-offset",["dom/1.1.x/dom-base","dom/1.1.x/dom-style","dom/1.1.x/sizzle"],function(t,e,o){"use strict";function n(t){if(!c.isHTMLElement(t))return{};var e=t.ownerDocument,o=e.documentElement;if(!e||!u.contains(o,t))return{};var n=t.getBoundingClientRect(),r=c.getWindow(e);return{top:n.top+(r.pageYOffset||o.scrollTop)-(o.clientTop||0),left:n.left+(r.pageXOffset||o.scrollLeft)-(o.clientLeft||0)}}function r(t){if(c.isHTMLElement(t)){for(var e=document.documentElement,o=t.offsetParent||e;o&&"HTML"!==o.nodeName&&"static"===a.getStyle(o,"position");)o=o.offsetParent;return o||e}}function l(t){if(!c.isHTMLElement(t))return{};var e,o={top:0,left:0};if("fixed"===a.getStyle(t,"position"))e=t.getBoundingClientRect();else{var l=r(t);e=n(t),"HTML"!==l.nodeName&&(o=n(l)),o.top+=parseFloat(a.getStyle(l,"borderTopWidth"))||0,o.left+=parseFloat(a.getStyle(l,"borderLeftWidth"))||0}return{top:e.top-o.top-(parseFloat(a.getStyle(t,"marginTop"))||0),left:e.left-o.left-(parseFloat(a.getStyle(t,"marginLeft"))||0)}}function s(t){return"scroll"+t.toLowerCase().replace(/^[a-z]/,function(t){return t.toUpperCase()})}function i(t,e){var o=c.getWindow(t);return e=s(e),o&&o===t?p[e]in o?o[p[e]]:o.document.documentElement[e]:t[e]}function f(t,e,o){var n=c.getWindow(t);if(a.rRelNumber.test(o)&&(o=(i(t,e)||0)+parseFloat(RegExp.$1+RegExp.$2,10)),n===t)switch(e.toLowerCase()){case"top":window.scrollTo(i(t,"left"),o);break;case"left":window.scrollTo(o,i(t,"top"))}else t[s(e)]=o}var c=t("./dom-base"),a=t("./dom-style"),u=t("./sizzle"),p={scrollTop:"pageYOffset",scrollLeft:"pageXOffset"};return{getScroll:i,setScroll:f,shortcuts:{offsetParent:function(){var t=r(this[0]);return new this.constructor(t?[t]:null)},offset:function(){return n(this[0])},position:function(){return l(this[0])},scrollTop:function(t){return c.access(this,"top",t,!0,{get:i,set:f})},scrollLeft:function(t){return c.access(this,"left",t,!0,{get:i,set:f})}}}});