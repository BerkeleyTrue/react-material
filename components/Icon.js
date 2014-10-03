/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

//var coreIcons = require('./__icons/core-icons.html');
//coreIcons = coreIcons.substr(coreIcons.indexOf('<defs>') + '<defs>'.length);
//coreIcons = coreIcons.substr(0, coreIcons.indexOf('</defs>'));
//var socialIcons = require('./__icons/social-icons.html');
//socialIcons = socialIcons.substr(socialIcons.indexOf('<defs>') + '<defs>'.length);
//socialIcons = socialIcons.substr(0, socialIcons.indexOf('</defs>'));


//var div = document.createElement('div');
//div.innerHTML = coreIcons + socialIcons;

var Icon = React.createClass({

  iconStyle: ReactStyle({
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0
  }),

  render: function() {
    // temp solution :(
   // if (!this.props.icon) {
      return <div />;
   // }
//
//    if (window.SVGSVGElement) {
//      return <svg styles={this.props.styles} viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" ref="svg" dangerouslySetInnerHTML={{__html: div.querySelector('#' + this.props.icon).innerHTML}} />
//    }
//    else {
//      // TODO: should go to generated image sprite
//      return <div />;
//    }
  }


});

module.exports = Icon;
