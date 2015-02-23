/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var isTransform = require('./isTransform');

var rippleUniqueId = 0;
var transitionEnd = require('./TransitionEndName');


var isTouchDevice = typeof window !== 'undefined' &&
                    'ontouchstart' in window;

class RippleContainer extends React.Component {

  constructor() {
    this.state = {
      ripples: []
    };
  }

  render() {
    var props = this.props;
    var state = this.state;
    var styles = RippleContainerStyles;
    var ripples = state.ripples;
    var rippleComponents = [];
    for (var i = 0, l = ripples.length; i < l; i++) {
      var ripple = ripples[i];
      var rippleStyles = [styles.rippleStyle];
      if (ripple.transitioning || ripple.transitionComplete) {
        rippleStyles.push(styles.rippleAnimationStyle);
      }
      if (i < l - 1 || (ripple.transitionComplete && ripple.fadeOut)) {
        rippleStyles.push({opacity: '0'});
      }

      rippleStyles.push({left: ripple.x, top: ripple.y, width: ripple.width, height: ripple.height});
      var rippleComponent = <div key={ripple.id}
                                 ref={'ripple_'+ripple.id}
                                 styles={rippleStyles} />;
      rippleComponents.push(rippleComponent);
    }


    return <div styles={[styles.normalStyle, props.styles]}
        onTouchStart={(e) => isTouchDevice && this.onMouseDown(e)}
        onTouchEnd={(e) => isTouchDevice && this.onMouseUp(e)}
        onTouchCancel={(e) => isTouchDevice && this.onMouseLeave(e)}
        onMouseDown={(e) => !isTouchDevice && this.onMouseDown(e)}
        onMouseLeave={(e) => !isTouchDevice && this.onMouseLeave(e)}
        onMouseUp={(e) => !isTouchDevice && this.onMouseUp(e)}
      >
        {rippleComponents}
      </div>;
  }

  onMouseDown(e) {
    var domNode = React.findDOMNode(this);
    var height = domNode.offsetHeight;
    var width = domNode.offsetWidth;
    if (width > height) {
      height = width;
    }
    else {
      width = height;
    }
    var boundingRect = domNode.getBoundingClientRect();
    var x = e.clientX - boundingRect.left - width / 2;
    var y = e.clientY - boundingRect.top - height / 2;

    var ripples = this.state.ripples;
    var ripple = {
      id: rippleUniqueId++,
      height: height,
      width: width,
      x: x,
      y: y
    };
    ripples.push(ripple);

    // messes up click event :-(
    this.setState({ripples: ripples});

    setTimeout(() => this.startRipple(), 0);
  }

  onMouseUp(e) {
    this.onMouseLeave();
    var onClick = this.props.onClick;
    if (onClick) {
      e.preventDefault();
      onClick({target: React.findDOMNode(this).parentNode, originalEvent: e});
    }
  }

  onMouseLeave() {
    // fade out
    var ripples = this.state.ripples;
    for (var i = 0, l = ripples.length; i < l; i++) {
      ripples[i].fadeOut = true;
      ripples[i].transitioning = false;
      ripples[i].transitionComplete = true;
    }
    this.setState({ripples: ripples});

  }

  startRipple() {
    var ripples = this.state.ripples;
    ripples[ripples.length - 1].transitioning = true;
    this.setState({ripples: ripples});
  }

  endRipple(e) {
    var ripples = this.state.ripples;
    if (isTransform(e.propertyName)) {
      ripples[0].transitioning = false;
      ripples[0].transitionComplete = true;
      this.setState({ripples: ripples});
    }
    else if (e.propertyName === 'opacity') {
      ripples.shift();
      this.setState({ripples: ripples});
    }
  }

  componentDidMount() {
    var self = this;
    var domNode = React.findDOMNode(this);

    if (!transitionEnd) {
      return;
    }

    //TODO: make sure we only do this once, instead of all the time...
    domNode.addEventListener(transitionEnd, (e) => this.endRipple(e));
  }

}

var RippleContainerStyles = StyleSheet.create({

  normalStyle: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%'
  },

  rippleStyle: {
    display: 'block',
    position: 'absolute',
    background: 'rgba(0, 0, 0, 0.04)',
    borderRadius: '50%',
    transform: 'scale(0)',
    transition: 'transform .25s linear, opacity .25s linear .2s'
  },

  rippleAnimationStyle: {
    transform: 'scale(2)'
  },

  rippleFadeoutStyle: {
    opacity: '0'
  }

});

module.exports = RippleContainer;