/**
 * @jsx React.DOM
 */
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

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');
var Typography = require('../style/Typography');

// Color of floating label and underline when focused
var focusColor = Colors.blue.P500;

// Color of label when unfocused
var labelColor = Colors.grey.P500;

var transitionDuration = '0.2s';
var textMargin = '0.5em 0 0.25em';

var TextFieldStyles = {

  normalTextFieldStyle: ReactStyle({
    background: 'transparent',
    fontFamily: Typography.fontFamily,
    fontSize: 16,
    border: 'none',
    outline: 'none',
    left: 0,
    width: '100%',
    padding: 0,
    margin: textMargin
  }, 'normalTextFieldStyle'),

  underlineContainerStyle: ReactStyle({
    position: 'relative',
    left: 0,
    right: 0,
    height: 0,
    overflow: 'visible'
  }, 'underlineContainerStyle'),

  underlineStyle: ReactStyle({
    backgroundColor: labelColor,
    height: 1
  }),

  // style used for the underline when the input
  // has focus
  focusedUnderlineStyle: ReactStyle({
    backgroundColor: focusColor,
    height: 2,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: '0',
    transition: `left ${transitionDuration} ease-out, right ${transitionDuration} ease-out`
  }, 'focusedUnderlineStyle'),

  errorUnderlineStyle: ReactStyle({
    backgroundColor: Colors.red.P400
  }, 'errorTextFieldStyle'),

  fullWidthTextFieldStyle: ReactStyle({
    width: '100%'
  }, 'fullWidthTextFieldStyle'),

  placeHolderStyling: ReactStyle({
    color: labelColor,
    fontSize: 16,
    left: 1,
    position: 'absolute',
    opacity: '1',
    transition: 'top .18s linear, font-size .18s linear, opacity .10s linear',
    pointerEvents: 'none',
    margin: textMargin
  }, 'placeHolderStyling'),

  floatingLabelPlaceHolderStyling: ReactStyle({
    top: 27
  }, 'floatingLabelPlaceHolderStyling'),

  containerStyling: ReactStyle({
    position: 'relative',
    width: 300,
    paddingBottom: 8
  }, 'containerStyling'),

  placeHolderTopStyling: ReactStyle({
    fontSize: 12,
    top: 4
  }, 'placeHolderTopStyling'),

  scrollBlocksStyle: ReactStyle({
    backgroundColor: labelColor,
    bottom: 6,
    height: 3,
    opacity: '0',
    position: 'absolute',
    transition: 'opacity .28s linear',
    width: 3,
    ':before': {
      backgroundColor: labelColor,
      bottom: 0,
      content: "''",
      position: 'absolute',
      height: 3,
      width: 3,
      right: 6
    },
    ':after': {
      backgroundColor: labelColor,
      bottom: 0,
      content: "''",
      position: 'absolute',
      height: 3,
      width: 3,
      right: -6
    }
  }, 'scrollBlocksStyle'),

  focusStyle: ReactStyle({
    backgroundColor: focusColor,
    ':before': {
      backgroundColor: focusColor
    },
    ':after': {
      backgroundColor: focusColor
    }
  }, 'focusStyle')
};

var TextField = React.createClass({

  getInitialState() {
    return {
      // indicates whether the input field has focus
      focus: false,
      // a flag set when the user initiates focusing the
      // text field and then cleared a moment later
      focusing: true,
      // the current value of the input field
      value: this.props.defaultValue || ''
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

    if (this.state.focus || this.state.value.length > 0) {
      if (props.floatingLabel) {
        placeHolderStyling.push(styles.placeHolderTopStyling);
        if (this.state.focus) {
          placeHolderStyling.push(ReactStyle({color: focusColor}));
        }
      } else {
          placeHolderStyling.push(ReactStyle({opacity: '0'}));
      }
    }

    if (textField) {
      var textfieldDOMNode = textField.getDOMNode();
      scrollWidth = textfieldDOMNode.scrollWidth;
      scrollLeft = textfieldDOMNode.scrollLeft;
      width = textfieldDOMNode.offsetWidth;
    }

    var containerStyling = [styles.containerStyling];
    if (props.floatingLabel) {
        containerStyling.push(ReactStyle({height: '66px'}));
    }
    containerStyling.push(propStyles.containerStyling);

    var textFieldStyling = [styles.normalTextFieldStyle];

    if (props.floatingLabel) {
      textFieldStyling.push(ReactStyle({paddingTop: 25}));
    }

    var focusedUnderlineStyling = [styles.focusedUnderlineStyle];
    if (this.state.focus) {
      focusedUnderlineStyling.push(ReactStyle({opacity:1}));
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
             type={this.props.type || 'text'}
             ref='textField'
             value={this.state.value}
            styles={textFieldStyling} />
      <div ref='underlineContainer' styles={styles.underlineContainerStyle}>
        <div ref='underline' styles={styles.underlineStyle}></div>
        <div ref='focusedUnderline' styles={focusedUnderlineStyling}></div>
      </div>
      <div styles={[scrollLeft ? ReactStyle({opacity: '1'}) : null,
                   this.state.focus ? styles.focusStyle : null,
                  styles.scrollBlocksStyle,
                  ReactStyle({left: '6px'})]} />
      <div styles={[(scrollWidth > (scrollLeft + width)) ?
                     ReactStyle({opacity: '1'}) : null,
                    this.state.focus ? styles.focusStyle : null,
                    styles.scrollBlocksStyle,
                    ReactStyle({right: '6px'})]} />
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
    this.setState({value: e.target.value});
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
      var underlineRect = this.refs['underlineContainer'].getDOMNode().getBoundingClientRect();
      var focusedUnderline = this.refs['focusedUnderline'].getDOMNode();
      
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

  value() {
    return this.state.value;
  }

});

module.exports = TextField;
