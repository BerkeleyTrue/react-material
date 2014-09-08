/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');
var Sizes = require('../style/Sizes');
var Typography = require('../style/Typography');

var RippleContainer = require('./RippleContainer');
var Shadow = require('./Shadow');
var merge = require('../vendor/merge');

var isTouchDevice = 'ontouchstart' in window;

var Button = React.createClass({

  normalButtonStyle: ReactStyle(function normalButtonStyle() {
    return merge(Typography.button, {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      cursor: 'pointer',
      position: 'relative',
      height: Sizes.Button.height - 2 * 9,
      borderRadius: 3,
      display: 'inline-block',
      outline: 'none',
      padding: 9,
      textAlign: 'center',
      userSelect: 'none',
      minWidth: Sizes.Button.minWidth,
      lineHeight: '19px'
    });
  }),

  raisedButtonStyle: ReactStyle(function raisedButtonStyle() {
    return {
      backgroundColor: Colors.grey.P300
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

  shadowStyle: ReactStyle(function shadowStyle(){
    return {
      borderRadius: 3
    };
  }),

  rippleContainerStyle: ReactStyle(function(){
    return {
      overflow: 'hidden',
      borderRadius: 3
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
    var shadowSize = -1;
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.disabled) {
      styles.push(this.disabledButtonStyle());
    }
    else if (props.raised) {
      styles.push(this.raisedButtonStyle());
      shadowSize = 1;

      if (state.active) {
        shadowSize = 2;
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
                onMouseLeave={!isTouchDevice && this.onMouseUp} >
          <Shadow size={shadowSize} styles={this.shadowStyle()}>

      {!props.disabled &&
        <RippleContainer styles={this.rippleContainerStyle()} onClick={props.onClick}/>
      }
        {props.children}
          </Shadow>
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