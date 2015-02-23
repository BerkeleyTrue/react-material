/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var CardCollection = React.createClass({

  render: function() {
    var styles = CardCollectionStyles;
    return <div styles={styles.normalCardCollectionStyle}>
      {this.props.children}
    </div>;
  }

});

var CardCollectionStyles = StyleSheet.create({
  normalCardCollectionStyle: {

  }
});

module.exports = CardCollection;