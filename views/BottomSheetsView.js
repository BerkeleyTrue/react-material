/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Colors} from '../style/';

import {Button, BottomSheet, BottomSheetItem, ListItem, Overlay} from '../components/';

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
      <Button onClick={this.onShowBottomSheetBtnClick} raised={true} styles={{marginTop:40}}>List</Button>
      <Overlay show={state.show} onClick={this.onOverlayClick}/>
      <BottomSheet show={state.show} title="Title" styles={[{color: Colors.grey.P800, fill: Colors.grey.P800}]}>
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