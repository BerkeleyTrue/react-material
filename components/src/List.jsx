'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class List extends React.Component {

  render() {
    return <div styles={ListStyles.normalListStyle}>
      {this.props.children}
    </div>;
  }

}

var ListStyles = StyleSheet.create({

  normalListStyle: {
    overflow: 'auto',
    overflowY: 'auto',
    overflowX: 'none'
  }

});
