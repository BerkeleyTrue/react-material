/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Icon = require('./Icon');
var RippleContainer = require('./RippleContainer');

var Colors = require('../style/Colors');

var isTouchDevice = 'ontouchstart' in window;

var FloatingActionButton = React.createClass({

  containerStyle: ReactStyle(function normalStyle(){
    return {
      borderRadius: '50%',
      boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.26)',
      cursor: 'pointer',
      display: 'inline-block',
      fill: 'white',
      height: '56px',
      outline: 'none',
      position: 'relative',
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      transition: 'box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
      userSelect: 'none',
      width: '56px'
    };
  }),

  normalStyle: ReactStyle(function normalStyle(){
    return {
      borderRadius: '50%',
      outline: 'none',
      width: '100%',
      userSelect: 'none',
      height: '100%',
      position:'absolute',
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      transition: 'background-color 0.28s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }),

  pressedStyle: ReactStyle(function pressedStyle(){
    return {
      boxShadow: '0 8px 17px 0 rgba(0, 0, 0, 0.2)'
    };
  }),

  miniStyle: ReactStyle(function miniStyle(){
    return {
      height: '40px',
      width: '40px'
    };
  }),

  overlayStyle: ReactStyle(function overlayStyle() {
    return {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
      position:'absolute',
      width: '100%',
      height: '100%'
    };
  }),

  miniIconStyle: ReactStyle(function miniIconStyle(){
    return {
      position: 'absolute',
      width: '24px',
      left: '8px'
    };
  }),

  defaultIconStyle: ReactStyle(function defaultIconStyle(){
    return {
      position: 'absolute',
      width: '24px',
      left: '16px'
    };
  }),

  percentageStyle: ReactStyle(function percentageStyle(){
    return {
      borderRadius:'50%',
      backgroundColor: 'transparent',
      position:'absolute',
      opacity: 0,
      top: '-2px',
      left: '-2px',
      right: '-2px',
      bottom: '-2px',
      cursor: 'default'
    };
  }),

  percentageStyleVisible: ReactStyle(function percentageStyle(){
    return {
      backgroundColor: Colors.amber.P500,
      opacity: 1,
      transition: 'opacity .5s ease-in'
    };
  }),

  progressCircleStyle: ReactStyle(function progressCircleStyle(){
    return {
      strokeWidth: '2px'
    };
  }),

  propTypes: {
    icon: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    var containerStyles = [this.containerStyle()];
    var styles = [this.normalStyle()];
    if (props.styles) {
      styles = styles.concat(props.styles);
    }
    if (props.mini) {
      containerStyles.push(this.miniStyle());
    }
    if (state.active && !props.percentage) {
      containerStyles.push(this.pressedStyle());
    }
    var percentageStyling = [this.percentageStyle()];
    if (props.percentage) {
      var percentage = props.percentage;
      percentageStyling.push(this.percentageStyleVisible());
      var r = '29';
      var c = Math.PI*(r*2);

      if (percentage < 0) { percentage = 0;}
      if (percentage > 100) { percentage = 100;}

      var pct = ((100-percentage)/100)*c;

      // react doesn't support this yet :(
      //percentageStyling.push({ strokeDashoffset: pct});

    }

    var progressCircleStyles = [this.progressCircleStyle(), props.progressCircleStyle];

    return <div   role="button"
                  tabIndex={0}
                  onTouchStart={isTouchDevice && this.onMouseDown}
                  onTouchEnd={isTouchDevice && this.onMouseUp}
                  onTouchCancel={isTouchDevice && this.onMouseUp}
                  onMouseDown={!isTouchDevice && this.onMouseDown}
                  onMouseUp={!isTouchDevice && this.onMouseUp}
                  onMouseLeave={!isTouchDevice && this.onMouseLeave}
                  styles={containerStyles}>

        <div styles={percentageStyling}>
          {props.percentage ?
            <svg width={60} height={60}>
              <circle id="bar" r="29"  cx="30" cy="30" styles={progressCircleStyles} fill="transparent">
              </circle>
            </svg>: <div />
            }
        </div>

        <div
              styles={styles}

              >

        {state.active &&
          <div styles={this.overlayStyle()} />
          }
        <Icon icon={props.icon} styles={props.mini ? this.miniIconStyle() : this.defaultIconStyle()}/>
      </div>
    </div>;
  },


  onMouseUp: function() {
    var props = this.props;
    this.onMouseLeave();
    if(props.onClick) {
      props.onClick();
    }
  },

  onMouseLeave: function() {
    var props = this.props;
    if (props.disabled || props.percentage) {
      return;
    }
    this.setState({active: false});
  },

  onMouseDown: function() {
    var props = this.props;
    if (props.disabled || props.percentage) {
      return;
    }
    this.setState({active: true});
  }

});

module.exports = FloatingActionButton;
