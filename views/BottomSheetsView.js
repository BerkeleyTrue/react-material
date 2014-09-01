/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = require('../components/Button');
var BottomSheet = require('../components/BottomSheet');
var List = require('../components/List');
var ListItem = require('../components/ListItem');
var Overlay = require('../components/Overlay');

var preventOverlayClick = false; // Mobile Safari

var BottomSheetsView = React.createClass({

  getInitialState:function(){
    return {
      show: false,
      grid: false
    }
  },

  render: function() {
    var state = this.state;
    return <div>
      <Button onClick={this.onShowBottomSheetBtnClick} raised={true}>List</Button>
      <Overlay show={state.show} onClick={this.onOverlayClick}/>
      <BottomSheet show={state.show} title="Title">
      {
        state.grid ?
          <div>TODO</div> :
          <List>
            <ListItem icon="share" title="Share" />
            <ListItem icon="cloud-upload" title="Upload" />
            <ListItem icon="content-copy" title="Copy" />
            <ListItem icon="print" title="Print this page" />
          </List>
        }
      </BottomSheet>
      <h2>TODO</h2>
      Pull up sheet to cover entire screen and add a dismiss button.
    </div>
  },

  onShowBottomSheetBtnClick: function() {
    this.setState({show: true});
  },

  onOverlayClick: function() {
    this.setState({show: false});
  }

});

module.exports = BottomSheetsView;