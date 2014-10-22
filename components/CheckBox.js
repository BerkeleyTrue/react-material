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

var CheckBoxStyles = {

	containerStyle: ReactStyle({
		cursor: 'pointer',
		display: 'block',
		outline: 'none',
		position: 'relative',
		webkitTapHighlightColor: 'rgba(0,0,0,0)'
	}),

	childStyle: ReactStyle({
		paddingLeft: '16px'
	}),

	childBigStyle: ReactStyle({
		paddingLeft: '32px'
	}),

	normalStyle: ReactStyle({
		borderColor: Colors.grey.P700,
		borderStyle: 'solid',
		borderWidth: '2px',
		boxSizing: 'border-box',
		cursor: 'pointer',
		height: '18px',
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
		width: '18px',
		willChange: 'width, height, margin-top, left'
	}),

	transitionStyle: ReactStyle({
		height: 0,
		left: '8px',
		marginTop: '16px',
		transform: 'translateZ(0) rotate(45deg)',
		width: 0
	}),

	checkedStyle: ReactStyle({
		borderWidth: '0 2px 2px 0',
		borderColor: Colors.green.P600,
		height: '21px',
		marginTop: '-2px',
		width: '10px'
	}),


	circleContainerStyle: ReactStyle({
		position: 'absolute',
		height: '20px',
		width: '20px'
	}),

	circleStyle: ReactStyle({
		backgroundColor: Colors.green.P600
	})

};

var CheckBox = React.createClass({

  isChecked: false,

  getInitialState() {
    var checked = this.props.checked || false;
    this.isChecked = checked;
    return {
      checked: checked
    };
  },

  render() {
    var state = this.state;
    var props = this.props;
		var styles = CheckBoxStyles;
    var stylesX = [styles.normalStyle];
    var containerStyles = [styles.containerStyle];
    if (props.containerStyles) {
      containerStyles = containerStyles.concat(props.containerStyles);
    }
    if (state.transitioning) {
	    stylesX.push(styles.transitionStyle);
    }
    else if (state.checked && !state.transitioning) {
	    stylesX.push(styles.transitionStyle);
	    stylesX.push(styles.checkedStyle);
    }


    return <div tabIndex={0} styles={containerStyles} onClick={this.onToggle} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}>
      <div ref="checkbox" styles={stylesX}/>
      <div styles={styles.circleContainerStyle}>
        <CircleShadow styles={styles.circleStyle} active={this.state.mouseDown} />
      </div>
      <div styles={ props.children && props.children.length ? styles.childBigStyle : styles.childStyle}>
        {props.children}
      </div>
    </div>
  },

  onMouseDown() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: true});
  },

  onMouseUp() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: false});
  },

  onToggle() {
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

  componentDidMount() {
    if (!transitionEnd) {
      return;
    }

    this.refs.checkbox.getDOMNode().addEventListener(transitionEnd, this.onTransitionEnd);
  },

  componentWillUnmount() {
    if (!transitionEnd) {
      return;
    }

    this.refs.checkbox.getDOMNode().removeEventListener(transitionEnd, this.onTransitionEnd);
  },

  onTransitionEnd(e) {
    var state = this.state;
    if (state.transitioning) {
      if (isTransform(e.propertyName) && !state.checked) {
        this.setState({checked: true, transitioning: false});
      }
    }
  },

  toggle() {
    this.onToggle();
  }

});

module.exports = CheckBox;
