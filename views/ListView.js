/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var List = require('../components/List');
var ListItem = require('../components/ListItem');

var ListView = React.createClass({

  render: function() {
    return <div>
      <h1>List</h1>
      <h2>Single line</h2>
      <List>
        <ListItem title="Bottom sheets" />
        <ListItem title="Button" />
        <ListItem title="Progress and Activity" />
        <ListItem title="Switches" />
        <ListItem title="Tabs" />
        <ListItem title="Text fields" />
      </List>
      <h2>Single line with icon</h2>
      <List>
        <ListItem icon="favorite" title="Bottom sheets" />
        <ListItem icon="favorite" title="Button" />
        <ListItem icon="favorite" title="Progress and Activity" />
        <ListItem icon="favorite" title="Switches" />
        <ListItem icon="favorite" title="Tabs" />
        <ListItem icon="favorite" title="Text fields" />
      </List>
      <h2>Two lines</h2>
      <List>
        <ListItem title="Bottom sheets" secondaryText="example" />
        <ListItem title="Button"  secondaryText="example"/>
        <ListItem title="Progress and Activity"  secondaryText="example"/>
        <ListItem title="Switches"  secondaryText="example"/>
        <ListItem title="Tabs"  secondaryText="example"/>
        <ListItem title="Text fields"  secondaryText="example"/>
      </List>
      <h2>Two lines with checkbox</h2>
      <List>
        <ListItem title="Bottom sheets" secondaryText="example" type="checkbox"/>
        <ListItem title="Button"  secondaryText="example" type="checkbox"/>
        <ListItem title="Progress and Activity"  secondaryText="example" type="checkbox"/>
        <ListItem title="Switches"  secondaryText="example" type="checkbox"/>
        <ListItem title="Tabs"  secondaryText="example" type="checkbox"/>
        <ListItem title="Text fields"  secondaryText="example" type="checkbox"/>
      </List>
      <h2>Three lines</h2>
      <List>
        <ListItem title="Bottom sheets" secondaryText="example" nrOfLines={3} />
        <ListItem title="Button"  secondaryText="example example example example example example example example example example example example example example example example example example"  nrOfLines={3}/>
        <ListItem title="Progress and Activity"  secondaryText="example"  nrOfLines={3}/>
        <ListItem title="Switches"  secondaryText="example" nrOfLines={3}/>
        <ListItem title="Tabs"  secondaryText="example" nrOfLines={3}/>
        <ListItem title="Text fields"  secondaryText="example" nrOfLines={3}/>
      </List>
    </div>;
  }

});

module.exports = ListView;