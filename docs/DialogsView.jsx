import React from 'react';
import StyleSheet from 'react-style';

import { Colors } from '../lib/style';

import { Button, Dialog, Overlay } from '../lib';

const styles = StyleSheet.create({
  buttonBarStyle: {
    position: 'absolute',
    bottom: -12,
    right: -8,
    display: 'inline-block'
  },

  textStyle: {
    paddingBottom: 40
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }

  static displayName = 'DialogsView'

  onOpenDialogClick() {
    this.setState({ show: true });
  }

  onOverlayClick() {
    this.setState({ show: false });
  }

  render() {
    const {
      show
    } = this.state;

    return (
      <div>
        <Button
          onClick={ ::this.onOpenDialogClick }
          ref='button'>
          Open dialog
        </Button>
        <Overlay
          onClick={ ::this.onOverlayClick }
          show={ show } />
        <Dialog
          show={ show }
          title='Permissions'
          triggerElement={ this.refs.button }
          width={ 300 }>
          <div styles={ [styles.textStyle] }>
            This app determines your phone's location and shares it with
            Hypnotoad in order to serve personalized ads for you. This
            allows for a better overall app experience.
          </div>
          <div styles={ [styles.buttonBarStyle] }>
            <Button onClick={ ::this.onOverlayClick }>
              Decline
            </Button>
            <Button
              onClick={ ::this.onOverlayClick}
              styles={ [{ color: Colors.blue.P500 }] }>
              Accept
            </Button>
          </div>
        </Dialog>
      </div>
    );
  }
}
