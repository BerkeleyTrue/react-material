/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');
var Sizes = require('../style/Sizes');

var RippleContainer = require('./RippleContainer');

var merge = require('../vendor/merge');

var isTouchDevice = 'ontouchstart' in window;

var Button = React.createClass({

  normalButtonStyle: ReactStyle(function normalButtonStyle() {
    return {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      cursor: 'pointer',
      position: 'relative',
      height: Sizes.Button.height - 2 * 9,

      borderRadius: 3,
      display: 'inline-block',
      outline: 'none',
      overflow: 'hidden',
      padding: '9px 0',

      textAlign: 'center',
      textTransform: 'uppercase',
      userSelect: 'none',
      minWidth: Sizes.Button.minWidth
    };
  }),

  raisedButtonStyle: ReactStyle(function raisedButtonStyle() {
    return {
      backgroundColor: Colors.grey.P300,
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
      transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }),

  raisedButtonPressedStyle: ReactStyle(function raisedButtonPressedStyle(){
    return {
      boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
    };
  }),

  disabledButtonStyle: ReactStyle(function disabledButtonStyle() {
    return {
      backgroundColor: Colors.grey.P300,
      color: Colors.grey.P500,
      cursor: 'default'
    };
  }),

  propTypes: {
    raised: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var styles = [this.normalButtonStyle()];
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.disabled) {
      styles.push(this.disabledButtonStyle());
    }
    else if (props.raised) {
      styles.push(this.raisedButtonStyle());

      if (state.active) {
        styles.push(this.raisedButtonPressedStyle());
      }
    }


    return <div role="button"
                tabIndex="0"
                styles={styles}
                onTouchStart={isTouchDevice && this.onMouseDown}
                onTouchEnd={isTouchDevice && this.onMouseUp}
                onTouchCancel={isTouchDevice && this.onMouseUp}
                onMouseDown={!isTouchDevice && this.onMouseDown}
                onMouseUp={!isTouchDevice && this.onMouseUp}
                onMouseLeave={!isTouchDevice && this.onMouseUp}
                >
    {!props.disabled &&
      <RippleContainer onClick={props.onClick}/>
    }
      {props.children}
    </div>;
  },

  onMouseUp: function() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: false});
  },

  onMouseDown: function() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: true});
  }

});

module.exports = Button;