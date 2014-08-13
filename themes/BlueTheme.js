'use strict';

function BlueTheme() {
  var args = arguments;
  var componentClasses = Array.prototype.slice.call(args);

  for (var i = 0, l = componentClasses.length; i < l; i++) {
    var componentClass = componentClasses[i];

    componentClass().constructor = null;
  }
}

module.exports = BlueTheme;