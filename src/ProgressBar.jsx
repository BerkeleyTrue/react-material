import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors } from './style';
import { transitionEnd } from './utils';

const ProgressBarStyles = StyleSheet.create({
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

  bufferingStyle: { }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      indeterminateAnimate: false
    };
  }

  static displayName = 'ProgressBar'
  static propTypes = {
    percentage: PropTypes.number,
    bufferPercentage: PropTypes.number,
    styles: PropTypes.array,
    type: PropTypes.string
  }

  componentDidMount() {
    if (this.props.type !== 'indeterminate') {
      return null;
    }
    setTimeout(() => {
      this.setState({ indeterminateAnimate: true });
    }, 0);

    if (!transitionEnd) {
      return;
    }

    React.findDOMNode(this.refs.progress)
      .addEventListener(transitionEnd, ::this.onTransitionEnd);
  }

  onTransitionEnd(e) {
    if (e.propertyName !== 'left') {
      return null;
    }
    let counter = this.state.counter;
    if (counter < 3) {
      this.setState({
        indeterminateAnimate: false,
        smallSlowAnimate: false,
        counter: counter + 1
      });
      return setTimeout(() => {
        this.setState({ indeterminateAnimate: true });
      }, 0);
    }
    this.setState({ indeterminateAnimate: false });
    return setTimeout(() => {
      this.setState({
        indeterminateAnimate: true,
        smallSlowAnimate: true,
        counter: 0
      });
    }, 0);
  }

  renderBuffer(bufferPercentage, bufferingStyle, bufferStyles) {
    if (!bufferPercentage) {
      return null;
    }

    return (
      <div>
        <div styles={bufferingStyle} />
        <div styles={bufferStyles} />
      </div>
    );
  }

  render() {
    const {
      bufferPercentage,
      percentage,
      styles,
      type
    } = this.props;

    const {
      indeterminateAnimate,
      smallSlowAnimate
    } = this.state;

    const {
      progressStyle,
      indeterminateBigStyle,
      indeterminateBigAnimateStyle,
      indeteminateSmallSlowAnimateStyle,
      normalStyle,
      loadingStyle
    } = ProgressBarStyles;

    let progressBarStyles = [progressStyle];

    if (percentage) {
      progressBarStyles.push({ width: percentage + '%' });
    }

    if (styles) {
      progressBarStyles = progressBarStyles.concat(styles);
    }

    if (type === 'indeterminate') {
      progressBarStyles.push(indeterminateBigStyle);

      if (indeterminateAnimate) {
        progressBarStyles.push(indeterminateBigAnimateStyle);
      }

      if (smallSlowAnimate) {
        progressBarStyles.push(indeteminateSmallSlowAnimateStyle);
      }
    }

    const bufferStyles = [
      normalStyle,
      { width: bufferPercentage + '%'}
    ];

    const ProgressStyles = bufferPercentage ?
      loadingStyle :
      normalStyle;

    return (
      <div styles={ ProgressStyles }>
        { this.renderBuffer(bufferPercentage, bufferPercentage, bufferStyles) }
        <div
          ref='progress'
          styles={progressBarStyles} />
      </div>
    );
  }
}
