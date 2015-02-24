/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

export default class FormRow extends React.Component {

  render() {
    var props   = this.props;
    var styles  = FormRowStyles;
    return <div styles={styles.normalStyle}>
      {props.children}
    </div>;
  }

}

var FormRowStyles = StyleSheet.create({

  normalStyle: {
    padding: '20px'
  }

});