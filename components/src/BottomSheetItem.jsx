import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import ListItem from './ListItem';

const BottomSheetItemStyles = StyleSheet.create({
  normalStyle: {
    height: 48
  }
});

export default class extends React.Component {
  constructor() {
    super();
  }
  static displayName = 'BottomSheetItem'
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    return (
      <ListItem styles={ BottomSheetItemStyles.normalStyle} {...this.props}>
        { this.props.children }
      </ListItem>
    );
  }
}
