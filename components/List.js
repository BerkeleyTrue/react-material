/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ListStyles = {

	normalListStyle: ReactStyle({
		overflow: 'auto',
		overflowY: 'auto',
		overflowX: 'none'
	})

};

var List = React.createClass({

  render: function() {
    var styles = ListStyles;
    var listStyle = styles.normalListStyle;
    return <div styles={listStyle}>
      {this.props.children}
    </div>;
  }

});

module.exports = List;
