/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Shadow = require('./Shadow');

var Card = React.createClass({

  normalCardStyle: ReactStyle(function(){
    return {
      backgroundColor: 'white',
      borderRadius: 2,
      margin: 8,
      height: 250,
      padding: 16,
      position: 'relative'
    };
  }),

  headerStyle: ReactStyle(function(){
    return {
      cursor: 'default',
      marginBottom: 35,
      marginTop: 0
    };
  }),

  render: function() {
    var props = this.props;
    return <div styles={this.normalCardStyle()}>
      <Shadow size={1} />
      {props.title &&
        <h3 styles={this.headerStyle()}>{props.title}</h3>
      }
      {this.props.children}
    </div>;
  }

});

module.exports = Card;