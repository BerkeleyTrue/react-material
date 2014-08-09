/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var FloatingActionButton = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      borderRadius: '50%',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
      cursor: 'pointer',
      display: 'inline-block',
      height: '56px',
      userSelect: 'none',
      width: '56px'
    };
  }),

  miniStyle: ReactStyle(function(){
    return {
      height: '40px',
      width: '40px'
    }
  }),

  render: function() {
    var props = this.props;
    var styles = [this.normalStyle()];
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.mini) {
      styles.push(this.miniStyle());
    }
    return <div styles={styles}>
      dgsdfgf
    </div>;
  }

});

module.exports = FloatingActionButton;
