'use strict';

var ReactStyle = require('react-style');

var Shadow = {
  z1top: ReactStyle(function z1top() {
    return {
      boxShadow: '0 2px 10px 0 rgba(0, 0, 0, 0.16)'
    };
  }),
  z1bottom: ReactStyle(function z1bottom() {
    return {
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)'
    };
  }),
  z2top: ReactStyle(function z2top() {
    return {
      boxShadow: '0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    }
  }),
  z2bottom: ReactStyle(function z2bottom() {
    return {
      boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
    }
  }),
  z3top: ReactStyle(function z3top() {
    return {
      boxShadow: '0 17px 50px 0 rgba(0, 0, 0, 0.19)'
    };
  }),
  z3bottom: ReactStyle(function z3bottom() {
    return {
      boxShadow: '0 12px 15px 0 rgba(0, 0, 0, 0.24)'
    };
  }),
  z4top: ReactStyle(function z4top() {
    return {

      boxShadow: '0 25px 55px 0 rgba(0, 0, 0, 0.21)'
    }
  }),
  z4bottom: ReactStyle(function z4bottom() {
    return {
      boxShadow: '0 16px 28px 0 rgba(0, 0, 0, 0.22)'
    }
  }),
  z5top: ReactStyle(function z5top() {
    return {
      boxShadow: '0 40px 77px 0 rgba(0, 0, 0, 0.22)'
    };
  }),
  z5bottom: ReactStyle(function z5bottom() {
    return {
      boxShadow: '0 27px 24px 0 rgba(0, 0, 0, 0.2)'
    };
  })
};

module.exports = Shadow;