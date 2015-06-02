import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import Shadow from '../style/Shadow';

const ShadowStyles = StyleSheet.create({
  normalShadowStyle: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    willChange: 'box-shadow',
    transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
  }
});

function getShadow(size) {
  size = parseInt(size, 10);
  if (size < 1) { size = 1; }
  if (size > 5) { size = 1; }
  const top = `z${size}top`;
  const bottom = `z${size}bottom`;
  return {
    shadowTopStyle: Shadow[top],
    shadowBottomStyle: Shadow[bottom]
  };
}

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'Shadow'
  static propTypes = {
    children: PropTypes.node,
    size: PropTypes.number.isRequired,
    styles: PropTypes.object
  }

  render() {
    const {
      size,
      styles
    } = this.props;

    const { normalShadowStyle } = ShadowStyles;

    const {
      shadowBottomStyle,
      shadowTopStyle
    } = getShadow(size);

    var bottomStyles = [normalShadowStyle, shadowBottomStyle];
    var topStyles = [normalShadowStyle, shadowTopStyle];

    if (styles) {
      bottomStyles = bottomStyles.concat(styles);
      topStyles = topStyles.concat(styles);
    }

    return (
      <div>
        <div styles={ bottomStyles }/>
        <div styles={ topStyles } />
          { this.props.children }
      </div>
    );
  }
}
