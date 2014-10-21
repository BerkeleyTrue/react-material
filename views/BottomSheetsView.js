/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var Button = require('../components/Button');
var BottomSheet = require('../components/BottomSheet');
var BottomSheetItem = require('../components/BottomSheetItem');

var ListItem = require('../components/ListItem');
var Overlay = require('../components/Overlay');

var preventOverlayClick = false; // Mobile Safari

var BottomSheetsView = React.createClass({

  getInitialState(){
    return {
      show: false,
      grid: false
    }
  },

  render() {
    var state = this.state;
    return <div>
      <Button onClick={this.onShowBottomSheetBtnClick} raised={true} styles={ReactStyle({marginTop:40})}>List</Button>
      <Overlay show={state.show} onClick={this.onOverlayClick}/>
      <BottomSheet show={state.show} title="Title" styles={[ReactStyle({color: Colors.grey.P800, fill: Colors.grey.P800})]}>
      {
        state.grid ?
          <div>TODO</div> :
          <div>
            <BottomSheetItem icon="share">Share</BottomSheetItem>
            <BottomSheetItem icon="cloud-upload">Upload</BottomSheetItem>
            <BottomSheetItem icon="content-copy">Copy</BottomSheetItem>
            <BottomSheetItem icon="print">Print this page</BottomSheetItem>
          </div>
        }
      </BottomSheet>
      <h2>TODO</h2>
      Pull up sheet to cover entire screen and add a dismiss button.
    </div>
  },

  onShowBottomSheetBtnClick() {
    this.setState({show: true});
  },

  onOverlayClick() {
    this.setState({show: false});
  }

});

module.exports = BottomSheetsView;