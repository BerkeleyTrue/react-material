/**
 * @jsx React.DOM
 */
'use strict';

require("./style.css");

var React = require('react');
var ReactStyle = require('react-style');
React.initializeTouchEvents(true);

var Colors = require('../style/Colors');

// components
var AppBar = require('../components/AppBar');
var SideNavigation = require('../components/SideNavigation');
var Overlay = require('../components/Overlay');
//
//var BottomSheetsView = require('./BottomSheetsView');
//var ButtonsView = require('./ButtonsView');
//var ProgressAndActivityView = require('./ProgressAndActivityView');
//var SwitchesView = require('./SwitchesView');
//var TabsView = require('./TabsView');
//var TextFieldsView = require('./TextFieldsView');
//var ListsView = require('./ListView');
//var CardsView = require('./CardsView');
//var DialogsView = require('./DialogsView');
//var MenusView = require('./MenusView');
//
var List = require('../components/List');
var ListItem = require('../components/ListItem');
//
//var BlueTheme = require('../themes/BlueTheme');

var ViewsEnum = {
  BottomSheetsView: 1,
  ButtonsView: 2,
  ProgressAndActivityView: 3,
  TabsView: 4,
  TextFieldsView: 5,
  SwitchesView: 6,
  ListsView: 7,
  CardsView: 8,
  DialogsView: 9,
  MenusView: 10
};

var TestView = React.createClass({

  // themes: [BlueTheme],

  getInitialState: function() {
    return {
      showSideNavigation: false,
      view: 0
    }
  },
  styles: {

    normalStyle: ReactStyle({
      backgroundColor: Colors.grey.P100,
      minHeight: '100%'
    }),

    containerStyle: ReactStyle({
      margin: 'auto',
      maxWidth: '700px',
      padding: '56px 20px 0'
    }),

    headerStyle: ReactStyle({
      color: Colors.indigo.P500,
      fontSize: 34,
      lineHeight: '32px',
      marginBottom: 42,
      paddingTop: 80,
      fontWeight: 400
    }),

    paragraphStyle: ReactStyle({
      color: Colors.grey.P900,
      fontSize: 20,
      lineHeight: '32px'
    })
  },

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
    else if (view === ViewsEnum.DialogsView) {
      title = 'Dialogs';
    }
    else if (view === ViewsEnum.MenusView) {
      title = 'Menus';
    }
    var styles = this.styles;
    return <div styles={styles.normalStyle}>
      <AppBar onNavButtonClick={this.onNavButtonClick} expanded={expanded} shadow={true} title={title}/>
      /*<Overlay show={state.showSideNavigation} onClick={this.onOverlayClick} />
      <SideNavigation show={state.showSideNavigation}>
        <List>
          <ListItem onClick={this.onClick(ViewsEnum.BottomSheetsView)}>
            Bottom Sheets
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.ButtonsView)}>
            Buttons
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.CardsView)}>
            Cards
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.DialogsView)}>
            Dialogs
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.ListsView)}>
            Lists
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.MenusView)}>
            Menus
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.ProgressAndActivityView)}>
            Progress and Activity
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.SwitchesView)}>
            Switches
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.TabsView)}>
            Tabs
          </ListItem>
          <ListItem onClick={this.onClick(ViewsEnum.TextFieldsView)}>
            Text fields
          </ListItem>
        </List>
      </SideNavigation>*/
      <div className={styles.containerStyle}>
      {state.view === 0 &&
        <div>
          <h1 styles={styles.headerStyle}>React Material Components</h1>
          <p styles={styles.paragraphStyle}>
             Here you find components written with <a href="http://reactjs.org">React.js</a> and {' '}
             <a href="https://github.com/SanderSpies/react-style">React Style</a> that attempt to abide to the {' '}
             <a href="http://www.google.com/design/spec/material-design/introduction.html">Google material design guidelines</a>.
             It takes a different approach from Polymer, by wrapping both templates
            and CSS within JavaScript.
          </p>
          <p styles={styles.paragraphStyle}>
            If something is not correct, feel free to help out and file an {' '}
            <a href="https://github.com/SanderSpies/react-style/issues/new">issue</a> or {' '}
            <a href="https://github.com/SanderSpies/react-style/fork">fork the project</a> and do a pull request.
          </p>
        </div>
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

if (typeof window !== 'undefined') {
  ReactStyle.inject();
  React.renderComponent(<TestView />, document.getElementById('container'));
}