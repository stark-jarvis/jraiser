/*!
 * JRaiser 2 Javascript Library
 * validator-step - v1.1.0 (2015-06-30T14:06:13+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("validator/1.1.x/step",null,function(e,t,r){"use strict";function n(e,t){var r=[];if(i.isArray(e)){var n=e;e={},e[t]=n}for(t in e)e.hasOwnProperty(t)&&e[t].forEach(function(e){null!=e&&r.push({name:t,value:e})});return r}var i=e("base/1.1.x/"),s=e("dom/1.1.x/"),o=e("ajax/1.2.x/"),l=e("widget/1.1.x/"),a=0;return l.create({_init:function(e){var t=this;if(t._id=++a,t._vOptions={},t._fields=e.fields||[],"string"==typeof t._fields&&(t._fields=t._fields.split(/\s+/)),t._rule=e.rule,"string"==typeof t._rule){var r=[];t._ruleNames=[];var n=t._rule.replace(/(\w+)(?::([^!&|()]+))?/g,function(e,n,i){t._ruleNames.push(n);var s="_helpers_."+n+"(_val_";return i&&(s+=",_refVars_["+(r.push(i)-1)+"]"),s+=")"}),i=new Function("_val_","_refVars_","_helpers_","return "+n+";");n=null,r.length||(r=null),t._rule=function(e,t){return i(e,r,t)}}e.stepDisabled?t.disableStep():t.enableStep()},id:function(){return this._id},fields:function(){return this._fields.slice()},isRemote:function(){return!!this._options.remoteURL},stepDisabled:function(){return this._stepDisabled},enableStep:function(){this._stepDisabled=!1},disableStep:function(){this._stepDisabled=!0},syncWithValidator:function(e){this._vOptions=i.extend({},e)},exec:function(e,t,r,s,l){var a=this;if(a.stepDisabled())return 0;var u=a._ruleNames;if(u)for(var _=u.length-1;_>=0;_--)if(!r[u[_]])throw new Error('Rule "'+u[_]+'" does not exist');a._trigger("beforevalidate",{sourceEvent:l,elements:e.slice()});var c=this._fields,f=c.length;1===f&&(t=t[c[0]]);var d,v=a._options,h=!0;if(1!==f||v.oneByOne===!1||v.remoteURL){if(1===f&&v.required!==!1&&(h=t.length>0&&""!==t.join("")),h&&a._rule)if(v.remoteURL){var p=function(t){return a._remoteCache=t,a._message=a._rule.call(window,t),a._message?a._error(e.slice(),!0,l):void a._correct(e.slice(),!0,l)};if(!s)return a._beforeSend(e.slice()),void o.send(v.remoteURL,i.customExtend({data:n(t,c[0]),onsuccess:p},v.ajaxSettings||a._vOptions.ajaxSettings,{overwrite:!1}));if("_remoteCache"in a)return p(a._remoteCache)}else{var m;switch(f){case 0:m=[];break;case 1:m=[t.slice()];break;default:m=c.map(function(e){return t[e]?t[e].slice():null})}m.push(r),h=a._rule.apply(window,m),"string"==typeof h&&(a._message=h,h=!1)}h||(d=e.slice())}else if(h=v.required===!1||t.length>0){var d=[];t.every(function(t,n){var i,s=""===t||null==t;if(v.required===!1){if(s)return!0;i=!0}else i=!s;return i&&null!=t&&a._rule&&(i=a._rule.call(window,t,r)),i||d.push(e[n]),h=h&&i,i||!a._vOptions.breakOnError})}else d=e.slice();return h?void a._correct(e.slice(),!1,l):a._error(d,!1,l)},_makeEventArg:function(e){return e.stepId=this.id(),this._options.eventElements&&(e.elements=i.toArray(s(e.elements).filter(this._options.eventElements))),e},_beforeSend:function(e,t){var r=this._makeEventArg({sourceEvent:t,elements:e});return 1==this._options.eventMode&&this._vOptions.beforeSend&&this._vOptions.beforeSend.call(window,r),this._trigger("beforesend",r),r},_error:function(e,t,r){var n=this._makeEventArg({sourceEvent:r,elements:e,isRemote:!!t,message:this._message||this._options.message});return 1==this._options.eventMode&&this._vOptions.onError&&this._vOptions.onError.call(window,n),this._trigger("error",n),n},_correct:function(e,t,r){var n=this._makeEventArg({sourceEvent:r,elements:e,isRemote:!!t});return 1==this._options.eventMode&&this._vOptions.onCorrect&&this._vOptions.onCorrect.call(window,n),this._trigger("correct",n),n}},{eventMode:1})});
/*!
 * JRaiser 2 Javascript Library
 * validator - v1.1.0 (2015-07-02T14:32:37+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define("validator/1.1.x/",["ajax/1.2.x/","dom/1.1.x/","widget/1.1.x/"],function(e,t,r){"use strict";var n=e("base/1.1.x/"),i=e("ajax/1.2.x/"),s=e("dom/1.1.x/"),o=e("widget/1.1.x/"),f=e("./step"),u={isNumber:function(e){return!isNaN(e)},min:function(e,t){return Number(e)>=t},max:function(e,t){return Number(e)<=t},minLength:function(e,t){return e.length>=t},maxLength:function(e,t){return e.length<=t},isEmail:function(e){var t=/^[\w-]+(?:\.[\w-]+)*@[\w-]+(?:\.[\w-]+)*\.[a-zA-Z]{2,}$/.test(e);if(!t)return!1;t=e.replace("@",".").split(".");for(var r=t.length-2;r>=0;r--)if(/^[-_]/.test(t[r])||/[_-]$/.test(t[r]))return!1;return!0},isQQ:function(e){return/^[1-9]\d{4,}$/.test(e)},isMobileNO:function(e){return/^1\d{10}$/.test(e)},isTelNO:function(e){return/^(?:0\d{2,3}-)?[2-9]\d{6,7}(?:-\d{1,4})?$/.test(e)}};return o.create({_init:function(e){function t(e){a._trigger("beforesend",e)}function r(e){a._stepCorrect(e)}function o(e){a._stepError(e)}var a=this;if(!e.form||"FORM"!==e.form.prop("nodeName"))throw new Error("please specify a form to validate");if(!e.steps)throw new Error("please specify validation steps");a._form=e.form,a._helpers=n.extend({},u,e.helpers),a._steps=e.steps;for(var l=a._steps.length-1;l>=0;l--)a._steps[l]instanceof f||(a._steps[l]=new f(a._steps[l])),a._steps[l].syncWithValidator({ajaxSettings:e.ajaxSettings,breakOnError:e.breakOnError,beforeSend:t,onCorrect:r,onError:o});if(e.validateOnChange){var m=s(n.toArray(a._form.get(0).elements)),c=function(e){this.name&&a.validate(this.name,!1,e)};a._onDOMEvent(m.filter("input[type=text],input[type=password],textarea"),"blur",c)._onDOMEvent(m.filter("input[type=checkbox],input[type=radio]"),"click",c)._onDOMEvent(m.filter("input[type=file],select"),"change",c)}a._onDOMEvent(a._form,"submit",function(t){var r=a.validateAll(!0,t);if(r&&r.length)t.preventDefault(),a._trigger("submiterror",{isRemote:!1,sourceEvent:t,errorObjs:r,form:a._form});else{var n=a._trigger("beforesubmit",{sourceEvent:t,form:a._form}).isDefaultPrevented();if(n)return void t.preventDefault();e.submitProxy&&(t.preventDefault(),e.submitProxy.call(window,i.serializeForm(this),a._form,function(e){e&&e.forEach(function(e){e.elements=a._getFields(e.elements).elements}),a._trigger("submiterror",{isRemote:!0,sourceEvent:t,errorObjs:e,form:a._form})}))}})},validate:function(e,t,r){"string"==typeof e&&(e=e.split(/\s+/));var n=e?this._steps.filter(function(t){for(var r=e.length-1;r>=0;r--)if(-1!==t.fields().indexOf(e[r]))return!0}):this._steps;return this._execSteps(n,t,r)},validateAll:function(e,t){return this._execSteps(this._steps,e,t)},_execStep:function(e,t,r){var n=this._getFields(e.fields());return e.exec(n.elements,n.values,this._helpers,t,r)},_execSteps:function(e,t,r){if(e&&e.length){var n=this,i={},s=[];return e.every(function(e){if(e.stepDisabled())return!0;var o=e.fields(),f=o.some(function(e){return!!i[e]});if(f)return!0;var u=n._execStep(e,t,r);return u&&s.push(u),o.forEach(function(t){i[t]=u?1:e.isRemote()?2:0}),!u||!n._options.breakOnError}),s}},_stepError:function(e){e.form=this._form,e.isRemote&&(this._remoteErrors=this._remoteErrors||{},this._remoteErrors[e.stepId]=e),this._trigger("steperror",e)},_stepCorrect:function(e){e.form=this._form,e.isRemote&&this._remoteErrors&&delete this._remoteErrors[e.stepId],this._trigger("stepcorrect",e)},_getFields:function(e){var t=[],r={};if(e&&e.length)for(var n,i,s=this._form.get(0).elements,o=0;n=s[o];o++)n.disabled||!n.name||"*"!==e&&-1===e.indexOf(n.name)||(t.push(n),i="INPUT"!==n.nodeName||"radio"!==n.type&&"checkbox"!==n.type?n.value.trim():n.checked?n.value.trim():null,r[n.name]=r[n.name]||[],r[n.name].push(i));return{elements:t,values:r}}},{events:{submiterror:function(e){alert(e.errorObjs.map(function(e){return e.message}).join("\r\n")),s(e.errorObjs[0].elements[0]).focus()}}})});