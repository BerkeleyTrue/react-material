/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var FormRow = React.createClass({

  render() {
    var props   = this.props;
    var styles  = FormRowStyles;
    return <div styles={styles.normalStyle}>
      {props.children}
    </div>;
  }

});

var FormRowStyles = StyleSheet.create({

  normalStyle: {
    padding: '20px'
  }

});

module.exports = FormRow;