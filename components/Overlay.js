/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Overlay = React.createClass({

  normalOverlayStyle: ReactStyle(function() {
    return {
      height: '100%',
      position: 'fixed',
      width: '100%',
      opacity: 0.01,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,.3)',
      zIndex: 2,
      visibility: 'hidden',
      transition: 'visibility 0s linear .4s, opacity .4s cubic-bezier(.4, 0, .2, 1)'
    };
  }),

  normalOverlayVisibleStyle: ReactStyle(function() {
    return {
      opacity: 1,
      visibility: 'visible',
      transitionDelay: 0
    };
  }),

  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render: function() {
    var overlayStyles = [this.normalOverlayStyle()];
    if (this.props.show) {
      overlayStyles.push(this.normalOverlayVisibleStyle());
    }
    return <div onClick={this.onClick} styles={overlayStyles}>

    </div>
  },

  onClick: function(e) {
    this.props.onClick(e);
  }
});

module.exports = Overlay;
