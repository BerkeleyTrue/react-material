/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var List = React.createClass({

  normalListStyle: ReactStyle(function normalListStyle(){
    return {
      overflow: 'auto',
      overflowY: 'auto',
      overflowX: 'none'
    };
  }),

  render: function() {
    var listStyle = this.normalListStyle();
    return <div styles={listStyle}>
      {this.props.children}
    </div>;
  }

});

module.exports = List;
