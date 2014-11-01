/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var Cards = require('../components/CardCollection');
var Card = require('../components/Card');

var Button = require('../components/Button');
var Checkbox = require('../components/CheckBox');
var ProgressBar = require('../components/ProgressBar');

var CardsView = React.createClass({

	styles: {

		normalStyle: ReactStyle({
			margin: '0 auto',
			width: '300px'
		})

	},

  render: function() {
	  var styles = this.styles;
    return <div styles={styles.normalStyle}>
      <Cards>
        <Card>
          <h2>
            Not yet responsive or anything, best viewed on Nexus 5 for now
          </h2>
        </Card>
        <Card title="Basic components">
          <Button>A simple button</Button>
          <Button raised={true} styles={[ReactStyle({backgroundColor: Colors.amber.P500, color: Colors.grey.P50})]}>
            Raised button
          </Button>
          <div>
            <Checkbox />
          </div>
        </Card>
        <Card title="Text fields  and dialogs">
          ...
        </Card>
        <Card title="Progress and sliders">
          <ProgressBar percentage={70} />
        </Card>
        <Card title="Tabs">

        </Card>
        <Card>

        </Card>
      </Cards>
    </div>;
  }

});

module.exports = CardsView;