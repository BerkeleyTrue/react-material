import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';
import assign from 'object.assign';

import { svgSupport } from './utils';
import coreIcons from './icons/core-icons';
import socialIcons from './icons/social-icons';

const iconMap = assign({}, coreIcons, socialIcons);
const IconStyles = StyleSheet.create({
  iconStyle: {
    display: 'inline-block',
    height: 24,
    width: 24
  }
});

function getIconElement(icon) {
  if (!icon) {
    return <div styles={ IconStyles.iconStyle } />;
  }
  return iconMap[icon];
}

export default class Icon extends React.Component {
  constructor(props) { super(props); }

  static displayName = 'Icon'
  static propTypes = {
    icon: PropTypes.string,
    styles: PropTypes.object
  }

  render() {
    const {
      icon,
      styles
    } = this.props;

    if (!svgSupport) {
      // TODO: should go to generated image sprite for windows 8 support
      return <div />;
    }

    const svgStyles = [
      IconStyles.IconStyles,
      styles
    ];

    return (
      <svg
        height='100%'
        preserveAspectRatio='xMidYMid meet'
        styles={ svgStyles }
        viewBox='0 0 24 24'
        width='100%'>
        { getIconElement(icon) }
      </svg>
    );
  }
}
