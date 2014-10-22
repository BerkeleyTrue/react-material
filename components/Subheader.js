/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Typography = require('../style/Typography');

var merge = require('../vendor/merge');

var SubheaderStyles = {

	normalStyle: ReactStyle({
		height: 48,
		lineHeight: '48px',
		padding: '0 16px',
		position: 'relative'
	})

};

var Subheader = React.createClass({

  render: function() {
	  var styles = SubheaderStyles;
    return <div styles={[Typography.subhead, styles.normalStyle]}>
      {this.props.children}
    </div>
  }

});

module.exports = Subheader;
