import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import {Colors} from '../style/';

const SideNavigationStyles = StyleSheet.create({
  normalSideNavStyle: {
    backgroundColor: 'white',
    borderRight: '1px solid ' + Colors.grey.P300,
    bottom: 0,
    left: 0,
    overflow: 'auto',
    position: 'fixed',
    top: 0,
    width: 240,
    transform: 'translateX(-241px)',
    transition:
      'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear .21s',
    zIndex: '4',
    visibility: 'hidden'
  },

  showSideNavStyle: {
    transform: 'translateX(0)',
    transition:
      'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear 0s',
    visibility: 'visible'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool
  }
  static displayName = 'SideNavigation'

  render() {
    const {
      children,
      show
    } = this.props;

    let { normalSideNavStyle, showSideNavStyle } = SideNavigationStyles;
    let sideNavigationStyles = [normalSideNavStyle];
    if (show) {
      sideNavigationStyles.push(showSideNavStyle);
    }
    return (
      <div styles={ sideNavigationStyles }>
        { children }
      </div>
    );
  }
}
