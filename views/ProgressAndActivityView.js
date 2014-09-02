/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var ProgressBar = require('../components/ProgressBar');
var FloatingActionButton = require('../components/FloatingActionButton');

var ProgressAndActivityView = React.createClass({

  getInitialState: function() {
    return {
      uploadPercentage: 0
    }
  },

  render: function(){
    var state = this.state;
    var uploadPercentage = state.uploadPercentage;
    return <div>
      <h2>Determinate</h2>
      <ProgressBar percentage={20} />
      <h2>Indeterminate</h2>
      Animation is not correct.
      <ProgressBar type="indeterminate" />
      <h2>Buffer</h2>
      <ProgressBar percentage={30} bufferPercentage={60} />
      <h2>Query indeterminate and determinate</h2>
      TODO
      <h2>Circular</h2>
      <FloatingActionButton
          icon={uploadPercentage === '100%' ? 'done' : 'cloud-upload'}
          styles={[{backgroundColor:uploadPercentage === '100%' ? Colors.orange.P500 : Colors.indigo.P500}]}
          progressCircleStyle={{stroke:Colors.orange.P500}}
          percentage={state.uploadPercentage}
          onClick={this.uploadSomething}/>
      TODO
    </div>;
  },

  uploadSomething: function() {
    this.setState({uploadPercentage: '20%'});
    var self = this;
    setTimeout(function(){
      self.setState({uploadPercentage: '90%'});

    }, 1000);

    setTimeout(function(){
      self.setState({uploadPercentage: '100%'});
    }, 2000);
  }

});

module.exports = ProgressAndActivityView;