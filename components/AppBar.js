/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Typography = require('../style/Typography');
var Icon = require('./Icon');

var AppBar = React.createClass({

  normalAppBarStyle: ReactStyle(function normalAppBarStyle() {
    return {
      backgroundColor: '#00bcd4',
      boxSizing: 'border-box',
      height: '56px',
      width: '100%'
    };
  }),

  navButtonStyle: ReactStyle(function navButtonStyle(){
    return {
      height: '26px',
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      position: 'relative',
      width: '24px',
      display: 'inline-block',
      padding: '14px 16px',
      cursor: 'pointer',
      verticalAlign: 'top'
    };
  }),

  titleStyle:ReactStyle(function titleStyle(){
    var style = Typography.title;
    style.display = 'inline-block';
    delete style.opacity;
    style.cursor = 'default';
    style.lineHeight = '56px';
    return style;
  }),

  boxShadowStyle: ReactStyle(function boxShadowStyle(){
    return {
      boxShadow: '0 2px 5px rgba(0, 0, 0, .26)'
    };
  }),

  propTypes: {
    actionButtons: React.PropTypes.array,
    onNavButtonClick: function(){},
    onMenuButtonCLick: function(){},
    onBackButtonClick: function(){},
    title: React.PropTypes.string,
    boxShadow: React.PropTypes.bool
  },

  render: function() {
    var props = this.props;
    var appBarStyles = [this.normalAppBarStyle()]
    if (props.styles) {
      appBarStyles = appBarStyles.concat(props.styles);
    }
    if (props.boxShadow) {
      appBarStyles.push(this.boxShadowStyle());
    }
    return <nav styles={appBarStyles}>
    {props.onNavButtonClick &&
      <div styles={this.navButtonStyle()} onClick={props.onNavButtonClick}>
        <Icon icon="menu"/>
      </div>
      }
    {props.title &&
      <div styles={this.titleStyle()}>
        {props.title}
      </div>
      }
      {props.children}
    </nav>;
  }

});

module.exports = AppBar;