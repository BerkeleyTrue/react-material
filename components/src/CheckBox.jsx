'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Colors} from '../style/';

import transitionEnd from './TransitionEndName';
import isTransform from './isTransform';
import CircleShadow from './CircleShadow';

export default class CheckBox extends React.Component {

  constructor(props) {
    super(props);
    var checked = this.props.checked || false;
    this.isChecked = checked;
    this.state = {
      checked: checked
    };
  }

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


    return <div tabIndex={0} styles={containerStyles} onClick={() => this.onToggle()} onMouseDown={() => this.onMouseDown()} onMouseUp={() => this.onMouseUp()}>
      <div ref="checkbox" styles={stylesX}/>
      <div styles={styles.circleContainerStyle}>
        <CircleShadow styles={styles.circleStyle} active={this.state.mouseDown} />
      </div>
      <div styles={ props.children && props.children.length ? styles.childBigStyle : styles.childStyle}>
        {props.children}
      </div>
    </div>
  }

  onMouseDown() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: true});
  }

  onMouseUp() {
    if (!transitionEnd) {
      return;
    }
    this.setState({mouseDown: false});
  }

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
  }

  componentDidMount() {
    if (!transitionEnd) {
      return;
    }

    React.findDOMNode(this.refs.checkbox).addEventListener(transitionEnd, () => this.onTransitionEnd);
  }

  componentWillUnmount() {
    if (!transitionEnd) {
      return;
    }

    React.findDOMNode(this.refs.checkbox).removeEventListener(transitionEnd, () => this.onTransitionEnd);
  }

  onTransitionEnd(e) {
    var state = this.state;
    if (state.transitioning) {
      if (isTransform(e.propertyName) && !state.checked) {
        this.setState({checked: true, transitioning: false});
      }
    }
  }

  toggle() {
    this.onToggle();
  }

}

var CheckBoxStyles = StyleSheet.create({

  containerStyle: {
    cursor: 'pointer',
    display: 'block',
    outline: 'none',
    position: 'relative',
    webkitTapHighlightColor: 'rgba(0,0,0,0)'
  },

  childStyle: {
    paddingLeft: '16px'
  },

  childBigStyle: {
    paddingLeft: '32px'
  },

  normalStyle: {
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
  },

  transitionStyle: {
    height: 0,
    left: '8px',
    marginTop: '16px',
    transform: 'translateZ(0) rotate(45deg)',
    width: 0
  },

  checkedStyle: {
    borderWidth: '0 2px 2px 0',
    borderColor: Colors.green.P600,
    height: '21px',
    marginTop: '-2px',
    width: '10px'
  },


  circleContainerStyle: {
    position: 'absolute',
    height: '20px',
    width: '20px'
  },

  circleStyle: {
    backgroundColor: Colors.green.P600
  }

});
