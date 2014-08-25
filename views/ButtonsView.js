/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = require('../components/Button');
var FloatingActionButton = require('../components/FloatingActionButton');

var ButtonsView = React.createClass({

  render: function() {
    return <div>
      <h1>Buttons</h1>
      <h2>Main buttons</h2>
      <h3>Floating action buttons</h3>
      <div>
        <FloatingActionButton icon="undo" styles={[{backgroundColor:'#d23f31'}]}/>
        <FloatingActionButton icon="arrow-forward" mini={true} styles={[{backgroundColor:'#5677fc'}]}/>
      </div>
      <h3>Raised button</h3>
      <div>
        <Button raised={true}>
          Button 1
        </Button>
        <Button raised={true}>
          Button 2
        </Button>
      </div>
      <h3>Flat buttons</h3>
      <div>
        <Button>
          Button 1
        </Button>
        <Button>
          Button 2
        </Button>
      </div>
      <h3>Icon buttons</h3>
      <div>
        TODO
      </div>
      <h3>Missing functionalities</h3>
      <ul>
        <li>Buttons with images</li>
        <li>Circular loading indicator</li>
      </ul>
      <h3>More information</h3>
    </div>;
  }

});

module.exports = ButtonsView;
