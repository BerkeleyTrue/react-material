import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

var ListStyles = StyleSheet.create({
  normalListStyle: {
    overflow: 'auto',
    overflowY: 'auto',
    overflowX: 'none'
  }
});

export default class extends React.Component {
  static displayName = 'List'
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    return (
      <div styles={ ListStyles.normalListStyle }>
        { this.props.children }
      </div>
    );
  }
}
