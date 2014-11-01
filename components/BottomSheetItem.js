/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ListItem = require('../components/ListItem');

var BottomSheetItemStyles = {

  normalStyle: ReactStyle({
    height: 48
  })

};

var BottomSheetItem = React.createClass({

  render() {
    return this.transferPropsTo(<ListItem styles={BottomSheetItemStyles.normalStyle}>{this.props.children}</ListItem>);
  }

});

module.exports = BottomSheetItem;
