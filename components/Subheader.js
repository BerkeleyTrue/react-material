/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Typography = require('../style/Typography');

var merge = require('../vendor/merge');

var Subheader = React.createClass({

	styles: {

		normalStyle: ReactStyle({
			height: 48,
			lineHeight: '48px',
			padding: '0 16px',
			position: 'relative'
		})

	},

  render: function() {
	  var styles = this.styles;
    return <div styles={[Typography.subhead, styles.normalStyle]}>
      {this.props.children}
    </div>
  }

});

module.exports = Subheader;
