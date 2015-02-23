/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var ShadowStyle = require('../style/Shadow');

var ShadowStyles = StyleSheet.create({

  normalShadowStyle: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    willChange: 'box-shadow',
    transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
  }

});

var Shadow = React.createClass({

  propTypes: {
    size: React.PropTypes.number.isRequired
  },

  render: function() {
    var props = this.props;
    var styles = ShadowStyles;
    var size = props.size;
    var shadowTopStyle;
    var shadowBottomStyle;

    if (size === 1) {
      shadowTopStyle = ShadowStyle.z1top;
      shadowBottomStyle = ShadowStyle.z1bottom;
    }
    else if (size === 2) {
      shadowTopStyle = ShadowStyle.z2top;
      shadowBottomStyle = ShadowStyle.z2bottom;
    }
    else if (size === 3) {
      shadowTopStyle = ShadowStyle.z3top;
      shadowBottomStyle = ShadowStyle.z3bottom;
    }
    else if (size === 4) {
      shadowTopStyle = ShadowStyle.z4top;
      shadowBottomStyle = ShadowStyle.z4bottom;
    }
    else if (size === 5) {
      shadowTopStyle = ShadowStyle.z5top;
      shadowBottomStyle = ShadowStyle.z5bottom;
    }

    var bottomStyles = [styles.normalShadowStyle, shadowBottomStyle];
    var topStyles = [styles.normalShadowStyle , shadowTopStyle];
    if (props.styles) {
      bottomStyles = bottomStyles.concat(props.styles);
      topStyles = topStyles.concat(props.styles);
    }
    return <div>
      <div styles={bottomStyles}/>
      <div styles={topStyles} />
        {this.props.children}
      </div>;
  }

});

module.exports = Shadow;