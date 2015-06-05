import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Icon, Shadow } from './';
import { Colors } from './style';
import { isTouchDevice, noop } from './utils';

const FloatingActionButtonStyles = StyleSheet.create({
  containerStyle: {
    cursor: 'pointer',
    position: 'relative',
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    borderRadius: '50%',
    display: 'inline-block',
    fill: 'white',
    height: 56,
    outline: 'none',
    userSelect: 'none',
    width: 56
  },

  normalStyle: {
    borderRadius: '50%',
    outline: 'none',
    width: '100%',
    userSelect: 'none',
    height: '100%',
    position: 'absolute',
    webkitTapHighlightColor: 'rgba(0,0,0,0)'
  },

  shadowStyle: {
    borderRadius: '50%'
  },

  miniStyle: {
    height: 40,
    width: 40
  },

  overlayStyle: {
    background: 'rgba(0, 0, 0, 0.08)',
    borderRadius: '50%',
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: '0',
    transition: 'opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  overlayPressedStyle: {
    opacity: '1'
  },

  miniIconStyle: {
    position: 'absolute',
    width: 24,
    left: 8
  },

  defaultIconStyle: {
    position: 'absolute',
    width: 24,
    left: 16
  },

  percentageStyle: {
    borderRadius: '50%',
    backgroundColor: 'transparent',
    position: 'absolute',
    opacity: '0',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    cursor: 'default'
  },

  percentageStyleVisible: {
    backgroundColor: Colors.amber.P500,
    opacity: '1',
    transition: 'opacity .5s ease-in'
  },

  progressCircleStyle: {
    strokeWidth: 2
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  static displayName = 'FloatingActionButton'
  static defaultProps = {
    onClick: noop
  }
  static propTypes = {
    icon: PropTypes.string.isRequired,
    mini: PropTypes.bool,
    onClick: PropTypes.func,
    percentage: PropTypes.number,
    progressCircleStyle: PropTypes.object,
    styles: PropTypes.object
  }

  onMouseDown() {
    var props = this.props;
    if (props.disabled || props.percentage) {
      return;
    }
    this.setState({active: true});
  }

  onMouseLeave() {
    var props = this.props;
    if (props.disabled || props.percentage) {
      return;
    }
    this.setState({active: false});
  }

  onMouseUp() {
    const { onClick } = this.props;
    this.onMouseLeave();
    if (onClick) {
      onClick();
    }
  }

  renderPercent(percent, style) {
    if (!percent) {
      return <div />;
    }
    return (
      <svg
        height={60}
        width={60}>
        <circle
          cx='30'
          cy='30'
          fill='transparent'
          id='bar'
          r='29'
          styles={ style } />
      </svg>
    );
  }

  render() {
    const {
      icon,
      mini,
      percentage,
      progressCircleStyle
    } = this.props;

    const {
      active
    } = this.state;

    const containerStyles = [styles.containerStyle];
    const iconStyle = mini ? styles.miniIconStyle : styles.defaultIconStyle;
    const normalStyles = [styles.normalStyle];
    const percentageStyling = [styles.percentageStyle];

    const shadowSize = 1;

    let styles = FloatingActionButtonStyles;
    if (this.props.styles) {
      normalStyles = normalStyles.concat(this.props.styles);
    }

    if (mini) {
      containerStyles.push(styles.miniStyle);
    }

    if (active && !percentage) {
      shadowSize = 2;
    }

    // react doesn't support strokeDashoffset yet :(
    /* if (percentage) {
      percentageStyling.push(styles.percentageStyleVisible);
      // const r = '29';
      // const c = Math.PI * (r * 2);

      if (percentage < 0) { percentage = 0; }
      if (percentage > 100) { percentage = 100; }

      // const pct = ((100 - percentage) / 100) * c;
      // percentageStyling.push({ strokeDashoffset: pct});
    }*/

    const progressCircleStyles = [
      styles.progressCircleStyle,
      progressCircleStyle
    ];

    var overlayStyles = [styles.overlayStyle];
    if (active) {
      overlayStyles.push(styles.overlayPressedStyle);
    }

    return (
      <div
        onMouseDown={ !isTouchDevice ? ::this.onMouseDown : null }
        onMouseLeave={ !isTouchDevice ? ::this.onMouseLeave : null }
        onMouseUp={ !isTouchDevice ? ::this.onMouseUp : null }
        onTouchCancel={ isTouchDevice ? ::this.onMouseUp : null }
        onTouchEnd={ isTouchDevice ? ::this.onMouseUp : null }
        onTouchStart={ isTouchDevice ? ::this.onMouseDown : null }
        role='button'
        styles={ containerStyles }
        tabIndex={ 0 }>
        <Shadow
          size={ shadowSize }
          styles={ styles.shadowStyle } />

        <div styles={ percentageStyling }>
          { this.renderPercent(percentage, progressCircleStyles) }
        </div>

        <div styles={ normalStyles }>
          <div styles={ overlayStyles } />
          <Icon
            icon={ icon }
            styles={ iconStyle }/>
        </div>
      </div>
    );
  }
}
