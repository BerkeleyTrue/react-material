import React from 'react';
// import StyleSheet from 'react-style';

import { Colors } from '../lib/style';

import { Button, FloatingActionButton, IconButton } from '../lib';

export default class extends React.Component {
  static displayName = 'ButtonsView'

  onClick() {
    console.log('click');
  }

  render() {
    return (
      <div>
        <h2>Main buttons</h2>
        <h3>Floating action buttons</h3>
        <div>
          <FloatingActionButton
            icon='undo'
            ref='fab1'
            styles={ [{ backgroundColor: Colors.red.P600 }] } />
          {' '}
          <FloatingActionButton
            icon='arrow-forward'
            mini={ true }
            ref='fab2'
            styles={ [{ backgroundColor: Colors.blue.P500 }] }/>
        </div>
        <h3>Raised button</h3>
        <div>
          <Button raised={ true }>
            Button 1
          </Button>
          {' '}
          <Button
            raised={ true }
            styles={ [{ marginLeft: 10 }] }>
            Button 2
          </Button>
        </div>
        <h3>Flat buttons</h3>
        <div>
          <Button>
            Button 1
          </Button>
          {' '}
          <Button>
            Button 2
          </Button>
        </div>
        <h3>Icon buttons</h3>
        <div>
          <IconButton
            icon='error'
            onClick={ this.onClick } />
          <IconButton
            icon='event'
            onClick={ this.onClick } />
          <IconButton
            icon='markunread'
            onClick={ this.onClick } />
        </div>
      </div>
    );
  }
}
