'use strict';

var ReactStyle = require('react-style');

var BlueTheme = {
  AppBar: {
    normalAppBarStyle: ReactStyle(function(){
      return {
        backgroundColor: '#3f51b5',
        position: 'fixed',
        zIndex: 1,
        top: 0
      };
    }),
    navButtonStyle: ReactStyle(function(){
      return {
        fill: 'white'
      }
    }),
    titleStyle: ReactStyle(function(){
      return {
        color: 'white'
      };
    })
  },
  Button: {
    normalButtonStyle: ReactStyle(function() {
      return {
        margin: '10px'
      };
    })
  },
  FloatingActionButton: {
    normalStyle: ReactStyle(function(){
      return {
        margin: '10px'
      };
    })
  }
};

module.exports = BlueTheme;