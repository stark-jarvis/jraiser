/*!
 * JRaiser 2 Javascript Library
 * dom-animation - v1.1.0 (2014-12-16T15:19:09+0800)
 * http://jraiser.org/ | Released under MIT license
 */
define(function(require, exports, module) { 'use strict';

/**
 * 本模块提供节点动画接口
 * @module dom/1.1.x/dom-animation
 * @catgory Infrastructure
 * @ignore
 */


var base = require('base/1.0.x/'),
	animation = require('animation/1.0.x/'),
	domBase = require('./dom-base'),
	domData = require('./dom-data'),
	domStyle = require('./dom-style');


var rNumber = /^[+-]?\d+(?:\.\d+)?[^\s]*$/,
	rColor = /color$/i,
	rSharpColor = /^#[a-f0-9]{6}$/i,
	rRGBColor = /^rgb\((\d+),\s(\d+),\s(\d+)\)$/;

// 转换样式值为可用于动画运算的数值
function parseStyleValue(name, value) {
	if (typeof value === 'string') {
		if ( rNumber.test(value) ) {
			value = parseFloat(value, 10) || 0;
		} else if ( rColor.test(name) ) {
			if ( rSharpColor.test(value) ) {
				// #开头的颜色值转数组
				value = [
					parseInt(value.substr(1, 2), 16),
					parseInt(value.substr(3, 2), 16),
					parseInt(value.substr(5, 2), 16)
				];
			} else if ( rRGBColor.test(value) ) {
				// rgb(R,G,B)颜色值转数组
				value = [
					parseInt(RegExp.$1, 10),
					parseInt(RegExp.$2, 10),
					parseInt(RegExp.$3, 10)
				];
			}
		} else {
			value = value.toLowerCase();
		}
	}

	return value;
}

// 获取与最终样式对应的初始样式值
function getRelatedStyle(node, refStyle) {
	var style = { };
	for (var name in refStyle) {
		if ( refStyle.hasOwnProperty(name) ) {
			style[name] = name === 'width' || name === 'height' ?
				domStyle.getSize( node, name ) :
				parseStyleValue( name, domStyle.getStyle(node, name) );
		}
	}

	return style;
}

// 修正最终样式
function fixEndStyle(endStyle, startStyle) {
	var name, style = { };
	for (name in endStyle) {
		style[name] = domStyle.rRelNumber.test(endStyle[name]) ?
			startStyle[name] + parseFloat(RegExp.$1 + RegExp.$2, 10) :
			parseStyleValue(name, endStyle[name]);
	}

	return style;
}


// 用于记录节点正在执行动画的id
var idSpace = domData.createDataSpace({ cloneable: false });

// 开始动画
function start(node, endStyle, options) {
	if ( !domBase.isHTMLElement(node) ) { return; }

	options = options || { };

	// 获取节点的当前样式
	var startStyle = getRelatedStyle(node, endStyle);

	// 修正最终样式的样式值
	endStyle = fixEndStyle(endStyle, startStyle);

	// 停止已有的动画，防止冲突
	stop(node);

	var taskId = animation.add({
		startValue: startStyle,
		endValue: endStyle,
		duration: options.duration,
		easing: options.easing,
		step: function(value, key) {
			domStyle.setStyle(node, key,
				rColor.test(key) ? 'rgb(' + value.join(', ') + ')' : value);
		},
		onprogress: function() {
			if (options.onprogress) { options.onprogress.apply(node, arguments); }
		},
		oncomplete: function() {
			// 动画执行完成，清理任务id
			idSpace.clear(node);
			// 执行回调函数
			if (options.callback) { options.callback.call(node); }
		}
	});

	// 记录任务id（停止动画时清除）
	idSpace.set(node, 'taskId', taskId);
}

// 停止动画
function stop(node, jumpToEnd) {
	if ( !domBase.isHTMLElement(node) ) { return; }

	var taskId = idSpace.get(node, 'taskId');
	if (taskId) {
		animation.remove(taskId, jumpToEnd);
		idSpace.clear(node);
	}
}


return {
	shortcuts: {
		/**
		 * 对当前所有节点执行动画
		 * @method animate
		 * @for NodeList
		 * @param {Object} endStyle 最终样式
		 * @param {Object} [options] 其他参数
		 *   @param {Number} [options.duration=400] 动画时长
		 *   @param {Function} [options.easing='linear'] 缓动函数
		 *   @param {Function(value,progress,remaining)} [options.onprogress] 动画每一帧执行后的回调函数
		 *   @param {Function} [options.oncomplete] 动画执行完成后的回调函数
		 * @return {NodeList} 当前节点集合
		 */
		animate: function(endStyle, options) {
			for (var name in endStyle) {
				endStyle[name] = parseStyleValue(name, endStyle[name]);
			}

			this.forEach(function(node) { start(node, endStyle, options); });

			return this;
		},

		/**
		 * 停止当前所有节点的动画
		 * @method stop
		 * @for NodeList
		 * @param {Boolean} [jumpToEnd=false] 是否跳跃到最后一帧
		 * @return {NodeList} 当前节点集合
		 */
		stop: function(jumpToEnd) {
			this.forEach(function(node) { stop(node, jumpToEnd); });

			return this;
		}
	}
};

});