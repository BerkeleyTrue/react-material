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

import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors, Typography } from './style';

// Color of floating label and underline when focused
const focusColor = Colors.blue.P500;

// Color of label when unfocused
const labelColor = Colors.grey.P500;
const transitionDuration = '0.2s';
const textMargin = '0.5em 0 0.25em';
const TextFieldStyles = StyleSheet.create({
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
    transition:
      `left ${transitionDuration} ease-out, ` +
      `right ${transitionDuration} ease-out`
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
    width: 3
    // ':before': {
    //   backgroundColor: labelColor,
    //   bottom: 0,
    //   content: "''",
    //   position: 'absolute',
    //   height: 3,
    //   width: 3,
    //   right: 6
    // },
    // ':after': {
    //   backgroundColor: labelColor,
    //   bottom: 0,
    //   content: "''",
    //   position: 'absolute',
    //   height: 3,
    //   width: 3,
    //   right: -6
    // }
  },

  focusStyle: {
    backgroundColor: focusColor
    // ':before': {
    //   backgroundColor: focusColor
    // },
    // ':after': {
    //   backgroundColor: focusColor
    // }
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // indicates whether the input field has focus
      focus: false,
      // a flag set when the user initiates focusing the
      // text field and then cleared a moment later
      focusing: true
    };
  }

  static displayName = 'TextField'
  static defaultProps = {
    styles: {}
  }
  static propTypes = {
    defaultValue: PropTypes.string,
    error: PropTypes.string,
    floatingLabel: PropTypes.bool,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onChange: PropTypes.func,
    placeHolder: PropTypes.string,
    styles: PropTypes.object,
    type: PropTypes.string,
    value: PropTypes.number
  }

  onMouseDown(e) {
    if (this.state.focus) {
      return;
    }
    this.setState({ focusX: e.clientX });
  }

  onTouchStart(e) {
    if (this.state.focus) {
      return;
    }
    var touch = e.touches.item(0);
    this.setState({ focusX: touch.clientX });
  }

  onChange(e) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  }

  onBlur(e) {
    const { onBlur } = this.props;
    this.setState({
      focus: false,
      focusX: null
    });
    if (onBlur) {
      onBlur(e);
    }
  }

  onFocus(e) {
    const { onFocus } = this.props;
    const { focusX } = this.state;
    this.setState({
      focus: true
    });

    // if the user focused via touch or mouse,
    // animate the focused underline, spilling from the horizontal
    // position of the mouse or touch
    if (focusX) {
      const underlineRect = React.findDOMNode(this.refs['underlineContainer'])
        .getBoundingClientRect();
      const focusedUnderline = React.findDOMNode(this.refs['focusedUnderline']);

      this.setState({ focusing: true });

      focusedUnderline.style.transition = 'none';

      focusedUnderline.style.left =
        `${this.state.focusX - underlineRect.left}px`;
      focusedUnderline.style.right =
        `${underlineRect.right - this.state.focusX}px`;

      setTimeout(() => {
        focusedUnderline.style.transition = '';
        focusedUnderline.style.left = '0px';
        focusedUnderline.style.right = '0px';

        this.setState({ focusing: false });
      }, 1);
    }

    if (onFocus) {
      onFocus(e);
    }
  }

  render() {
    const {
      defaultValue,
      error,
      floatingLabel,
      placeHolder,
      styles,
      type,
      value
    } = this.props;

    const {
      focus
    } = this.state;

    const textField = this.refs.textField;

    let scrollLeft = 0;
    let scrollWidth = -1;
    let width = -1;

    const {
      containerStyling,
      errorUnderlineStyle,

      floatingLabelPlaceHolderStyling,
      focusedUnderlineStyling,
      focusStyle,

      placeHolderStyling,
      placeHolderTopStyling,

      normalTextFieldStyle,
      scrollBlocksStyle,

      underlineContainerStyle,
      underlineStyle
    } = TextFieldStyles;

    var placeHolderStyles = [placeHolderStyling];

    if (floatingLabel) {
      placeHolderStyles.push(floatingLabelPlaceHolderStyling);
    }

    if (focus || value > 0) {
      if (floatingLabel) {

        placeHolderStyles.push(placeHolderTopStyling);

        if (focus) {
          placeHolderStyles.push({ color: focusColor });
        }
      } else {
        placeHolderStyles.push({ opacity: '0' });
      }
    }

    if (textField) {
      var textfieldDOMNode = React.findDOMNode(textField);
      scrollWidth = textfieldDOMNode.scrollWidth;
      scrollLeft = textfieldDOMNode.scrollLeft;
      width = textfieldDOMNode.offsetWidth;
    }

    const containerStyles = [containerStyling];

    if (floatingLabel) {
      containerStyles.push({ height: '66px' });
    }
    containerStyles.push(styles.containerStyling);

    const textFieldStyling = [normalTextFieldStyle];
    if (floatingLabel) {
      textFieldStyling.push({ paddingTop: 25 });
    }

    const focusedUnderlineStyles = [focusedUnderlineStyling];
    if (focus) {
      focusedUnderlineStyles.push({ opacity: 1 });
    }

    if (error) {
      focusedUnderlineStyles.push(errorUnderlineStyle);
    }

    const focusStylesLeft = [
      scrollLeft ? { opacity: '1'} : null,
      focus ? focusStyle : null,
      scrollBlocksStyle,
      { left: '6px' }
    ];

    const focusStylesRight = [
      (scrollWidth > (scrollLeft + width)) ? { opacity: '1' } : null,
      focus ? focusStyle : null,
      scrollBlocksStyle,
      { right: '6px' }
    ];

    return (
      <div styles={ containerStyles }>
        <div styles={ placeHolderStyles }>
          { placeHolder }
        </div>
        <input
          defaultValue={ defaultValue }
          onBlur={ ::this.onBlur }
          onChange={ ::this.onChange }
          onClick={ ::this.onChange }
          onFocus={ ::this.onFocus }
          onKeyUp={ ::this.onChange }
          onMouseDown={ ::this.onMouseDown }
          onTouchStart={ ::this.onTouchStart }
          onWheel={ ::this.onChange }
          ref='textField'
          styles={ textFieldStyling }
          type={ type || 'text' }
          value={ value } />
        <div
          ref='underlineContainer'
          styles={ underlineContainerStyle }>
          <div
            ref='underline'
            styles={ underlineStyle } />
          <div
            ref='focusedUnderline'
            styles={ focusedUnderlineStyles } />
        </div>
        <div styles={ focusStylesLeft } />
        <div styles={ focusStylesRight } />
      </div>
    );
  }
}
