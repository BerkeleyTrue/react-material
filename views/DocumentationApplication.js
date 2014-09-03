/**
 * @jsx React.DOM
 */
'use strict';

require("./style.css");

var React = require('react');
var ReactStyle = require('react-style');
React.initializeTouchEvents(true);

// components
var AppBar = require('../components/AppBar');
var SideNavigation = require('../components/SideNavigation');
var Overlay = require('../components/Overlay');

var BottomSheetsView = require('./BottomSheetsView');
var ButtonsView = require('./ButtonsView');
var ProgressAndActivityView = require('./ProgressAndActivityView');
var SwitchesView = require('./SwitchesView');
var TabsView = require('./TabsView');
var TextFieldsView = require('./TextFieldsView');
var ListsView = require('./ListView');
var CardsView = require('./CardsView');

var List = require('../components/List');
var ListItem = require('../components/ListItem');

var BlueTheme = require('../themes/BlueTheme');

var ViewsEnum = {
  BottomSheetsView: 1,
  ButtonsView: 2,
  ProgressAndActivityView: 3,
  TabsView: 4,
  TextFieldsView: 5,
  SwitchesView: 6,
  ListsView: 7,
  CardsView: 8
};

var TestView = React.createClass({

  themes: [BlueTheme],

  getInitialState: function() {
    return {
      showSideNavigation: false,
      view: 0
    }
  },

  normalStyle: ReactStyle(function normalStyle(){
    return {
      backgroundColor: '#f9f9f9',
      minHeight: '100%'
    };
  }),

  containerStyle: ReactStyle(function containerStyle() {
    return {
      margin: 'auto',
      maxWidth: '700px',
      padding: '56px 20px 0'
    };
  }),

  headerStyle: ReactStyle(function headerStyle() {
    return {
      color: '#3f51b5',
      fontSize: '34px',
      lineHeight: '32px',
      marginBottom: '42px',
      paddingTop: '80px',
      fontWeight: 400
    };
  }),

  paragraphStyle: ReactStyle(function paragraphStyle() {
    return {
      color: '#212121',
      fontSize: '20px',
      lineHeight: '32px'
    }
  }),

  onNavButtonClick: function() {
    this.setState({showSideNavigation: !this.state.showSideNavigation});
  },

  onOverlayClick: function() {
    this.setState({showSideNavigation: false});
  },


  render: function() {
    var state = this.state;
    var view = state.view;
    var title;
    var expanded = false;
    if(view === ViewsEnum.BottomSheetsView) {
      title = 'Bottom sheets';
    }
    else if(view === ViewsEnum.ButtonsView) {
      expanded = true;
      title = 'Buttons';
    }
    else if(view === ViewsEnum.ProgressAndActivityView) {
      title = 'Progress and Activity';
    }
    else if(view === ViewsEnum.TabsView) {
      title = 'Tabs';
    }
    else if(view === ViewsEnum.TextFieldsView) {
      title = 'Text fields';
    }
    else if(view === ViewsEnum.SwitchesView) {
      title = 'Switches';
    }
    else if(view === ViewsEnum.ListsView) {
      title = 'Lists';
    }
    else if(view === ViewsEnum.CardsView) {
      title = 'Cards';
    }

    return <div styles={this.normalStyle()}>
      <AppBar onNavButtonClick={this.onNavButtonClick} expanded={expanded} shadow={true} title={title}/>
      <Overlay show={state.showSideNavigation} onClick={this.onOverlayClick} />
      <SideNavigation show={state.showSideNavigation}>
        <List>
          <ListItem onClick={this.onClick(1)} title="Bottom Sheets" />
          <ListItem onClick={this.onClick(2)} title="Buttons" />
          <ListItem onClick={this.onClick(8)} title="Cards" />
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
             Here you find components written with <a href="http://reactjs.org">React.js</a> and {' '}
             <a href="https://github.com/SanderSpies/react-style">React Style</a> that attempt to abide to the {' '}
             <a href="http://www.google.com/design/spec/material-design/introduction.html">Google material design guidelines</a>.
             It takes a different approach from Polymer, by wrapping both templates
            and CSS within JavaScript.
          </p>
          <p styles={this.paragraphStyle()}>
            If something is not correct, feel free to help out and file an {' '}
            <a href="https://github.com/SanderSpies/react-style/issues/new">issue</a> or {' '}
            <a href="https://github.com/SanderSpies/react-style/fork">fork the project</a> and do a pull request.
          </p>
        </div>
        }
        {state.view === ViewsEnum.BottomSheetsView &&
          <BottomSheetsView />
          }
        {state.view === ViewsEnum.ButtonsView &&
          <ButtonsView />
        }
        {state.view === ViewsEnum.ProgressAndActivityView &&
          <ProgressAndActivityView />
        }
        {state.view === ViewsEnum.TabsView &&
          <TabsView />
          }
        {state.view === ViewsEnum.TextFieldsView &&
          <TextFieldsView />
          }
        {state.view === ViewsEnum.SwitchesView &&
          <SwitchesView />
          }
        {state.view === ViewsEnum.ListsView &&
          <ListsView />
          }
        {state.view === ViewsEnum.CardsView &&
          <CardsView />
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
