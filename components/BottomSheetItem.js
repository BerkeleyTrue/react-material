/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ListItem = require('../components/ListItem');

var BottomSheetItem = React.createClass({
	styles: {
		normalStyle: ReactStyle({
			height: 48
		})
	},

  render() {
    return this.transferPropsTo(<ListItem styles={this.styles.normalStyle}>{this.props.children}</ListItem>);
  }

});

module.exports = BottomSheetItem;
