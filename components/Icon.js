/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var __SVGIcons = require('./__icons/core-icons.html');
__SVGIcons = __SVGIcons.substr(__SVGIcons.indexOf('<defs>') + '<defs>'.length);
__SVGIcons = __SVGIcons.substr(0, __SVGIcons.indexOf('</defs>'));
var div = document.createElement('div');
div.innerHTML = __SVGIcons;

var Icon = React.createClass({

  iconStyle: ReactStyle(function(){
    return {
      bottom: 0,
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0
    };
  }),

  shouldComponentUpdate: function() {
    return false;
  },

  render: function() {
    if (!this.props.icon) {
      return <div />;
    }

    return <svg styles={this.props.styles} viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" ref="svg" dangerouslySetInnerHTML={{__html:div.querySelector('#' + this.props.icon).innerHTML}}>
    </svg>;
  }


});

module.exports = Icon;