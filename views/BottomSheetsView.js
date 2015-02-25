/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Colors} from '../style/';

import {Button, BottomSheet, BottomSheetItem, Icon, ListItem, Overlay} from '../components/';

var preventOverlayClick = false; // Mobile Safari

export default class BottomSheetsView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      grid: false,
      show: false
    };
  }

  render() {
    var state = this.state;
    return <div>
      <Button onClick={() => this.onShowBottomSheetBtnClick()} raised={true} styles={{marginTop:40}}>List</Button>
      <Button onClick={() => this.onShowBottomSheetGridBtnClick()} raised={true} styles={{marginLeft: 20, marginTop:40}}>Grid</Button>
      <Overlay show={state.show} onClick={() => this.onOverlayClick()}/>
      <BottomSheet show={state.show} title="Title" styles={[{color: Colors.grey.P800, fill: Colors.grey.P800}]}>
      {
        state.grid ?
          <div>TODO</div> :
          <div>
            <BottomSheetItem><Icon icon="share"/>Share</BottomSheetItem>
            <BottomSheetItem><Icon icon="cloud-upload"/>Upload</BottomSheetItem>
            <BottomSheetItem><Icon icon="content-copy"/>Copy</BottomSheetItem>
            <BottomSheetItem><Icon icon="print"/>Print this page</BottomSheetItem>
          </div>
        }
      </BottomSheet>
    </div>
  }

  onShowBottomSheetBtnClick() {
    this.setState({grid: false, show: true});
  }

  onShowBottomSheetGridBtnClick() {
    this.setState({grid: true, show: true});
  }

  onOverlayClick() {
    this.setState({show: false});
  }

}