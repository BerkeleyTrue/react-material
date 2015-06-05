import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors } from './style';

import { RippleContainer } from './';

const TabsStyles = StyleSheet.create({
  normalStyle: {
    position: 'relative',
    width: '100%'
  },

  tabTitlesContainerStyle: {
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    backgroundColor: Colors.cyan.P500,
    lineHeight: '48px',
    margin: 0,
    padding: 0,
    height: 48,
    position: 'relative',
    cursor: 'pointer',
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
    boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.2)'
  },

  tabTitleStyle: {
    height: '100%',
    display: 'inline-block',
    textAlign: 'center',
    userSelect: 'none',
    position: 'relative',
    overflow: 'hidden',
    opacity: '.6',
    transition: 'opacity .38s linear'
  },

  tabTitleSelectedStyle: {
    opacity: '1'
  },

  selectionBarStyle: {
    backgroundColor: Colors.yellow.A100,
    height: 2,
    transition: 'left .28s linear',
    position: 'absolute',
    bottom: 0
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  static displayName = 'Tabs'
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    styles: PropTypes.object
  }

  getSelectedChild(children) {
    let defaultVal = {
      selectedTab: null,
      selectedIndex: 0
    };
    if (!children) {
      return defaultVal;
    }
    if (!Array.isArray(children)) {
      children = [children];
    }
    return children.reduce((accu, child, index) => {
      if (!child.props.selected) {
        return accu;
      }
      accu.selectedTab = child;
      accu.selectedIndex = index;
    }, defaultVal);
  }

  onTabHeaderClick(e) {
    const { onChange } = this.props;
    if (onChange) {
      let position = 0;
      let target = e.target;

      while (target.previousSibling) {
        target = target.previousSibling;
        position++;
      }

      // enhance the event with the position of the blind
      e.position = position;
      onChange(e);
    }
  }

  renderTitles(children, tabTitleStyle, tabTitleSelectedStyle) {
    if (!children) {
      return null;
    }
    if (!Array.isArray(children)) {
      children = [children];
    }

    return children.map((child, index) => {
      const childProps = child.props;
      const tabTitleStyles = [tabTitleStyle];

      if (childProps.selected) {
        tabTitleStyles.push(tabTitleSelectedStyle);
      }

      tabTitleStyles.push({ width: (100 / children.length) + '%' });
      return (
        <li
          key={ index }
          styles={ tabTitleStyles }>
          <RippleContainer onClick={ ::this.onTabHeaderClick } />
          { childProps.title }
        </li>
      );
    });
  }

  render() {
    const {
      children,
      styles
    } = this.props;

    const {
      normalStyle,
      selectionBarStyle,
      tabTitlesContainerStyle,
      tabTitleSelectedStyle,
      tabTitleStyle
    } = TabsStyles;

    let normalStyles = [normalStyle];
    if (styles) {
      normalStyles = normalStyles.concat(styles);
    }

    const {
      selectedIndex,
      selectedTab
    } = this.getSelectedChild(children);

    const selectionBarStyles = [
      selectionBarStyle,
      {
        width: (100 / children.length) + '%',
        left: (100 / children.length * selectedIndex) + '%'
      }
    ];
    return (
      <div styles={normalStyles}>
        <ul styles={tabTitlesContainerStyle}>
          { this.renderTabs(children, tabTitleStyle, tabTitleSelectedStyle) }
          <div styles={ selectionBarStyles }/>
        </ul>
        { selectedTab }
      </div>
    );
  }
}

