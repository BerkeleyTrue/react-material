import React from 'react';
import StyleSheet from 'react-style';

import { Colors } from '../lib/style';

import {
  Button,
  Card,
  CardCollection,
  CheckBox,
  ProgressBar
} from '../lib';


const styles = StyleSheet.create({
  normalStyle: {
    margin: '0 auto',
    width: '300px'
  }
});

export default class extends React.Component {
  constructor() {
    super();
  }

  static displayName = 'CardsView'

  render() {
    const RaisedButtonStyles = [{
      backgroundColor: Colors.amber.P500,
      color: Colors.grey.P50}
    ];
    return (
      <div styles={ styles.normalStyle }>
        <CardCollection>
          <Card title='Basic components'>
            <Button>A simple button</Button>
            <Button
              raised={ true }
              styles={ RaisedButtonStyles }>
              Raised button
            </Button>
            <div>
              <CheckBox />
            </div>
          </Card>
          <Card title='Text fields  and dialogs'>
            ...
          </Card>
          <Card title='Progress and sliders'>
            <ProgressBar percentage={ 70 } />
          </Card>
          <Card title='Tabs' />
          <Card />
        </CardCollection>
      </div>
    );
  }
}
