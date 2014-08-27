/**
 * @jsx React.DOM
 */
'use strict';

require("./style.css");

var React = require('react');
var ReactStyle = require('react-style');

// components
var AppBar = require('../components/AppBar');
var SideNavigation = require('../components/SideNavigation');
var SideNavigationItem = require('../components/SideNavigationItem');
var Overlay = require('../components/Overlay');

var BottomSheetsView = require('./BottomSheetsView');
var ButtonsView = require('./ButtonsView');
var ProgressAndActivityView = require('./ProgressAndActivityView');
var SwitchesView = require('./SwitchesView');
var TabsView = require('./TabsView');
var TextFieldsView = require('./TextFieldsView');
var ListsView = require('./ListView');

var List = require('../components/List');
var ListItem = require('../components/ListItem');

var BlueTheme = require('../themes/BlueTheme');

var TestView = React.createClass({

  themes: [BlueTheme],

  getInitialState: function() {
    return {
      showSideNavigation: false,
      view: 0
    }
  },

  normalStyle: ReactStyle(function(){
    return {
      backgroundColor: '#f9f9f9',
      minHeight: '100%'
    };
  }),

  containerStyle: ReactStyle(function() {
    return {

      margin: 'auto',
      maxWidth: '700px',
      padding: '56px 20px 0'
    };
  }),

  headerStyle: ReactStyle(function() {
    return {
      color: '#3f51b5',
      fontSize: '34px',
      lineHeight: '32px',
      marginBottom: '42px',
      paddingTop: '80px',
      fontWeight: 400
    };
  }),

  paragraphStyle: ReactStyle(function() {
    return {
      color: '#212121',
      fontSize: '20px',
      lineHeight: '32px'
    }
  }),

  onNavButtonClick: function() {
    this.setState({showSideNavigation: !this.state.showSideNavigation});
  },

  render: function() {
    var state = this.state;
    return <div styles={this.normalStyle()}>
      <AppBar boxShadow={true} onNavButtonClick={this.onNavButtonClick} shadow={true}/>
      <Overlay show={state.showSideNavigation} onClick={this.onNavButtonClick} />
      <SideNavigation show={state.showSideNavigation}>
        <List>
          <ListItem onClick={this.onClick(1)} title="Bottom Sheets" />
          <ListItem onClick={this.onClick(2)} title="Buttons" />
          <ListItem onClick={this.onClick(7)} title="Lists" />
          <ListItem onClick={this.onClick(3)} title="Progress and Activity" />
          <ListItem onClick={this.onClick(6)} title="Switches" />
          <ListItem onClick={this.onClick(4)} title="Tabs" />
          <ListItem onClick={this.onClick(5)} title="Text fields" />
        </List>
      </SideNavigation>
      <div className={this.containerStyle()}>
      {state.view === 0 &&
        <div>
          <h1 styles={this.headerStyle()}>React Material Components</h1>
          <p styles={this.paragraphStyle()}>
            Here you find components written with React.js and React Style that attempt to abide to the Google
            material design guidelines. It takes a different approach from Polymer, by wrapping both templates
            and CSS within JavaScript.
          </p>
          <p styles={this.paragraphStyle()}>
            If something is not correct, feel free to help out and file an issue or do a pull request.
          </p>
        </div>
        }
        {state.view === 1 &&
          <BottomSheetsView />
          }
        {state.view === 2 &&
          <ButtonsView />
        }
        {state.view === 3 &&
          <ProgressAndActivityView />
        }
        {state.view === 4 &&
          <TabsView />
          }
        {state.view === 5 &&
          <TextFieldsView />
          }
        {state.view === 6 &&
          <SwitchesView />
          }
        {state.view === 7 &&
          <ListsView />
          }
      </div>
    </div>;
  },

  onClick: function(position) {
    var self = this;
    return function() {
      self.setState({view: position, showSideNavigation: false});
    }
  }

});

React.renderComponent(<TestView />, document.getElementById('container'));

/*
 *
 Welcome to React Material components, an attempt at recreating the Polymer material components within React.js
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
 <FloatingActionButton icon="undo" styles={[{backgroundColor:'#d23f31'}]}/>
 <FloatingActionButton icon="arrow-forward" mini={true} styles={[{backgroundColor:'#5677fc'}]}/>
 <h2>Radio Buttons</h2>
 <RadioButton name="radiobutton" onButtonStyle={[{backgroundColor:'#d23f31'}]}/>
 <RadioButton name="radiobutton"/>
 <h2>Checkbox</h2>
 <Checkbox />
 <Checkbox />
 <h2>Progress bar</h2>
 <ProgressBar percentage={50} styles={[{backgroundColor:'#d23f31'}]}/>
 </div>
 <h2>Toggle Button</h2>
 <div>
 <ToggleButton />
 </div>
 <h2>Icon button</h2>
 <div>
 <IconButton />
 </div>
 <h2>Slider</h2>
 <div>
 blaaaa
 </div>
 <h2>Textfield</h2>
 <div>
 <TextField placeHolder="User name" />
 <TextField placeHolder="Password" />
 </div>
 <h2>Moaaaarrr</h2>
 */