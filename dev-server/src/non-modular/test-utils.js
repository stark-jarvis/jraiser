window.testUtils = {};
(function(testUtils) {
	testUtils.getErrByType = function(value) {
		var type = '',
			valueDisplay = JSON.stringify(value);
		if (typeof value === 'object') {
			switch (Object.prototype.toString.call(value)) {
				case '[object Array]':
					type = 'Array';
					break;
				default:
					type = 'Object';
			}
		} else {
			type = typeof value;
		}
		return '非法值-' + type + '类型-' + valueDisplay;
	};
	testUtils.parseDOM = function(html) {
		var div = document.createElement('div');
		div.innerHTML = html;
		return div.childNodes;
	};
})(window.testUtils);