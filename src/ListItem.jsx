import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { RippleContainer } from './';

const ListItemStyles = StyleSheet.create({
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

export default class extends React.Component{
  constructor(props) {
    super(props);
  }
  static displayName = 'ListItem'
  static propTypes = {
    children: PropTypes.node,
    disableRipple: PropTypes.bool,
    icon: PropTypes.string,
    onClick: PropTypes.func,
    styles: PropTypes.array
  }

  renderRipple(disableRipple, onClick) {
    if (disableRipple) {
      return null;
    }
    return <RippleContainer onClick={ onClick } />;
  }

  render() {
    const {
      children,
      disableRipple,
      icon,
      onClick,
      styles
    } = this.props;

    const {
      normalListItemStyle,
      singleLineWithIconTitleStyle
    } = ListItemStyles;

    let listItemStyles = [normalListItemStyle];

    if (icon) {
      listItemStyles.push(singleLineWithIconTitleStyle);
    }

    if (styles) {
      listItemStyles = listItemStyles.concat(styles);
    }

    return (
      <div styles={listItemStyles}>
        { this.renderRipple(disableRipple, onClick) }
        { children }
      </div>
    );
  }
}
