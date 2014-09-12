/**
 * @jsx React.DOM
 */
'use strict';

var Colors = require('../style/Colors');

var React = require('react');
var ReactStyle = require('react-style');

var RadioButton = require('./RadioButton');

var ToggleButton = React.createClass({

  normalStyle: ReactStyle(function() {
    return {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      cursor: 'pointer',
      display: 'block',
      position: 'relative'
    };
  }),

  lineStyle: ReactStyle(function() {
    return {
      backgroundColor: Colors.grey.P700,
      height: 1,
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      left: 0,
      position: 'absolute',
      top: 10,
      width: 38
    };
  }),

  circleStyle: ReactStyle(function() {
    return {
      border: 'solid 2px',
      borderColor: Colors.grey.P700,
      borderRadius: '50%',
      height: 16,
      backgroundColor: Colors.grey.P100,
      left: 0,
      position: 'absolute',
      top: 0,
      width: 16,
      transition: 'left .28s cubic-bezier(0.4, 0, 0.2, 1)',
      willChange: 'left'
    };
  }),


  childStyle: ReactStyle(function childStyle(){
    return {
      paddingLeft: 16
    };
  }),

  childBigStyle: ReactStyle(function childStyle(){
    return {
      paddingLeft: 32
    };
  }),

  checkedStyle: ReactStyle(function(){
    return {
      left: 20
    };
  }),

  circlePositionStyle: ReactStyle(function(){
    return {
      position: 'absolute',
      right: 0,
      top: 0,
      bottom: 0,
      width: 40
    };
  }),

  onButtonStyle: ReactStyle(function onButtonStyle(){
    return {
      backgroundColor: Colors.grey.P700,
      borderRadius: '50%',
      height: 20,
      left: -2,
      position: 'absolute',
      top: -2,
      transform: 'scale(0)',
      transition: 'transform ease 0.28s',
      width: 20,
      willChange: 'transform'
    };
  }),

  onButtonFillStyle: ReactStyle(function onButtonFillStyle(){
    return {
      transform: 'scale(1)'
    };
  }),

  getInitialState: function(){
    return {
      checked: false
    };
  },

  render: function() {
    var props = this.props;
    var circleStyle = [this.circleStyle()];
    var checked = this.state.checked;

    if (checked) {
      circleStyle.push(this.checkedStyle());
    }

    var onButtonStyle = [this.onButtonStyle()];
    if (props.onButtonStyle) {
      onButtonStyle = onButtonStyle.concat(props.onButtonStyle);
    }
    if (checked){
      onButtonStyle.push(this.onButtonFillStyle());
    }

    return <div styles={this.normalStyle()} onClick={this.onClick}>
      {props.children}
      <div styles={this.circlePositionStyle()}>
        <div styles={this.lineStyle()} />
        <div styles={circleStyle}>
          <div styles={onButtonStyle} />
        </div>
      </div>
    </div>;
  },

  onClick: function() {
    var props = this.props;
    var checked = !this.state.checked;
    this.isChecked = checked;
    this.setState({checked: checked});
    if (props.onChange) {
      props.onChange({checked: this.isChecked});
    }
  }

});

module.exports = ToggleButton;
