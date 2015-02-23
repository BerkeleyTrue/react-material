/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');
var FormRow = require('../components/FormRow');
var CheckBox = require('../components/CheckBox');
var RadioButton = require('../components/RadioButton');
var RadioButtonGroup = require('../components/RadioButtonGroup');
var ToggleButton = require('../components/ToggleButton');


var SwitchesView = React.createClass({

	styles: StyleSheet.create({
		containerStyle: {
			marginTop: '60px'
		}
  }),

  getInitialState() {
    return {
      checked: false
    };
  },

  render() {
    var props = this.props;
	  var styles = this.styles;
    var state = this.state;
    return <div styles={styles.containerStyle}>
      <FormRow>
        <CheckBox onChange={this.onChange} ref="checkbox">
          I'm inside the checkbox <br /> line 2 <br /> line 3
        </CheckBox>
      </FormRow>
      <FormRow>
        <RadioButtonGroup ref="rbgroup" onChange={this.onRadioButtonGroupChange}>
          <RadioButton ref="radioButton1" value="a">radio button 1</RadioButton>
          <RadioButton ref="radioButton2" value="b">radio button 2</RadioButton>
          <RadioButton ref="radioButton3">radio button 3</RadioButton>
        </RadioButtonGroup>
      </FormRow>
      <FormRow>
        <ToggleButton ref="toggleButton" onChange={this.onToggleButtonChange}>
          A toggle button
        </ToggleButton>
      </FormRow>
      <div>
        The checkbox is {state.checked ? 'checked': 'unchecked'} <br />
        The radio button group value is {state.rbValue} <br />
        The toggle is {state.swChecked ? 'checked'  :'unchecked'}
      </div>
    </div>;
  },

  onChange(){
    this.setState({checked: this.refs.checkbox.isChecked});
  },

  onRadioButtonGroupChange() {
    this.setState({rbValue:this.refs.rbgroup.selectedValue})
  },

  onToggleButtonChange(){
    this.setState({swChecked: this.refs.toggleButton.isChecked})
  }

});

module.exports = SwitchesView;