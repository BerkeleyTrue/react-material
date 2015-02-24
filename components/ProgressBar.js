/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import Colors from '../style/Colors';

import transitionEnd from './TransitionEndName';

export default class ProgressBar extends React.Component {

  constructor() {
    this.state = {
      counter: 0,
      indeterminateAnimate: false
    };
  }

  //propTypes: {
  //  percentage: React.PropTypes.number,
  //  bufferPercentage: React.PropTypes.number,
  //  type: React.PropTypes.string
  //},

  render() {
    var props = this.props;
    var styles = ProgressBarStyles;
    var state = this.state;
    var progressBarStyles = [styles.progressStyle];
    if (props.percentage) {
      progressBarStyles.push({width: props.percentage + '%'});
    }
    if (props.styles) {
      progressBarStyles = progressBarStyles.concat(props.styles);
    }
    if (props.type === 'indeterminate') {
      progressBarStyles.push(styles.indeterminateBigStyle);
      if (state.indeterminateAnimate) {
        progressBarStyles.push(styles.indeterminateBigAnimateStyle);
      }
      if (state.smallSlowAnimate) {
        progressBarStyles.push(styles.indeteminateSmallSlowAnimateStyle);
      }
    }

    var bufferStyles = [styles.normalStyle, {width: props.bufferPercentage + '%'}];


    return <div styles={props.bufferPercentage ? styles.loadingStyle : styles.normalStyle}>
          {props.bufferPercentage &&
            <div>
              <div styles={styles.bufferingStyle} />
              <div styles={bufferStyles} />
            </div>
            }
          <div ref="progress" styles={progressBarStyles} />
    </div>
  }

  componentDidMount() {
    var self = this;
    if (this.props.type === 'indeterminate') {
      setTimeout(function() {
        self.setState({indeterminateAnimate: true});
      }, 0);

      if (!transitionEnd) {
        return;
      }

      React.findDOMNode(this.refs.progress).addEventListener(transitionEnd, this.onTransitionEnd);
    }


  }

  onTransitionEnd(e) {
    if (e.propertyName === 'left') {
      var counter = this.state.counter;
      if (counter < 3) {
        this.setState({indeterminateAnimate: false, smallSlowAnimate: false, counter: counter + 1});
        var self = this;
        setTimeout(function() {
          self.setState({indeterminateAnimate: true});
        }, 0);
      }
      else {
        var self = this;
        self.setState({indeterminateAnimate: false});
        setTimeout(function() {
          self.setState({indeterminateAnimate: true, smallSlowAnimate: true, counter: 0});
        }, 0);
      }
    }
  }

}

var ProgressBarStyles = StyleSheet.create({

  normalStyle: {
    backgroundColor: Colors.grey.P300,
    height: 4,
    overflow: 'hidden',
    position: 'relative'
  },

  progressStyle: {
    backgroundColor: Colors.red.P600,
    bottom: 0,
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
    left: 0,
    position: 'absolute',
    top: 0,
    transition: 'width .65s linear'
  },

  indeterminateBigStyle: {
    borderRadius: 3,
    width: '75%',
    left: '-75%'
  },

  indeterminateBigAnimateStyle: {
    left: '100%',
    transition: 'left .65s ease-in, width .65s ease-in'
  },

  indeteminateSmallSlowAnimateStyle: {
    width: '10%',
    transition: 'left 1.25s ease-in, width .65s ease-in'
  },

  loadingStyle: {
    position: 'relative',
    height: 4
  },

  bufferingStyle: {

  }

});
