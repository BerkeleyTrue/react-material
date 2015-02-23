/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var ListItem = require('../components/ListItem');

var BottomSheetItem = React.createClass({

  render() {
    return this.transferPropsTo(<ListItem styles={BottomSheetItemStyles.normalStyle}>{this.props.children}</ListItem>);
  }

});

var BottomSheetItemStyles = StyleSheet.create({
  normalStyle: {
    height: 48
  }
});


module.exports = BottomSheetItem;
