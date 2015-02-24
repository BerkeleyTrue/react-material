/**
 * @jsx React.DOM
 */
'use strict';

import React from 'react';
import StyleSheet from 'react-style';

var TextField = require('../components/TextField');

var TextFieldsView = React.createClass({

  render: function() {
    return <div>
      <h2>Single line text fields</h2>
      <TextField placeHolder="Name"/>
      <h2>Floating Labels</h2>
      <TextField placeHolder="Surname" floatingLabel={true}/>
      {/*<h2>Multi-line-text field</h2>
      TODO
      <h2>Full-width text field</h2>
      TODO
      <h2>Character Counter</h2>
      TODO
      <h2>Auto-complete text field</h2>
      TODO
      <h2>Search Filter</h2>
      TODO*/}
      <h2>Error indication</h2>
      <TextField error="Well that sucks" />
    </div>;
  }

});

module.exports = TextFieldsView;
