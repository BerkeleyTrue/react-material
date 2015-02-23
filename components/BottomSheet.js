/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var StyleSheet = require('react-style');

var Colors = require('../style/Colors');

class BottomSheet extends React.Component{

	hiddenTransformStyle() {
		var height = 0;
		if (this.isMounted()) {
			var domNode = React.findDOMNode(this);
			if (domNode) {
				height = domNode.offsetHeight + 8;
			}
		}

		return {
			visibility: 'hidden',
			transform: 'translateY(' + height + 'px)',
			transition: 'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear .21s'
		};
	}

  render(){
    var props = this.props;
	  var styles = BottomSheetStyles;
    var bottomSheetStyles = [styles.normalBottomSheetStyle];
    if (props.show) {
      bottomSheetStyles.push(styles.showBottomSheetStyle);
    }
    else {
      bottomSheetStyles.push(this.hiddenTransformStyle());
    }
    if (props.styles) {
      bottomSheetStyles = bottomSheetStyles.concat(props.styles);
    }
    return <div styles={bottomSheetStyles}>
    {props.title &&
      <div styles={styles.titleStyle}>
        {props.title}
      </div>
      }

      {props.children}
    </div>;
  }

  componentDidMount(){
    this.forceUpdate(); // to enforce calculation of height
  }

}

var BottomSheetStyles = StyleSheet.create({

  normalBottomSheetStyle: {
    backgroundColor: 'white',
    borderTop: '1px solid ' + Colors.grey.P300,
    bottom: 0,
    left: 0,
    paddingBottom: 8,
    position: 'fixed',
    right: 0,
    transition: 'transform .2s cubic-bezier(.4,0,.2,1), visibility 0s linear 0s',
    visibility: 'visible',
    zIndex: '3'
  },

  showBottomSheetStyle: {
    transform: 'translateY(0)'
  },

  titleStyle: {
    color: Colors.grey.P500,
    cursor: 'default',
    padding: 16
  }

});

module.exports = BottomSheet;