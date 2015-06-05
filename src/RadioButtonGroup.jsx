import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { RadioButton } from './';

const RadioButtonGroupStyles = StyleSheet.create({
  rowStyle: {
    padding: '20px 0'
    // ':first-child': {
    //   paddingTop: 0
    // },
    // ':last-child': {
    //   paddingBottom: 0
    // }
  }
});

export default class extends React.Component {
  constructor() {
    this.selectedValue = null;
    this.state = {
      selectedIndex: -1
    };
  }
  static displayName = 'RadioButtonGroup'
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    styles: PropTypes.object
  }

  onChange(e) {
    const selectedIndex = e.ref.props.position;
    this.selectedValue = e.ref.props.value || selectedIndex;
    this.setState({ selectedIndex: selectedIndex });
    this.props.onChange(e);
  }

  renderRadioButtons(children, selected, styles) {
    if (!children) {
      return null;
    }
    if (!Array.isArray(children)) {
      children = [children];
    }
    return children.map((child, index) => {
      return (
        <div
          key={ 'd_' + index }
          styles={ styles }>
          <RadioButton
            checked={ selected === index }
            key={ index }
            onChange={ ::this.onChange }
            position={ index }
            value={ child.props.value }>
            { child.props.children }
          </RadioButton>
        </div>
      );
    });
  }

  render() {
    const {
      children
    } = this.props;

    const {
      selectedIndex
    } = this.state;

    const { rowStyle } = RadioButtonGroupStyles;
    return (
      <div>
        { this.renderRadioButtons(children, selectedIndex, rowStyle) }
      </div>
    );
  }
}
