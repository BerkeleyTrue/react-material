/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CheckBox = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      backgroundColor: 'green'
    };
  }),

  render: function() {
    var styles = [this.normalStyle()];
    return <div styles={styles}></div>
  }

});

module.exports = CheckBox;
