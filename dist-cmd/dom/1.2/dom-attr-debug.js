define(function(require, exports, module) {
'use strict'; 

/**
 * 本模块提供节点属性和特性的存取接口。
 * @module dom/1.2/dom-attr
 * @catgory Infrastructure
 * @ignore
 */

var domBase = require('./dom-base');
var domData = require('./dom-data');
var domTraversal = require('./dom-traversal');
var Sizzle = require('./sizzle');
var document = window.document;


// 特性设置相关修复
var propFix = {
	'for': 'htmlFor',
	'class': 'className'
};
[
	'tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding',
	'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable'
].forEach(function(name) {
	propFix[name.toLowerCase()] = name;
});
// IE6/7 call enctype encoding
if (!document.createElement('form').enctype) {
	propFix.enctype = 'encoding';
}
// 返回正确的特性名
function fixPropName(node, name) {
	return !domBase.isNode(node) || domBase.isXMLNode(node) ?
		name :
		(propFix[name] || name);
}

// 获取特性值
function getProp(node, name) { return node[fixPropName(node, name)]; }
// 设置特性值
function setProp(node, name, value) { node[fixPropName(node, name)] = value; }
// 移除特性
function removeProp(node, name) {
	name = fixPropName(node, name);
	try {
		var undefined;
		node[name] = undefined;
		delete node[name];
	} catch (e) { }
}


var attrHooks = { };
var reBoolAttr = Sizzle.selectors.match.bool;

// IE使用cssText获取style属性字符串
if ('cssText' in document.documentElement.style) {
	attrHooks.style = {
		get: function(node) { return node.style.cssText || null; },
		set: function(node, val) { node.style.cssText = val + ''; }
	};
}

var getNodeAttribute, setNodeAttribute, removeNodeAttribute;
(function() {
	var div = document.createElement('div');
	div.setAttribute('class', 't');

	// 旧IE下一些特殊属性要通过属性节点来获取/设置
	if (div.className !== 't') {
		getNodeAttribute = function(node, name) {
			if (/^(?:src|href)$/i.test(name)) {
				return node.getAttribute(name, 2);
			} else {
				var attrNode = node.getAttributeNode(name);
				return attrNode && attrNode.specified ? attrNode.value : null;
			}
		};
		setNodeAttribute = function(node, name, value) {
			var attrNode = node.getAttributeNode(name);
			if (!attrNode) {
				node.setAttributeNode(
					(attrNode = node.ownerDocument.createAttribute(name))
				);
			}
			attrNode.value = value + '';
		};
		removeNodeAttribute = function(node, name) {
			var attrNode = node.getAttributeNode(name);
			if (attrNode) { node.removeAttributeNode(attrNode); }
		};
	} else {
		getNodeAttribute = function(node, name) { return node.getAttribute(name); };
		setNodeAttribute = function(node, name, value) { node.setAttribute(name, value); };
		removeNodeAttribute = function(node, name) { node.removeAttribute(name); };
	}

	div = null;
})();


// 支持获取/设置节点属性时才执行操作
function doIfSupportAttr(fn) {
	return function(node) {
		if (domBase.isNode(node) && node.nodeType === 1) {
			return fn.apply(this, arguments);
		}
	};
}

var getAttr, setAttr, removeAttr;

// 获取节点属性
getAttr = doIfSupportAttr(function(node, name) {
	var result;
	if (domBase.isXMLNode(node)) {
		result = getNodeAttribute(node, name);
	} else {
		name = name.toLowerCase();
		var hook = attrHooks[name];
		if (hook) {
			result = hook.get(node, name);
		} else {
			result = getNodeAttribute(node, name);
			if (result != null && reBoolAttr.test(name)) {
				result = getProp(node, name) ? name : '';
			}
		}
	}

	return result;
});

// 设置节点属性
setAttr = doIfSupportAttr(function(node, name, value) {
	if (domBase.isXMLNode(node)) {
		setNodeAttribute(node, name, value);
	} else {
		name = name.toLowerCase();
		var hook = attrHooks[name];
		if (hook) {
			hook.set(node, name, value);
		} else {
			if (reBoolAttr.test(name)) {
				value = value === true || value === 'true' || name === value ? true : false;
				if (value) {
					setProp(node, name, value);
					value = name;
				} else {
					removeAttr(node, name);
					return;
				}
			}
			setNodeAttribute(node, name, value + '');
		}
	}
});

// 移除节点属性
removeAttr = doIfSupportAttr(function(node, name) {
	var isBoolAttr;
	if (!domBase.isXMLNode(node)) {
		name = name.toLowerCase();
		if (reBoolAttr.test(name)) {
			setProp(node, name, false);
			isBoolAttr = true;
		}
	}

	if (!isBoolAttr) { setAttr(node, name, ''); }

	removeNodeAttribute(node, name);
});


// 清理数据后执行特定操作
function doAfterClearing(fn) {
	return function(node) {
		var nodes = domTraversal.selfAndDescendants(node);
		for (var i = nodes.length - 1; i >= 1; i--) {
			domData.clearAll(nodes[i]);
		}
		fn.apply(this, arguments);
	};
}

// innerText兼容处理
var getText, setText;
if ('textContent' in document.documentElement) {
	getText = function(node) { return node.textContent; };
	setText = function(node, content) { node.textContent = content; };
} else {
	getText = function(node) { return node.innerText || node.nodeValue; };
	setText = function(node, content) {
		if ('innerText' in node) {
			node.innerText = content;
		} else if ('nodeValue' in node) {
			node.nodeValue = content;
		}
	};
}

// 先清理数据，再重写HTML
setText = doAfterClearing(setText);
var setHTML = doAfterClearing(function(node, html) { node.innerHTML = html; });


exports.shortcuts = {
	/**
	 * 获取当前第一个节点的属性值。
	 * @method attr
	 * @for NodeList
	 * @param {String} name 属性名。
	 * @return {String} 属性值。
	 */
	/**
	 * 设置当前所有节点的属性值。
	 * @method attr
	 * @for NodeList
	 * @param {String} name 属性名。
	 * @param {String} value 属性值。
	 * @return {NodeList} 当前节点集合。
	 */
	/**
	 * 设置当前所有节点的属性值。
	 * @method attr
	 * @for NodeList
	 * @param {Object} attrs 属性字典。
	 * @return {NodeList} 当前节点集合。
	 */
	attr: function(name, value) {
		return domBase.access(this, name, value, true, {
			get: getAttr,
			set: setAttr
		});
	},

	/**
	 * 移除当前所有节点的指定属性。
	 * @method removeAttr
	 * @for NodeList
	 * @param {String|Array<String>} names 属性名。多个属性名用空格隔开，或者以数组传入。
	 * @return {NodeList} 当前节点集合。
	 */
	removeAttr: function(names) {
		names = domBase.splitBySpace(names);
		this.forEach(function(node) {
			names.forEach(function(name) { removeAttr(node, name); });
		});
		return this;
	},

	/**
	 * 获取当前第一个节点的特性值。
	 * @method prop
	 * @for NodeList
	 * @param {String} name 特性名。
	 * @return {Any} 特性值。
	 */
	/**
	 * 设置当前所有节点的特性值。
	 * @method prop
	 * @for NodeList
	 * @param {String} name 特性名。
	 * @param {Any} value 特性值。
	 * @return {NodeList} 当前节点集合。
	 */
	/**
	 * 设置当前所有节点的特性值。
	 * @method prop
	 * @for NodeList
	 * @param {Object} props 特性字典。
	 * @return {NodeList} 当前节点集合。
	 */
	prop: function(name, value) {
		return domBase.access(this, name, value, true, {
			get: getProp,
			set: setProp
		});
	},

	/**
	 * 移除当前所有节点的指定特性。
	 * @method removeProp
	 * @for NodeList
	 * @param {String|Array<String>} names 特性名。多个特性名用空格隔开，或者以数组传入。
	 * @return {NodeList} 当前节点集合。
	 */
	removeProp: function(names) {
		names = domBase.splitBySpace(names);
		this.forEach(function(node) {
			names.forEach(function(name) { removeProp(node, name); });
		});
		return this;
	},

	/**
	 * 获取当前第一个节点的文本内容。
	 * @method text
	 * @for NodeList
	 * @return {String} 文本内容。
	 */
	/**
	 * 设置当前所有节点的文本内容。
	 * @method text
	 * @for NodeList
	 * @param {String|Function} content 文本内容。
	 * @return {NodeList} 当前节点集合。
	 */
	text: function(content) {
		return domBase.access(this, null, content, true, {
			get: getText,
			set: function(node, key, value) { setText(node, value); }
		});
	},

	/**
	 * 获取当前第一个节点的innerHTML。
	 * @method html
	 * @for NodeList
	 * @return {String} innerHTML。
	 */
	/**
	 * 设置当前所有节点的innerHTML。
	 * @method html
	 * @for NodeList
	 * @param {String|Function} innerHTML
	 * @return {NodeList} 当前节点集合。
	 */
	html: function(innerHTML) {
		return domBase.access(this, null, innerHTML, true, {
			get: function(node) { return node.innerHTML; },
			set: function(node, key, value) { setHTML(node, value); }
		});
	},

	/**
	 * 获取当前第一个节点的value属性值。
	 * @method val
	 * @for NodeList
	 * @return {String} value属性值。
	 */
	/**
	 * 设置当前所有节点的value属性值。
	 * @method val
	 * @for NodeList
	 * @param {String|Function} val value属性值。
	 * @return {NodeList} 当前节点集合。
	 */
	val: function(val) {
		return domBase.access(this, null, val, true, {
			get: function(node) { return node.value; },
			set: function(node, key, value) { node.value = value; }
		});
	}
};

});