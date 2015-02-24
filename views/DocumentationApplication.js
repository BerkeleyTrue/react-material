/**
 * @jsx React.DOM
 */
'use strict';

require("./style.css");

import React from 'babel!react';
import StyleSheet from 'babel!react-style';
React.initializeTouchEvents(true);

import {Colors} from 'babel!../style';

// components
import {AppBar,
        List,
        ListItem,
        Overlay,
        SideNavigation} from 'babel!../components';

//
//var BottomSheetsView = require('./BottomSheetsView');
import {ButtonsView,
        CardsView,
        DialogsView,
        ListsView,
        SwitchesView,
        TabsView,
        TextFieldsView} from 'babel!./';

//var ProgressAndActivityView = require('./ProgressAndActivityView');

//var MenusView = require('./MenusView');
//

//
//var BlueTheme = require('../themes/BlueTheme');

var ViewsEnum = {
  //BottomSheetsView: 1,
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

var DocumentationApplicationView = React.createClass({

  // themes: [BlueTheme],

  getInitialState: function() {
    return {
      showSideNavigation: false,
      view: 0
    }
  },
  styles: StyleSheet.create({

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
    /*if(view === ViewsEnum.BottomSheetsView) {
      title = 'Bottom sheets';
    }*/
    if(view === ViewsEnum.ButtonsView) {
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
    /*else if (view === ViewsEnum.MenusView) {
      title = 'Menus';
    }*/
    var styles = this.styles;
    return <div styles={styles.normalStyle}>
      <AppBar onNavButtonClick={this.onNavButtonClick}
							expanded={expanded}
							shadow={true}
							title={title}
							styles={styles.appBar}/>
      <Overlay show={state.showSideNavigation} onClick={this.onOverlayClick} />
      <SideNavigation show={state.showSideNavigation}>
        <List>
          {/*<ListItem onClick={this.onClick(ViewsEnum.BottomSheetsView)}>
            Bottom Sheets
          </ListItem>*/}
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
          {/*<ListItem onClick={this.onClick(ViewsEnum.MenusView)}>
            Menus
          </ListItem>*/}
          {/*<ListItem onClick={this.onClick(ViewsEnum.ProgressAndActivityView)}>
            Progress and Activity
          </ListItem>*/}
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
      <div styles={styles.containerStyle}>
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
        {/*state.view === ViewsEnum.BottomSheetsView &&
            <BottomSheetsView />
        */}
        {state.view === ViewsEnum.ButtonsView &&
            <ButtonsView />
        }
        {/*state.view === ViewsEnum.ProgressAndActivityView &&
            <ProgressAndActivityView />
        */}
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
        {/*state.view === ViewsEnum.MenusView &&
            <MenusView />
        */}
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
  React.render(<DocumentationApplicationView />, document.getElementById('container'));
}
