/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var transitionEnd = require('./TransitionEndName');
var isTransform = require('./isTransform');
var CircleShadow = require('./CircleShadow');

var CheckBox = React.createClass({

  isChecked: false,

  containerStyle: ReactStyle(function containerStyle() {
    return {
      cursor: 'pointer',
      display: 'block',
      outline: 'none',
      position: 'relative',
      webkitTapHighlightColor: 'rgba(0,0,0,0)'
    };
  }),

  childStyle: ReactStyle(function childStyle(){
    return {
      paddingLeft: 16
    };
  }),

  childBigStyle: ReactStyle(function childStyle(){
    return {
      paddingLeft: 32
    };
  }),

  normalStyle: ReactStyle(function normalStyle() {
    return {
      borderColor: Colors.grey.P700,
      borderStyle: 'solid',
      borderWidth: 2,
      boxSizing: 'border-box',
      cursor: 'pointer',
      height: 18,
      left: 0,
      marginTop: 0,
      outline: 'none',
      position: 'absolute',
      top: 0,
      transform: 'translateZ(0)',
      transition: 'transform .1s linear, ' +
        'width .1s linear, ' +
        'height .1s linear, ' +
        'margin-top .1s linear, ' +
        'left .1s linear',
      width: 18,
      willChange: 'width, height, margin-top, left'
    };
  }),

  transitionStyle: ReactStyle(function transitionStyle() {
    return {
      height: 0,
      left: 8,
      marginTop: 16,
      transform: 'translateZ(0) rotate(45deg)',
      width: 0
    };
  }),

  checkedStyle: ReactStyle(function checkedStyle() {
    return {
      borderWidth: '0 2px 2px 0',
      borderColor: Colors.green.P600,
      height: 21,
      marginTop: -2,
      width: 10
    };
  }),


  circleContainerStyle: ReactStyle(function circleContainerStyle(){
    return {
      position: 'absolute',
      height: 20,
      width: 20
    };
  }),

  circleStyle: ReactStyle(function circleStyle() {
    return {
      backgroundColor: Colors.green.P600
    };
  }),

  getInitialState: function() {
    var checked = this.props.checked || false;
    this.isChecked = checked;
    return {
      checked: checked
    };
  },

  render: function() {
    var state = this.state;
    var props = this.props;
    var styles = [this.normalStyle()];
    var containerStyles = [this.containerStyle()];
    if (props.containerStyles) {
      containerStyles = containerStyles.concat(props.containerStyles);
    }
    if (state.transitioning) {
      styles.push(this.transitionStyle());
    }
    else if (state.checked && !state.transitioning) {
      styles.push(this.transitionStyle());
      styles.push(this.checkedStyle());
    }


    return <div tabIndex={0} styles={containerStyles} onClick={this.onToggle} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
      <div ref="checkbox" styles={styles}/>
      <div styles={this.circleContainerStyle()}>
        <CircleShadow styles={this.circleStyle()} active={this.state.mouseDown} />
      </div>
      <div styles={ props.children && props.children.length ? this.childBigStyle() : this.childStyle()}>
        {props.children}
      </div>
    </div>
  },

  onMouseDown: function() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: true});
  },

  onMouseUp: function() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: false});
  },

  onToggle: function() {
    if (!this.state.checked) {
      this.setState({transitioning: true});
      this.isChecked = true;
    }
    else {
      this.setState({checked: false});
      this.isChecked = false;
    }
    var props = this.props;
    if (props.onChange) {
      props.onChange({checked: this.isChecked});
    }
  },

  componentDidMount: function() {
    if (!transitionEnd) {
      return;
    }

    this.refs.checkbox.getDOMNode().addEventListener(transitionEnd, this.onTransitionEnd);
  },

  componentWillUnmount: function() {
    if (!transitionEnd) {
      return;
    }

    this.refs.checkbox.getDOMNode().removeEventListener(transitionEnd, this.onTransitionEnd);
  },

  onTransitionEnd: function(e) {
    var state = this.state;
    if (state.transitioning) {
      if (isTransform(e.propertyName) && !state.checked) {
        this.setState({checked: true, transitioning: false});
      }
    }
  },

  toggle: function() {
    this.onToggle();
  }

});

module.exports = CheckBox;
