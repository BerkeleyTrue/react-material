/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class CardCollection extends React.Component {

  render() {
    return <div styles={CardCollectionStyles.normalCardCollectionStyle}>
      {this.props.children}
    </div>;
  }

}

var CardCollectionStyles = StyleSheet.create({
  normalCardCollectionStyle: {

  }
});