/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var Tabs = React.createClass({

  normalStyle: ReactStyle(function normalStyle(){
    return {
      position: 'relative',
      width: '100%'
    }
  }),

  tabTitlesContainerStyle: ReactStyle(function tabTitlesContainerStyle(){
    return {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      backgroundColor: Colors.cyan.P500,
      lineHeight: '48px',
      margin: 0,
      padding: 0,
      height: 48,
      position: 'relative',
      cursor: 'pointer',
      color: 'white',
      fontSize: 14,
      fontWeight: 500,
      boxShadow:'0px 3px 2px rgba(0, 0, 0, 0.2)'
    };
  }),

  tabTitleStyle: ReactStyle(function tabTitleStyle(){
    return {
      height: '100%',
      display: 'inline-block',
      textAlign: 'center',
      userSelect: 'none',
      opacity: .6,
      transition: 'opacity .38s linear'
    }
  }),

  tabTitleSelectedStyle: ReactStyle(function tabTitleSelectedStyle(){
    return {
      opacity: 1
    }
  }),

  selectionBarStyle: ReactStyle(function selectionBarStyle(){
    return {
      backgroundColor: Colors.yellow.A100,
      height: 2,
      transition: 'left .28s linear',
      position: 'absolute',
      bottom: 0
    };
  }),

  render: function() {
    var props = this.props;
    var titles = [];
    var children = props.children;
    var selectedTab;
    var selectedIndex = 0;
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var childProps = child.props;
      var tabTitleStyles = [this.tabTitleStyle(), {width:(100 / children.length) + '%'}];
      if (childProps.selected) {
        tabTitleStyles.push(this.tabTitleSelectedStyle());
        selectedTab = child;
        selectedIndex = i;
      }

      titles[i] = <li onClick={this.onTabHeaderClick} styles={tabTitleStyles}>{childProps.title}</li>;
    }
    var normalStyles = [this.normalStyle()];
    if (props.styles) {
      normalStyles = normalStyles.concat(props.styles);
    }
    return <div styles={normalStyles}>
      <ul styles={this.tabTitlesContainerStyle()}>
        {titles}
        <div styles={[this.selectionBarStyle(), {width:(100 / children.length) + '%', left: (100 / children.length * selectedIndex) + '%'}]}/>
      </ul>
      {selectedTab}
    </div>

  },

  onTabHeaderClick: function(e) {
    var props = this.props;
    if (props.onChange) {
      var position = 0;
      var target = e.target;

      while (target = target.previousSibling) {
        position++;
      }

      // enhance the event with the position of the blind
      e.position = position;
      props.onChange(e);
    }
  }

});

module.exports = Tabs;