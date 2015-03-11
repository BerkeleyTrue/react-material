'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import Icon from './Icon';
import RippleContainer from './RippleContainer';

export default class ListItem extends React.Component{

  render() {
    var props = this.props;
    var styles = ListItemStyles;
    var listItemStyles = [styles.normalListItemStyle];
    if (props.icon) {
      listItemStyles.push(styles.singleLineWithIconTitleStyle);
    }

    if(props.styles) {
      listItemStyles = listItemStyles.concat(props.styles);
    }

    return <div styles={listItemStyles}>
      {!props.disableRipple &&
      <RippleContainer onClick={(e)=> this.onClick(e)}/> }

      {props.children}
    </div>;
  }

  onClick(e) {
    var onClick = this.props.onClick;
    if (onClick) {
      onClick(e);
    }
  }

}

var ListItemStyles = StyleSheet.create({

  normalListItemStyle: {
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    boxSizing: 'border-box',
    cursor: 'pointer',
    overflow: 'hidden',
    padding: '14px 16px 15px',
    position: 'relative'
  },

  singleLineWithIconTitleStyle: {
    padding: '11px 16px'
  },

  iconStyle: {
    display: 'inline-block',
    padding: '0 16px 0 0',
    width: 30,
    verticalAlign: 'middle',
    position: 'relative',
    pointerEvents: 'none'
  }

});
