'use strict';

import Colors from '../style/Colors';

import React from 'react';
import StyleSheet from 'react-style';

import Shadow from './Shadow';
import Typography from '../style/Typography';

import merge from '../vendor/merge';
import transitionEnd from './TransitionEndName';

// warning: this code is fugly - did several attempts of getting
// the effects right, which was a challenge
export default class Dialog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expand: false
    };
  }

  render() {
    var props = this.props;
    var styles = DialogStyles;
    var node;
    var dimensions;
    var normalStyles = [Typography.body2, styles.normalStyle];
    if (props.triggerElement && (node = React.findDOMNode(props.triggerElement))) {
      var domNode = React.findDOMNode(this);

      if (!this.originalDimensions) {
        var width = domNode.getBoundingClientRect().width;

        var scaleX = 1 / (domNode.offsetWidth / node.offsetWidth);
        var scaleY = 1 / (domNode.offsetHeight / node.offsetHeight);
        var x = (-domNode.getBoundingClientRect().left + width / 2 + node.getBoundingClientRect().left);
        var y = (-domNode.getBoundingClientRect().top + domNode.offsetHeight / 2 + node.getBoundingClientRect().top);
        dimensions = this.originalDimensions = {
          height: domNode.offsetHeight,
          marginLeft: -(width / 2),
          marginTop: -(domNode.offsetHeight / 2),
          width: width,
          transform: 'translate(' + x + 'px, ' + y + 'px) scale(' + scaleX + ', ' + scaleY + ')'
        };
      }

      if(this.state.expand) {
        normalStyles.push(styles.expandStyle);
        dimensions = merge(this.originalDimensions, {
          transition: 'visibility 0s linear 0s, opacity .4s cubic-bezier(.4, 0, .2, 1) 0.02s, transform .4s cubic-bezier(.4, 0, .2, 1) 0.02s'
        });
        delete dimensions.transform;
      }
      else {
        dimensions = this.originalDimensions;
      }
    }
    var shadow = 3;

    if (props.show) {
      this.wasVisible = true;
    }
    else if (this.wasVisible) {
      delete dimensions.transition;
      normalStyles.push(styles.slideDownStyle);
    }

    if (dimensions) {
      normalStyles.push(dimensions);
    }
    if (props.width) {
      normalStyles.push({width: props.width});
    }

    return <div ref="dialog" styles={normalStyles}>
      <Shadow size={shadow} />
      {props.title &&
        <div styles={[Typography.title, styles.titleStyle]}>
          {props.title}
        </div>}
      <div styles={styles.childrenStyle}>
        {props.children}
      </div>
    </div>;
  }

  onTransitionEnd(e) {
    if (e.propertyName === 'visibility') {
      this.wasVisible = false;
      this.reset = true;
      this.setState({expand: false});
    }
  }

  componentDidMount() {
    if (!transitionEnd) {
      return;
    }

    React.findDOMNode(this.refs.dialog).addEventListener(transitionEnd, () => this.onTransitionEnd);
  }

  componentWillUnmount() {
    if (!transitionEnd) {
      return;
    }

    React.findDOMNode(this.refs.dialog).removeEventListener(transitionEnd, () => this.onTransitionEnd);
  }

  componentDidUpdate() {
      var self = this;
      setTimeout(function() {

        if (self.reset) {
          self.reset = false;
          return;
        }

        if (!self.state.expand && self.props.show) {
          self.setState({expand: true});
        }

      }, 10);
  }

}

var DialogStyles = StyleSheet.create({

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
    position: 'relative' // to re-enable text selection
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
