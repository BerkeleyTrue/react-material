/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var TextFieldStyles = {

	normalTextFieldStyle: ReactStyle({
		background: 'transparent',
		border: 'none',
		borderBottom: 'solid 1px ' + Colors.grey.P300,
		fontFamily: "RobotoDraft, 'Helvetica Neue', Helvetica, Arial;",
		fontSize: 16,
		height: 24,
		outline: 'none',
		left: 0,
		paddingTop: 6,
		position: 'absolute',
		top: 0,
		transition: 'border-bottom .28s linear',
		width: '100%',
		':focus': {
			borderBottom: 'solid 2px ' + Colors.blue.P500
		}
	}),

	fullWidthTextFieldStyle: ReactStyle({
		width: '100%'
	}),

	errorTextFieldStyle: ReactStyle({
		borderBottom: 'solid 2px ' + Colors.red.P400,
		':focus': {
			borderBottom: 'solid 2px ' + Colors.red.P400
		}
	}),

	placeHolderStyling: ReactStyle({
		color: Colors.grey.P500,
		fontSize: 16,
		left: 1,
		position: 'absolute',
		top: 8,
		opacity: '1',
		transition: 'top .18s linear, font-size .18s linear, opacity .10s linear'
	}),

	floatingLabelPlaceHolderStyling: ReactStyle({
		top: 27
	}),

	containerStyling: ReactStyle({
		height: 48,
		position: 'relative',
		width: 300
	}),

	placeHolderTopStyling: ReactStyle({
		fontSize: 12,
		top: 4
	}),

	scrollBlocksStyle: ReactStyle({
		backgroundColor: Colors.grey.P500,
		bottom: 6,
		height: 3,
		opacity: '0',
		position: 'absolute',
		transition: 'opacity .28s linear',
		width: 3,
		':before': {
			backgroundColor: Colors.grey.P500,
			bottom: 0,
			content: "''",
			position: 'absolute',
			height: 3,
			width: 3,
			right: 6
		},
		':after': {
			backgroundColor: Colors.grey.P500,
			bottom: 0,
			content: "''",
			position: 'absolute',
			height: 3,
			width: 3,
			right: -6
		}
	}),

	focusStyle: ReactStyle({
		backgroundColor: Colors.blue.P500,
		':before': {
			backgroundColor: Colors.blue.P500
		},
		':after': {
			backgroundColor: Colors.blue.P500
		}
	})
};

var TextField = React.createClass({

	getInitialState() {
		return {
			focus: false
		};
	},

	render() {
		var props = this.props;
		var styles = TextFieldStyles;
		var propStyles = props.styles || {};
		var textfield = this.refs.textfield;
		var scrollLeft = 0;
		var scrollWidth = -1;
		var width = -1;
		var placeHolderStyling = [styles.placeHolderStyling];
		if (props.floatingLabel) {
			placeHolderStyling.push(styles.floatingLabelPlaceHolderStyling);
		}

		if (textfield) {
			var textfieldDOMNode = textfield.getDOMNode();
			scrollWidth = textfieldDOMNode.scrollWidth;
			scrollLeft = textfieldDOMNode.scrollLeft;
			width = textfieldDOMNode.offsetWidth;
			if (textfieldDOMNode.value.trim().length) {
				if (props.floatingLabel) {
					placeHolderStyling.push(styles.placeHolderTopStyling);
				}
				else {
					placeHolderStyling.push(ReactStyle({opacity: '0'}));
				}
			}
		}
		var textFieldStyling = [styles.normalTextFieldStyle];
		if (props.error) {
			textFieldStyling.push(styles.errorTextFieldStyle);
		}
		if (props.floatingLabel) {
			textFieldStyling.push(ReactStyle({paddingTop: 25}));
		}
		return <div styles={[styles.containerStyling,
												props.floatingLabel ? ReactStyle({height: '66px'}) : null,
												propStyles.containerStyling]}>
		<div styles={placeHolderStyling}>{props.placeHolder}</div>
			<input onChange={this.onChange}
						 onKeyUp={this.onChange}
					   onClick={this.onChange}
	           onWheel={this.onChange}
	           onFocus={this.onFocus}
					   onBlur={this.onBlur}
						 type="text"
						 ref="textfield"
	          styles={textFieldStyling} />
			<div styles={[scrollLeft ? ReactStyle({opacity: '1'}) : null,
									 this.state.focus ? styles.focusStyle : null,
									styles.scrollBlocksStyle,
									ReactStyle({left: '6px'})]} />
			<div styles={[(scrollWidth > (scrollLeft + width)) ?
										 ReactStyle({opacity: '1'}) : null,
									  this.state.focus ? styles.focusStyle : null,
									  styles.scrollBlocksStyle,
										ReactStyle({right: '6px'})]} />
		</div>;
	},

	onChange() {
		// TODO: optimize
		this.forceUpdate();
	},

	onBlur(e) {
		this.setState({focus: false});
		// todo
		var self = this;
		setTimeout(function(){
			self.onChange();
		}, 0);
	},

	onFocus() {
		this.setState({focus: true});
	},

	value() {
		return this.refs.textfield.getDOMNode().value;
	}

});

module.exports = TextField;