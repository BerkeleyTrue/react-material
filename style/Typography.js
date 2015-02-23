'use strict';

var StyleSheet = require('react-style');

var robotoFont = "'Roboto', 'Helvetica Neue', Helvetica, Arial";

var fontStyles = StyleSheet.create({
  display4: {
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 300,
    fontSize: 112,
    whiteSpace: 'nowrap'
  },
  display3: {
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 56,
    whiteSpace: 'nowrap'
  },
  display2: {
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 45
  },
  display1: {
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 34
  },
  headline: {
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 24
  },
  title: {
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 20,
    whiteSpace: 'nowrap'
  },
  subhead: {
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 16
  },
  body2: {
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: ''
  },
  body1: {
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 14
  },
  caption: {
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 12,
    whiteSpace: 'nowrap'
  },
  menu: {
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 14,
    whiteSpace: 'nowrap'
  },
  button: {
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 14,
    whiteSpace: 'nowrap',
    textTransform: 'uppercase'
  }
});

module.exports = {
	fontFamily: robotoFont,
	fontStyles: fontStyles
};

