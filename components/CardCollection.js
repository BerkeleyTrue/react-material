/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CardCollection = React.createClass({

  normalCardCollectionStyle: ReactStyle(function(){

  }),

  render: function() {
    return <div styles={this.normalCardCollectionStyle()}>
      {this.props.children}
    </div>;
  }

});

module.exports = CardCollection;