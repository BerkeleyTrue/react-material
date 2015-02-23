/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var List = React.createClass({

  render: function() {
    var styles = ListStyles;
    var listStyle = styles.normalListStyle;
    return <div styles={listStyle}>
      {this.props.children}
    </div>;
  }

});

var ListStyles = StyleSheet.create({

  normalListStyle: {
    overflow: 'auto',
    overflowY: 'auto',
    overflowX: 'none'
  }

});

module.exports = List;
