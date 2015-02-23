/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var Colors = require('../style/Colors');

var Cards = require('../components/CardCollection');
var Card = require('../components/Card');

var Button = require('../components/Button');
var Checkbox = require('../components/CheckBox');
var ProgressBar = require('../components/ProgressBar');

var CardsView = React.createClass({

	styles: StyleSheet.create({

		normalStyle: {
			margin: '0 auto',
			width: '300px'
		}

	}),

  render: function() {
	  var styles = this.styles;
    return <div styles={styles.normalStyle}>
      <Cards>
        <Card title="Basic components">
          <Button>A simple button</Button>
          <Button raised={true} styles={[{backgroundColor: Colors.amber.P500, color: Colors.grey.P50}]}>
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
