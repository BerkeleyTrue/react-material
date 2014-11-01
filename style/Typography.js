'use strict';

var robotoFont = "'Roboto', 'Helvetica Neue', Helvetica, Arial";

var ReactStyle = require('react-style');

var FontStyles = {
  display4: ReactStyle({
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 300,
    fontSize: 112,
    whiteSpace: 'nowrap'
  }),
  display3: ReactStyle({
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 56,
    whiteSpace: 'nowrap'
  }),
  display2: ReactStyle({
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 45
  }),
  display1: ReactStyle({
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 34
  }),
  headline: ReactStyle({
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 24
  }),
  title: ReactStyle({
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 20,
    whiteSpace: 'nowrap'
  }),
  subhead: ReactStyle({
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 16
  }),
  body2: ReactStyle({
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: ''
  }),
  body1: ReactStyle({
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 14
  }),
  caption: ReactStyle({
    color: 'rgba(0, 0, 0, .54)',
    fontFamily: robotoFont,
    fontWeight: 400,
    fontSize: 12,
    whiteSpace: 'nowrap'
  }),
  menu: ReactStyle({
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 14,
    whiteSpace: 'nowrap'
  }),
  button: ReactStyle({
    color: 'rgba(0, 0, 0, .87)',
    fontFamily: robotoFont,
    fontWeight: 500,
    fontSize: 14,
    whiteSpace: 'nowrap',
    textTransform: 'uppercase'
  })
};

module.exports = FontStyles;