import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Typography } from './style';

const SubheaderStyles = StyleSheet.create({
  normalStyle: {
    height: 48,
    lineHeight: '48px',
    padding: '0 16px',
    position: 'relative'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
  }

  static displayName = 'Subheader'
  static propTypes = {
    children: PropTypes.node
  }
  render() {
    const { normalStyle } = SubheaderStyles;
    const {
      children
    } = this.props;

    return (
      <div styles={ [Typography.subhead, normalStyle] }>
        { children }
      </div>
    );
  }
}
