import React from 'react';
import StyleSheet from 'react-style';

const CardCollectionStyles = StyleSheet.create({
  normalCardCollectionStyle: {}
});

export default class extends React.Component {
  static displayName = 'CardCollection '
  static propTypes = {
    children: React.PropTypes.node
  }
  render() {
    return (
      <div styles={ CardCollectionStyles.normalCardCollectionStyle }>
        { this.props.children }
      </div>
    );
  }
}

