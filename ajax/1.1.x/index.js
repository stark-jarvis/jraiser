/*!
 * JRaiser 2 Javascript Library
 * querystring - v1.0.4 (2015-08-04T17:09:54+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("querystring/1.0.x/",null,function(e,n,r){"use strict";function t(e,n,r){return r(e)+(null==n?"":"="+r(n))}var i=e("base/1.1.x/");return{stringify:function(e,n){if("string"==typeof e)return e;n=i.extend({encode:encodeURIComponent},n);var r=[];if(i.isArray(e))e.forEach(function(e){r.push(t(e.name,e.value,n.encode))});else for(var o in e)r.push(t(o,e[o],n.encode));return r.join("&")},parse:function(e,n){n=i.extend({decode:decodeURIComponent},n);var r="array"===n.dataType,t=r?[]:{};return e=(e||window.location.search).replace(/^\?+/,"").split("&").forEach(function(e){e&&(e=e.split("="),e.length<2&&e.push(null),r?t.push({name:n.decode(e[0]),value:n.decode(e[1])}):t[n.decode(e[0])]=n.decode(e[1]))}),t},append:function(e,n,r){if(!n||i.isArray(n)&&!n.length||i.isEmptyObject(n))return e;n="string"!=typeof n?this.stringify(n,r):n.replace(/^[?&]+/,"");var t=e.indexOf("#"),o="";return-1!==t&&(o=e.substring(t,e.length),e=e.substring(0,t)),e=e.replace(/[?&]+$/,""),e+(-1===e.indexOf("?")?"?":"&")+n+o}}});
/*!
 * JRaiser 2 Javascript Library
 * ajax - v1.1.2 (2015-04-23T17:00:22+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("ajax/1.1.x/",["base/1.0.x/","base/1.1.x/"],function(e,t,a){"use strict";function n(e,t){function a(){var e=this.readyState;e&&"loaded"!==e&&"complete"!==e||(this[s]=null,t.onload&&t.onload.call(this),"SCRIPT"===this.nodeName&&this.parentNode.removeChild(this)),n=null}var n,o=document.getElementsByTagName("head")[0]||document.documentElement;t.data&&(e=c.append(e,t.data)),t.nocache&&(e=c.append(e,{_:+new Date})),n=r.mix(document.createElement(t.nodeName),t.nodeAttrs,{ignoreNull:!0}),n[t.urlAttrName]=e,n[s]=a,document.body?o.appendChild(n):o.insertBefore(n,o.firstChild)}function o(){var e;do e="jsonp_callback"+d+"_"+ ++i;while(window[e]);return e}var r=e("base/1.0.x/"),c=e("querystring/1.0.x/"),s="onload"in document.createElement("script")?"onload":"onreadystatechange",i=0,d=parseInt(1e5*Math.random()),l=window.ActiveXObject?function(){try{return new ActiveXObject("Microsoft.XMLHTTP")}catch(e){}}:function(){try{return new XMLHttpRequest}catch(e){}};return{serializeForm:function(e,t){if("nodeType"in e||"function"!=typeof e.get||(e=e.get(0)),"FORM"!==e.tagName)throw new Error("invalid form element");for(var a,n=[],o=e.elements,r=0;a=o[r];r++)!a.disabled&&a.name&&("INPUT"!==a.tagName||"radio"!==a.type&&"checkbox"!==a.type||a.checked)&&n.push({name:a.name,value:a.value.trim()});return"string"===t&&(n=c.stringify(n)),n},createXHR:l,getCSS:function(e,t){"function"==typeof t?t={onload:t}:t||(t={}),t=r.extend({nodeName:"link",urlAttrName:"href",nodeAttrs:{rel:"stylesheet",type:"text/css",media:t.media,charset:t.charset}},t),n(e,t)},getScript:function(e,t){"function"==typeof t?t={onload:t}:t||(t={}),t=r.extend({nodeName:"script",urlAttrName:"src",nodeAttrs:{type:"text/javascript",charset:t.charset,async:!0},nocache:!0},t),n(e,t)},jsonp:function(e,t){t=t||{},t.data=t.data||{};var a=t.callbackName||o(),n=t.oncomplete;r.isArray(t.data)?t.data.push({name:"callback",value:a}):t.data.callback=a,window[a]=t.onsuccess,t.onload=function(){if(window[a])try{delete window[a]}catch(e){window[a]=null}n&&n.apply(this,arguments)},this.getScript(e,t)},send:function(e,t){if("string"!=typeof e&&(t=e,e=t.url),t.dataType&&(t.dataType=t.dataType.toLowerCase()),"jsonp"===t.dataType)return this.jsonp(e,r.mix({},t,{whiteList:["callbackName","onsuccess","oncomplete","data","charset","nocache"],ignoreNull:!0}));var a=function(e,a){var n=d.readyState;if(4===n||a){var o,r=4===n?d.status:0;if(r>=200&&300>r||1223===r||304===r?(o="onsuccess",a="success"):(r||a)&&(o="onerror",a||(a="error")),t.onload&&t.onload.call(window,d,a),o){var c;if("onsuccess"===o)switch(t.dataType){case"json":var s=(d.responseText||"").trim();if(s)try{c=JSON.parse(s)}catch(e){o="onerror",a="parsererror"}break;case"xml":c=d.responseXML,c&&!c.documentElement&&(c=null),c||(o="onerror",a="parsererror");break;default:c=d.responseText}var i=t[o],l=[d,a];"onsuccess"===o&&l.unshift(c),i&&i.apply(window,l)}t.oncomplete&&t.oncomplete.call(window,d,a)}},n=(t.method||"GET").toUpperCase(),o="boolean"==typeof t.async?o:!0,s=t.data,i=t.headers||{},d=t.xhr||l();if(s)switch(s=c.stringify(s),n){case"GET":e=c.append(e,s),s=null;break;case"POST":r.mix(i,{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},{overwrite:!1})}t.nocache!==!1&&(e=c.append(e,{_:+new Date})),o&&(t.timeout>0&&setTimeout(function(){4!==d.readyState&&(d.abort(),a.call(d,null,"timeout"))},t.timeout),d.onreadystatechange=a),t.username?d.open(n,e,o,t.username,t.password):d.open(n,e,o),i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(var u in i)i.hasOwnProperty(u)&&d.setRequestHeader(u,i[u]);return t.onbeforesend&&t.onbeforesend.call(window,d),d.send(s||""),o||a.call(d),d}}});