import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

const OverlayStyles = StyleSheet.create({
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
    transition:
      'visibility 0s ' +
      'linear .4s, ' +
      'opacity .4s ' +
      'cubic-bezier(.4, 0, .2, 1), ' +
      'z-index 0s linear .4s'
  },

  normalOverlayVisibleStyle: {
    opacity: '.3',
    // NOTE: wonder what's better this or
    // transparent images (both suck for this)
    filter: 'alpha(opacity=30)',
    visibility: 'visible',
    transition:
      'visibility 0s ' +
      'linear 0s, ' +
      'opacity .4s ' +
      'cubic-bezier(.4, 0, .2, 1), ' +
      'z-index 0s linear 0s'
  }
});

export default class extends React.Component {
  constructor() {
    super();
  }
  static displayName = 'Overlay'
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    show: PropTypes.bool
  }

  render() {
    const {
      onClick,
      show
    } = this.props;

    const {
      normalOverlayVisibleStyle,
      normalOverlayStyle
    } = OverlayStyles;

    const overlayStyles = [normalOverlayStyle];

    if (show) {
      overlayStyles.push(normalOverlayVisibleStyle);
    }

    return (
      <div
        onClick={ onClick ? onClick : () => {} }
        styles={ overlayStyles }>
      </div>
    );
  }
}
