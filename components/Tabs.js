/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Tabs = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      height: '48px',
      position: 'relative',
      width: '100%'
    }
  }),

  tabTitleStyle: ReactStyle(function(){
    return {
      height: '100%',
      display: 'inline-block'
    }
  }),

  render: function() {
    var props = this.props;
    var titles = [];
    var children = props.children;
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      titles[i] = <li styles={this.tabTitleStyle()}>{child.props.title}</li>;
    }

    return <div styles={this.normalStyle()}>
      <ul>
        {titles}
      </ul>
      <div />
      {this.props.children}
    </div>
  }

});

module.exports = Tabs;