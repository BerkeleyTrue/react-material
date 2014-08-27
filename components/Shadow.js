/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ShadowStyle = require('../style/Shadow');

var Shadow = React.createClass({

  propTypes: {
    shadow: React.PropTypes.number.isRequired
  },

  shadow1Style: ReactStyle(function(){

  }),

  render: function() {
    var shadowStyle;
    if (shadow === 0) {

    }
    return <div>
        {this.props.children}
      </div>;
  }

});

module.exports = Shadow;