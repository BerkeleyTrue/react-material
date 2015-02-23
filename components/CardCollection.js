/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

class CardCollection extends React.Component {

  render() {
    var styles = CardCollectionStyles;
    return <div styles={styles.normalCardCollectionStyle}>
      {this.props.children}
    </div>;
  }

}

var CardCollectionStyles = StyleSheet.create({
  normalCardCollectionStyle: {

  }
});

module.exports = CardCollection;