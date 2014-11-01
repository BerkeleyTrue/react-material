/**
 * @jsx React.DOM
 */
'use strict';

var React      = require('react');
var ReactStyle = require('react-style');

var TextField  = require('./TextField');

// on select go to top + full width + show suggestions
var AutoComplete = React.createClass({

  render() {
    return <div>
      <div>
        <TextField />
      </div>
    </div>;
  }

});

module.exports = AutoComplete;
