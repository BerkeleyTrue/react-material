/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');
var Typography = require('../style/Typography');

/** Color of floating label and underline when focused. */
var focusColor = Colors.blue.P500;

/** Color of label when unfocused. */
var labelColor = Colors.grey.P500;

var TextFieldStyles = {

  normalTextFieldStyle: ReactStyle({
    background: 'transparent',
    border: 'none',
    borderBottom: 'solid 1px ' + Colors.grey.P300,
    fontFamily: Typography.fontFamily,
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
      borderBottom: 'solid 2px ' + focusColor
    }
  }),

  fullWidthTextFieldStyle: ReactStyle({
    width: '100%'
  }),

  errorTextFieldStyle: ReactStyle({
    borderBottom: 'solid 2px ' + Colors.red.P400,
    ':focus': {
      borderBottom: 'solid 2px ' + Colors.red.P400
    }
  }),

  placeHolderStyling: ReactStyle({
    color: labelColor,
    fontSize: 16,
    left: 1,
    position: 'absolute',
    top: 8,
    opacity: '1',
    transition: 'top .18s linear, font-size .18s linear, opacity .10s linear'
  }),

  floatingLabelPlaceHolderStyling: ReactStyle({
    top: 27
  }),

  containerStyling: ReactStyle({
    height: 48,
    position: 'relative',
    width: 300
  }),

  placeHolderTopStyling: ReactStyle({
    fontSize: 12,
    top: 4
  }),

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
  }),

  focusStyle: ReactStyle({
    backgroundColor: focusColor,
    ':before': {
      backgroundColor: focusColor
    },
    ':after': {
      backgroundColor: focusColor
    }
  })
};

var TextField = React.createClass({

  getInitialState() {
    return {
      focus: false,
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
    if (props.error) {
      textFieldStyling.push(styles.errorTextFieldStyle);
    }
    if (props.floatingLabel) {
      textFieldStyling.push(ReactStyle({paddingTop: 25}));
    }
    return <div styles={containerStyling}>
    <div styles={placeHolderStyling}>{props.placeHolder}</div>
      <input onChange={this.onChange}
             onKeyUp={this.onChange}
             onClick={this.onChange}
             onWheel={this.onChange}
             onFocus={this.onFocus}
             onBlur={this.onBlur}
             type={this.props.type || 'text'}
             ref="textField"
             value={this.state.value}
            styles={textFieldStyling} />
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

  onChange(e) {
    this.setState({value: e.target.value});
    if (this.props.onChange) {
        this.props.onChange(e);
    }
  },

  onBlur(e) {
    this.setState({focus: false});
    if (this.props.onBlur) {
        this.props.onBlur(e);
    }
  },

  onFocus(e) {
    this.setState({focus: true});
    if (this.props.onFocus) {
        this.props.onFocus(e);
    }
  },

  value() {
    return this.state.value;
  }

});

module.exports = TextField;
