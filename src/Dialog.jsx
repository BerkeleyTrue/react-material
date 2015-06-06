import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';
import merge from '../vendor/merge';

import { Colors, Typography } from './style';
import { Shadow } from './';
import { transitionEnd } from './utils';

const DialogStyles = StyleSheet.create({
  normalStyle: {
    backgroundColor: Colors.grey.P50,
    boxSizing: 'border-box',
    lineHeight: '24px',
    opacity: '0',
    padding: 24,
    left: '50%',
    top: '50%',
    visibility: 'hidden',
    position: 'fixed',
    transform: 'translate(0,0) scale(1, 1)',
    transformOrigin: '0 0',
    zIndex: '3',
    willChange: 'transform, opacity, left, top'
  },

  titleStyle: {
    paddingBottom: 10
  },

  expandStyle: {
    visibility: 'visible',
    opacity: '1'
  },

  childrenStyle: {
    // to re-enable text selection
    position: 'relative'
  },

  slideDownStyle: {
    opacity: '0',
    transform: 'translate(0, 100%) scale(.5,.5)',
    transition: 'transform .56s cubic-bezier(.4, 0, .2, 1),' +
    'opacity .56s cubic-bezier(.4, 0, .2, 1), ' +
    'visibility 0s linear .57s',
    visibility: 'hidden'
  }
});

// warning: this code is fugly - did several attempts of getting
// the effects right, which was a challenge
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }
  static displayName = 'Dialog'
  static propTypes = {
    children: PropTypes.node,
    show: PropTypes.bool,
    title: PropTypes.string,
    triggerElement: PropTypes.node,
    width: PropTypes.number
  }

  componentDidMount() {
    if (!transitionEnd) {
      return;
    }

    React.findDOMNode(this.refs.dialog)
      .addEventListener(transitionEnd, ::this.onTransitionEnd);
  }

  componentWillUnmount() {
    if (!transitionEnd) {
      return;
    }

    React.findDOMNode(this.refs.dialog)
      .removeEventListener(transitionEnd, ::this.onTransitionEnd);
  }

  componentDidUpdate() {
    setTimeout(() => {
      if (this.reset) {
        this.reset = false;
        return;
      }

      if (!this.state.expand && this.props.show) {
        this.setState({ expand: true });
      }
    }, 10);
  }

  onTransitionEnd(e) {
    if (e.propertyName === 'visibility') {
      this.wasVisible = false;
      this.reset = true;
      this.setState({ expand: false });
    }
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
    let node, dimensions;
    let styles = DialogStyles;
    const shadow = 3;

    const {
      children,
      show,
      title,
      triggerElement,
      width
    } = this.props;

    const {
      expand
    } = this.state;

    const normalStyles = [
      Typography.body2,
      styles.normalStyle
    ];

    if (
      triggerElement &&
      (node = React.findDOMNode(triggerElement))
    ) {
      const domNode = React.findDOMNode(this);

      if (!this.originalDimensions) {
        const nodeWidth = domNode.getBoundingClientRect().width;

        const scaleX = 1 / (domNode.offsetWidth / node.offsetWidth);
        const scaleY = 1 / (domNode.offsetHeight / node.offsetHeight);

        const x = (
          -domNode.getBoundingClientRect().left +
          nodeWidth / 2 +
          node.getBoundingClientRect().left
        );

        const y = (
          -domNode.getBoundingClientRect().top +
          domNode.offsetHeight / 2 +
          node.getBoundingClientRect().top
        );

        dimensions = this.originalDimensions = {
          height: domNode.offsetHeight,
          marginLeft: -(nodeWidth / 2),
          marginTop: -(domNode.offsetHeight / 2),
          width: nodeWidth,
          transform:
            'translate(' + x + 'px, ' + y + 'px) ' +
            'scale(' + scaleX + ', ' + scaleY + ')'
        };
      }

      if (expand) {
        normalStyles.push(styles.expandStyle);
        dimensions = merge(this.originalDimensions, {
          transition:
            'visibility 0s ' +
            'linear 0s, ' +
            'opacity .4s ' +
            'cubic-bezier(.4, 0, .2, 1) 0.02s, ' +
            'transform .4s cubic-bezier(.4, 0, .2, 1) 0.02s'
        });
        delete dimensions.transform;
      } else {
        dimensions = this.originalDimensions;
      }
    }

    if (show) {
      this.wasVisible = true;
    } else if (this.wasVisible) {
      delete dimensions.transition;
      normalStyles.push(styles.slideDownStyle);
    }

    if (dimensions) {
      normalStyles.push(dimensions);
    }

    if (width) {
      normalStyles.push({ width: width });
    }

    return (
      <div
        ref='dialog'
        styles={ normalStyles }>
        <Shadow size={ shadow } />
        { this.renderTitle(title, [Typography.title, styles.titleStyle]) }
        <div styles={ styles.childrenStyle }>
          { children }
        </div>
      </div>
    );
  }
}
