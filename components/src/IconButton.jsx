import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import Colors from '../style/Colors';
import CircleShadow from './CircleShadow';
import Icon from './Icon';
import { noop } from './utils';

const IconButtonStyles = StyleSheet.create({
  normalStyle: {
    cursor: 'pointer',
    display: 'inline-block',
    height: 24,
    padding: 8,
    position: 'relative',
    width: 24,
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    outline: 'none'
  },

  circleShadowStyle: {
    backgroundColor: Colors.grey.P400,
    height: 24,
    left: 7,
    padding: 0,
    top: 8,
    transform: 'scale(2) translateZ(0)',
    width: 24
  }
});

export default class extends React.Component {
  constructor(props) { super(props); }
  static displayName = 'IconButton'
  static defaultProps = {
    onClick: noop
  }
  static propTypes = {
    icon: PropTypes.string,
    onClick: PropTypes.func,
    styles: PropTypes.object
  }
  render() {
    const {
      icon,
      onClick,
      styles
    } = this.props;

    const {
      normalStyle,
      circleShadowStyle
    } = IconButtonStyles;

    const iconStyles = styles ? styles.iconStyles : null;
    return (
      <div
        onClick={ () => onClick() }
        styles={ normalStyle }>
        <CircleShadow
          active={ true }
          styles={ circleShadowStyle } />
        <Icon
          icon={ icon }
          styles={ iconStyles }/>
      </div>
    );
  }
}
