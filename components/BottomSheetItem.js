/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import ListItem from './ListItem';

export default class BottomSheetItem extends React.Component {

  render() {
    return this.transferPropsTo(<ListItem styles={BottomSheetItemStyles.normalStyle}>{this.props.children}</ListItem>);
  }

}

var BottomSheetItemStyles = StyleSheet.create({
  normalStyle: {
    height: 48
  }
});
