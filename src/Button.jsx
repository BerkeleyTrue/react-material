import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors, Sizes, Typography } from './style';
import { RippleContainer, Shadow } from './';
import { isTouchDevice, noop } from './utils';

const ButtonStyles = StyleSheet.create({
  normalButtonStyle: {
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  static displayName = 'Button'
  static defaultProps = {
    onClick: noop
  }
  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    styles: PropTypes.array,
    raised: PropTypes.bool
  }

  onMouseUp() {
    if (this.props.disabled) {
      return;
    }
    this.setState({ active: false });
  }

  onMouseDown() {
    if (this.props.disabled) {
      return;
    }
    this.setState({ active: true });
  }

  renderRipples(disabled, onClick, styles) {
    if (disabled) {
      return null;
    }
    return (
      <RippleContainer
        onClick={ onClick }
        styles={ styles } />
    );
  }

  render() {
    const {
      shadowStyle,
      rippleContainerStyle,
      normalButtonStyle
    } = ButtonStyles;

    const {
      children,
      disabled,
      onClick,
      raised
    } = this.props;

    let styles = [
      Typography.button,
      normalButtonStyle
    ];

    let shadowSize = -1;
    if (this.props.styles) {
      styles = styles.concat(this.props.styles);
    }
    if (disabled) {
      styles.push(ButtonStyles.disabledButtonStyle);
    } else if (raised) {
      styles.push(ButtonStyles.raisedButtonStyle);
      shadowSize = 1;

      if (this.state.active) {
        shadowSize = 2;
      }
    }

    return (
      <div
        onMouseDown={ () => !isTouchDevice && this.onMouseDown() }
        onMouseLeave={ () => !isTouchDevice && this.onMouseUp() }
        onMouseUp={ () => !isTouchDevice && this.onMouseUp() }
        onTouchCancel={ () => isTouchDevice && this.onMouseUp() }
        onTouchEnd={ () => isTouchDevice && this.onMouseUp() }
        onTouchStart={ () => isTouchDevice && this.onMouseDown() }
        role='button'
        styles={ styles }
        tabIndex='0'>
          <Shadow size={ shadowSize } styles={ shadowStyle }>
            { this.renderRipples(disabled, onClick, rippleContainerStyle) }
            { children }
          </Shadow>
      </div>
    );
  }
}
