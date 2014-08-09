/**
 * @jsx React.DOM
 */
'use strict';

require("./style.css");
var React = require('react');
var ReactStyle = require('react-style');

// components
var Button = require('../components/Button');
var Checkbox = require('../components/CheckBox');
var FloatingActionButton = require('../components/FloatingActionButton');
var RadioButton = require('../components/RadioButton');
var Tab = require('../components/Tab');
var Tabs = require('../components/Tabs');

var TestView = React.createClass({

  theme: [],


  flatButtonColoredStyle: ReactStyle(function(){
    return {
      color: '#4285f4'
    };
  }),

  raisedButtonColoredStyle: ReactStyle(function() {
    return {
      backgroundColor: '#4285f4', // https://github.com/SanderSpies/react-style/issues/19
      color: 'white'
    };
  }),

  floatingActionButtonColoredStyle: ReactStyle(function(){
    return {
      backgroundColor: '#5677fc'
    };
  }),

  onRadioButtonStyle: ReactStyle(function(){
    return {
      backgroundColor: 'orange'
    }
  }),

  render: function() {
    return <div>
      <h1>React Material Components</h1>
      <p>
        A set of example components for React Style
      </p>
      <div>
        <h2>Flat buttons</h2>
        <Button>
          button
        </Button>
        <Button styles={[this.flatButtonColoredStyle()]}>
          colored
        </Button>
        <Button disabled={true}>
          disabled
        </Button>
      </div>
      <div>
        <h2>Raised buttons</h2>
        <Button raised={true}>
          button
        </Button>
        <Button raised={true} styles={[this.raisedButtonColoredStyle()]}>
          colored
        </Button>
        <Button raised={true} disabled={true}>
          disabled
        </Button>
      </div>
      <div>
      <h2>Floating Action Button</h2>
        <FloatingActionButton styles={[this.floatingActionButtonColoredStyle()]} />
        <FloatingActionButton mini={true} styles={[this.floatingActionButtonColoredStyle()]} />
      <h2>Radio Buttons</h2>
        <RadioButton name="radiobutton" onButtonStyle={this.onRadioButtonStyle()}/>
        <RadioButton name="radiobutton" onButtonStyle={this.onRadioButtonStyle()}/>
      <h2>Checkbox</h2>
        <Checkbox />
        <Checkbox />
      <h2>Tabs</h2>
      <Tabs>
        <Tab label="something">
          tab 1
        </Tab>
        <Tab label="else">

        </Tab>
      </Tabs>
      </div>
    </div>;
  }

});

React.renderComponent(<TestView />, document.getElementById('container'));
