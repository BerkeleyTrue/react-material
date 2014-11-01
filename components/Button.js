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

var isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

var ButtonStyles = {

  normalButtonStyle: ReactStyle({
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    cursor: 'pointer',
    position: 'relative',
    height: Sizes.Button.height - 2 * 9,
    borderRadius: 3,
    display: 'inline-block',
    outline: 'none',
    overflow: 'hidden',
    padding: 9,
    textAlign: 'center',
    userSelect: 'none',
    minWidth: Sizes.Button.minWidth,
    lineHeight: '19px'
  }),

  raisedButtonStyle: ReactStyle({
    backgroundColor: Colors.grey.P300
  }),

  raisedButtonPressedStyle: ReactStyle({
    boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
  }),

  disabledButtonStyle: ReactStyle({
    backgroundColor: Colors.grey.P300,
    color: Colors.grey.P500,
    cursor: 'default'
  }),

  shadowStyle: ReactStyle({
    borderRadius: 3
  }),

  rippleContainerStyle: ReactStyle({
    overflow: 'hidden',
    borderRadius: '3'
  })

};

var Button = React.createClass({

  propTypes: {
    raised: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  getInitialState() {
    return {
      active: false
    };
  },

  render() {
    var props = this.props;
    var styles = ButtonStyles;
    var state = this.state;
    var styles = [Typography.button, styles.normalButtonStyle];
    var shadowSize = -1;
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.disabled) {
      styles.push(styles.disabledButtonStyle);
    }
    else if (props.raised) {
      styles.push(styles.raisedButtonStyle);
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
          <Shadow size={shadowSize} styles={styles.shadowStyle}>

      {!props.disabled &&
        <RippleContainer styles={styles.rippleContainerStyle} onClick={props.onClick}/>
      }
        {props.children}
          </Shadow>
      </div>;
  },

  onMouseUp() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: false});
  },

  onMouseDown() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: true});
  }

});

module.exports = Button;