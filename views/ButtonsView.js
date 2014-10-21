/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = require('../components/Button');
var Colors = require('../style/Colors');
var FloatingActionButton = require('../components/FloatingActionButton');
var IconButton = require('../components/IconButton');

var ButtonsView = React.createClass({

  render() {
    return <div styles={ReactStyle({paddingTop: 60})}>
      <h2>Main buttons</h2>
      <h3>Floating action buttons</h3>
      <div>
        <FloatingActionButton ref="fab1" icon="undo" styles={[ReactStyle({backgroundColor:Colors.red.P600})]}/> {' '}
        <FloatingActionButton ref="fab2" icon="arrow-forward" mini={true} styles={[ReactStyle({backgroundColor:Colors.blue.P500})]}/>
      </div>
      <h3>Raised button</h3>
      <div>
        <Button raised={true}>
          Button 1
        </Button>{' '}
        <Button raised={true} styles={ReactStyle({marginLeft:10})}>
          Button 2
        </Button>
      </div>
      <h3>Flat buttons</h3>
      <div>
        <Button>
          Button 1
        </Button> {' '}
        <Button>
          Button 2
        </Button>
      </div>
      <h3>Icon buttons</h3>
      <div>
        <IconButton icon="error" onClick={this.onClick} />
        <IconButton icon="event" onClick={this.onClick} />
        <IconButton icon="markunread" onClick={this.onClick} />
      </div>
    </div>;
  },

  onClick() {
    console.log('click');
  }

});

module.exports = ButtonsView;
