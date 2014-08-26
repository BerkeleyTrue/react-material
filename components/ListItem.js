/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var CheckBox = require('./CheckBox');
var Icon = require('./Icon');
var RippleContainer = require('./RippleContainer');

var merge = require('../vendor/merge');

var Typography = require('../style/Typography');

var ListItem = React.createClass({


  normalListItemStyle: ReactStyle(function(){
    return merge(Typography.subhead,
      {
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxSizing: 'border-box',
      cursor: 'pointer',
      height: '48px',
      overflow: 'hidden',
      padding: '16px',
      position: 'relative'
    });
  }),

  singleLineWithIconStyle: ReactStyle(function(){
    return {
      height: '56px'
    };
  }),

  singleLineWithIconTitleStyle: ReactStyle(function(){
    return {
      lineHeight: '30px'
    };
  }),

  twoLinesStyle: ReactStyle(function(){
    return {
      height: '72px'
    };
  }),

  threeLinesStyle: ReactStyle(function(){
    return {
      height: '88px'
    };
  }),


  iconStyle: ReactStyle(function(){
    return {
      display: 'inline-block',
      padding: '0 16px 0 0',
      float: 'left',
      width: '30px',
      verticalAlign: 'bottom',
      position: 'relative',
      pointerEvents: 'none'
    };
  }),


  secondaryTextStyle: ReactStyle(function(){
    return merge(Typography.body1, {
      color: 'rgba(0,0,0,.54)',
      position: 'relative',
      pointerEvents: 'none',
      top: '2px'
    });
  }),

  typeStyle: ReactStyle(function(){
    return {
      margin: '10px 30px 0 0',
      float: 'left'
    };
  }),

  propTypes: {
    title: React.PropTypes.string.isRequired,
    nrOfLines: function(props, propName) {
      var value = props[propName]
      if (!(propName in props)) {
        return;
      }
      if (isNaN(value)) {
        return new Error('nrOfLines should be a number');
      }
      else if (value < 1 || value > 3) {
        return new Error('nrOfLines should be between 1 and 3');
      }
    }
  },

  render: function() {
    var props = this.props;
    var listItemStyles = [this.normalListItemStyle()];
    var textTitleStyles = [];
    if (props.icon) {
      listItemStyles.push(this.singleLineWithIconStyle());
    }
    if (props.tertiaryText || props.nrOfLines === 3) {
      listItemStyles.push(this.threeLinesStyle());
    }
    else if (props.secondaryText || props.nrOfLines === 2) {
      listItemStyles.push(this.twoLinesStyle());
    }
    else if (props.icon) {
      textTitleStyles.push(this.singleLineWithIconTitleStyle());
    }


    return <div styles={listItemStyles} onClick={props.onClick}>
      <RippleContainer />
      {props.type === 'checkbox' &&
        <CheckBox containerStyles={this.typeStyle()} checked={true}/>
        }
      {props.icon &&
        <div styles={this.iconStyle()}><Icon icon={props.icon}/></div> }
      <div>
        {props.title && <div styles={textTitleStyles}>{props.title}</div>}
        {props.secondaryText && <div styles={this.secondaryTextStyle()}>{props.secondaryText}</div>}
        {props.tertiaryText && <div styles={this.tertiaryTextStyle()}>{props.tertiaryText}</div>}
      </div>
    </div>;
  }

});

module.exports = ListItem;
