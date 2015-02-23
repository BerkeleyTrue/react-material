/**
 * @jsx React.DOM
 */
'use strict';

var React      = require('react');
var StyleSheet = require('react-style');

var TextField  = require('./TextField');

// on select go to top + full width + show suggestions
class AutoComplete extends React.Component {

  render() {
    return <div>
      <div>
        <TextField />
      </div>
    </div>;
  }

}

module.exports = AutoComplete;
