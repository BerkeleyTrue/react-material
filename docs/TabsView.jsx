import React from 'react';

import { Tabs, Tab } from '../lib';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0
    };
  }

  static displayName = 'TabsView'

  onChange(e) {
    this.setState({ view: e.position });
  }

  render() {
    var state = this.state;
    return (
      <div>
        <h1>
          Example
        </h1>
        <Tabs onChange={ ::this.onChange }>
          <Tab
            selected={ state.view === 0 }
            title='tab1'>
            Contents of tab 1
          </Tab>
          <Tab
            selected={ state.view === 1 }
            title='tab2'>
            Contents of tab 2
          </Tab>
        </Tabs>
      </div>
    );
  }
}
