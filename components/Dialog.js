/**
 * @jsx React.DOM
 */
'use strict';

var Colors = require('../style/Colors');

var React = require('react');
var ReactStyle = require('react-style');

var Shadow = require('./Shadow');
var Typography = require('../style/Typography');

var merge = require('../vendor/merge');

var Dialog = React.createClass({

  normalStyle: ReactStyle(function() {
    return merge(Typography.body2, {
      backgroundColor: Colors.grey.P50,
      padding: 24,
      position: 'fixed',
      lineHeight: '24px'
    });
  }),

  titleStyle: ReactStyle(function(){
    return merge(Typography.title, {
      paddingBottom: 10
    });
  }),

  childrenStyle: ReactStyle(function() {
    return {
      position: 'relative' // to re-enable text selection
    };
  }),

  render: function() {
    var props = this.props;
    return <div styles={[this.normalStyle(), {width: 300}]}>
      <Shadow size={3} />
      {props.title &&
        <div styles={this.titleStyle()}>
          {props.title}
        </div>}
      <div styles={this.childrenStyle()}>
        {props.children}
      </div>
    </div>;
  }

});

module.exports = Dialog;