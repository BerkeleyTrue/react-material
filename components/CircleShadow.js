/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CircleShadow = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      backgroundColor: '#5a5a5a',
      opacity: '0',
      borderRadius: '50%',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      transform: 'scale(1)',
      transition: 'opacity .48s ease .1s , transform .001s ease .6s  '
    };
  }),

  pressedStyle: ReactStyle(function(){
    return {
      opacity: '.3',
      transform: 'scale(3)',
      transition: 'opacity ease 0s, transform ease 0s'
    };
  }),

  getInitialState:function() {
    return {
      active: false
    }
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var styles = [this.normalStyle()];
    if (state.active) {
      styles.push(this.pressedStyle());
    }
    if (props.active && props.styles) {
      styles = styles.concat(props.styles);
    }

    return <div styles={styles} onMouseUp={this.onMouseUp} onMouseDown={this.onMouseDown}>

    </div>;
  },

  onMouseUp: function(){
    this.setState({active: false});
  },

  onMouseDown: function(){
    this.setState({active: true});
  }

});

module.exports = CircleShadow;
