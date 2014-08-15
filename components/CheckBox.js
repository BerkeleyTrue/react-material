/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CheckBox = React.createClass({

  containerStyle: ReactStyle(function(){
    return {
      cursor: 'pointer',
      height: '18px',
      position: 'relative',
      transform: 'translateZ(0)',
      width: '18px'
    };
  }),

  normalStyle: ReactStyle(function(){
    return {
      borderColor: '#5a5a5a',
      borderStyle: 'solid',
      borderWidth: '2px',
      cursor: 'pointer',
      height: '18px',
      width: '18px',
      left: 0,
      transition: 'transform .1s linear, ' +
        'width .1s linear, ' +
        'height .1s linear, ' +
        'left .1s linear',
      position: 'absolute',
      bottom: 0
    };
  }),

  transitionStyle: ReactStyle(function(){
    return {
      height: 0,
      transform: 'rotate(45deg)',
      width: 0,
      left: '8px'
    };
  }),

  checkedStyle: ReactStyle(function(){
    return {
      borderWidth: '0 0 2px 2px',
      borderColor: '#0f9d58',
      height: '10px',
      width: '21px'
    }
  }),

  getInitialState:function() {
    return {
      checked: this.props.checked || false
    }
  },

  render: function() {
    var state = this.state;
    var styles = [this.normalStyle()];
    if (state.checked) {
      styles.push(this.transitionStyle());
    }
    return <div styles={this.containerStyle()} onClick={this.onToggle} >
      <div styles={styles}/>
    </div>
  },

  onToggle: function() {
    this.setState({checked: !this.state.checked});
  }

});

module.exports = CheckBox;
