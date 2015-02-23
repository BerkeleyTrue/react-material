/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var Overlay = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render: function() {
    var styles = OverlayStyles;
    var overlayStyles = [styles.normalOverlayStyle];
    if (this.props.show) {
      overlayStyles.push(styles.normalOverlayVisibleStyle);
    }
    return <div onClick={this.onClick} styles={overlayStyles}>

    </div>
  },

  onClick: function(e) {
    var props = this.props;
    if (props.onClick) {
      props.onClick(e);
    }
  }
});

var OverlayStyles = StyleSheet.create({

  normalOverlayStyle: {
    height: '100%',
    position: 'fixed',
    width: '100%',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgb(0,0,0)',
    opacity: '.01',
    zIndex: '2',
    visibility: 'hidden',
    transition: 'visibility 0s linear .4s, opacity .4s cubic-bezier(.4, 0, .2, 1), z-index 0s linear .4s'
  },

  normalOverlayVisibleStyle: {
    opacity: '.3',
    filter: 'alpha(opacity=30)', // wonder what's better this or transparent images (both suck for this)
    visibility: 'visible',
    transition: 'visibility 0s linear 0s, opacity .4s cubic-bezier(.4, 0, .2, 1), z-index 0s linear 0s'
  }

});

module.exports = Overlay;
