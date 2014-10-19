'use strict';

var div;
if (typeof window !== 'undefined') {
	div = document.createElement('div');

	var transitions = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition': 'transitionend',
		'OTransition': 'oTransitionEnd otransitionend',
		'transition': 'transitionend'
	};

	var transitionEnd = null;

	for (var t in transitions) {
		if (div.style[t] !== undefined) {
			transitionEnd = transitions[t];
		}
	}
}

module.exports = transitionEnd;