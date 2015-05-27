import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors } from '../style/';

const BottomSheetStyles = StyleSheet.create({

  normalBottomSheetStyle: {
    backgroundColor: 'white',
    borderTop: '1px solid ' + Colors.grey.P300,
    bottom: 0,
    left: 0,
    paddingBottom: 8,
    position: 'fixed',
    right: 0,
    transition:
      'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear 0s',
    visibility: 'visible',
    zIndex: '3'
  },

  showBottomSheetStyle: {
    transform: 'translateY(0)'
  },

  titleStyle: {
    color: Colors.grey.P500,
    cursor: 'default',
    padding: 16
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);

    this._isMounted = false;
  }
  static displayName = 'BottomSheet '
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    styles: PropTypes.object,
    title: PropTypes.string
  }

  componentDidMount() {
    this._isMounted = true;

    // to enforce calculation of height
    this.forceUpdate();
  }

  hiddenTransformStyle() {
    let height = 0;
    if (this._isMounted) {
      const domNode = React.findDOMNode(this);
      if (domNode) {
        height = domNode.offsetHeight + 8;
      }
    }

    return {
      visibility: 'hidden',
      transform: 'translateY(' + height + 'px)',
      transition:
        'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear .21s'
    };
  }

  renderTitle(title, styles) {
    if (!title) {
      return null;
    }
    return (
      <div styles={ styles }>
        { title }
      </div>
    );
  }

  render() {
    const defaultStyles = BottomSheetStyles;
    let bottomSheetStyles = [defaultStyles.normalBottomSheetStyle];
    const {
      children,
      show,
      styles,
      title
    } = this.props;

    if (show) {
      bottomSheetStyles.push(defaultStyles.showBottomSheetStyle);
    } else {
      bottomSheetStyles.push(this.hiddenTransformStyle());
    }
    if (styles) {
      bottomSheetStyles = bottomSheetStyles.concat(styles);
    }

    return (
      <div styles={bottomSheetStyles}>
        { this.renderTitle(title, defaultStyles.titleStyle) }
        { children }
      </div>
    );
  }
}
