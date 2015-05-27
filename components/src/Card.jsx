'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import Shadow from './Shadow';

export default class Card extends React.Component {

  render() {
    var props  = this.props;
    var styles = CardStyles;
    return <div styles={styles.normalCardStyle}>
      <Shadow size={1} />
      {props.title &&
        <h3 styles={styles.headerStyle}>{props.title}</h3>
      }
      {this.props.children}
    </div>;
  }

}

var CardStyles = StyleSheet.create({

  normalCardStyle: {
    backgroundColor: 'white',
    borderRadius: 2,
    margin: 8,
    height: 250,
    padding: 16,
    position: 'relative'
  },

  headerStyle: {
    cursor: 'default',
    marginBottom: 35,
    marginTop: 0
  }

});
