import React from 'react';
// import StyleSheet from 'react-style';

import { TextField } from './TextField';

// on select go to top + full width + show suggestions
export default class extends React.Component {
  constructor() {
    super();
  }
  static displayName = 'AutoComplete'

  render() {
    return (
      <div>
        <div>
          <TextField />
        </div>
      </div>
    );
  }
}
