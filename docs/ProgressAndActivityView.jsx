import React from 'react';
// import StyleSheet from 'react-style';

import { Colors } from '../lib/style';

import { ProgressBar, FloatingActionButton } from '../lib';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadpercentage: 0
    };
  }

  static displayName = 'ProgressAndActivityView'

  uploadSomething() {
    this.setState({ uploadPercentage: '20%' });
    setTimeout(() => {
      this.setState({ uploadPercentage: '90%' });
    }, 1000);

    setTimeout(() => {
      this.setState({ uploadPercentage: '100%' });
    }, 2000);
  }

  render() {
    const {
      uploadPercentage
    } = this.state;

    const actionButtonStyles = [{
      backgroundColor: uploadPercentage === '100%' ?
        Colors.orange.P500 :
        Colors.indigo.P500
    }];

    return (
      <div>
        <h2>Determinate</h2>
        <ProgressBar percentage={ 20 } />
        <h2>Indeterminate</h2>
        Animation is not correct.
        <ProgressBar type='indeterminate' />
        <h2>Buffer</h2>
        <ProgressBar
          bufferPercentage={ 60 }
          percentage={ 30 } />
        <h2>Query indeterminate and determinate</h2>
        TODO
        <h2>Circular</h2>
        <FloatingActionButton
          icon={ uploadPercentage === '100%' ? 'done' : 'cloud-upload' }
          onClick={ ::this.uploadSomething }
          percentage={ uploadPercentage }
          progressCircleStyle={{ stroke: Colors.orange.P500 }}
          styles={ actionButtonStyles } />
        TODO
      </div>
    );
  }
}
