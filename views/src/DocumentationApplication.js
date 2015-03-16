'use strict';

// require("./style.css");

import React from 'react';
import StyleSheet from 'react-style';

React.initializeTouchEvents(true);

import {Colors} from '../style';

// components
import {AppBar,
        List,
        ListItem,
        Overlay,
        SideNavigation} from '../components';

//
//var BottomSheetsView = require('./BottomSheetsView');
import {BottomSheetsView,
        ButtonsView,
        CardsView,
        DialogsView,
        ListsView,
        SwitchesView,
        TabsView,
        TextFieldsView} from './';

//var ProgressAndActivityView = require('./ProgressAndActivityView');

//var MenusView = require('./MenusView');
//

//
//var BlueTheme = require('../themes/BlueTheme');

var ViewsEnum = {
  BottomSheetsView: 1,
  ButtonsView: 2,
  //ProgressAndActivityView: 3,
  TabsView: 4,
  TextFieldsView: 5,
  SwitchesView: 6,
  ListsView: 7,
  CardsView: 8,
  DialogsView: 9
  //MenusView: 10
};

export default class DocumentationApplicationView extends React.Component {

  // themes: [BlueTheme],

  constructor() {
    this.state =  {
      showSideNavigation: false,
      view: 0
    }
  }

  onNavButtonClick() {
    this.setState({showSideNavigation: !this.state.showSideNavigation});
  }

  onOverlayClick() {
    this.setState({showSideNavigation: false});
  }

  render() {
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
    /*else if(view === ViewsEnum.ProgressAndActivityView) {
      title = 'Progress and Activity';
    }*/
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


    return <div styles={DocumentationApplicationStyles.normalStyle}>
      <AppBar onNavButtonClick={() => this.onNavButtonClick()}
							expanded={expanded}
							shadow={true}
							title={title}
							styles={DocumentationApplicationStyles.appBar}/>
      <Overlay show={state.showSideNavigation} onClick={() => this.onOverlayClick()} />
      <SideNavigation show={state.showSideNavigation}>
        <List>
          <ListItem onClick={this.onClick(ViewsEnum.BottomSheetsView)}>
            Bottom sheets
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
      </SideNavigation>
      <div styles={DocumentationApplicationStyles.containerStyle}>
      {state.view === 0 &&
        <div>
          <h1 styles={DocumentationApplicationStyles.headerStyle}>React Material Components</h1>
          <p styles={DocumentationApplicationStyles.paragraphStyle}>
             Here you find components written with <a href="http://reactjs.org">React.js</a> and {' '}
             <a href="https://github.com/SanderSpies/react-style">React Style</a> that attempt to abide to the {' '}
             <a href="http://www.google.com/design/spec/material-design/introduction.html">Google material design guidelines</a>.
             It takes a different approach from Polymer, by wrapping both templates
            and CSS within JavaScript.
          </p>
          <p styles={DocumentationApplicationStyles.paragraphStyle}>
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
        {state.view === ViewsEnum.DialogsView &&
            <DialogsView />
        }
      </div>
    </div>;
  }

  onClick(position) {
    var self = this;
    return function() {
      self.setState({view: position, showSideNavigation: false});
    }
  }
}

var DocumentationApplicationStyles = StyleSheet.create({

  normalStyle: {
    backgroundColor: Colors.grey.P100,
    minHeight: '100%'
  },

  containerStyle: {
    margin: 'auto',
    maxWidth: '700px',
    padding: '56px 20px 0'
  },

  headerStyle: {
    color: Colors.indigo.P500,
    fontSize: '34',
    lineHeight: '32px',
    marginBottom: 42,
    paddingTop: 80,
    fontWeight: 400
  },

  paragraphStyle: {
    color: Colors.grey.P900,
    fontSize: '20',
    lineHeight: '32px'
  },

  appBar: {

    //normalAppBarStyle: ReactStyle({
    // backgroundColor: Colors.blue.P500,
    //  color: 'white',
    //  fill: 'white'
    //}),
    //
    //placeHolderStyle: ReactStyle({
    // backgroundColor: Colors.blue.P500
    //}),
    //
    //titleStyle: ReactStyle({
    // color: 'white'
    //})
  }
});

if (typeof window !== 'undefined') {
  React.render(<DocumentationApplicationView />, document.getElementById('container'));
}
