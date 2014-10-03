/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var List = React.createClass({

  styles: {
    normalListStyle: ReactStyle({
      overflow: 'auto',
      overflowY: 'auto',
      overflowX: 'none'
    })
  },

  render: function() {
    var styles = this.styles;
    var listStyle = styles.normalListStyle;
    return <div styles={listStyle}>
      {this.props.children}
    </div>;
  }

});

module.exports = List;
