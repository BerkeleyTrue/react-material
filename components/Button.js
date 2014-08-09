/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = React.createClass({

  normalStyle: ReactStyle(function() {
    return {
      borderRadius: '3px',
      cursor: 'pointer',
      display: 'inline-block',
      outline: 'none',
      padding: '9px 0',
      textAlign: 'center',
      textTransform: 'uppercase',
      userSelect: 'none',
      width: '10em'
    };
  }),

  raisedStyle: ReactStyle(function() {
    return {
      backgroundColor: '#dfdfdf',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
      transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }),

  raisedPressedStyle: ReactStyle(function(){
    return {
      boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
    };
  }),

  disabledStyle: ReactStyle(function() {
    return {
      backgroundColor: '#eaeaea',
      color: '#a8a8a8',
      cursor: 'default'
    };
  }),

  propTypes: {
    raised: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    styles: React.PropTypes.array
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
    if (props.disabled) {
      styles.push(this.disabledStyle());
    }
    else if (props.raised) {
      styles.push(this.raisedStyle());

      if (this.state.active) {
        styles.push(this.raisedPressedStyle());
      }
    }

    return <div styles={styles} onClick={this.onClick} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
      {this.props.children}
    </div>
  },

  onClick: function(e) {
    var props = this.props;
    // paper ripple
    // handle click
    if (props.onClick) {
      props.onClick(e);
    }
  },

  onMouseUp: function(e) {
    this.setState({active: false});
  },

  onMouseDown: function(e) {
    this.setState({active: true});
  }

});

module.exports = function() {
  return Button.apply(null, arguments);
};
