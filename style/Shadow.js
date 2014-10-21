'use strict';

var ReactStyle = require('react-style');

var Shadow = {
  z1top: ReactStyle({
    boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.16)'
  }),
  z1bottom: ReactStyle({
    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)'
  }),
  z2top: ReactStyle({
      boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)'
  }),
  z2bottom: ReactStyle({
    boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
  }),
  z3top: ReactStyle({
    boxShadow: '0 17px 50px 0 rgba(0, 0, 0, 0.19)'
  }),
  z3bottom: ReactStyle({
    boxShadow: '0 12px 15px 0 rgba(0, 0, 0, 0.24)'
  }),
  z4top: ReactStyle({
    boxShadow: '0 25px 55px 0 rgba(0, 0, 0, 0.21)'
  }),
  z4bottom: ReactStyle({
    boxShadow: '0 16px 28px 0 rgba(0, 0, 0, 0.22)'
  }),
  z5top: ReactStyle({
    boxShadow: '0 40px 77px 0 rgba(0, 0, 0, 0.22)'
  }),
  z5bottom: ReactStyle({
    boxShadow: '0 27px 24px 0 rgba(0, 0, 0, 0.2)'
  })
};

module.exports = Shadow;