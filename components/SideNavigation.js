/**
 * @jsx React.DOM
 */
'use strict';

var Colors = require('../style/Colors');

var React = require('react');
var ReactStyle = require('react-style');

var SideNavigation = React.createClass({

  styles: {
    normalSideNavStyle: ReactStyle({
      backgroundColor: 'white',
      borderRight: '1px solid ' + Colors.grey.P300,
      bottom: 0,
      left: 0,
      overflow: 'auto',
      position: 'fixed',
      top: 0,
      width: 240,
      transform: 'translateX(-241px)',
      transition: 'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear .21s',
      zIndex: 4,
      visibility: 'hidden'
    }),

    showSideNavStyle: ReactStyle({
      transform: 'translateX(0)',
      transition: 'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear 0s',
      visibility: 'visible'
    })
  },

  render: function() {
    var props = this.props;
    var styles = this.styles;
    var sideNavigationStyles = [styles.normalSideNavStyle];
    if (props.show) {
      sideNavigationStyles.push(styles.showSideNavStyle);
    }
    return <div styles={sideNavigationStyles}>
      {this.props.children}
    </div>;
  }

});

module.exports = SideNavigation;