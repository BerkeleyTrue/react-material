'use strict';

var ChainTransitionsMixin = {

  __bla: function() {
    this.__node.getDOMNode().classList.remove(this.__classes[this.__index]);
    this.__node.getDOMNode().classList.add(this.__classes[this.__index++]);
    if (this.__index === this.__classes.length) {
      this.__node.removeEventListener('transitionend', this.__transitionEnd);
    }
  },

  __transitionEnd: function() {
    if (this.__currTimeout) {
      clearTimeout(this.__currTimeout);
    }

    this.__currTimeout = setTimeout(this.__bla, 0);
  },

  transition: function(node, classes) {
    this.__index = 1;
    this.__classes = classes;
    this.__node = node;
    node.addEventListener('transitionend', this.__transitionEnd);
    setTimeout(function() {
      node.
    }, 0);
  }

};

module.exports = ChainTransitionsMixin;