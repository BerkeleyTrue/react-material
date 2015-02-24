/**
 * @jsx React.DOM
 */
'use strict';

import React from 'babel!react';
import StyleSheet from 'babel!react-style';

import {Colors, Sizes, Typography} from 'babel!../style';

import RippleContainer from 'babel!./RippleContainer';
import Shadow from 'babel!./Shadow';

var isTouchDevice = typeof window !== 'undefined' && 'ontouchstart' in window;

class Button extends React.Component {

  //propTypes: {
  //  raised: React.PropTypes.bool,
  //  disabled: React.PropTypes.bool
  //},

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  render() {
    var props = this.props;
    var state = this.state;
    var styles = [Typography.button, ButtonStyles.normalButtonStyle];
    var shadowSize = -1;
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.disabled) {
      styles.push(ButtonStyles.disabledButtonStyle);
    }
    else if (props.raised) {
      styles.push(ButtonStyles.raisedButtonStyle);
      shadowSize = 1;

      if (state.active) {
        shadowSize = 2;
      }
    }

    return <div role="button"
                tabIndex="0"
                styles={styles}
                onTouchStart={() => isTouchDevice && this.onMouseDown()}
                onTouchEnd={() => isTouchDevice && this.onMouseUp()}
                onTouchCancel={() => isTouchDevice && this.onMouseUp()}
                onMouseDown={() => !isTouchDevice && this.onMouseDown()}
                onMouseUp={() => !isTouchDevice && this.onMouseUp()}
                onMouseLeave={() => !isTouchDevice && this.onMouseUp()} >
          <Shadow size={shadowSize} styles={ButtonStyles.shadowStyle}>

      {!props.disabled &&
        <RippleContainer styles={ButtonStyles.rippleContainerStyle} onClick={() => props.onClick && props.onClick()}/>
      }
        {props.children}
          </Shadow>
      </div>;
  }

  onMouseUp() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: false});
  }

  onMouseDown() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: true});
  }

}

var ButtonStyles = StyleSheet.create({

  normalButtonStyle: {
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
  },

  raisedButtonStyle: {
    backgroundColor: Colors.grey.P300
  },

  raisedButtonPressedStyle: {
    boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
  },

  disabledButtonStyle: {
    backgroundColor: Colors.grey.P300,
    color: Colors.grey.P500,
    cursor: 'default'
  },

  shadowStyle: {
    borderRadius: '3px'
  },

  rippleContainerStyle: {
    overflow: 'hidden',
    borderRadius: '3px'
  }

});

export default Button;
