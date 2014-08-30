/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var BottomSheet = React.createClass({

  normalBottomSheetStyle: ReactStyle(function(){
    return {
      backgroundColor: 'white',
      bottom: 0,
      left: 0,
      position: 'fixed',
      right: 0,
      transition: 'transform .2s cubic-bezier(.4,0,.2,1)',
      zIndex: 3,
      borderTop: '1px solid #e0e0e0'
    }
  }),

  hiddenTransformStyle: ReactStyle(function(){
    var height = 0;
    if (this.isMounted()) {
      var domNode = this.getDOMNode();
      if (domNode) {
        height = domNode.offsetHeight + 8;
      }
    }

    return {
      transform: 'translateY(' + height +'px)'
    };
  }),

  showBottomSheetStyle: ReactStyle(function(){
    return {
      transform: 'translateY(0)'
    }
  }),

  render: function(){
    var bottomSheetStyles = [this.normalBottomSheetStyle()];
    if (this.props.show) {
      bottomSheetStyles.push(this.showBottomSheetStyle());
    }
    else {
      var x = this.hiddenTransformStyle();
      bottomSheetStyles.push(x);
    }
    return <div styles={bottomSheetStyles}>
      {this.props.children}
    </div>;
  },

  componentDidMount: function(){
    this.forceUpdate(); // to enforce calculation of height
  }

});

module.exports = BottomSheet;