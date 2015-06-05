import React from 'react';
// import StyleSheet from 'react-style';

import { Colors } from '../style/';

import {
  Button,
  BottomSheet,
  BottomSheetItem,
  Icon,
  // ListItem,
  Overlay
} from '../components/';

// Mobile Safari
// const preventOverlayClick = false;

export default class BottomSheetsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: false,
      show: false
    };
  }

  static displayName = 'BottomSheetsView'

  onShowBottomSheetBtnClick() {
    this.setState({
      grid: false,
      show: true
    });
  }

  onShowBottomSheetGridBtnClick() {
    this.setState({
      grid: true,
      show: true
    });
  }

  onOverlayClick() {
    this.setState({ show: false });
  }

  renderGrid(grid) {
    if (!grid) {
      return <div>TODO</div>;
    }

    return (
      <div>
        <BottomSheetItem>
          <Icon icon='share' />
          Share
        </BottomSheetItem>
        <BottomSheetItem>
          <Icon icon='cloud-upload' />
          Upload
        </BottomSheetItem>
        <BottomSheetItem>
          <Icon icon='content-copy' />
          Copy
        </BottomSheetItem>
        <BottomSheetItem>
          <Icon icon='print' />
          Print this page
        </BottomSheetItem>
      </div>
    );
  }

  render() {
    const {
      grid,
      show
    } = this.state;

    return (
      <div>
        <Button
          onClick={ ::this.onShowBottomSheetBtnClick }
          raised={ true }
          styles={{ marginTop: 40 }}>
          List
        </Button>
        <Button
          onClick={ ::this.onShowBottomSheetGridBtnClick }
          raised={ true }
          styles={{ marginLeft: 20, marginTop: 40 }}>
          Grid
        </Button>
        <Overlay
          onClick={ ::this.onOverlayClick }
          show={ show } />
        <BottomSheet
          show={ show }
          styles={ [{ color: Colors.grey.P800, fill: Colors.grey.P800 }] }
          title='Title'>
          { this.renderGrid(grid) }
        </BottomSheet>
      </div>
    );
  }
}
