/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var RadioButton = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      cursor: 'pointer',
      display: 'inline-block',
      height: '16px',
      position: 'relative',
      userSelect: 'none',
      width: '16px'
    };
  }),

  offButtonStyle: ReactStyle(function(){
    return {
      border: 'solid 2px',
      borderColor: '#5a5a5a',
      borderRadius: '50%',
      height: '12px',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '12px'
    };
  }),

  onButtonStyle: ReactStyle(function(){
    return {
      backgroundColor: 'grey',
      borderRadius: '50%',
      height: '16px',
      left: 0,
      position: 'absolute',
      top: 0,
      transform: 'scale(0)',
      transition: 'transform ease 0.28s',
      width: '16px'
    };
  }),

  onButtonFillStyle: ReactStyle(function(){
    return {
      transform: 'scale(1.1)'
    };
  }),

  pressedStyle: ReactStyle(function(){
    return {
      top: 0,
      left: 0,

      position:'absolute',
      opacity:'.3',
      transform:'scale(2.5)',
      transition: 'opacity ease 0.28s'
    };
  }),

  getInitialState: function() {
    return {
      active: false
    };
  },

  releaseStyle: ReactStyle(function() {
    return {
      opacity: 0
    };
  }),

  render: function() {
    var props = this.props;
    var state = this.state;
    var normalStyle = this.normalStyle();
    var onButtonStyle = [this.onButtonStyle()];
    if (props.onButtonStyle) {
      onButtonStyle = onButtonStyle.concat(props.onButtonStyle);
    }
    if (this.state.active){
      onButtonStyle.push(this.onButtonFillStyle());
    }
    return <div styles={normalStyle} onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
      {state.mouseDown &&
        <div ref="shadow" onTransitionEnd={this.onTransitionEnd} styles={onButtonStyle.concat([this.pressedStyle(), state.mouseUp ? this.releaseStyle(): null])} />
        }
      <div styles={this.offButtonStyle()} />
      <div styles={onButtonStyle} />
    </div>;
  },

  onClick: function() {
    this.setState({active: !this.state.active})
  },

  onMouseDown: function(){
    this.setState({mouseDown: true});
  },

  onMouseUp: function() {
    this.setState({mouseUp: true});
  }

});

module.exports = RadioButton;