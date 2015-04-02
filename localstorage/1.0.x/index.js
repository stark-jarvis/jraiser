/*!
 * JRaiser 2 Javascript Library
 * localstorage - v1.0.0 (2013-03-13T22:26:08+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("localstorage/1.0.x/",null,function(t,e,n){"use strict";var i=window.localStorage,u=null!=i;return u||(i={init:function(){var t=this._input=document.createElement("input");t.type="hidden",t.addBehavior("#default#userData"),document.body.insertBefore(t,document.body.firstChild),this._filename=window.location.hostname,t.load(this._filename)},_save:function(t){t||(t=new Date,t.setFullYear(t.getFullYear()+1)),this._input.expires=t.toUTCString(),this._input.save(this._filename)},getItem:function(t){return this._input.getAttribute(t)},setItem:function(t,e){this._input.setAttribute(t,e),this._save()},removeItem:function(t){this._input.removeAttribute(t),this._save()},clear:function(){this._save(new Date(315532799e3)),this._input.load(this._filename)}},i.init()),{isNative:u,getItem:function(){return i.getItem.apply(i,arguments)},setItem:function(){return i.setItem.apply(i,arguments)},removeItem:function(){return i.removeItem.apply(i,arguments)},clear:function(){return i.clear.apply(i,arguments)}}});