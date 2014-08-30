/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var transitionEnd = require('./TransitionEndName');

var ProgressBar = React.createClass({

  normalStyle: ReactStyle(function normalStyle() {
    return {
      backgroundColor: '#c8c8c8',
      height: '4px',
      overflow: 'hidden',
      position: 'relative'
    };
  }),

  progressStyle: ReactStyle(function progressStyle() {
    return {
      backgroundColor: '#d23f31',
      bottom: 0,
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
      left: 0,
      position: 'absolute',
      top: 0,
      transition: 'width .65s linear'
    };
  }),

  indeterminateBigStyle: ReactStyle(function indeterminateBigStyle() {
    return {
      borderRadius: '3px',
      width: '75%',
      left: '-75%'

    };
  }),

  indeterminateBigAnimateStyle: ReactStyle(function indeterminateBigAnimateStyle() {
    return {
      left: '100%',
      transition: 'left .65s ease-in, width .65s ease-in'
    };
  }),

  indeteminateSmallSlowAnimateStyle: ReactStyle(function indeteminateSmallSlowAnimateStyle(){
    return {
      width: '10%',
      transition: 'left 1.25s ease-in, width .65s ease-in'
    };
  }),

  loadingStyle: ReactStyle(function loadingStyle(){
    return {
      position: 'relative',
      height: '4px'
    };
  }),


  getInitialState: function() {
    return {
      counter: 0,
      indeterminateAnimate: false
    };
  },

  propTypes: {
    percentage: React.PropTypes.number,
    bufferPercentage: React.PropTypes.number,
    type: React.PropTypes.string
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var progressBarStyles = [this.progressStyle()];
    if (props.percentage) {
      progressBarStyles.push({width: props.percentage + '%'});
    }
    if (props.styles) {
      progressBarStyles = progressBarStyles.concat(props.styles);
    }
    if (props.type === 'indeterminate') {
      progressBarStyles.push(this.indeterminateBigStyle());
      if (state.indeterminateAnimate) {
        progressBarStyles.push(this.indeterminateBigAnimateStyle());
      }
      if (state.smallSlowAnimate) {
        progressBarStyles.push(this.indeteminateSmallSlowAnimateStyle());
      }
    }

    var bufferStyles = [this.normalStyle(), {width: props.bufferPercentage + '%'}];


    return <div styles={props.bufferPercentage ? this.loadingStyle() : this.normalStyle()}>
          {props.bufferPercentage &&
            <div styles={bufferStyles} />
            }
          <div ref="progress" styles={progressBarStyles} />
    </div>
  },

  componentDidMount: function() {
    var self = this;
    if (this.props.type === 'indeterminate') {
      setTimeout(function() {
        self.setState({indeterminateAnimate: true});
      }, 0);
      this.refs.progress.getDOMNode().addEventListener(transitionEnd, this.onTransitionEnd);
    }


  },

  onTransitionEnd: function(e) {
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

});

module.exports = ProgressBar;