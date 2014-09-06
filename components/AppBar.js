/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');
var Typography = require('../style/Typography');
var Icon = require('./Icon');

var merge = require('../vendor/merge');

var AppBar = React.createClass({

  normalAppBarStyle: ReactStyle(function normalAppBarStyle() {
    return {
      backgroundColor: Colors.cyan.P500,
      boxSizing: 'border-box',
      position: 'fixed',
      height: 56,
      width: '100%'
    };
  }),

  expandedAppBarStyle: ReactStyle(function expandedAppBarStyle() {
    return {
      height: 128,
      position: 'relative',
      marginTop: -128
    };
  }),

  navButtonStyle: ReactStyle(function navButtonStyle() {
    return {
      height: 26,
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      position: 'fixed',
      width: 24,
      display: 'inline-block',
      padding: '14px 16px',
      cursor: 'pointer',
      verticalAlign: 'top',
      top: 0
    };
  }),

  titleStyle: ReactStyle(function titleStyle() {
    return merge(Typography.title, {
      display: 'inline-block',
      opacity: 'inherit',
      cursor: 'default',
      lineHeight: '56px',
      position: 'absolute',
      top: 0,
      left: 56
    });
  }),

  expandedTitleStyle: ReactStyle(function expandedTitleStyle() {
    return merge(Typography.headline, {
      position: 'relative',
      left: 14,
      top: 65
    });
  }),

  boxShadowStyle: ReactStyle(function boxShadowStyle() {
    return {
      boxShadow: '0 2px 5px rgba(0, 0, 0, .26)'
    };
  }),

  placeHolderStyle: ReactStyle(function placeHolderStyle(){
    return {
      backgroundColor: Colors.cyan.P500,
      position: 'relative',
      height: 128,
      width: '100%'
    };
  }),

  propTypes: {
    actionButtons: React.PropTypes.array,
    boxShadow: React.PropTypes.bool,
    expanded: React.PropTypes.bool,
    onBackButtonClick: React.PropTypes.func,
    onMenuButtonCLick: React.PropTypes.func,
    onNavButtonClick: React.PropTypes.func,
    title: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      scrollListenerAttached: false,
      showShadow: true
    };
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var appBarStyles = [this.normalAppBarStyle(), state.showExpanded && props.expanded && this.expandedAppBarStyle()]
    if (props.styles) {
      appBarStyles = appBarStyles.concat(props.styles);
    }

    if (props.shadow && !props.expanded || state.showShadow === true) {
      appBarStyles.push(this.boxShadowStyle());
    }
    return <div>
    {props.expanded && <div styles={this.placeHolderStyle()}/> }
      <nav styles={appBarStyles}>
    {props.onNavButtonClick &&
      <div styles={this.navButtonStyle()} onClick={props.onNavButtonClick}>
        <Icon icon="menu"/>
      </div>
      }
    {props.title &&
      <div styles={[this.titleStyle(), state.showExpanded && props.expanded && this.expandedTitleStyle()]}>
        {props.title}
      </div>
      }
      {props.children}
    </nav></div>;
  },

  componentDidUpdate: function() {
    this.initializeScrollListener();
    this.onBodyScroll()
  },

  componentWillMount: function() {
    this.initializeScrollListener();
  },

  acceptingScrollValue: true,
  finalCheckTimeout: null,
  onBodyScroll: function() {
    if (!this.acceptingScrollValue) {
      return
    }
    this.scroll = true;
    var self = this;
    function checkExpanded() {
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

    setTimeout(function(){
      self.acceptingScrollValue = true;
    }, 100);

    this.acceptingScrollValue = false;
  },

  initializeScrollListener: function() {
    var props = this.props;
    var state = this.state;
    // fugly
    if (props.expanded && !state.scrollListenerAttached) {
      window.addEventListener('scroll', this.onBodyScroll);
    }
    else if (!props.expanded && state.scrollListenerAttached) {
      window.removeEventListener('scroll', this.onBodyScroll);
    }
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.onBodyScroll);
  }

});

module.exports = AppBar;