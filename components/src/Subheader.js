'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Typography} from '../style/';

class Subheader extends React.Component {

  render() {
    var styles = SubheaderStyles;
    return <div styles={[Typography.subhead, styles.normalStyle]}>
      {this.props.children}
    </div>
  }

}

var SubheaderStyles = StyleSheet.create({

  normalStyle: {
    height: 48,
    lineHeight: '48px',
    padding: '0 16px',
    position: 'relative'
  }

});

module.exports = Subheader;
