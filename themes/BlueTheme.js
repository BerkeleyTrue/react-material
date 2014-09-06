'use strict';

var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var BlueTheme = {
  AppBar: {
    normalAppBarStyle: ReactStyle(function normalAppBarStyle(){
      return {
        backgroundColor: Colors.blue.P500,
        zIndex: 1,
        top: 0
      };
    }),
    placeHolderStyle: ReactStyle(function normalAppBarStyle(){
      return {
        backgroundColor: Colors.blue.P500,
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
    containerStyle: ReactStyle(function normalStyle(){
      return {
        margin: '10px'
      };
    })
  },
  Card: {
    headerStyle: ReactStyle(function headerStyle(){
      return {
        color: Colors.blue.P900
      };
    })
  }
};

module.exports = BlueTheme;