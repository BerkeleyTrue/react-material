'use strict';

import React from 'react';
import StyleSheet from 'react-style';

import {Colors} from '../style/';

import {Button, Card, CardCollection, CheckBox, ProgressBar} from '../components/';


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
      <CardCollection>
        <Card title="Basic components">
          <Button>A simple button</Button>
          <Button raised={true} styles={[{backgroundColor: Colors.amber.P500, color: Colors.grey.P50}]}>
            Raised button
          </Button>
          <div>
            <CheckBox />
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
      </CardCollection>
    </div>;
  }
});

module.exports = CardsView;
