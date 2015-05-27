'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Tabs, Tab} from '../components/';

var TabsView = React.createClass({

  getInitialState() {
    return {
      view: 0
    };
  },

  render() {
    var state = this.state;
    return <div>
      <h1>
        Example
      </h1>
      <Tabs onChange={this.onChange}>
        <Tab title="tab1" selected={state.view === 0}>
          Contents of tab 1
        </Tab>
        <Tab title="tab2" selected={state.view === 1}>
          Contents of tab 2
        </Tab>
      </Tabs>
    </div>;
  },

  onChange: function(e) {
    this.setState({view: e.position});
  }

});

module.exports = TabsView;
