/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CardCollection = React.createClass({

	styles: {
		normalCardCollectionStyle: ReactStyle({

		})
	},

  render: function() {
	  var styles = this.styles;
    return <div styles={styles.normalCardCollectionStyle}>
      {this.props.children}
    </div>;
  }

});

module.exports = CardCollection;