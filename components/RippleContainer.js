/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var isTransform = require('./isTransform');

var rippleUniqueId = 0;
var transitionEnd = require('./TransitionEndName');


var isTouchDevice = typeof window !== 'undefined' &&
										'ontouchstart' in window;

var RippleContainer = React.createClass({

  getInitialState() {
    return {
      ripples: []
    };
  },

  styles: {
    normalStyle: ReactStyle({
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    }),

    rippleStyle: ReactStyle({
      display: 'block',
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
      transform: 'scale(0)',
      transition: 'transform .25s linear, opacity .25s linear .2s'
    }),

    rippleAnimationStyle: ReactStyle({
      transform: 'scale(2)'
    }),

    rippleFadeoutStyle: ReactStyle({
      opacity: '0'
    })
  },

  render() {
    var props = this.props;
    var state = this.state;
    var styles = this.styles;
    var ripples = state.ripples;
    var rippleComponents = [];
    for (var i = 0, l = ripples.length; i < l; i++) {
      var ripple = ripples[i];
      var rippleStyles = [styles.rippleStyle];
      if (ripple.transitioning || ripple.transitionComplete) {
        rippleStyles.push(styles.rippleAnimationStyle);
      }
      if (i < l - 1 || (ripple.transitionComplete && ripple.fadeOut)) {
        rippleStyles.push(ReactStyle({opacity: '0'}));
      }

      rippleStyles.push(ReactStyle({left: ripple.x, top: ripple.y, width: ripple.width, height: ripple.height}));
      var rippleComponent = <div key={ripple.id}
                                 ref={'ripple_'+ripple.id}
                                 styles={rippleStyles} />;
      rippleComponents.push(rippleComponent);
    }


    return <div styles={[styles.normalStyle, props.styles]}
        onTouchStart={isTouchDevice && this.onMouseDown}
        onTouchEnd={isTouchDevice && this.onMouseUp}
        onTouchCancel={isTouchDevice && this.onMouseLeave}
        onMouseDown={!isTouchDevice && this.onMouseDown}
        onMouseLeave={!isTouchDevice && this.onMouseLeave}
        onMouseUp={!isTouchDevice && this.onMouseUp}
      >
        {rippleComponents}
      </div>;
  },

  onMouseDown(e) {
    var domNode = this.getDOMNode();
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

    setTimeout(this.startRipple, 0);
  },

  onMouseUp(e) {
    this.onMouseLeave();
    var onClick = this.props.onClick;
    if (onClick) {
      e.preventDefault();
      onClick({target: this.getDOMNode().parentNode, originalEvent: e});
    }
  },

  onMouseLeave() {
    // fade out
    var ripples = this.state.ripples;
    for (var i = 0, l = ripples.length; i < l; i++) {
      ripples[i].fadeOut = true;
      ripples[i].transitioning = false;
      ripples[i].transitionComplete = true;
    }
    this.setState({ripples: ripples});

  },

  startRipple() {
    var ripples = this.state.ripples;
    ripples[ripples.length - 1].transitioning = true;
    this.setState({ripples: ripples});
  },

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
  },

  componentDidMount() {
    var self = this;
    var domNode = this.getDOMNode();

    if (!transitionEnd) {
      return;
    }

    domNode.addEventListener(transitionEnd, this.endRipple);
  }

});

module.exports = RippleContainer;