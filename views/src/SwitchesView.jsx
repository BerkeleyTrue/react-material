import React from 'react';
import StyleSheet from 'react-style';

import {
  FormRow,
  CheckBox,
  RadioButton,
  RadioButtonGroup,
  ToggleButton
} from '../components/';

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: '60px'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }

  static displayName = 'SwitchesView'

  onChange() {
    this.setState({ checked: this.refs.checkbox.isChecked });
  }

  onRadioButtonGroupChange() {
    this.setState({ rbValue: this.refs.rbgroup.selectedValue });
  }

  onToggleButtonChange() {
    this.setState({ swChecked: this.refs.toggleButton.isChecked });
  }

  render() {
    const {
      checked,
      rbValue,
      swChecked
    } = this.state;

    return (
      <div styles={ styles.containerStyle }>
        <FormRow>
          <CheckBox
            onChange={ ::this.onChange }
            ref='checkbox'>
            I'm inside the checkbox <br /> line 2 <br /> line 3
          </CheckBox>
        </FormRow>
        <FormRow>
          <RadioButtonGroup
            onChange={ ::this.onRadioButtonGroupChange }
            ref='rbgroup'>
            <RadioButton
              ref='radioButton1'
              value='a'>
              radio button 1
            </RadioButton>
            <RadioButton
              ref='radioButton2'
              value='b'>
              radio button 2
            </RadioButton>
            <RadioButton
              ref='radioButton3'
              value='c'>
              radio button 3
            </RadioButton>
          </RadioButtonGroup>
        </FormRow>
        <FormRow>
          <ToggleButton
            onChange={ ::this.onToggleButtonChange }
            ref='toggleButton'>
            A toggle button
          </ToggleButton>
        </FormRow>
        <div>
          The checkbox is { checked ? 'checked' : 'unchecked' } <br />
          The radio button group value is { rbValue } <br />
          The toggle is { swChecked ? 'checked' : 'unchecked'}
        </div>
      </div>
    );
  }
}
