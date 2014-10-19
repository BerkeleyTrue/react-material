/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var FormRow = React.createClass({

	styles: {
		normalStyle: ReactStyle({
			padding: '20px'
		})
	},

  render() {
	  var props   = this.props;
	  var styles  = this.styles;
    return <div styles={styles.normalStyle}>
      {props.children}
    </div>;
  }

});

module.exports = FormRow;