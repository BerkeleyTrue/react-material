/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CardCollectionStyles = {
	normalCardCollectionStyle: ReactStyle({

	})
};

var CardCollection = React.createClass({

  render: function() {
	  var styles = CardCollectionStyles;
    return <div styles={styles.normalCardCollectionStyle}>
      {this.props.children}
    </div>;
  }

});

module.exports = CardCollection;