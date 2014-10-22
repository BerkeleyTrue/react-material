/**
 * @jsx React.DOM
 */
'use strict';

var Colors = require('../style/Colors');

var React = require('react');
var ReactStyle = require('react-style');

var Shadow = require('./Shadow');
var Typography = require('../style/Typography');

var merge = require('../vendor/merge');
var transitionEnd = require('./TransitionEndName');

var DialogStyles = {

	normalStyle: ReactStyle({
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
	}),

	titleStyle: ReactStyle({
		paddingBottom: 10
	}),


	expandStyle: ReactStyle({
		visibility: 'visible',
		opacity: '1'
	}),

	childrenStyle: ReactStyle({
		position: 'relative' // to re-enable text selection
	}),

	slideDownStyle: ReactStyle({
		opacity: '0',
		transform: 'translate(0, 100%) scale(.5,.5)',
		transition: 'transform .56s cubic-bezier(.4, 0, .2, 1),' +
			'opacity .56s cubic-bezier(.4, 0, .2, 1), ' +
			'visibility 0s linear .57s',
		visibility: 'hidden'
	})

};

// warning: this code is fugly - did several attempts of getting
// the effects right, which was a challenge
var Dialog = React.createClass({

  getInitialState() {
		return {
			expand: false
		};
	},

  render() {
    var props = this.props;
	  var styles = DialogStyles;
    var node;
    var dimensions;
    var normalStyles = [Typography.body2, styles.normalStyle];
    if (props.triggerElement && (node = props.triggerElement.getDOMNode())) {
      var domNode = this.getDOMNode();

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
      normalStyles.push(ReactStyle(dimensions));
    }
    if (props.width) {
      normalStyles.push(ReactStyle({width: props.width}));
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
  },

  onTransitionEnd(e) {
    if (e.propertyName === 'visibility') {
      this.wasVisible = false;
      this.reset = true;
      this.setState({expand: false});
    }
  },

  componentDidMount() {
    if (!transitionEnd) {
      return;
    }

    this.refs.dialog.getDOMNode().addEventListener(transitionEnd, this.onTransitionEnd);
  },

  componentWillUnmount() {
    if (!transitionEnd) {
      return;
    }

    this.refs.dialog.getDOMNode().removeEventListener(transitionEnd, this.onTransitionEnd);
  },

  componentDidUpdate() {
      var self = this;
      setTimeout(function() {
        if (self.isMounted()) {

          if (self.reset) {
            self.reset = false;
            return;
          }

          if (!self.state.expand && self.props.show) {
            self.setState({expand: true});
          }
        }
      }, 10);
  }

});

module.exports = Dialog;