/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var Typography = require('../style/Typography');

class Subheader extends React.Component {

  render() {
    var styles = SubheaderStyles;
    return <div styles={[Typography.subhead, styles.normalStyle]}>
      {this.props.children}
    </div>
  }

}

var SubheaderStyles = StyleSheet.create({

  normalStyle: {
    height: 48,
    lineHeight: '48px',
    padding: '0 16px',
    position: 'relative'
  }

});

module.exports = Subheader;
