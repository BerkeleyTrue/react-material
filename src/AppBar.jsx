import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors, Typography } from './style';
import { Icon } from './';
import { noop } from './utils';

const AppBarStyles = StyleSheet.create({
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
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.acceptingScrollValue = true;
    this.finalCheckTimeout = null;

    this.state = {
      scrollListenerAttached: false,
      showShadow: true
    };
  }

  static displayName = 'AppBar';
  static defaultProps = {
    styles: {}
  }

  static propTypes = {
    actionButtons: PropTypes.array,
    boxShadow: PropTypes.bool,
    children: PropTypes.node,
    expanded: PropTypes.bool,
    onBackButtonClick: PropTypes.func,
    onNavButtonClick: PropTypes.func,
    onTitleClick: PropTypes.func,
    shadow: PropTypes.bool,
    styles: PropTypes.object,
    title: PropTypes.string
  }

  componentDidUpdate() {
    this.initializeScrollListener();
    this.onBodyScroll();
  }

  componentWillMount() {
    this.initializeScrollListener();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onBodyScroll);
  }

  initializeScrollListener() {
    if (typeof window === 'undefined') {
      return;
    }

    const { expanded } = this.props;
    const { scrollListenerAttached } = this.state;

    // fugly
    if (expanded && !scrollListenerAttached) {
      window.addEventListener('scroll', ::this.onBodyScroll);
    } else if (!expanded && scrollListenerAttached) {
      window.removeEventListener('scroll', ::this.onBodyScroll);
    }
  }

  checkExpanded() {
    if (typeof window === 'undefined') {
      return;
    }
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;

    if (scrollTop > 30) {
      this.setState({showExpanded: false});
    } else {
      this.setState({showExpanded: true});
    }

    if (scrollTop >= 75) {
      this.setState({showShadow: true});
    } else {
      this.setState({showShadow: false});
    }

    this.scroll = false;

    if (this.finalCheckTimeout) {
      clearTimeout(this.finalCheckTimeout);
    }

    this.finalCheckTimeout = setTimeout(::this.finalCheck, 100);
  }

  finalCheck() {
    if (!this.scroll) {
      this.checkExpanded();
    }
  }

  onBodyScroll() {
    if (!this.acceptingScrollValue) {
      return;
    }
    this.scroll = true;

    this.checkExpanded();

    setTimeout(() => {
      this.acceptingScrollValue = true;
    }, 100);

    this.acceptingScrollValue = false;
  }

  renderPlaceHolder(expanded, styles) {
    if (!expanded) {
      return null;
    }
    return (
      <div styles={ styles } />
    );
  }

  renderTitle(title, onTitleClick = () => {}, styles) {
    if (!title) {
      return null;
    }
    return (
      <div
        onClick={ ()=> onTitleClick() }
        styles={ styles }>
        { title }
      </div>
    );
  }

  renderBackButton(onBackButtonClick, styles) {
    if (!onBackButtonClick) {
      return null;
    }
    return this.renderIconWithClickHandler(
      'arrow-back',
      onBackButtonClick,
      styles
    );
  }

  renderMenuButton(onNavButtonClick, styles) {
    if (!onNavButtonClick) {
      return null;
    }
    return this.renderIconWithClickHandler('menu', onNavButtonClick, styles);
  }

  // NOTE(berks): This renderer may be abstracted to be used throughout the
  // project
  renderIconWithClickHandler(icon, handleClick, styles) {
    return (
      <div
        onClick={ () => handleClick() }
        styles={ styles }>
        <Icon icon={ icon } />
      </div>
    );
  }

  render() {
    const defaultStyles = AppBarStyles;
    const propsStyles = this.props.styles;

    const {
      children,
      expanded,
      onBackButtonClick,
      onNavButtonClick,
      onTitleClick,
      shadow,
      title
    } = this.props;

    const {
      showExpanded,
      showShadow
    } = this.state;

    let appBarStyles = [
      defaultStyles.normalAppBarStyle,
      showExpanded && expanded && defaultStyles.expandedAppBarStyle
    ];
    if (propsStyles) {
      appBarStyles = appBarStyles.concat(propsStyles.normalAppBarStyle);
    }

    if (shadow && !expanded || showShadow) {
      appBarStyles.push(defaultStyles.boxShadowStyle);
    }

    let expandedTitleStyle;
    let headLineStyle;

    if (showExpanded && expanded) {
      expandedTitleStyle = defaultStyles.expandedTitleStyle;
      headLineStyle = Typography.headline;
    }

    const { navButtonStyle } = defaultStyles;
    const placeHolderStyles = [
      defaultStyles.placeHolderStyle,
      propsStyles.placeHolderStyle
    ];
    const titleStyles = [
      Typography.title,
      defaultStyles.titleStyle,
      expandedTitleStyle,
      headLineStyle,
      propsStyles.titleStyle
    ];

    return (
      <div>
        { this.renderPlaceHolder(expanded, placeHolderStyles) }
        <nav styles={ [appBarStyles, propsStyles.appBarStyles] }>
          { this.renderMenuButton(onNavButtonClick, navButtonStyle) }
          { this.renderBackButton(onBackButtonClick, navButtonStyle) }
          { this.renderTitle(title, onTitleClick, titleStyles) }
          { children }
        </nav>
      </div>
    );
  }
}
