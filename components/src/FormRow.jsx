import React from 'react';
import StyleSheet from 'react-style';

const FormRowStyles = StyleSheet.create({
  normalStyle: {
    padding: '20px'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
  }
  static displayName = 'FormRow'
  static propTypes = {
    children: React.PropTypes.node
  }
  render() {
    return (
      <div styles={ FormRowStyles.normalStyle }>
        { this.props.children }
      </div>
    );
  }
}
