'use strict';

var ReactStyle = require('react-style');

var BlueTheme = {
  AppBar: {
    normalAppBarStyle: ReactStyle(function normalAppBarStyle(){
      return {
        backgroundColor: '#3f51b5',
        position: 'fixed',
        zIndex: 1,
        top: 0
      };
    }),
    navButtonStyle: ReactStyle(function navButtonStyle(){
      return {
        fill: 'white'
      }
    }),
    titleStyle: ReactStyle(function titleStyle(){
      return {
        color: 'white'
      };
    })
  },
  Button: {
    normalButtonStyle: ReactStyle(function normalButtonStyle() {
      return {
        margin: '10px'
      };
    })
  },
  FloatingActionButton: {
    normalStyle: ReactStyle(function normalStyle(){
      return {
        margin: '10px'
      };
    })
  }
};

module.exports = BlueTheme;