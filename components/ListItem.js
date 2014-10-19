/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Icon = require('./Icon');
var RippleContainer = require('./RippleContainer');

var merge = require('../vendor/merge');

var Typography = require('../style/Typography');

var ListItem = React.createClass({

  styles: {
    normalListItemStyle: ReactStyle({
      webkitTapHighlightColor: 'rgba(0,0,0,0)',
      boxSizing: 'border-box',
      cursor: 'pointer',
      overflow: 'hidden',
      padding: '14px 16px 15px',
      position: 'relative'
    }),

    singleLineWithIconTitleStyle: ReactStyle({
      padding: '11px 16px'
    }),

    iconStyle: ReactStyle({
      display: 'inline-block',
      padding: '0 16px 0 0',
      width: 30,
      verticalAlign: 'middle',
      position: 'relative',
      pointerEvents: 'none'
    })
  },

  render: function() {
    var props = this.props;
    var styles = this.styles;
    var listItemStyles = [styles.normalListItemStyle];
    if (props.icon) {
      listItemStyles.push(styles.singleLineWithIconTitleStyle);
    }

    if(props.styles) {
      listItemStyles = listItemStyles.concat(props.styles);
    }

    return <div styles={listItemStyles}>
      {!props.disableRipple &&
      <RippleContainer onClick={this.onClick}/> }
      {props.icon &&
        <div styles={styles.iconStyle}><Icon icon={props.icon}/></div> }
      {props.children}
    </div>;
  },

  onClick: function(e) {
    var onClick = this.props.onClick;
    if (onClick) {
      onClick(e);
    }
  }

});

module.exports = ListItem;
