/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors')

var TextField = React.createClass({

  normalTextFieldStyle: ReactStyle(function normalTextFieldStyle(){
    return {
      background: 'transparent',
      border: 'none',
      borderBottom: 'solid 1px ' + Colors.grey.P300,
      fontFamily: "RobotoDraft, 'Helvetica Neue', Helvetica, Arial;",
      fontSize: 16,
      height: 32,
      outline: 'none',
      left: 0,
      paddingTop: 8,
      position: 'absolute',
      top: 0,
      transition: 'border-bottom .38s linear',
      width: '100%',
      ':focus': {
        borderBottom: 'solid 2px ' + Colors.blue.P500
      }
    };
  }),

  fullWidthTextFieldStyle: ReactStyle(function fullWidthTextFieldStyle(){
    return {
      width: '100%'
    };
  }),

  errorTextFieldStyle: ReactStyle(function errorTextFieldStyle(){
    return {
      borderBottom: 'solid 2px ' + Colors.red.P400,
      ':focus': {
        borderBottom: 'solid 2px ' + Colors.red.P400
      }
    };
  }),

  scrollLeftTextFieldStyle: ReactStyle(function scrollLeftTextFieldStyle(){

  }),

  scrollRightTextFieldStyle: ReactStyle(function scrollRightTextFieldStyle(){

  }),

  placeHolderStyling: ReactStyle(function placeHolderStyling(){
    return {
      color: Colors.grey.P500,
      fontSize: 16,
      left: 0,
      position: 'absolute',
      top: 15,
      width: '100%',
      height: '100%',
      transition: 'top .18s linear, font-size .18s linear'
    }
  }),

  containerStyling: ReactStyle(function containerStyling(){
    return {
      height: 48,
      position: 'relative',
      width: 200
    };
  }),

  placeHolderTopStyling: ReactStyle(function placeHolderTopStyling(){
    return {
      fontSize: 12,
      top: -8
    };
  }),

  render: function() {
    var props = this.props;
    var textfield = this.refs.textfield;

    var placeHolderStyling = [this.placeHolderStyling()];
    if (textfield && textfield.getDOMNode().value.trim().length) {
      placeHolderStyling.push(this.placeHolderTopStyling());
    }
    var textFieldStyling = [this.normalTextFieldStyle()];
    if (props.error) {
      textFieldStyling.push(this.errorTextFieldStyle());
    }

    return <div styles={this.containerStyling()}>
      <div styles={placeHolderStyling}>{props.placeHolder}</div>
      <input onChange={this.onChange} type="text" ref="textfield" styles={textFieldStyling} />
    </div>;
  },

  onChange: function() {
    // todo: optimize
    this.forceUpdate();

  }

});

module.exports = TextField;