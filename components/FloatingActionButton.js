/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Icon = require('./Icon');
var RippleContainer = require('./RippleContainer');

var FloatingActionButton = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      borderRadius: '50%',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
      cursor: 'pointer',
      display: 'inline-block',
      fill: 'white',
      height: '56px',
      outline: 'none',
      position: 'relative',
      transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
      userSelect: 'none',
      width: '56px'
    };
  }),

  pressedStyle: ReactStyle(function(){
    return {
      boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
    };
  }),

  miniStyle: ReactStyle(function(){
    return {
      height: '40px',
      width: '40px'
    }
  }),
  overlayStyle: ReactStyle(function() {
    return {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
      position:'absolute',
      width: '100%',
      height: '100%'
    };
  }),

  miniIconStyle: ReactStyle(function(){
    return {position: 'absolute', width: '24px', left: '8px' };
  }),

  defaultIconStyle: ReactStyle(function(){
    return {position: 'absolute', width: '24px', left: '16px' };
  }),

  propTypes: {
    icon: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var props = this.props;
    var styles = [this.normalStyle()];
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.mini) {
      styles.push(this.miniStyle());
    }
    if (this.state.active) {
      styles.push(this.pressedStyle());

    }
    return <div tabIndex={0} styles={styles} onClick={this.props.onClick} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp} onMouseLeave={this.onMouseUp} role="button">
      {this.state.active &&
        <div styles={this.overlayStyle()} />
        }

      <Icon icon={this.props.icon} styles={this.props.mini ? this.miniIconStyle() : this.defaultIconStyle()}/>
    </div>;
  },


  onMouseUp: function() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: false});
  },

  onMouseDown: function() {
    if (this.props.disabled) {
      return;
    }
    this.setState({active: true});
  }

});

module.exports = FloatingActionButton;
