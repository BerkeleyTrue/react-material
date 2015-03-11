'use strict';

// Text Field inputs
//
// Spec: http://www.google.com/design/spec/components/text-fields.html
//
// Single-line text fields:
//
// Without floating label:
//
//      | 16 |---
//   48 |    |Input Text (16sp)
//      | 16 |---
//
// With floating label:
//
//      | 16 |---
//      |    |Label Text (12sp)
//   72 |  8 |---
//      |    |Input Text (16sp)
//      | 16 |---

import React from 'react';
import StyleSheet from 'react-style';

import {Colors, Typography} from '../style/';

// Color of floating label and underline when focused
var focusColor = Colors.blue.P500;

// Color of label when unfocused
var labelColor = Colors.grey.P500;

var transitionDuration = '0.2s';
var textMargin = '0.5em 0 0.25em';

var TextField = React.createClass({

  getInitialState() {
    return {
      // indicates whether the input field has focus
      focus: false,
      // a flag set when the user initiates focusing the
      // text field and then cleared a moment later
      focusing: true,
    };
  },

  render() {
    var props = this.props;
    var styles = TextFieldStyles;
    var propStyles = props.styles || {};
    var textField = this.refs.textField;
    var scrollLeft = 0;
    var scrollWidth = -1;
    var width = -1;
    var placeHolderStyling = [styles.placeHolderStyling];

    if (props.floatingLabel) {
      placeHolderStyling.push(styles.floatingLabelPlaceHolderStyling);
    }

    if (this.state.focus || this.effectiveValue().length > 0) {
      if (props.floatingLabel) {
        placeHolderStyling.push(styles.placeHolderTopStyling);
        if (this.state.focus) {
          placeHolderStyling.push({color: focusColor});
        }
      } else {
          placeHolderStyling.push({opacity: '0'});
      }
    }

    if (textField) {
      var textfieldDOMNode = React.findDOMNode(textField);
      scrollWidth = textfieldDOMNode.scrollWidth;
      scrollLeft = textfieldDOMNode.scrollLeft;
      width = textfieldDOMNode.offsetWidth;
    }

    var containerStyling = [styles.containerStyling];
    if (props.floatingLabel) {
        containerStyling.push({height: '66px'});
    }
    containerStyling.push(propStyles.containerStyling);

    var textFieldStyling = [styles.normalTextFieldStyle];

    if (props.floatingLabel) {
      textFieldStyling.push({paddingTop: 25});
    }

    var focusedUnderlineStyling = [styles.focusedUnderlineStyle];
    if (this.state.focus) {
      focusedUnderlineStyling.push({opacity:1});
    }

    if (props.error) {
      focusedUnderlineStyling.push(styles.errorUnderlineStyle);
    }

    return <div styles={containerStyling}>
      <div styles={placeHolderStyling}>{props.placeHolder}</div>
      <input onChange={this.onChange}
             onKeyUp={this.onChange}
             onClick={this.onChange}
             onWheel={this.onChange}
             onFocus={this.onFocus}
             onBlur={this.onBlur}
             onMouseDown={this.onMouseDown}
             onTouchStart={this.onTouchStart}
             type={props.type || 'text'}
             ref='textField'
             defaultValue={props.defaultValue}
             value={props.value}
             styles={textFieldStyling} />
      <div ref='underlineContainer' styles={styles.underlineContainerStyle}>
        <div ref='underline' styles={styles.underlineStyle}></div>
        <div ref='focusedUnderline' styles={focusedUnderlineStyling}></div>
      </div>
      <div styles={[scrollLeft ? {opacity: '1'} : null,
                   this.state.focus ? styles.focusStyle : null,
                  styles.scrollBlocksStyle,
                  {left: '6px'}]} />
      <div styles={[(scrollWidth > (scrollLeft + width)) ?
      {opacity: '1'} : null,
                    this.state.focus ? styles.focusStyle : null,
                    styles.scrollBlocksStyle,
                    {right: '6px'}]} />
    </div>;
  },

  onMouseDown(e) {
    if (this.state.focus) {
      return;
    }
    this.setState({focusX: e.clientX});
  },

  onTouchStart(e) {
    if (this.state.focus) {
      return;
    }
    var touch = e.touches.item(0);
    this.setState({focusX: touch.clientX});
  },

  onChange(e) {
    if (this.props.onChange) {
        this.props.onChange(e);
    }
  },

  onBlur(e) {
    this.setState({
      focus: false,
      focusX: null
    });
    if (this.props.onBlur) {
        this.props.onBlur(e);
    }
  },

  onFocus(e) {
    this.setState({
      focus: true
    });

    // if the user focused via touch or mouse,
    // animate the focused underline, spilling from the horizontal
    // position of the mouse or touch
    if (this.state.focusX) {
      var underlineRect = React.findDOMNode(this.refs['underlineContainer']).getBoundingClientRect();
      var focusedUnderline = React.findDOMNode(this.refs['focusedUnderline']);

      this.setState({focusing: true});

      focusedUnderline.style.transition = 'none';
      focusedUnderline.style.left = `${this.state.focusX - underlineRect.left}px`;
      focusedUnderline.style.right = `${underlineRect.right - this.state.focusX}px`;

      setTimeout(() => {
        focusedUnderline.style.transition = '';
        focusedUnderline.style.left = '0px';
        focusedUnderline.style.right = '0px';

        this.setState({focusing: false});
      }, 1);
    }

    if (this.props.onFocus) {
        this.props.onFocus(e);
    }
  },

  // returns the value being displayed in the text field.
  // This is equal to props.value if set or the current
  // value of the actual DOM node if mounted
  effectiveValue() {
    var value = this.props.value;
    if (value !== undefined) {
        return value;
    } else if (this.isMounted()) {
        return React.findDOMNode(this.refs['textField']).value;
    } else {
        return '';
    }
  }
});

var TextFieldStyles = StyleSheet.create({

  normalTextFieldStyle: {
    background: 'transparent',
    fontFamily: Typography.fontFamily,
    fontSize: 16,
    border: 'none',
    outline: 'none',
    left: 0,
    width: '100%',
    padding: 0,
    margin: textMargin
  },

  underlineContainerStyle: {
    position: 'relative',
    left: 0,
    right: 0,
    height: 0,
    overflow: 'visible'
  },

  underlineStyle: {
    backgroundColor: labelColor,
    height: 1
  },

  // style used for the underline when the input
  // has focus
  focusedUnderlineStyle: {
    backgroundColor: focusColor,
    height: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: '0',
    transition: `left ${transitionDuration} ease-out, right ${transitionDuration} ease-out`
  },

  errorUnderlineStyle: {
    backgroundColor: Colors.red.P400
  },

  fullWidthTextFieldStyle: {
    width: '100%'
  },

  placeHolderStyling: {
    color: labelColor,
    fontSize: 16,
    left: 1,
    position: 'absolute',
    opacity: '1',
    transition: 'top .18s linear, font-size .18s linear, opacity .10s linear',
    pointerEvents: 'none',
    margin: textMargin
  },

  floatingLabelPlaceHolderStyling: {
    top: 27
  },

  containerStyling: {
    position: 'relative',
    width: 300,
    paddingBottom: 8
  },

  placeHolderTopStyling: {
    fontSize: 12,
    top: 4
  },

  scrollBlocksStyle: {
    backgroundColor: labelColor,
    bottom: 6,
    height: 3,
    opacity: '0',
    position: 'absolute',
    transition: 'opacity .28s linear',
    width: 3,
    //':before': {
    //  backgroundColor: labelColor,
    //  bottom: 0,
    //  content: "''",
    //  position: 'absolute',
    //  height: 3,
    //  width: 3,
    //  right: 6
    //},
    //':after': {
    //  backgroundColor: labelColor,
    //  bottom: 0,
    //  content: "''",
    //  position: 'absolute',
    //  height: 3,
    //  width: 3,
    //  right: -6
    //}
  },

  focusStyle: {
    backgroundColor: focusColor,
    //':before': {
    //  backgroundColor: focusColor
    //},
    //':after': {
    //  backgroundColor: focusColor
    //}
  }
});

module.exports = TextField;
