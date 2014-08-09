/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Tabs = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      height: '48px',
      width: '100%'
    }
  }),

  render: function(){
    return <div>
      <div>
        TODO: Headers for each child
      </div>
      {this.props.children}
    </div>
  }

});

module.exports = Tabs;