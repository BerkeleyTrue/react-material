/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var RadioButton = require('./RadioButton');
var FormRow = require('./FormRow');

class RadioButtonGroup extends React.Component {

  constructor() {
    this.selectedValue = null;
    this.state = {
      selectedIndex: -1
    };
  }

  render() {
    var props = this.props;
    var styles = RadioButtonGroupStyles;
    var radioButtons = [];
    var children = this.props.children;
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var radioButton = <RadioButton key={i}
                                     value={child.props.value}
                                     position={i}
                                     onChange={(e)=>this.onChange(e)}
                                     checked={this.state.selectedIndex === i}>
        {child.props.children}
      </RadioButton>;

      radioButtons[i] = <div key={'d_' + i} styles={styles.rowStyle}>
        {radioButton}
      </div>;
    }
    return <div>
        {radioButtons}
    </div>;
  }

  onChange(e){
    var selectedIndex = e.ref.props.position;
    this.selectedValue = e.ref.props.value || selectedIndex;
    this.setState({selectedIndex: selectedIndex});
    this.props.onChange(e);
  }

}

var RadioButtonGroupStyles = StyleSheet.create({

  rowStyle: {
    padding: '20px 0',
    //':first-child': {
    //  paddingTop: 0
    //},
    //':last-child': {
    //  paddingBottom: 0
    //}
  }

});

module.exports = RadioButtonGroup;