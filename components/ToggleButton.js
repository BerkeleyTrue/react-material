/**
 * @jsx React.DOM
 */
'use strict';

var Colors = require('../style/Colors');

var React = require('react');
var ReactStyle = require('react-style');

var RadioButton = require('./RadioButton');

var ToggleButton = React.createClass({

	styles: {

		normalStyle: ReactStyle({
			webkitTapHighlightColor: 'rgba(0,0,0,0)',
			cursor: 'pointer',
			display: 'block',
			position: 'relative'
		}),

		lineStyle: ReactStyle({
			backgroundColor: Colors.grey.P700,
			height: '1px',
			webkitTapHighlightColor: 'rgba(0,0,0,0)',
			left: 0,
			position: 'absolute',
			top: '10px',
			width: '38px'
		}),

		circleStyle: ReactStyle({
			border: 'solid 2px',
			borderColor: Colors.grey.P700,
			borderRadius: '50%',
			height: '16px',
			backgroundColor: Colors.grey.P100,
			left: 0,
			position: 'absolute',
			top: 0,
			width: '16px',
			transition: 'left .28s cubic-bezier(0.4, 0, 0.2, 1)',
			willChange: 'left'
		}),

		childStyle: ReactStyle({
			paddingLeft: '16px'
		}),

		childBigStyle: ReactStyle({
			paddingLeft: '32px'
		}),

		checkedStyle: ReactStyle({
			left: '20px'
		}),

		circlePositionStyle: ReactStyle({
			display: 'inline-block',
			position: 'absolute',
			right: 0,
			top: 0,
			width: '40px'
		}),

		onButtonStyle: ReactStyle({
			backgroundColor: Colors.grey.P700,
			borderRadius: '50%',
			height: '20px',
			left: '-2px',
			position: 'absolute',
			top: '-2px',
			transform: 'scale(0)',
			transition: 'transform ease 0.28s',
			width: '20px',
			willChange: 'transform'
		}),

		onButtonFillStyle: ReactStyle({
			transform: 'scale(1)'
		})

	},

  getInitialState(){
    return {
      checked: false
    };
  },

  render() {
    var props = this.props;
	  var styles = this.styles;
    var circleStyle = [styles.circleStyle];
    var checked = this.state.checked;

    if (checked) {
      circleStyle.push(styles.checkedStyle);
    }

    var onButtonStyle = [styles.onButtonStyle];
    if (props.onButtonStyle) {
      onButtonStyle = onButtonStyle.concat(props.onButtonStyle);
    }
    if (checked){
      onButtonStyle.push(styles.onButtonFillStyle);
    }

    return <div styles={this.normalStyle} onClick={this.onClick}>
      {props.children}
      <div styles={styles.circlePositionStyle}>
        <div styles={styles.lineStyle} />
        <div styles={circleStyle}>
          <div styles={onButtonStyle} />
        </div>
      </div>
    </div>;
  },

  onClick() {
    var props = this.props;
    var checked = !this.state.checked;
    this.isChecked = checked;
    this.setState({checked: checked});
    if (props.onChange) {
      props.onChange({checked: this.isChecked});
    }
  }

});

module.exports = ToggleButton;
