/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = require('../components/Button');
var Dialog = require('../components/Dialog');

var Colors = require('../style/Colors');

var DialogsView = React.createClass({

  buttonBarStyle: ReactStyle(function buttonBarStyle(){
    return {
      position: 'absolute',
      bottom: -12,
      right: -8,
      display: 'inline-block'
    };
  }),

  textStyle: ReactStyle(function textStyle(){
    return {
      paddingBottom: 40
    }
  }),

  render: function() {
    return <div>
      <Button>Open dialog</Button>
      <Dialog title="Permissions" width={200}>
        <div styles={this.textStyle()}>
          This app determines your phone's location and shares it with
          Hypnotoad in order to serve personalized ads for you. This
          allows for a better overall app experience.
        </div>
        <div styles={this.buttonBarStyle()}>
          <Button>Decline</Button>
          <Button styles={{color:Colors.blue.P500}}>Accept</Button>
        </div>
      </Dialog>
    </div>;
  }

});

module.exports = DialogsView;
