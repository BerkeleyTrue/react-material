/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var TextField = require('../components/TextField');

var TextFieldsView = React.createClass({

  render: function() {
    return <div>
      <h2>Single line text fields</h2>
      <TextField placeHolder="Name"/>
      <h2>Single Line with Scrolling</h2>
    TODO
      <h2>Floating Labels</h2>
    TODO
      <h2>Multi-line-text field</h2>
    TODO
      <h2>Full-width text field</h2>
    TODO
      <h2>Character Counter</h2>
    TODO
      <h2>Auto-complete text field</h2>
    TODO
      <h2>Search Filter</h2>
    TODO
      <h2>Error indication</h2>
      <TextField error="Well that sucks" />
      <h2>Character counter</h2>
    TODO
    </div>;
  }

});

module.exports = TextFieldsView;
