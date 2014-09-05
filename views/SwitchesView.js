/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var FormRow = require('../components/FormRow');
var CheckBox = require('../components/CheckBox');
var RadioButton = require('../components/RadioButton');
var RadioButtonGroup = require('../components/RadioButtonGroup');
var ToggleButton = require('../components/ToggleButton');


var SwitchesView = React.createClass({

  getInitialState: function() {
    return {
      checked: false
    };
  },

  render: function() {
    var props = this.props;
    var state = this.state;
    return <div>
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

  onChange: function(){
    this.setState({checked: this.refs.checkbox.isChecked});
  },

  onRadioButtonGroupChange: function() {
    this.setState({rbValue:this.refs.rbgroup.selectedValue})
  },

  onToggleButtonChange:function(){
    this.setState({swChecked: this.refs.toggleButton.isChecked})
  }

});

module.exports = SwitchesView;