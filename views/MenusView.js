/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Button} from '../components/';

var MenusView = React.createClass({

  render: function() {
    return <div>
      <Button>Does nothing</Button>
    </div>;
  }

});

module.exports = MenusView;
