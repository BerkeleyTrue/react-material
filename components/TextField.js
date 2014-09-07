/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var TextField = React.createClass({

  normalTextFieldStyle: ReactStyle(function normalTextFieldStyle() {
    return {
      background: 'transparent',
      border: 'none',
      borderBottom: 'solid 1px ' + Colors.grey.P300,
      fontFamily: "RobotoDraft, 'Helvetica Neue', Helvetica, Arial;",
      fontSize: 16,
      height: 24,
      outline: 'none',
      left: 0,
      paddingTop: 6,
      position: 'absolute',
      top: 0,
      transition: 'border-bottom .28s linear',
      width: '100%',
      ':focus': {
        borderBottom: 'solid 2px ' + Colors.blue.P500
      }
    };
  }),

  fullWidthTextFieldStyle: ReactStyle(function fullWidthTextFieldStyle() {
    return {
      width: '100%'
    };
  }),

  errorTextFieldStyle: ReactStyle(function errorTextFieldStyle() {
    return {
      borderBottom: 'solid 2px ' + Colors.red.P400,
      ':focus': {
        borderBottom: 'solid 2px ' + Colors.red.P400
      }
    };
  }),

  placeHolderStyling: ReactStyle(function placeHolderStyling() {
    return {
      color: Colors.grey.P500,
      fontSize: 16,
      left: 1,
      position: 'absolute',
      top: 8,
      opacity: 1,
      transition: 'top .18s linear, font-size .18s linear, opacity .10s linear'
    };
  }),

  floatingLabelPlaceHolderStyling: ReactStyle(function floatingLabelPlaceHolderStyling(){
    return {
      top: 27
    };
  }),

  containerStyling: ReactStyle(function containerStyling() {
    return {
      height: 48,
      position: 'relative',
      width: 300
    };
  }),

  placeHolderTopStyling: ReactStyle(function placeHolderTopStyling() {
    return {
      fontSize: 12,
      top: 4
    };
  }),

  scrollBlocksStyle: ReactStyle(function scrollBlocksStyle() {
    return {
      backgroundColor: Colors.grey.P500,
      bottom: 6,
      height: 3,
      position: 'absolute',
      opacity: 0,
      transition: 'opacity .28s linear',
      width: 3,
      ':before': {
        backgroundColor: Colors.grey.P500,
        bottom: 0,
        content: "''",
        position: 'absolute',
        height: 3,
        width: 3,
        right: 6
      },
      ':after': {
        backgroundColor: Colors.grey.P500,
        bottom: 0,
        content: "''",
        position: 'absolute',
        height: 3,
        width: 3,
        right: -6
      }
    };
  }),

  focusStyle: ReactStyle(function focusStyle(){
    return {
      backgroundColor: Colors.blue.P500,
      ':before': {
        backgroundColor: Colors.blue.P500
      },
      ':after': {
        backgroundColor: Colors.blue.P500
      }

    };
  }),

  getInitialState: function() {
    return {
      focus: false
    };
  },

  render: function() {
    var props = this.props;
    var textfield = this.refs.textfield;
    var scrollLeft = 0;
    var scrollWidth = -1;
    var width = -1;
    var placeHolderStyling = [this.placeHolderStyling()];
    if (props.floatingLabel) {
      placeHolderStyling.push(this.floatingLabelPlaceHolderStyling());
    }

    if (textfield) {
      var textfieldDOMNode = textfield.getDOMNode();
      scrollWidth = textfieldDOMNode.scrollWidth;
      scrollLeft = textfieldDOMNode.scrollLeft;
      width = textfieldDOMNode.offsetWidth;
      if (textfieldDOMNode.value.trim().length) {
        if (props.floatingLabel) {
          placeHolderStyling.push(this.placeHolderTopStyling());
        }
        else {
          placeHolderStyling.push({opacity: 0});
        }
      }
    }
    var textFieldStyling = [this.normalTextFieldStyle()];
    if (props.error) {
      textFieldStyling.push(this.errorTextFieldStyle());
    }
    if (props.floatingLabel) {
      textFieldStyling.push({paddingTop: 25});
    }

    return <div styles={[this.containerStyling(), props.floatingLabel ? {height: 66} : null]}>
      <div styles={placeHolderStyling}>{props.placeHolder}</div>
      <input onChange={this.onChange} onKeyUp={this.onChange} onClick={this.onChange} onWheel={this.onChange} onFocus={this.onFocus} onBlur={this.onBlur} type="text" ref="textfield" styles={textFieldStyling} />
      <div styles={[scrollLeft ? {opacity: 1} : null, this.state.focus ? this.focusStyle() : null, this.scrollBlocksStyle(), {left: 6}]} />
      <div styles={[(scrollWidth > (scrollLeft + width)) ? {opacity: 1} : null, this.state.focus ? this.focusStyle() : null,  this.scrollBlocksStyle(), {right: 6}]} />
    </div>;
  },

  onChange: function(e) {
    // TODO: optimize
    this.forceUpdate();
  },

  onBlur: function(e) {
    this.setState({focus: false});
    // todo
    var self = this;
    setTimeout(function(){
      self.onChange();
    }, 0);
  },

  onFocus: function() {
    this.setState({focus: true});
  },

  value: function() {
    return this.refs.textfield.getDOMNode().value;
  }

});

module.exports = TextField;