/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var Icon = require('./Icon');
var RippleContainer = require('./RippleContainer');
var Shadow = require('./Shadow');

var Colors = require('../style/Colors');

var isTouchDevice;
if (typeof window !== 'undefined') {
  isTouchDevice = 'ontouchstart' in window;
}

var FloatingActionButton = React.createClass({

  propTypes: {
    icon: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      active: false
    };
  },

  render() {
    var props = this.props;
    var styles = FloatingActionButtonStyles;
    var state = this.state;
    var containerStyles = [styles.containerStyle];
    var normalStyles = [styles.normalStyle];
    if (props.styles) {
      normalStyles = normalStyles.concat(props.styles);
    }
    if (props.mini) {
      containerStyles.push(styles.miniStyle);
    }
    var shadowSize = 1;
    if (state.active && !props.percentage) {
      shadowSize = 2;
    }
    var percentageStyling = [styles.percentageStyle];
    if (props.percentage) {
      var percentage = props.percentage;
      percentageStyling.push(styles.percentageStyleVisible);
      var r = '29';
      var c = Math.PI*(r*2);

      if (percentage < 0) { percentage = 0;}
      if (percentage > 100) { percentage = 100;}

      var pct = ((100-percentage)/100)*c;

      // react doesn't support this yet :(
      //percentageStyling.push({ strokeDashoffset: pct});

    }

    var progressCircleStyles = [styles.progressCircleStyle, props.progressCircleStyle];

    var overlayStyles = [styles.overlayStyle];
    if (state.active) {
      overlayStyles.push(styles.overlayPressedStyle);
    }


    return <div   role="button"
                  tabIndex={0}
                  onTouchStart={isTouchDevice && this.onMouseDown}
                  onTouchEnd={isTouchDevice && this.onMouseUp}
                  onTouchCancel={isTouchDevice && this.onMouseUp}
                  onMouseDown={!isTouchDevice && this.onMouseDown}
                  onMouseUp={!isTouchDevice && this.onMouseUp}
                  onMouseLeave={!isTouchDevice && this.onMouseLeave}
                  styles={containerStyles}>
        <Shadow size={shadowSize} styles={styles.shadowStyle}/>
        <div styles={percentageStyling}>
          {props.percentage ?
            <svg width={60} height={60}>
              <circle id="bar" r="29"  cx="30" cy="30" styles={progressCircleStyles} fill="transparent">
              </circle>
            </svg>: <div />
            }
        </div>

        <div styles={normalStyles}>
        <div styles={overlayStyles} />
        <Icon icon={props.icon} styles={props.mini ? styles.miniIconStyle : styles.defaultIconStyle}/>
      </div>
    </div>;
  },


  onMouseUp() {
    var props = this.props;
    this.onMouseLeave();
    if(props.onClick) {
      props.onClick();
    }
  },

  onMouseLeave() {
    var props = this.props;
    if (props.disabled || props.percentage) {
      return;
    }
    this.setState({active: false});
  },

  onMouseDown() {
    var props = this.props;
    if (props.disabled || props.percentage) {
      return;
    }
    this.setState({active: true});
  }

});

var FloatingActionButtonStyles = StyleSheet.create({

  containerStyle: {
    cursor: 'pointer',
    position: 'relative',
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    borderRadius: '50%',
    display: 'inline-block',
    fill: 'white',
    height: 56,
    outline: 'none',
    userSelect: 'none',
    width: 56
  },

  normalStyle: {
    borderRadius: '50%',
    outline: 'none',
    width: '100%',
    userSelect: 'none',
    height: '100%',
    position:'absolute',
    webkitTapHighlightColor: 'rgba(0,0,0,0)'
  },

  shadowStyle: {
    borderRadius: '50%'
  },

  miniStyle: {
    height: 40,
    width: 40
  },

  overlayStyle: {
    background: 'rgba(0, 0, 0, 0.08)',
    borderRadius: '50%',
    position:'absolute',
    width: '100%',
    height: '100%',
    opacity: '0',
    transition: 'opacity 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
  },

  overlayPressedStyle: {
    opacity: '1'
  },

  miniIconStyle: {
    position: 'absolute',
    width: 24,
    left: 8
  },

  defaultIconStyle: {
    position: 'absolute',
    width: 24,
    left: 16
  },

  percentageStyle: {
    borderRadius:'50%',
    backgroundColor: 'transparent',
    position:'absolute',
    opacity: '0',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    cursor: 'default'
  },

  percentageStyleVisible: {
    backgroundColor: Colors.amber.P500,
    opacity: '1',
    transition: 'opacity .5s ease-in'
  },

  progressCircleStyle: {
    strokeWidth: 2
  }

});

module.exports = FloatingActionButton;
