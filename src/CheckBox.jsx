import React, { PropTypes } from 'react';
import StyleSheet from 'react-style';

import { Colors } from './style';
import { CircleShadow } from './';
import { isTransform, noop, transitionEnd } from './utils';

const CheckBoxStyles = StyleSheet.create({
  containerStyle: {
    cursor: 'pointer',
    display: 'block',
    outline: 'none',
    position: 'relative',
    WebkitTapHighlightColor: 'rgba(0,0,0,0)'
  },

  childStyle: {
    paddingLeft: '16px'
  },

  childBigStyle: {
    paddingLeft: '32px'
  },

  normalStyle: {
    borderColor: Colors.grey.P700,
    borderStyle: 'solid',
    borderWidth: '2px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    height: '18px',
    left: 0,
    marginTop: 0,
    outline: 'none',
    position: 'absolute',
    top: 0,
    transform: 'translateZ(0)',
    transition: 'transform .1s linear, ' +
    'width .1s linear, ' +
    'height .1s linear, ' +
    'margin-top .1s linear, ' +
    'left .1s linear',
    width: '18px',
    willChange: 'width, height, margin-top, left'
  },

  transitionStyle: {
    height: 0,
    left: '8px',
    marginTop: '16px',
    transform: 'translateZ(0) rotate(45deg)',
    width: 0
  },

  checkedStyle: {
    borderWidth: '0 2px 2px 0',
    borderColor: Colors.green.P600,
    height: '21px',
    marginTop: '-2px',
    width: '10px'
  },

  circleContainerStyle: {
    position: 'absolute',
    height: '20px',
    width: '20px'
  },

  circleStyle: {
    backgroundColor: Colors.green.P600
  }
});

export default class extends React.Component {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.isChecked = checked;
    this.state = { checked };
  }
  static displayName = 'CheckBox'
  static defaultProps = {
    checked: false,
    onChange: noop
  }
  static propTypes = {
    children: PropTypes.node,
    checked: PropTypes.bool,
    containerStyles: PropTypes.object,
    onChange: PropTypes.func
  }

  componentDidMount() {
    if (!transitionEnd) {
      return null;
    }

    React.findDOMNode(this.refs.checkbox)
      .addEventListener(transitionEnd, () => this.onTransitionEnd);
  }

  componentWillUnmount() {
    if (!transitionEnd) {
      return null;
    }
    React.findDOMNode(this.refs.checkbox)
      .removeEventListener(transitionEnd, () => this.onTransitionEnd);
  }

  onTransitionEnd(e) {
    var state = this.state;
    if (state.transitioning) {
      if (isTransform(e.propertyName) && !state.checked) {
        this.setState({checked: true, transitioning: false});
      }
    }
  }

  toggle() {
    this.onToggle();
  }

  onMouseDown() {
    if (!transitionEnd) {
      return null;
    }
    this.setState({ mouseDown: true });
  }

  onMouseUp() {
    if (!transitionEnd) {
      return;
    }
    this.setState({ mouseDown: false });
  }

  onToggle() {
    if (!this.state.checked) {
      this.setState({ transitioning: true });
      this.isChecked = true;
    } else {
      this.setState({ checked: false });
      this.isChecked = false;
    }
    const { onChange } = this.props;

    if (onChange) {
      onChange({ checked: this.isChecked });
    }
  }

  render() {
    const {
      children
    } = this.props;

    const {
      checked,
      transitioning
    } = this.state;

    const styles = CheckBoxStyles;
    const stylesX = [styles.normalStyle];
    let containerStyles = [styles.containerStyle];
    if (this.props.containerStyles) {
      containerStyles = containerStyles.concat(this.props.containerStyles);
    }
    if (transitioning) {
      stylesX.push(styles.transitionStyle);
    } else if (checked) {
      stylesX.push(styles.transitionStyle);
      stylesX.push(styles.checkedStyle);
    }

    const childStyle = children && children.length ?
      styles.childBigStyle :
      styles.childStyle;

    return (
      <div
        onClick={ () => this.onToggle()}
        onMouseDown={() => this.onMouseDown()}
        onMouseUp={() => this.onMouseUp()}
        styles={ containerStyles }
        tabIndex={ 0 }>
        <div
          ref='checkbox'
          styles={ stylesX } />
        <div styles={ styles.circleContainerStyle }>
          <CircleShadow
            active={ this.state.mouseDown }
            styles={ styles.circleStyle } />
        </div>
        <div styles={ childStyle } >
          { children }
        </div>
      </div>
    );
  }
}
