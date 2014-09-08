/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var merge = require('../vendor/merge');

var BottomSheet = React.createClass({

  normalBottomSheetStyle: ReactStyle(function normalBottomSheetStyle(){
    return {
      backgroundColor: 'white',
      borderTop: '1px solid ' + Colors.grey.P300,
      bottom: 0,
      left: 0,
      paddingBottom: 8,
      position: 'fixed',
      right: 0,
      transition: 'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear 0s',
      visibility: 'visible',
      zIndex: 3
    }
  }),

  hiddenTransformStyle: ReactStyle(function hiddenTransformStyle(){
    var height = 0;
    if (this.isMounted()) {
      var domNode = this.getDOMNode();
      if (domNode) {
        height = domNode.offsetHeight + 8;
      }
    }

    return {
      visibility: 'hidden',
      transform: 'translateY(' + height +'px)',
      transition: 'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear .21s'
    };
  }),

  showBottomSheetStyle: ReactStyle(function showBottomSheetStyle(){
    return {
      transform: 'translateY(0)'
    }
  }),

  titleStyle: ReactStyle(function titleStyle(){
    return {
      color: Colors.grey.P500,
      cursor: 'default',
      padding:  16
    };
  }),

  render: function(){
    var props = this.props;
    var bottomSheetStyles = [this.normalBottomSheetStyle()];
    if (props.show) {
      bottomSheetStyles.push(this.showBottomSheetStyle());
    }
    else {
      bottomSheetStyles.push(this.hiddenTransformStyle());
    }
    if (props.styles) {
      bottomSheetStyles = bottomSheetStyles.concat(props.styles);
    }
    return <div styles={bottomSheetStyles}>
    {props.title &&
      <div styles={this.titleStyle()}>
        {props.title}
      </div>
      }

      {props.children}
    </div>;
  },

  componentDidMount: function(){
    this.forceUpdate(); // to enforce calculation of height
  }

});

module.exports = BottomSheet;