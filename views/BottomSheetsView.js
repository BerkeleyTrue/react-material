/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = require('../components/Button');
var BottomSheet = require('../components/BottomSheet');
var Overlay = require('../components/Overlay');

var BottomSheetsView = React.createClass({

  getInitialState:function(){
    return {
      show: false
    }
  },

  render: function() {
    return <div>
      <h1>Bottom sheets</h1>
      <Button onClick={this.onShowBottomSheetBtnClick} raised={true}>Toggle</Button>
      <Overlay show={this.state.show} onClick={this.onShowBottomSheetBtnClick}/>
      <BottomSheet show={this.state.show}>
        Insert components here
      </BottomSheet>
      <h2>TODO</h2>
      Pull up sheet to cover entire screen and add a dismiss button.
    </div>
  },

  onShowBottomSheetBtnClick: function() {
    this.setState({show:!this.state.show});
  }

});

module.exports = BottomSheetsView;