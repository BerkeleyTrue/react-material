/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Colors, Typography} from '../style/';

import Icon from './Icon';

export default class AppBar extends React.Component {

  //propTypes: {
  //  actionButtons: React.PropTypes.array,
  //  boxShadow: React.PropTypes.bool,
  //  expanded: React.PropTypes.bool,
  //  onBackButtonClick: React.PropTypes.func,
  //  onMenuButtonCLick: React.PropTypes.func,
  //  onNavButtonClick: React.PropTypes.func,
  //  onTitleClick: React.PropTypes.func,
  //  title: React.PropTypes.string
  //},

  constructor(props) {
    super(props);
    this.acceptingScrollValue = true;
    this.finalCheckTimeout = null;
    this.state = {
      scrollListenerAttached: false,
      showShadow: true
    };
  }

  render() {
    var props  =       this.props;
    var state  =       this.state;
    var styles =       AppBarStyles;
    var propsStyles = props.styles || {};
    var appBarStyles = [styles.normalAppBarStyle, state.showExpanded && props.expanded && styles.expandedAppBarStyle]
    if (props.styles) {
      appBarStyles = appBarStyles.concat(propsStyles.normalAppBarStyle);
    }

    if (props.shadow && !props.expanded || state.showShadow === true) {
      appBarStyles.push(styles.boxShadowStyle);
    }
    var expandedTitleStyle;
    var headLineStyle;
    if (state.showExpanded && props.expanded) {
      expandedTitleStyle = styles.expandedTitleStyle;
      headLineStyle = Typography.headline;
    }
    return <div>
    {props.expanded && <div styles={[styles.placeHolderStyle, propsStyles.placeHolderStyle]}/> }
      <nav styles={[appBarStyles, propsStyles.appBarStyles]}>
    {props.onNavButtonClick &&
      <div styles={styles.navButtonStyle} onClick={()=>props.onNavButtonClick()}>
        <Icon icon="menu"/>
      </div>
      }
    {props.onBackButtonClick &&
      <div styles={styles.navButtonStyle} onClick={() => props.onBackButtonClick()}>
        <Icon icon="arrow-back"/>
      </div>
      }
    {props.title &&
      <div styles={[Typography.title, styles.titleStyle, expandedTitleStyle, headLineStyle, propsStyles.titleStyle]} onClick={()=>props.onTitleClick()}>
        {props.title}
      </div>
      }
      {props.children}
    </nav></div>;
  }

  componentDidUpdate() {
    this.initializeScrollListener();
    this.onBodyScroll()
  }

  componentWillMount() {
    this.initializeScrollListener();
  }


  onBodyScroll() {
    if (!this.acceptingScrollValue) {
      return
    }
    this.scroll = true;
    var self = this;
    function checkExpanded() {
      if (typeof window === 'undefined') {
        return;
      }
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop > 30) {
        self.setState({showExpanded: false});
      }
      else {
        self.setState({showExpanded: true});
      }

      if (scrollTop >= 75) {
        self.setState({showShadow: true});
      }
      else {
        self.setState({showShadow: false});
      }

      self.scroll = false;
      if (self.finalCheckTimeout) {
        clearTimeout(self.finalCheckTimeout);
      }
      self.finalCheckTimeout = setTimeout(finalCheck, 100);
    }

    function finalCheck() {
      if (!self.scroll) {
        checkExpanded();
      }
    }

    checkExpanded();

    setTimeout(()=>{
      self.acceptingScrollValue = true;
    }, 100);

    this.acceptingScrollValue = false;
  }

  initializeScrollListener() {
    if (typeof window === 'undefined') {
      return;
    }

    var props = this.props;
    var state = this.state;
    // fugly
    if (props.expanded && !state.scrollListenerAttached) {
      window.addEventListener('scroll', this.onBodyScroll);
    }
    else if (!props.expanded && state.scrollListenerAttached) {
      window.removeEventListener('scroll', this.onBodyScroll);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onBodyScroll);
  }

}

var AppBarStyles = StyleSheet.create({

  normalAppBarStyle: {
    backgroundColor: Colors.cyan.P500,
    boxSizing: 'border-box',
    position: 'fixed',
    height: 56,
    top: 0,
    width: '100%',
    zIndex: '1'
  },

  expandedAppBarStyle: {
    height: 128,
    position: 'relative',
    marginTop: -128
  },

  navButtonStyle: {
    height: 26,
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    position: 'fixed',
    width: 24,
    display: 'inline-block',
    padding: '14px 16px',
    cursor: 'pointer',
    verticalAlign: 'top',
    top: 0
  },

  titleStyle: {
    display: 'inline-block',
    opacity: 'inherit',
    cursor: 'default',
    lineHeight: '56px',
    position: 'absolute',
    top: 0,
    left: 72
  },

  expandedTitleStyle: {
    position: 'relative',
    left: 14,
    top: 65
  },

  boxShadowStyle: {
    boxShadow: '0 2px 5px rgba(0, 0, 0, .26)'
  },

  placeHolderStyle: {
    backgroundColor: Colors.cyan.P500,
    position: 'relative',
    height: 128,
    width: '100%'
  }
});