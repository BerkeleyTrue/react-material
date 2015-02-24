/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

class Tab extends React.Component {

  //propTypes: {
  //  title: React.PropTypes.string.isRequired
  //},

  render() {
    return <div>
      {this.props.children}
    </div>
  }

}

module.exports = Tab;
