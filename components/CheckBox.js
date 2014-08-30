/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');
var transitionEnd = require('./TransitionEndName');
var isTransform = require('./isTransform');
var CircleShadow = require('./CircleShadow');

var CheckBox = React.createClass({

  containerStyle: ReactStyle(function containerStyle() {
    return {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      cursor: 'pointer',
      display: 'inline-block',
      height: '18px',
      outline: 'none',
      position: 'relative',
      width: '18px'
    };
  }),

  normalStyle: ReactStyle(function normalStyle() {
    return {
      borderColor: '#5a5a5a',
      borderStyle: 'solid',
      borderWidth: '2px',
      boxSizing: 'border-box',
      cursor: 'pointer',
      height: '18px',
      width: '18px',
      left: 0,
      outline: 'none',
      transform: 'translateZ(0)',
      transition: 'transform .1s linear, ' +
        'width .1s linear, ' +
        'height .1s linear, ' +
        'left .1s linear',
      position: 'absolute',
      bottom: 0
    };
  }),

  transitionStyle: ReactStyle(function transitionStyle() {
    return {
      height: 0,
      transform: 'translateZ(0) rotate(45deg)',
      width: 0,
      left: '8px'
    };
  }),

  checkedStyle: ReactStyle(function checkedStyle() {
    return {
      borderWidth: '0 2px 2px 0',
      borderColor: '#0f9d58',
      width: '10px',
      height: '21px'
    }
  }),

  circleStyle: ReactStyle(function circleStyle() {
    return {
      backgroundColor: '#0f9d58'
    }
  }),

  getInitialState: function() {
    return {
      checked: this.props.checked || false
    }
  },

  render: function() {
    var state = this.state;
    var props = this.props;
    var styles = [this.normalStyle()];
    var containerStyles = [this.containerStyle()];
    if (props.containerStyles) {
      containerStyles = containerStyles.concat(props.containerStyles);
    }
    if (state.transitioning) {
      styles.push(this.transitionStyle());
    }
    else if (state.checked && !state.transitioning) {
      styles.push(this.transitionStyle());
      styles.push(this.checkedStyle());
    }

    return <div tabIndex={0} styles={containerStyles} onClick={this.onToggle} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
      <div ref="checkbox" styles={styles}/>
      <CircleShadow styles={this.circleStyle()} active={this.state.mouseDown} />

    </div>
  },

  onMouseDown: function() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: true});
  },

  onMouseUp: function() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: false});
  },

  onToggle: function() {
    if (!this.state.checked) {
      this.setState({transitioning: true});
    }
    else {
      this.setState({checked: false});
    }
    var props = this.props;
    if (props.onChange) {
      props.onChange({checked: this.state.checked});
    }
  },

  componentDidMount: function() {
    this.refs.checkbox.getDOMNode().addEventListener(transitionEnd, this.onTransitionEnd);
  },

  onTransitionEnd: function(e) {
    var state = this.state;
    if (state.transitioning) {
      if (isTransform(e.propertyName) && !this.state.checked) {
        this.setState({checked: true, transitioning: false});
      }
    }
  },

  toggle: function() {
    this.onToggle();
  },

  isChecked: function() {
    return this.state.checked;
  }

});

module.exports = CheckBox;
