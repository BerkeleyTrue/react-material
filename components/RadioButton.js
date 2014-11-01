/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var CircleShadow = require('./CircleShadow');

var RadioButtonStyles = {

  normalStyle: ReactStyle({
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    cursor: 'pointer',
    position: 'relative',
    display: 'block',
    outline: 'none'
  }),

  childStyle: ReactStyle({
    paddingLeft: '16px'
  }),

  childBigStyle: ReactStyle({
    paddingLeft: '32px'
  }),

  offButtonStyle: ReactStyle({
    border: 'solid 2px',
    borderColor: Colors.grey.P700,
    borderRadius: '50%',
    height: '16px',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '16px'
  }),

  onButtonStyle: ReactStyle({
    backgroundColor: Colors.grey.P700,
    borderRadius: '50%',
    height: '20px',
    left: 0,
    position: 'absolute',
    top: 0,
    transform: 'scale(0)',
    transition: 'transform ease 0.28s',
    width: '20px',
    willChange: 'transform'
  }),

  onButtonFillStyle: ReactStyle({
    transform: 'scale(.6)'
  }),

  circleContainerStyle: ReactStyle({
    position: 'absolute',
    width: '16px',
    height: '16px',
    top: '2px',
    left: '2px'
  })

};

var RadioButton = React.createClass({

  isChecked: false,

  getInitialState: function() {
    var checked = this.props.checked || false;
    this.isChecked = checked;
    return {
      checked: checked
    };
  },

  render: function() {
    var props = this.props;
    var styles = RadioButtonStyles;
    var checked = this.state.checked || props.checked;
    var normalStyles = styles.normalStyle;
    var propStyles = props.styles || {};

    return <div tabIndex={0}
                styles={[styles.normalStyle, propStyles.normalStyle]}
                onClick={this.onClick}
                onMouseDown={this.onMouseDown}>
      <div styles={[styles.offButtonStyle,
                    propStyles.offButtonStyle]} />
      <div styles={[styles.onButtonStyle,
                    propStyles.onButtonStyle,
                    checked && styles.onButtonFillStyle]} />
      <div styles={[props.children && props.children.length ?
                    styles.childBigStyle :
                    styles.childStyle,
                    propStyles.childStyle]}>
        {props.children}
      </div>
    </div>;
  },

  onClick: function() {
    var props = this.props;
    var position = 0;
    var el = this.getDOMNode();
    while(el = el.previousSibling) {
      position++
    }
    var state = this.state;
    if (props.onChange) {
      props.onChange({checked: state.checked, ref: this, position: position});
      return;
    }

    var isChecked = !state.checked;
    this.setState({checked: isChecked});
    this.isChecked = isChecked;
  },

  onMouseDown: function(){
    this.setState({mouseDown: !this.state.checked});
  }

});

module.exports = RadioButton;