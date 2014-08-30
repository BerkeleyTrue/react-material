/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ProgressBar = require('../components/ProgressBar');


var ProgressAndActivityView = React.createClass({

  render: function(){
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
      TODO
    </div>;
  }

});

module.exports = ProgressAndActivityView;