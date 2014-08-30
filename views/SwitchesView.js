/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CheckBox = require('../components/CheckBox');
var RadioButton = require('../components/RadioButton');

var SwitchesView = React.createClass({

  render: function() {
    return <div>
      <h2>Checkbox</h2>
      <CheckBox />
      <h2>Radio</h2>
      <RadioButton />
      <h2>Switch</h2>
      TODO
    </div>;
  }

});

module.exports = SwitchesView;