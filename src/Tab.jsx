import React, { PropTypes } from 'react';
// import StyleSheet from 'react-style';

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'Tab'
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string.isRequired
  }

  render() {
    const {
      children
    } = this.props;
    return (
      <div>
        { children }
      </div>
    );
  }
}
