/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Tabs = require('../components/Tabs');
var Tab = require('../components/Tab');

var TabsView = React.createClass({

  getInitialState: function() {
    return {
      view: 0
    };
  },

  render: function() {
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