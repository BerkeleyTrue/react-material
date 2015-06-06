import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors } from './style';

const RadioButtonStyles = StyleSheet.create({

  normalStyle: {
    WebkitTapHighlightColor: 'rgba(0,0,0,0)',
    cursor: 'pointer',
    position: 'relative',
    display: 'block',
    outline: 'none'
  },

  childStyle: {
    paddingLeft: '16px'
  },

  childBigStyle: {
    paddingLeft: '32px'
  },

  offButtonStyle: {
    border: 'solid 2px',
    borderColor: Colors.grey.P700,
    borderRadius: '50%',
    height: '16px',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '16px'
  },

  onButtonStyle: {
    backgroundColor: Colors.grey.P700,
    borderRadius: '50%',
    height: '20px',
    left: 0,
    position: 'absolute',
    top: 0,
    transform: 'scale(0)',
    transition: 'transform ease 0.28s',
    width: '20px',
    willChange: 'transform'
  },

  onButtonFillStyle: {
    transform: 'scale(.6)'
  },

  circleContainerStyle: {
    position: 'absolute',
    width: '16px',
    height: '16px',
    top: '2px',
    left: '2px'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { checked = false } = props;
    this.isChecked = checked;
    this.state = {
      checked: checked
    };
  }

  static displayName = 'RadioButton'
  static propTypes = {
    checked: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func,
    styles: PropTypes.object
  }

  onClick() {
    const {
      onChange
    } = this.props;

    const {
      checked
    } = this.state;

    let position = 0;
    const el = React.findDOMNode(this);
    // NOTE(Berks): previously was es = es.previousSibling, not sure what the
    // intent is here
    while (el === el.previousSibling) {
      position++;
    }

    if (onChange) {
      return onChange({
        checked: checked,
        ref: this,
        position: position
      });
    }

    this.isChecked = !checked;
    this.setState({ checked: !checked });
  }

  onMouseDown() {
    this.setState({ mouseDown: !this.state.checked });
  }

  render() {
    const {
      children,
      styles = {}
    } = this.props;

    const checked = this.state.checked || this.props.checked;

    const radioButtonStyles = [
      RadioButtonStyles.normalStyle,
      styles.normalStyle
    ];
    const offButtonStyles = [
      RadioButtonStyles.offButtonStyle,
      styles.offButtonStyle
    ];
    const onButtonStyles = [
      RadioButtonStyles.onButtonStyle,
      styles.onButtonStyle,
      checked && RadioButtonStyles.onButtonFillStyle
    ];
    const childContianerStyles = [
      children && children.length ?
        RadioButtonStyles.childBigStyle :
        RadioButtonStyles.childStyle,
      styles.childStyle
    ];

    return (
      <div
        onClick={ ::this.onClick }
        onMouseDown={ ::this.onMouseDown }
        styles={ radioButtonStyles }
        tabIndex={0}>
        <div styles={ offButtonStyles } />
        <div styles={ onButtonStyles } />
        <div styles={ childContianerStyles }>
          { children }
        </div>
      </div>
    );
  }
}

