'use strict';


var TransitionMixin = {

  transitionFrom: function(opt) {
    var self = this;
    return new Promise(function(resolve) {
      opt.transition = 'all ' + opt.duration + ' linear';
      self.transitionStyle = opt;
      self.forceUpdate();
      self.__oldTransitionStyle = opt;
      resolve();
    });

  },

  transitionTo: function(opt) {
    var self = this;
    var domNode = self.getDOMNode();
    return function() {
      return new Promise(function(resolve) {
        function transitionEnd(e) {
          if (e.target !== self.getDOMNode()) {
            return;
          }

          domNode.removeEventListener('transitionend', transitionEnd);

          resolve();
        }

        // fugly but for now it works :-P
        opt.transition = 'all ' + opt.duration + ' ' + (opt.transitionType || ' linear');
        self.transitionStyle = merge(self.__oldTransitionStyle || {}, opt);
        domNode.addEventListener('transitionend', transitionEnd);
        requestAnimationFrame(function() {
          self.forceUpdate()
        });

        self.__oldTransitionStyle = opt;
      });
    }
  }

};

module.exports = TransitionMixin;