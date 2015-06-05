import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

const coreIconsTemp = require('./icons/core-icons.html');
const coreIcons = coreIconsTemp
  .substr(coreIconsTemp.indexOf('<defs>') + 6)
  .substr(0, coreIconsTemp.indexOf('</defs>'));

const socialIconsTemp = require('./icons/social-icons.html');
const socialIcons = socialIconsTemp
  .substr(socialIconsTemp.indexOf('<defs>') + 6)
  .substr(0, socialIconsTemp.indexOf('</defs>'));

let div;
let svgSupport = false;
if (typeof window !== 'undefined') {
  div = document.createElement('div');
  div.innerHTML = coreIcons + socialIcons;
  svgSupport = !!window.SVGElement;
}

const IconStyles = StyleSheet.create({
  iconStyle: {
    display: 'inline-block',
    height: 24,
    width: 24
  }
});

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

    if (!icon) {
      return <div styles={ IconStyles.iconStyle } />;
    }

    const html = div.querySelector('#' + icon).innerHTML;

    const svgStyles = [
      IconStyles.IconStyles,
      styles
    ];

    return (
      <svg
        dangerouslySetInnerHTML={{ __html: html }}
        height='100%'
        preserveAspectRatio='xMidYMid meet'
        styles={ svgStyles }
        viewBox='0 0 24 24'
        width='100%' />
    );
  }
}
