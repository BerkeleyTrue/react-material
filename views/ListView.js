/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var CheckBox = require('../components/CheckBox');
var List = require('../components/List');
var ListItem = require('../components/ListItem');

var Subheader = require('../components/Subheader');

var ListView = React.createClass({

  render: function() {
    return <div style={{margin: '0 -20px'}}>
      <List>
        <Subheader>Single line</Subheader>
        <ListItem>Bottom sheets</ListItem>
        <ListItem>Button</ListItem>
        <ListItem>Progress and Activity</ListItem>
        <ListItem>Switches</ListItem>
        <ListItem>Tabs</ListItem>
        <ListItem>Text fields</ListItem>
      </List>
      <List>
        <Subheader>Single line with icon</Subheader>
        <ListItem icon="post-facebook">Facebook</ListItem>
        <ListItem icon="post-github">Github</ListItem>
        <ListItem icon="post-twitter">Twitter</ListItem>
      </List>
      <h2>Two lines</h2>
      <List>
        <ListItem>Bottom sheets</ListItem>
        <ListItem>Button</ListItem>
        <ListItem>Progress and Activity</ListItem>
        <ListItem>Switches</ListItem>
        <ListItem>Tabs</ListItem>
        <ListItem>Text fields</ListItem>
      </List>
      <h2>Two lines with checkbox</h2>
      <List>
        <ListItem disableRipple={true}><CheckBox>Bottom sheets<br /> line 2</CheckBox></ListItem>
        <ListItem disableRipple={true}><CheckBox>Bottom sheets<br /> line 2</CheckBox></ListItem>
        <ListItem disableRipple={true}><CheckBox>Bottom sheets<br /> line 2</CheckBox></ListItem>
        <ListItem disableRipple={true}><CheckBox>Bottom sheets<br /> line 2</CheckBox></ListItem>
        <ListItem disableRipple={true}><CheckBox>Bottom sheets<br /> line 2</CheckBox></ListItem>
      </List>
      <h2>Three lines</h2>
      <List>
        <ListItem>Bottom sheets</ListItem>
        <ListItem>Button</ListItem>
        <ListItem>Progress and Activity</ListItem>
        <ListItem>Switches</ListItem>
        <ListItem>Tabs</ListItem>
        <ListItem>Text fields</ListItem>
      </List>
    </div>;
  }

});

module.exports = ListView;