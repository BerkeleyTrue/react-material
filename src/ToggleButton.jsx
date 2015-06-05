import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors } from './style';

const ToggleButtonStyles = StyleSheet.create({
  normalStyle: {
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    cursor: 'pointer',
    display: 'block',
    position: 'relative'
  },

  lineStyle: {
    backgroundColor: Colors.grey.P700,
    height: '1px',
    webkitTapHighlightColor: 'rgba(0,0,0,0)',
    left: 0,
    position: 'absolute',
    top: '10px',
    width: '38px'
  },

  circleStyle: {
    border: 'solid 2px',
    borderColor: Colors.grey.P700,
    borderRadius: '50%',
    height: '16px',
    backgroundColor: Colors.grey.P100,
    left: 0,
    position: 'absolute',
    top: 0,
    width: '16px',
    transition: 'left .28s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'left'
  },

  childStyle: {
    paddingLeft: '16px'
  },

  childBigStyle: {
    paddingLeft: '32px'
  },

  checkedStyle: {
    left: '20px'
  },

  circlePositionStyle: {
    display: 'inline-block',
    position: 'absolute',
    right: 0,
    top: 0,
    width: '40px'
  },

  onButtonStyle: {
    backgroundColor: Colors.grey.P700,
    borderRadius: '50%',
    height: '20px',
    left: '-2px',
    position: 'absolute',
    top: '-2px',
    transform: 'scale(0)',
    transition: 'transform ease 0.28s',
    width: '20px',
    willChange: 'transform'
  },

  onButtonFillStyle: {
    transform: 'scale(1)'
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    };
  }
  static displayName = 'ToggleButton'
  static propTypes = {
    children: PropTypes.node,
    onChange: PropTypes.func,
    styles: PropTypes.object
  }

  onClick() {
    const { onChange } = this.props;
    const {
      checked
    } = this.state;

    this.isChecked = !checked;
    this.setState({ checked: !checked });
    if (onChange) {
      onChange({ checked: this.isChecked });
    }
  }

  render() {
    const {
      children,
      styles
    } = this.props;
    const {
      checked
    } = this.state;

    const circleStyle = [ToggleButtonStyles.circleStyle];
    let onButtonStyle = [ToggleButtonStyles.onButtonStyle];

    if (checked) {
      circleStyle.push(ToggleButtonStyles.checkedStyle);
    }

    if (styles) {
      onButtonStyle = onButtonStyle.concat(styles.onButtonStyle);
    }

    if (checked) {
      onButtonStyle.push(ToggleButtonStyles.onButtonFillStyle);
    }

    return (
      <div
        onClick={ ::this.onClick }
        styles={ ToggleButtonStyles.normalStyle }>
        { children }
        <div styles={ ToggleButtonStyles.circlePositionStyle }>
          <div styles={ ToggleButtonStyles.lineStyle } />
          <div styles={ circleStyle }>
            <div styles={ onButtonStyle } />
          </div>
        </div>
      </div>
    );
  }
}
