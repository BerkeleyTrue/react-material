/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var transitionEnd = require('./TransitionEndName');

var ProgressBar = React.createClass({

	styles: {

	  normalStyle: ReactStyle({
      backgroundColor: Colors.grey.P300,
      height: 4,
      overflow: 'hidden',
      position: 'relative'
	  }),

	  progressStyle: ReactStyle({
      backgroundColor: Colors.red.P600,
      bottom: 0,
      borderTopRightRadius: 3,
      borderBottomRightRadius: 3,
      left: 0,
      position: 'absolute',
      top: 0,
      transition: 'width .65s linear'
	  }),

	  indeterminateBigStyle: ReactStyle({
      borderRadius: 3,
      width: '75%',
      left: '-75%'
	  }),

	  indeterminateBigAnimateStyle: ReactStyle({
      left: '100%',
      transition: 'left .65s ease-in, width .65s ease-in'
	  }),

	  indeteminateSmallSlowAnimateStyle: ReactStyle({
      width: '10%',
      transition: 'left 1.25s ease-in, width .65s ease-in'
	  }),

	  loadingStyle: ReactStyle({
      position: 'relative',
      height: 4
	  }),

	  bufferingStyle: ReactStyle({

	  })
	},

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

  render() {
    var props = this.props;
	  var styles = this.styles;
    var state = this.state;
    var progressBarStyles = [styles.progressStyle];
    if (props.percentage) {
      progressBarStyles.push(ReactStyle({width: props.percentage + '%'}));
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

    var bufferStyles = [styles.normalStyle, ReactStyle({width: props.bufferPercentage + '%'})];


    return <div styles={props.bufferPercentage ? styles.loadingStyle : styles.normalStyle}>
          {props.bufferPercentage &&
            <div>
              <div styles={styles.bufferingStyle} />
              <div styles={bufferStyles} />
            </div>
            }
          <div ref="progress" styles={progressBarStyles} />
    </div>
  },

  componentDidMount() {
    var self = this;
    if (this.props.type === 'indeterminate') {
      setTimeout(function() {
        self.setState({indeterminateAnimate: true});
      }, 0);

      if (!transitionEnd) {
        return;
      }

      this.refs.progress.getDOMNode().addEventListener(transitionEnd, this.onTransitionEnd);
    }


  },

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

});

module.exports = ProgressBar;