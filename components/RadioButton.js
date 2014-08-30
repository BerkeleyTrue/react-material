/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CircleShadow = require('./CircleShadow');

var RadioButton = React.createClass({

  normalStyle: ReactStyle(function normalStyle(){
    return {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      cursor: 'pointer',
      display: 'inline-block',
      height: '16px',
      outline: 'none',
      position: 'relative',
      userSelect: 'none',
      width: '16px'
    };
  }),

  offButtonStyle: ReactStyle(function offButtonStyle(){
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

  onButtonStyle: ReactStyle(function onButtonStyle(){
    return {
      backgroundColor: '#5a5a5a',
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

  onButtonFillStyle: ReactStyle(function onButtonFillStyle(){
    return {
      transform: 'scale(1.1)'
    };
  }),

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var props = this.props;
    var active = this.state.active;
    var normalStyles = [this.normalStyle()];
    if (props.styles) {
      normalStyles = normalStyles.concat(props.styles);
    }
    var onButtonStyle = [this.onButtonStyle()];
    if (props.onButtonStyle) {
      onButtonStyle = onButtonStyle.concat(props.onButtonStyle);
    }
    if (active){
      onButtonStyle.push(this.onButtonFillStyle());
    }
    return <div tabIndex={0} styles={normalStyles} onClick={this.onClick} onMouseDown={this.onMouseDown}>

      <div styles={this.offButtonStyle()} />
      <div styles={onButtonStyle} />
      <CircleShadow styles={props.onButtonStyle} active={this.state.mouseDown} />
    </div>;
  },

  onClick: function() {
    this.setState({active: !this.state.active})
  },

  onMouseDown: function(){
    this.setState({mouseDown: !this.state.active});
  }

});

module.exports = RadioButton;