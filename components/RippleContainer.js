/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var rippleUniqueId = 0;

var RippleContainer = React.createClass({

  getInitialState: function() {
    return {
      ripples: []
    };
  },

  normalStyle: ReactStyle(function(){
    return {
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%'
    };
  }),

  rippleStyle: ReactStyle(function() {
    return {
      display: 'block',
      position: 'absolute',
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
      transform: 'scale(0)',
      transition: 'transform .35s linear, opacity .35s linear'
    };
  }),

  rippleAnimationStyle: ReactStyle(function() {
    return {
      transform: 'scale(2.5)'
    };
  }),

  rippleFadeoutStyle: ReactStyle(function() {
    return {
      opacity: 0
    };
  }),

  dimensions: ReactStyle(function(){
    var props = this.props;
    return {
      height: props.height,
      left: props.left,
      top: props.top,
      width: props.width
    };
  }),

  render: function() {
    var ripples = this.state.ripples;
    var rippleComponents = [];
    for (var i = 0, l = ripples.length; i < l; i++) {
      var ripple = ripples[i];
      var rippleStyles = [this.rippleStyle()];
      if (ripple.transitioning || ripple.transitionComplete) {
        rippleStyles.push(this.rippleAnimationStyle());
      }
      if (i < l - 1 || (ripple.transitionComplete && ripple.fadeOut)) {
        rippleStyles.push({opacity: 0});
      }

      // todo: calculate the biggest dimension and use that for width or height
      rippleStyles.push({left: ripple.x, top: ripple.y, width: ripple.width, height: ripple.width});
      var rippleComponent = <div key={ripple.id} ref={'ripple_'+ripple.id} styles={rippleStyles} />;
      rippleComponents.push(rippleComponent);
    }
    return <div styles={this.normalStyle()} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
      {rippleComponents}
    </div>;
  },

  onMouseDown: function(e) {
    var domNode = this.getDOMNode();
    var height = domNode.offsetHeight;
    var width = domNode.offsetWidth;
    var boundingRect = domNode.getBoundingClientRect();
    var x = e.pageX - boundingRect.left - width / 2;
    var y = e.pageY - boundingRect.top - height / 2;
    var ripples = this.state.ripples;
    var ripple = {
      id: rippleUniqueId++,
      height: height,
      width: width,
      x: x,
      y: y
    };
    ripples.push(ripple);

    this.setState({ripples: ripples});

    setTimeout(this.startRipple, 0);
  },

  onMouseUp: function() {
    // fade out
    var ripples = this.state.ripples;
    for (var i = 0, l = ripples.length; i < l; i++) {
      ripples[i].fadeOut = true;
      ripples[i].transitioning = false;
      ripples[i].transitionComplete = true;
    }
    this.setState({ripples: ripples});

  },

  startRipple: function() {
    var ripples = this.state.ripples;
    ripples[ripples.length - 1].transitioning = true;
    this.setState({ripples: ripples});
  },

  endRipple: function(e) {
    if (e.propertyName === 'transform') {
      var ripples = this.state.ripples;
      ripples[0].transitioning = false;
      ripples[0].transitionComplete = true;
      this.setState({ripples: ripples});
    }
  },

  componentDidMount: function() {
    var self = this;
    var domNode = this.getDOMNode();
    domNode.addEventListener('transitionend', this.endRipple);
  }

});

module.exports = RippleContainer;