/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var RippleContainer = require('./RippleContainer');

var Button = React.createClass({

  normalButtonStyle: ReactStyle(function() {
    return {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      backgroundColor: 'transparent',
      borderRadius: '3px',
      cursor: 'pointer',
      display: 'inline-block',
      outline: 'none',
      overflow: 'hidden',
      padding: '9px 0',
      position: 'relative',
      textAlign: 'center',
      textTransform: 'uppercase',
      userSelect: 'none',
      width: '10em'
    };
  }),

  raisedButtonStyle: ReactStyle(function() {
    return {
      backgroundColor: '#dfdfdf',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
      transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }),

  raisedButtonPressedStyle: ReactStyle(function(){
    return {
      boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
    };
  }),

  disabledButtonStyle: ReactStyle(function() {
    return {
      backgroundColor: '#eaeaea',
      color: '#a8a8a8',
      cursor: 'default'
    };
  }),

  propTypes: {
    raised: React.PropTypes.bool,
    disabled: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var styles = [this.normalButtonStyle()];
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.disabled) {
      styles.push(this.disabledButtonStyle());
    }
    else if (props.raised) {
      styles.push(this.raisedButtonStyle());

      if (state.active) {
        styles.push(this.raisedButtonPressedStyle());
      }
    }


    return <div role="button"
                tabIndex="0"
                styles={styles}
                onTouchStart={this.onMouseDown}
                onTouchEnd={this.onMouseUp}
                onTouchCancel={this.onMouseUp}
                onMouseDown={this.onMouseDown}
                onMouseLeave={this.onMouseUp}
                onMouseUp={this.onMouseUp}>

    {!props.disabled &&
      <RippleContainer onClick={props.onClick}/>
    }
      {props.children}
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

module.exports = Button;