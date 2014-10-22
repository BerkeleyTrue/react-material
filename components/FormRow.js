/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var FormRowStyles = {

	normalStyle: ReactStyle({
		padding: '20px'
	})

};

var FormRow = React.createClass({

  render() {
	  var props   = this.props;
	  var styles  = FormRowStyles;
    return <div styles={styles.normalStyle}>
      {props.children}
    </div>;
  }

});

module.exports = FormRow;