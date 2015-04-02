/*!
 * JRaiser 2 Javascript Library
 * es5-shim - v4.0.1 (2014-08-01T15:07:57+0800)
 * http://jraiser.org/ | Released under MIT license
 *
 * Include es5-shim (https://github.com/kriskowal/es5-shim)
 */
define("es5-shim/4.0.x/",null,function(){function t(t){return t=+t,t!==t?t=0:0!==t&&t!==1/0&&t!==-(1/0)&&(t=(t>0||-1)*Math.floor(Math.abs(t))),t}function e(t){var e=typeof t;return null===t||"undefined"===e||"boolean"===e||"number"===e||"string"===e}function r(t){var r,n,i;if(e(t))return t;if(n=t.valueOf,y(n)&&(r=n.call(t),e(r)))return r;if(i=t.toString,y(i)&&(r=i.call(t),e(r)))return r;throw new TypeError}function n(){}var i,o=Array.prototype,a=Object.prototype,u=Function.prototype,l=String.prototype,s=Number.prototype,c=o.slice,f=o.splice,p=(o.push,o.unshift),h=u.call,g=a.toString,y=function(t){return"[object Function]"===a.toString.call(t)},v=function(t){return"[object RegExp]"===a.toString.call(t)},d=function(t){return"[object Array]"===g.call(t)},m=function(t){return"[object String]"===g.call(t)},b=function(t){var e=g.call(t),r="[object Arguments]"===e;return r||(r=!d(t)&&null!==t&&"object"==typeof t&&"number"==typeof t.length&&t.length>=0&&y(t.callee)),r},w=Object.defineProperty&&function(){try{return Object.defineProperty({},"x",{}),!0}catch(t){return!1}}();i=w?function(t,e,r,n){!n&&e in t||Object.defineProperty(t,e,{configurable:!0,enumerable:!1,writable:!0,value:r})}:function(t,e,r,n){!n&&e in t||(t[e]=r)};var x=function(t,e,r){for(var n in e)a.hasOwnProperty.call(e,n)&&i(t,n,e[n],r)},S=function(t){if(null==t)throw new TypeError("can't convert "+t+" to object");return Object(t)},O=function(t){return t>>>0};x(u,{bind:function(t){var e=this;if(!y(e))throw new TypeError("Function.prototype.bind called on incompatible "+e);for(var r=c.call(arguments,1),i=function(){if(this instanceof l){var n=e.apply(this,r.concat(c.call(arguments)));return Object(n)===n?n:this}return e.apply(t,r.concat(c.call(arguments)))},o=Math.max(0,e.length-r.length),a=[],u=0;o>u;u++)a.push("$"+u);var l=Function("binder","return function ("+a.join(",")+"){return binder.apply(this,arguments)}")(i);return e.prototype&&(n.prototype=e.prototype,l.prototype=new n,n.prototype=null),l}});var T,j,E,N,I,D=h.bind(a.hasOwnProperty);(I=D(a,"__defineGetter__"))&&(T=h.bind(a.__defineGetter__),j=h.bind(a.__defineSetter__),E=h.bind(a.__lookupGetter__),N=h.bind(a.__lookupSetter__));var _=function(){var t=[1,2],e=t.splice();return 2===t.length&&d(e)&&0===e.length}();x(o,{splice:function(t,e){return 0===arguments.length?[]:f.apply(this,arguments)}},_);var M=function(){var t={};return o.splice.call(t,0,0,1),1===t.length}();x(o,{splice:function(e,r){if(0===arguments.length)return[];var n=arguments;return this.length=Math.max(t(this.length),0),arguments.length>0&&"number"!=typeof r&&(n=c.call(arguments),n.length<2?n.push(this.length-e):n[1]=t(r)),f.apply(this,n)}},!M);var F=1!==[].unshift(0);x(o,{unshift:function(){return p.apply(this,arguments),this.length}},F),x(Array,{isArray:d});var R=Object("a"),k="a"!==R[0]||!(0 in R),C=function(t){var e=!0,r=!0;return t&&(t.call("foo",function(t,r,n){"object"!=typeof n&&(e=!1)}),t.call([1],function(){"use strict";r="string"==typeof this},"x")),!!t&&e&&r};x(o,{forEach:function(t){var e=S(this),r=k&&m(this)?this.split(""):e,n=arguments[1],i=-1,o=r.length>>>0;if(!y(t))throw new TypeError;for(;++i<o;)i in r&&t.call(n,r[i],i,e)}},!C(o.forEach)),x(o,{map:function(t){var e=S(this),r=k&&m(this)?this.split(""):e,n=r.length>>>0,i=Array(n),o=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var a=0;n>a;a++)a in r&&(i[a]=t.call(o,r[a],a,e));return i}},!C(o.map)),x(o,{filter:function(t){var e,r=S(this),n=k&&m(this)?this.split(""):r,i=n.length>>>0,o=[],a=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var u=0;i>u;u++)u in n&&(e=n[u],t.call(a,e,u,r)&&o.push(e));return o}},!C(o.filter)),x(o,{every:function(t){var e=S(this),r=k&&m(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var o=0;n>o;o++)if(o in r&&!t.call(i,r[o],o,e))return!1;return!0}},!C(o.every)),x(o,{some:function(t){var e=S(this),r=k&&m(this)?this.split(""):e,n=r.length>>>0,i=arguments[1];if(!y(t))throw new TypeError(t+" is not a function");for(var o=0;n>o;o++)if(o in r&&t.call(i,r[o],o,e))return!0;return!1}},!C(o.some));var U=!1;o.reduce&&(U="object"==typeof o.reduce.call("es5",function(t,e,r,n){return n})),x(o,{reduce:function(t){var e=S(this),r=k&&m(this)?this.split(""):e,n=r.length>>>0;if(!y(t))throw new TypeError(t+" is not a function");if(!n&&1===arguments.length)throw new TypeError("reduce of empty array with no initial value");var i,o=0;if(arguments.length>=2)i=arguments[1];else for(;;){if(o in r){i=r[o++];break}if(++o>=n)throw new TypeError("reduce of empty array with no initial value")}for(;n>o;o++)o in r&&(i=t.call(void 0,i,r[o],o,e));return i}},!U);var A=!1;o.reduceRight&&(A="object"==typeof o.reduceRight.call("es5",function(t,e,r,n){return n})),x(o,{reduceRight:function(t){var e=S(this),r=k&&m(this)?this.split(""):e,n=r.length>>>0;if(!y(t))throw new TypeError(t+" is not a function");if(!n&&1===arguments.length)throw new TypeError("reduceRight of empty array with no initial value");var i,o=n-1;if(arguments.length>=2)i=arguments[1];else for(;;){if(o in r){i=r[o--];break}if(--o<0)throw new TypeError("reduceRight of empty array with no initial value")}if(0>o)return i;do o in r&&(i=t.call(void 0,i,r[o],o,e));while(o--);return i}},!A);var P=Array.prototype.indexOf&&-1!==[0,1].indexOf(1,2);x(o,{indexOf:function(e){var r=k&&m(this)?this.split(""):S(this),n=r.length>>>0;if(!n)return-1;var i=0;for(arguments.length>1&&(i=t(arguments[1])),i=i>=0?i:Math.max(0,n+i);n>i;i++)if(i in r&&r[i]===e)return i;return-1}},P);var Z=Array.prototype.lastIndexOf&&-1!==[0,1].lastIndexOf(0,-3);x(o,{lastIndexOf:function(e){var r=k&&m(this)?this.split(""):S(this),n=r.length>>>0;if(!n)return-1;var i=n-1;for(arguments.length>1&&(i=Math.min(i,t(arguments[1]))),i=i>=0?i:n-Math.abs(i);i>=0;i--)if(i in r&&e===r[i])return i;return-1}},Z);var J=!{toString:null}.propertyIsEnumerable("toString"),z=function(){}.propertyIsEnumerable("prototype"),$=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],G=$.length;x(Object,{keys:function(t){var e=y(t),r=b(t),n=null!==t&&"object"==typeof t,i=n&&m(t);if(!n&&!e&&!r)throw new TypeError("Object.keys called on a non-object");var o=[],a=z&&e;if(i||r)for(var u=0;u<t.length;++u)o.push(String(u));else for(var l in t)a&&"prototype"===l||!D(t,l)||o.push(String(l));if(J)for(var s=t.constructor,c=s&&s.prototype===t,f=0;G>f;f++){var p=$[f];c&&"constructor"===p||!D(t,p)||o.push(p)}return o}});var B=Object.keys&&function(){return 2===Object.keys(arguments).length}(1,2),H=Object.keys;x(Object,{keys:function(t){return H(b(t)?o.slice.call(t):t)}},!B);var L=-621987552e5,X="-000001",Y=Date.prototype.toISOString&&-1===new Date(L).toISOString().indexOf(X);x(Date.prototype,{toISOString:function(){var t,e,r,n,i;if(!isFinite(this))throw new RangeError("Date.prototype.toISOString called on non-finite value.");for(n=this.getUTCFullYear(),i=this.getUTCMonth(),n+=Math.floor(i/12),i=(i%12+12)%12,t=[i+1,this.getUTCDate(),this.getUTCHours(),this.getUTCMinutes(),this.getUTCSeconds()],n=(0>n?"-":n>9999?"+":"")+("00000"+Math.abs(n)).slice(n>=0&&9999>=n?-4:-6),e=t.length;e--;)r=t[e],10>r&&(t[e]="0"+r);return n+"-"+t.slice(0,2).join("-")+"T"+t.slice(2).join(":")+"."+("000"+this.getUTCMilliseconds()).slice(-3)+"Z"}},Y);var q=!1;try{q=Date.prototype.toJSON&&null===new Date(0/0).toJSON()&&-1!==new Date(L).toJSON().indexOf(X)&&Date.prototype.toJSON.call({toISOString:function(){return!0}})}catch(K){}q||(Date.prototype.toJSON=function(t){var e,n=Object(this),i=r(n);if("number"==typeof i&&!isFinite(i))return null;if(e=n.toISOString,"function"!=typeof e)throw new TypeError("toISOString property is not callable");return e.call(n)});var Q=1e15===Date.parse("+033658-09-27T01:46:40.000Z"),V=!isNaN(Date.parse("2012-04-04T24:00:00.500Z"))||!isNaN(Date.parse("2012-11-31T23:59:59.000Z")),W=isNaN(Date.parse("2000-01-01T00:00:00.000Z"));(!Date.parse||W||V||!Q)&&(Date=function(t){function e(r,n,i,o,a,u,l){var s=arguments.length;if(this instanceof t){var c=1===s&&String(r)===r?new t(e.parse(r)):s>=7?new t(r,n,i,o,a,u,l):s>=6?new t(r,n,i,o,a,u):s>=5?new t(r,n,i,o,a):s>=4?new t(r,n,i,o):s>=3?new t(r,n,i):s>=2?new t(r,n):s>=1?new t(r):new t;return c.constructor=e,c}return t.apply(this,arguments)}function r(t,e){var r=e>1?1:0;return o[e]+Math.floor((t-1969+r)/4)-Math.floor((t-1901+r)/100)+Math.floor((t-1601+r)/400)+365*(t-1970)}function n(e){return Number(new t(1970,0,1,0,0,0,e))}var i=new RegExp("^(\\d{4}|[+-]\\d{6})(?:-(\\d{2})(?:-(\\d{2})(?:T(\\d{2}):(\\d{2})(?::(\\d{2})(?:(\\.\\d{1,}))?)?(Z|(?:([-+])(\\d{2}):(\\d{2})))?)?)?)?$"),o=[0,31,59,90,120,151,181,212,243,273,304,334,365];for(var a in t)e[a]=t[a];return e.now=t.now,e.UTC=t.UTC,e.prototype=t.prototype,e.prototype.constructor=e,e.parse=function(e){var o=i.exec(e);if(o){var a,u=Number(o[1]),l=Number(o[2]||1)-1,s=Number(o[3]||1)-1,c=Number(o[4]||0),f=Number(o[5]||0),p=Number(o[6]||0),h=Math.floor(1e3*Number(o[7]||0)),g=Boolean(o[4]&&!o[8]),y="-"===o[9]?1:-1,v=Number(o[10]||0),d=Number(o[11]||0);return(f>0||p>0||h>0?24:25)>c&&60>f&&60>p&&1e3>h&&l>-1&&12>l&&24>v&&60>d&&s>-1&&s<r(u,l+1)-r(u,l)&&(a=60*(24*(r(u,l)+s)+c+v*y),a=1e3*(60*(a+f+d*y)+p)+h,g&&(a=n(a)),a>=-864e13&&864e13>=a)?a:0/0}return t.parse.apply(this,arguments)},e}(Date)),Date.now||(Date.now=function(){return(new Date).getTime()});var tt=s.toFixed&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==0xde0b6b3a7640080.toFixed(0)),et={base:1e7,size:6,data:[0,0,0,0,0,0],multiply:function(t,e){for(var r=-1;++r<et.size;)e+=t*et.data[r],et.data[r]=e%et.base,e=Math.floor(e/et.base)},divide:function(t){for(var e=et.size,r=0;--e>=0;)r+=et.data[e],et.data[e]=Math.floor(r/t),r=r%t*et.base},numToString:function(){for(var t=et.size,e="";--t>=0;)if(""!==e||0===t||0!==et.data[t]){var r=String(et.data[t]);""===e?e=r:e+="0000000".slice(0,7-r.length)+r}return e},pow:function ht(t,e,r){return 0===e?r:e%2===1?ht(t,e-1,r*t):ht(t*t,e/2,r)},log:function(t){for(var e=0;t>=4096;)e+=12,t/=4096;for(;t>=2;)e+=1,t/=2;return e}};x(s,{toFixed:function(t){var e,r,n,i,o,a,u,l;if(e=Number(t),e=e!==e?0:Math.floor(e),0>e||e>20)throw new RangeError("Number.toFixed called with invalid number of decimals");if(r=Number(this),r!==r)return"NaN";if(-1e21>=r||r>=1e21)return String(r);if(n="",0>r&&(n="-",r=-r),i="0",r>1e-21)if(o=et.log(r*et.pow(2,69,1))-69,a=0>o?r*et.pow(2,-o,1):r/et.pow(2,o,1),a*=4503599627370496,o=52-o,o>0){for(et.multiply(0,a),u=e;u>=7;)et.multiply(1e7,0),u-=7;for(et.multiply(et.pow(10,u,1),0),u=o-1;u>=23;)et.divide(1<<23),u-=23;et.divide(1<<u),et.multiply(1,1),et.divide(2),i=et.numToString()}else et.multiply(0,a),et.multiply(1<<-o,0),i=et.numToString()+"0.00000000000000000000".slice(2,2+e);return e>0?(l=i.length,i=e>=l?n+"0.0000000000000000000".slice(0,e-l+2)+i:n+i.slice(0,l-e)+"."+i.slice(l-e)):i=n+i,i}},tt);var rt=l.split;2!=="ab".split(/(?:ab)*/).length||4!==".".split(/(.?)(.?)/).length||"t"==="tesst".split(/(s)*/)[1]||4!=="test".split(/(?:)/,-1).length||"".split(/.?/).length||".".split(/()()/).length>1?!function(){var t=void 0===/()??/.exec("")[1];l.split=function(e,r){var n=this;if(void 0===e&&0===r)return[];if("[object RegExp]"!==g.call(e))return rt.call(this,e,r);var i,a,u,l,s=[],c=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.extended?"x":"")+(e.sticky?"y":""),f=0;for(e=new RegExp(e.source,c+"g"),n+="",t||(i=new RegExp("^"+e.source+"$(?!\\s)",c)),r=void 0===r?-1>>>0:O(r);(a=e.exec(n))&&(u=a.index+a[0].length,!(u>f&&(s.push(n.slice(f,a.index)),!t&&a.length>1&&a[0].replace(i,function(){for(var t=1;t<arguments.length-2;t++)void 0===arguments[t]&&(a[t]=void 0)}),a.length>1&&a.index<n.length&&o.push.apply(s,a.slice(1)),l=a[0].length,f=u,s.length>=r)));)e.lastIndex===a.index&&e.lastIndex++;return f===n.length?(l||!e.test(""))&&s.push(""):s.push(n.slice(f)),s.length>r?s.slice(0,r):s}}():"0".split(void 0,0).length&&(l.split=function(t,e){return void 0===t&&0===e?[]:rt.call(this,t,e)});var nt=l.replace,it=function(){var t=[];return"x".replace(/x(.)?/g,function(e,r){t.push(r)}),1===t.length&&"undefined"==typeof t[0]}();it||(l.replace=function(t,e){var r=y(e),n=v(t)&&/\)[*?]/.test(t.source);if(r&&n){var i=function(r){var n=arguments.length,i=t.lastIndex;t.lastIndex=0;var o=t.exec(r);return t.lastIndex=i,o.push(arguments[n-2],arguments[n-1]),e.apply(this,o)};return nt.call(this,t,i)}return nt.call(this,t,e)});var ot=l.substr,at="".substr&&"b"!=="0b".substr(-1);x(l,{substr:function(t,e){return ot.call(this,0>t&&(t=this.length+t)<0?0:t,e)}},at);var ut="	\n\f\r   ᠎             　\u2028\u2029\ufeff",lt="​",st="["+ut+"]",ct=new RegExp("^"+st+st+"*"),ft=new RegExp(st+st+"*$"),pt=l.trim&&(ut.trim()||!lt.trim());x(l,{trim:function(){if(void 0===this||null===this)throw new TypeError("can't convert "+this+" to object");return String(this).replace(ct,"").replace(ft,"")}},pt),(8!==parseInt(ut+"08")||22!==parseInt(ut+"0x16"))&&(parseInt=function(t){var e=/^0[xX]/;return function(r,n){return r=String(r).trim(),Number(n)||(n=e.test(r)?16:10),t(r,n)}}(parseInt))});