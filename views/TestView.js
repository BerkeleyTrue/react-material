/**
 * @jsx React.DOM
 */
'use strict';

require("./style.css");
var React = require('react');
var ReactStyle = require('react-style');
React.initializeTouchEvents(true);

// components
var Button = require('../components/Button');
var Checkbox = require('../components/CheckBox');
var FloatingActionButton = require('../components/FloatingActionButton');
var RadioButton = require('../components/RadioButton');
var Tab = require('../components/Tab');
var Tabs = require('../components/Tabs');

ReactStyle.theme = [require('../themes/BlueTheme')];

var TestView = React.createClass({

  render: function() {
    return <div>
      <h1>React Material Components</h1>
      <p>
        A set of example components for React Style that aim to be very easy to use.
      </p>
      <div>
        <h2>Flat buttons</h2>
        <Button>
          button
        </Button>
        <Button styles={{color:'#5677fc'}}>
          colored
        </Button>
        <Button disabled={true}>
          disabled
        </Button>
      </div>
      <div>
        <h2>Raised buttons</h2>
        <Button raised={true} onClick={this.onButtonClick}>
          button
        </Button>
        <Button raised={true} styles={{backgroundColor:'#5677fc', color: 'white'}}>
          colored
        </Button>
        <Button raised={true} disabled={true}>
          disabled
        </Button>
      </div>
      <div>
      <h2>Floating Action Button</h2>
        <FloatingActionButton  styles={[{backgroundColor:'#d23f31'}]}/>
        <FloatingActionButton mini={true} styles={[{backgroundColor:'#5677fc'}]}/>
      <h2>Radio Buttons</h2>
        <RadioButton name="radiobutton" onButtonStyle={[{backgroundColor:'#d23f31'}]}/>
        <RadioButton name="radiobutton"/>
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
  },

  onButtonClick: function() {
    console.log('clickity click!');
  }

});

React.renderComponent(<TestView />, document.getElementById('container'));
