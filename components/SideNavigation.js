/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var SideNavigation = React.createClass({

  normalSideNavStyle: ReactStyle(function(){
    return {
      backgroundColor: 'white',
      borderRight: '1px solid #e0e0e0',
      bottom: 0,
      left: 0,
      overflow: 'auto',
      position: 'fixed',
      top: 0,
      width: '240px',
      transform: 'translateX(-241px)',
      transition: 'transform .2s cubic-bezier(.4,0,.2,1)',
      zIndex: 4
    }
  }),

  showSideNavStyle: ReactStyle(function(){
    return {
      transform: 'translateX(0)'
    }
  }),

  render: function() {
    var props = this.props;
    var sideNavigationStyles = [this.normalSideNavStyle()];
    if (props.show) {
      sideNavigationStyles.push(this.showSideNavStyle());
    }
    return <div styles={sideNavigationStyles}>
      {this.props.children}
    </div>;
  }

});

module.exports = SideNavigation;