define("timespan/1.0/timespan",null,function(e,r,t){"use strict";var n={SEC:1e3,MIN:6e4,HOUR:36e5,DAY:864e5,MONTH:2592e6,YEAR:31536e6},i=r.parse=function(e){if("number"==typeof e)return e;if(!isNaN(e))return Number(e);var r=parseFloat(e);if(isNaN(r))throw new Error("Invalid timespan string");var t=e.split(r)[1].trim().toUpperCase().replace(/S$/,"");if(n.hasOwnProperty(t))return r*n[t];throw new Error('Invalid time unit "'+t+'"')};r.addToDate=function(e,r){return new Date(("number"==typeof e?e:e.getTime())+i(r))}});