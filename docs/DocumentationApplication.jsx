import React from 'react';
import assign from 'object.assign';
import keyMirror from 'keymirror';
import StyleSheet from 'react-style';
import styles from './style.css'; // eslint-disable-line

React.initializeTouchEvents(true);

import { Colors } from '../lib/style';

import {
  AppBar,
  List,
  ListItem,
  Overlay,
  SideNavigation
} from '../lib';

import * as Views from './';

const ViewMap = Object.keys(Views)
  .map(viewName => ({ [viewName]: React.createElement(Views[viewName]) }))
  .reduce((accu, viewElement) => {
    return assign(accu, viewElement);
  }, {});

const DocumentationApplicationStyles = StyleSheet.create({
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
    // normalAppBarStyle: ReactStyle({
    //  backgroundColor: Colors.blue.P500,
    //   color: 'white',
    //   fill: 'white'
    // }),
    //
    // placeHolderStyle: ReactStyle({
    //  backgroundColor: Colors.blue.P500
    // }),
    //
    // titleStyle: ReactStyle({
    //  color: 'white'
    // })
  }
});

const ViewKeys = keyMirror({
  defaultView: null,
  BottomSheetsView: null,
  ButtonsView: null,
  // ProgressAndActivityView: null,
  TabsView: null,
  TextFieldsView: null,
  SwitchesView: null,
  ListView: null,
  CardsView: null,
  DialogsView: null
  // MenusView: null
});

const URLs = {
  REACT: 'http://facebook.github.io/react/',
  REACT_MATERIAL: 'https://github.com/SanderSpies/react-style',
  GOOGLE_MATERIAL:
    'http://www.google.com/design/spec/material-design/introduction.html'
};

ViewMap.defaultView = (
  <div>
    <h1 styles={ DocumentationApplicationStyles.headerStyle }>
      React Material Components
    </h1>
    <p styles={ DocumentationApplicationStyles.paragraphStyle }>
      Here you find components written with
      {' '}
      <a href={ URLs.REACT }>React.js</a>
      and
      {' '}
      <a href={ URLs.REACT_MATERIAL }>
        React Style
      </a> that attempt to abide to the
      {' '}
      <a href={ URLs.GOOGLE_MATERIAL }>
        Google material design guidelines
      </a>
      {' '}
      It takes a different approach from Polymer, by wrapping both
      templates and CSS within JavaScript.
    </p>
    <p styles={ DocumentationApplicationStyles.paragraphStyle }>
      If something is not correct, feel free to help out and file an
      {' '}
      <a href={ URLs.REACT_MATERIAL + '/issues' }>
        issue
      </a> or
      {' '}
      <a href={ URLs.REACT_MATERIAL + '/fork' }>
        fork the project
      </a> and do a pull request.
    </p>
  </div>
);

const Titles = {
  [ViewKeys.BottomSheetsView]: 'Bottom sheets',
  [ViewKeys.ButtonsView]: 'Buttons',
  [ViewKeys.ProgressAndActivityView]: 'Progress and Activity',
  [ViewKeys.TabsView]: 'Tabs',
  [ViewKeys.TextFieldsView]: 'Text fields',
  [ViewKeys.SwitchesView]: 'Switches',
  [ViewKeys.ListView]: 'Lists',
  [ViewKeys.CardsView]: 'Cards',
  [ViewKeys.DialogsView]: 'Dialogs'
};

export default class DocumentationApplicationView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSideNavigation: false,
      view: ViewKeys.defaultView
    };
  }

  static displayName = 'DocumentationApplicationView'

  onNavButtonClick() {
    this.setState({ showSideNavigation: !this.state.showSideNavigation });
  }

  onClick(view) {
    return () => {
      this.setState({
        view: view,
        showSideNavigation: false
      });
    };
  }

  onOverlayClick() {
    this.setState({ showSideNavigation: false });
  }

  renderView(view) {
    return ViewMap[view];
  }

  getTitle(view) {
    return Titles[view];
  }

  render() {
    const {
      expanded,
      showSideNavigation,
      view
    } = this.state;

    const title = this.getTitle(view);

    return (
      <div styles={ DocumentationApplicationStyles.normalStyle }>
        <AppBar
          expanded={ expanded }
          onNavButtonClick={ ::this.onNavButtonClick }
          shadow={ true }
          styles={ DocumentationApplicationStyles.appBar }
          title={ title } />
        <Overlay
          onClick={ ::this.onOverlayClick }
          show={ showSideNavigation } />
        <SideNavigation show={ showSideNavigation }>
          <List>
            <ListItem onClick={ this.onClick(ViewKeys.BottomSheetsView) }>
              Bottom sheets
            </ListItem>
            <ListItem onClick={ this.onClick(ViewKeys.ButtonsView) }>
              Buttons
            </ListItem>
            <ListItem onClick={ this.onClick(ViewKeys.CardsView) }>
              Cards
            </ListItem>
            <ListItem onClick={ this.onClick(ViewKeys.DialogsView) }>
              Dialogs
            </ListItem>
            <ListItem onClick={ this.onClick(ViewKeys.ListView) }>
              Lists
            </ListItem>
            <ListItem onClick={ this.onClick(ViewKeys.SwitchesView) }>
              Switches
            </ListItem>
            <ListItem onClick={ this.onClick(ViewKeys.TabsView) }>
              Tabs
            </ListItem>
            <ListItem onClick={ this.onClick(ViewKeys.TextFieldsView) }>
              Text fields
            </ListItem>
          </List>
        </SideNavigation>
        <div styles={ DocumentationApplicationStyles.containerStyle }>
          { this.renderView(view) }
        </div>
      </div>
    );
  }
}

if (typeof window !== 'undefined') {
  React.render(
    <DocumentationApplicationView />,
    document.getElementById('container')
  );
}
