/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var TextField = React.createClass({

  normalTextFieldStyle: ReactStyle(function normalTextFieldStyle(){
    return {
      background: 'transparent',
      border: 'none',
      borderBottom: 'solid 1px #dfdfdf',
      fontFamily: "RobotoDraft, 'Helvetica Neue', Helvetica, Arial;",
      fontSize: '16px',
      height: '32px',
      outline: 'none',
      left: 0,
      paddingTop: '8px',
      position: 'absolute',
      top: 0,
      transition: 'border-bottom .38s linear',
      width: '100%',
      ':focus': {
        borderBottom: 'solid 2px #5677fc'
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

    };
  }),

  scrollLeftTextFieldStyle: ReactStyle(function scrollLeftTextFieldStyle(){

  }),

  scrollRightTextFieldStyle: ReactStyle(function scrollRightTextFieldStyle(){

  }),

  placeHolderStyling: ReactStyle(function placeHolderStyling(){
    return {
      color: '#dfdfdf',
      fontSize: '16px',
      left: 0,
      position: 'absolute',
      top: '15px',
      width: '100%',
      height: '100%',
      transition: 'top .18s linear, font-size .18s linear'
    }
  }),

  containerStyling: ReactStyle(function containerStyling(){
    return {
      height: '48px',
      position: 'relative',
      width: '200px'
    };
  }),

  placeHolderTopStyling: ReactStyle(function placeHolderTopStyling(){
    return {
      fontSize: '12px',
      top: '-8px'
    };
  }),

  render: function() {
    var textfield = this.refs.textfield;

    var placeHolderStyling = [this.placeHolderStyling()];
    if (textfield && textfield.getDOMNode().value.trim().length) {
      placeHolderStyling.push(this.placeHolderTopStyling());
    }
    return <div styles={this.containerStyling()}>
      <div styles={placeHolderStyling}>{this.props.placeHolder}</div>
      <input onChange={this.onChange} type="text" ref="textfield" styles={this.normalTextFieldStyle()} />
    </div>;
  },

  onChange: function() {
    // todo: optimize
    this.forceUpdate();
  }

});

module.exports = TextField;