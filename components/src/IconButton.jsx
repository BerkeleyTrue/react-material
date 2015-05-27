'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import Colors from '../style/Colors';

import CircleShadow from './CircleShadow';
import Icon from './Icon';

export default class IconButton extends React.Component {

  render() {
    var props = this.props;
    var styles = IconButtonStyles;
    return <div styles={styles.normalStyle} onClick={() => props.onClick()}>
      <CircleShadow active={true} styles={[styles.circleShadowStyle]}/>
      <Icon icon={props.icon} styles={props.styles ? props.styles.iconStyles: null}/>
    </div>;
  }

}

var IconButtonStyles = StyleSheet.create({

  normalStyle: {
    cursor: 'pointer',
    display: 'inline-block',
    height: 24,
    padding: 8,
    position: 'relative',
    width: 24,
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    outline: 'none'
  },

  circleShadowStyle: {
    backgroundColor: Colors.grey.P400,
    height: 24,
    left: 7,
    padding: 0,
    top: 8,
    transform: 'scale(2) translateZ(0)',
    width: 24
  }

});
