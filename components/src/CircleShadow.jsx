import React from 'react';
import StyleSheet from 'react-style';

import { Colors } from '../style';

const CircleShadowStyles = StyleSheet.create({
  normalStyle: {
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    backgroundColor: Colors.grey.P700,
    opacity: '0',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'scale(1) translateZ(0)',
    transition: 'opacity .48s ease .1s , transform .001s ease .6s',
    willChange: 'opacity, transform'
  },

  pressedStyle: {
    opacity: '.3',
    transform: 'scale(3) translateZ(0)',
    transition: 'opacity ease 0s, transform ease 0s'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }
  static displayName = 'CircleShadow'
  static propTypes = {
    active: React.PropTypes.bool,
    styles: React.PropTypes.object
  }

  onMouseUp() {
    this.setState({ pressed: false });
  }

  onMouseDown() {
    this.setState({ pressed: true });
  }

  render() {
    const { active } = this.props;
    const { pressed } = this.state;

    let styles = [CircleShadowStyles.normalStyle];
    if (pressed) {
      styles.push(CircleShadowStyles.pressedStyle);
    }

    if (active && this.props.styles) {
      styles = styles.concat(this.props.styles);
    }

    return (
      <div
        onMouseDown={ ::this.onMouseDown }
        onMouseUp={ ::this.onMouseUp }
        styles={styles} />
    );
  }
}
