/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = require('../components/Button');

var MenusView = React.createClass({

  render: function() {
    return <div>
      <Button>Does nothing</Button>
    </div>;
  }

});

module.exports = MenusView;
