/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CircleShadow = require('./CircleShadow');
var Colors = require('../style/Colors');
var Icon = require('./Icon');

var IconButton = React.createClass({

  normalStyle: ReactStyle(function normalStyle(){
    return {
      cursor: 'pointer',
      display: 'inline-block',
      height: 24,
      padding: 8,
      position: 'relative',
      width: 24,
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      outline: 'none'
    };
  }),

  circleShadowStyle: ReactStyle(function circleShadowStyle(){
    return {
      backgroundColor: Colors.grey.P400,
      height: 24,
      left: 7,
      padding: 0,
      top: 8,
      transform: 'scale(2) translateZ(0)',
      width: 24
    };
  }),

  render: function() {
    return <div styles={this.normalStyle()} onClick={this.props.onClick}>
      <CircleShadow active={true} styles={this.circleShadowStyle()}/>
      <Icon icon={this.props.icon}/>
    </div>;
  }

});

module.exports = IconButton;
