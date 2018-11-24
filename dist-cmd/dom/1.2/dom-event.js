define("dom/1.2/dom-event",["base/1.2/base","dom/1.2/dom-base","dom/1.2/dom-data","dom/1.2/dom-event-arg","dom/1.2/sizzle"],function(e,t,n){"use strict";var a,p,i,c=e("../../base/1.2/base"),o=e("./dom-base"),r=e("./dom-data"),l=e("./dom-event-arg"),u=e("./sizzle");document.addEventListener?(a=function(e,t,n){e.addEventListener(t,n,!1)},p=function(e,t,n){e.removeEventListener(t,n,!1)}):document.attachEvent&&(a=function(e,t,n){e.attachEvent("on"+t,n)},p=function(e,t,n){e.detachEvent("on"+t,n)},i=!0);var s={},f={props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),keyHook:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHook:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement touches".split(" "),filter:function(e,t){var n,r,o,a=t.button,i=t.fromElement,c=t.touches;return c&&1===c.length&&(e.pageX=c[0].pageX,e.pageY=c[0].pageY),null==e.pageX&&null!=t.clientX&&(r=(n=e.target.ownerDocument||document).documentElement,o=n.body,e.pageX=t.clientX+(r&&r.scrollLeft||o&&o.scrollLeft||0)-(r&&r.clientLeft||o&&o.clientLeft||0),e.pageY=t.clientY+(r&&r.scrollTop||o&&o.scrollTop||0)-(r&&r.clientTop||o&&o.clientTop||0)),!e.relatedTarget&&i&&(e.relatedTarget=i===e.target?t.toElement:i),e.which||null==a||(e.which=1&a?1:2&a?3:4&a?2:0),e}},fix:function(t){if(t instanceof l)return t;var n=t,e=this[s[t.type]+"Hook"],r=e&&e.props?this.props.concat(e.props):this.props;return t=new l(t),r.forEach(function(e){e in n&&(t[e]=n[e])}),t.target||(t.target=n.srcElement||document),3===t.target.nodeType&&(t.target=t.target.parentNode),t.metaKey=!!t.metaKey,e&&e.filter?e.filter(t,n):t}},h={};c.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(e,a){h[a]={bindType:e,handle:function(e,t){var n,r=t.relatedTarget;if(!t||!r||r!==this&&!u.contains(this,r)){var o=t.type;t.type=a,n=e.handler.call(this,t),t.type=o}return n}}});var d,m=r.createDataSpace({cloneable:!1});function g(r){r=f.fix(r);var o=this,a=r.type,i=r.target;if(!(m.get(o,a)||i&&m.get(i,a))){var e=h[a]?h[a].bindType:a,t=d.get(o,e);t&&t.forEach(function(e){if(!r.isTrigger||e.trueType===a){var t;if(e.delegator){for(var n=i;n&&n!==o;){if(u.matchesSelector(n,e.delegator)){t=n,r.delegateTarget=o;break}n=n.parentNode}if(!t)return}else t=o;"data"in r||(r.data=e.data),!1===(e.handle?e.handle.call(t,e,r):e.handler.call(t,r))&&r.preventDefault(),!0===r.cancelBubble&&r.stopPropagation()}})}}function v(t){return function(e){if(o.isWindow(e)||o.isHTMLElement(e,!0))return t.apply(this,arguments)}}d=function(){var s="__dispatch__";function o(e,t,n){var r;i?(r=function(){return g.apply(e,arguments)},n.set(e,s,r)):r=g,a(e,t,r)}var f=r.createDataSpace({onClone:function(t,e){var n;i&&(n=this.get(e,s)),this.keys(t).forEach(function(e){e!==s&&(n&&p(t,e,n),o(t,e,this))})}});return{add:function(e,t,n){if(t!==s){var r=f.get(e,t);r||(r=[],f.set(e,t,r),o(e,t,f)),r.push(n)}},get:function(e,t){return f.get(e,t)},remove:function(t,e,n,r,o){var a;if(o||r){var i=f.get(t,n);if(i){for(var c=i.length-1;0<=c;c--)i[c].trueType!==e||o&&i[c].handler!==o||r&&i[c].namespace!==r||i.splice(c,1);i.length||(a=1)}}else a=e?1:2;var l=f.get(t,s)||g;1===a&&(f.remove(t,n),p(t,n,l));var u=f.keys(t);u&&(2===a?(u.forEach(function(e){e!==s&&p(t,e,l)}),u=null):1===u.length&&u[0]===s&&(u=null)),u||f.clear(t)}}}();var y=v(function(n,e,r,o){if("function"!=typeof r)throw new Error("Handler must be a function");e.forEach(function(e){e=e.split(".");var t=h[e[0]];d.add(n,t?t.bindType:e[0],c.extend({},o,{handler:r,trueType:e[0],handle:t?t.handle:null,namespace:e[1]}))})}),b=v(function(n,e,r){e?e.forEach(function(e){e=e.split(".");var t=h[e[0]];d.remove(n,e[0],t?t.bindType:e[0],e[1],r)}):d.remove(n)}),E={key:{view:window,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,keyCode:0,charCode:0},mouse:{view:window,screenX:0,screenY:0,clientX:0,clientY:0,ctrlKey:!1,altKey:!1,shiftKey:!1,metaKey:!1,button:0},ui:{view:window}},w={focus:!0,blur:!0,click:!0,reset:!0,submit:!0},k={scroll:!0,resize:!0,select:!0,error:!0,reset:!0,submit:!0,change:!0,abort:!0},T=v(function(e,t,n){if(t){n=n||{};var r=f.fix(c.extend({type:t,target:e},E[s[t]])),o=e,a=null!=n.bubbles?n.bubbles:k[t];for(r.isTrigger=!0,null!=n.data&&(r.data=n.data);g.call(e,r),e=e.parentNode,a&&e&&!r.isPropagationStopped(););w[t]&&!r.isDefaultPrevented()&&t in o&&(m.set(o,t,!0),o[t](),m.remove(o,t))}}),K={on:function(t,n,r){return(t=o.splitBySpace(t))&&this.forEach(function(e){y(e,t,n,r)}),this},off:function(t,n){return t&&(t=o.splitBySpace(t)),this.forEach(function(e){b(e,t,n)}),this},trigger:function(t,n){return this.forEach(function(e){T(e,t,n)}),this}},X=/^key/,Y=/^(?:mouse|contextmenu|touch)|click/;"blur focus focusin focusout load resize scroll unload contextmenu click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave touchstart touchmove touchend change select submit keydown keypress keyup".split(" ").forEach(function(n){X.test(n)?(k[n]=!0,s[n]="key"):Y.test(n)&&(k[n]=!0,s[n]="mouse"),K[n]=function(e,t){return arguments.length?this.on(n,e,t):this.trigger(n)}}),t.shortcuts=K});