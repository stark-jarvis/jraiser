/*!
 * JRaiser 2 Javascript Library
 * dom-style - v1.1.0 (2014-12-08T11:19:20+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("dom/1.1.x/dom-style",["dom/1.1.x/dom-base"],function(t,e,n){"use strict";function i(t){if(t in y.style)return t;for(var e,n=t.charAt(0).toUpperCase()+t.slice(1),i=N.length-1;i>=0;i--)if(e=N[i]+n,e in y.style)return e;return t}function r(t){var e=t.replace(C,function(t,e){return e.toUpperCase()});return t=g[e]||(g[e]=i(e)),v[t]||v[e]||t}function s(t,e){return H[t]||""===e||isNaN(e)?e:e+"px"}function o(t,e){return e&&p.isHTMLElement(t)?(e=r(e),e.get?e.get(t):e in t.style?S(t,e):void 0):void 0}function a(t,e,n){e&&p.isHTMLElement(t)&&(m.test(n)&&(n=(parseFloat(o(t,e),10)||0)+parseFloat(RegExp.$1+RegExp.$2,10)),e=r(e),n=s(e,n),e.set?e.set(t,n):e in t.style&&(t.style[e]=n))}function l(t,e){var n=t.indexOf(e);return-1!=n&&32===(t.charCodeAt(n-1)||32)&&32===(t.charCodeAt(n+e.length)||32)}function c(t,e){if(!e)throw new Error("classname is not specified");return p.isHTMLElement(t)?l(t.className,e):!1}function u(t,e){if(p.isHTMLElement(t)&&e){for(var n=t.className,i=-1,r=e.length;++i<r;)l(n,e[i])||(n+=" "+e[i]);n=n.trim(),n!==t.className&&(t.className=n)}}function f(t,e){if(p.isHTMLElement(t)){var n=t.className;if(n)if(e){for(var i=" "+n+" ",r=-1,s=e.length;++r<s;)i=i.replace(" "+e[r]+" "," ");i=i.trim(),i!==n&&(t.className=i)}else t.className=""}}function h(t,e){if(p.isHTMLElement(t)&&e){for(var n,i=" "+t.className+" ",r=-1,s=e.length;++r<s;)n=" "+e[r]+" ",-1===i.indexOf(n)?i+=e[r]+" ":i=i.replace(n," ");t.className=i.trim()}}function d(t,e,n,i,r){if(e=e.toLowerCase().replace(/^[a-z]/,function(t){return t.toUpperCase()}),p.isWindow(t))return t.document.documentElement["client"+e];if(9===t.nodeType)return t.documentElement["scroll"+e];if(!t.ownerDocument||1!==t.nodeType||p.isXMLNode(t))return 0;var s=t["offset"+e];if(!(s+t.offsetWidth+t.offsetHeight)){var a=t;do{if("none"===o(a,"display"))return s;a=a.parentNode}while(a)}var l=o(t,"borderStyle");return"none"===l&&(l=""),("Width"===e?["Left","Right"]:["Top","Bottom"]).forEach(function(e){n||(s-=parseFloat(o(t,"padding"+e))||0),!i&&l&&(s-=parseFloat(o(t,"border"+e+"Width"))||0),r&&(s+=parseFloat(o(t,"margin"+e))||0)}),s}var p=t("./dom-base"),m=/^([+-])=(\d+(?:\.\d+)?)$/,y=document.documentElement,g={"float":"cssFloat"in y.style?"cssFloat":"styleFloat"},v={};if(!("opacity"in y.style)){var w=/opacity\s*=\s*([^)]*)/,E=/alpha\([^)]*\)/i;v.opacity={get:function(t){return w.test(t.currentStyle.filter||"")?Number(RegExp.$1)/100+"":"1"},set:function(t,e){var n=t.currentStyle.filter||"",i=t.style;if(e=parseFloat(e),i.zoom=1,(isNaN(e)||e>=1)&&""===n.replace(E,"").trim())i.removeAttribute("filter");else{var r="alpha(opacity="+100*Math.min(1,e)+")";i.filter=E.test(n)?n.replace(E,r):n+" "+r}}}}var N=["O","Moz","ms","Webkit"],C=/-([a-z])/g,H={columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},S="getComputedStyle"in window?function(t,e){return t.ownerDocument.defaultView.getComputedStyle(t,null)[e]||""}:function(t,e){return(t.currentStyle[e]||"").toLowerCase()},W=function(){var t={};return{get:function(e){if(!t[e]){var n=document.createElement(e);document.body.appendChild(n);var i=o(n,"display");t[e]="none"===i?"block":i,n.parentNode.removeChild(n),n=null}return t[e]}}}();return{rRelNumber:m,getStyle:o,setStyle:a,getSize:d,shortcuts:{css:function(t,e){return p.access(this,t,e,!0,{get:o,set:a})},hasClass:function(t){return this.some(function(e){return c(e,t)})},addClass:function(t){return t=p.splitBySpace(t),this.forEach(function(e){u(e,t)}),this},removeClass:function(t){return t=p.splitBySpace(t),this.forEach(function(e){f(e,t)}),this},toggleClass:function(t,e){switch(e){case!0:return this.addClass(t);case!1:return this.removeClass(t)}return t=p.splitBySpace(t),this.forEach(function(e){h(e,t)}),this},width:function(t){return null!=t?this.css("width",t):d(this[0],"Width")},height:function(t){return null!=t?this.css("height",t):d(this[0],"Height")},innerWidth:function(){return d(this[0],"Width",!0)},innerHeight:function(){return d(this[0],"Height",!0)},outerWidth:function(t){return d(this[0],"Width",!0,!0,t)},outerHeight:function(t){return d(this[0],"Height",!0,!0,t)},show:function(){return this.forEach(function(t){"none"===t.style.display&&(t.style.display=""),"none"===o(t,"display")&&(t.style.display=W.get(t.nodeName))}),this},hide:function(){return this.css("display","none")},toggle:function(t){return"boolean"!=typeof t&&(t="none"===this.css("display")),this[t?"show":"hide"]()}}}});