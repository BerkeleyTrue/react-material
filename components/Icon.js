/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';

var coreIcons = require('./icons/core-icons.html');
coreIcons = coreIcons.substr(coreIcons.indexOf('<defs>') + '<defs>'.length);
coreIcons = coreIcons.substr(0, coreIcons.indexOf('</defs>'));
var socialIcons = require('./icons/social-icons.html');
socialIcons = socialIcons.substr(socialIcons.indexOf('<defs>') + '<defs>'.length);
socialIcons = socialIcons.substr(0, socialIcons.indexOf('</defs>'));

var div;
if (typeof window !== 'undefined') {
  div = document.createElement('div');
  div.innerHTML = coreIcons + socialIcons;
}

export default class Icon extends React.Component {

  render() {
    if (!this.props.icon) {
      return <div />;
    }

    if (window.SVGSVGElement) {
      var html = div.querySelector('#' + this.props.icon).innerHTML;

      return <svg styles={this.props.styles} viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" dangerouslySetInnerHTML={{__html: html}}></svg>
    }
    else {
      // TODO: should go to generated image sprite
      return <div />;
    }
  }

}