/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Colors} from '../style';

export default class CircleShadow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      active: false
    }
  }

  render() {
    var props = this.props;
    var state = this.state;
    var styles = [CircleShadowStyles.normalStyle];
    if (state.active) {
      styles.push(CircleShadowStyles.pressedStyle);
    }
    if (props.active && props.styles) {
      styles = styles.concat(props.styles);
    }

    return <div styles={styles} onMouseUp={() => this.onMouseUp()} onMouseDown={() => this.onMouseDown()}>

    </div>;
  }

  onMouseUp(){
    this.setState({active: false});
  }

  onMouseDown(){
    this.setState({active: true});
  }

}

var CircleShadowStyles = StyleSheet.create({

  normalStyle: {
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    backgroundColor: Colors.grey.P700,
    opacity: '0',
    borderRadius: '50%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    transform: 'scale(1) translateZ(0)',
    transition: 'opacity .48s ease .1s , transform .001s ease .6s',
    willChange: 'opacity, transform'
  },

  pressedStyle: {
    opacity: '.3',
    transform: 'scale(3) translateZ(0)',
    transition: 'opacity ease 0s, transform ease 0s'
  }

});