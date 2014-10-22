/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Colors = require('../style/Colors');

var RippleContainer = require('../components/RippleContainer');

var TabsStyles = {
	normalStyle: ReactStyle({
		position: 'relative',
		width: '100%'
	}),

	tabTitlesContainerStyle: ReactStyle({
		webkitTapHighlightColor: 'rgba(0,0,0,0)',
		backgroundColor: Colors.cyan.P500,
		lineHeight: '48px',
		margin: 0,
		padding: 0,
		height: 48,
		position: 'relative',
		cursor: 'pointer',
		color: 'white',
		fontSize: 14,
		fontWeight: '500',
		boxShadow: '0px 3px 2px rgba(0, 0, 0, 0.2)'
	}),

	tabTitleStyle: ReactStyle({
		height: '100%',
		display: 'inline-block',
		textAlign: 'center',
		userSelect: 'none',
		position: 'relative',
		overflow: 'hidden',
		opacity: '.6',
		transition: 'opacity .38s linear'
	}),

	tabTitleSelectedStyle: ReactStyle({
		opacity: '1'
	}),

	selectionBarStyle: ReactStyle({
		backgroundColor: Colors.yellow.A100,
		height: 2,
		transition: 'left .28s linear',
		position: 'absolute',
		bottom: 0
	})
};

var Tabs = React.createClass({

  render() {
    var props = this.props;
	  var styles = TabsStyles;
    var titles = [];
    var children = props.children;
    var selectedTab;
    var selectedIndex = 0;
    for (var i = 0, l = children.length; i < l; i++) {
      var child = children[i];
      var childProps = child.props;
      var tabTitleStyles = [styles.tabTitleStyle,
	                          ReactStyle({width:(100 / children.length) + '%'})];
      if (childProps.selected) {
        tabTitleStyles.push(styles.tabTitleSelectedStyle);
        selectedTab = child;
        selectedIndex = i;
      }

      titles[i] = <li key={i} styles={tabTitleStyles}>
		                <RippleContainer onClick={this.onTabHeaderClick} />
	                  {childProps.title}
	                </li>;
    }
    var normalStyles = [styles.normalStyle];
    if (props.styles) {
      normalStyles = normalStyles.concat(props.styles);
    }
    return <div styles={normalStyles}>
      <ul styles={styles.tabTitlesContainerStyle}>
        {titles}
        <div styles={[styles.selectionBarStyle,
											ReactStyle({
												width:(100 / children.length) + '%',
												left: (100 / children.length * selectedIndex) + '%'
											})
										]}/>
      </ul>
      {selectedTab}
    </div>

  },

  onTabHeaderClick(e) {
    var props = this.props;
    if (props.onChange) {
      var position = 0;
      var target = e.target;

      while (target = target.previousSibling) {
        position++;
      }

      // enhance the event with the position of the blind
      e.position = position;
      props.onChange(e);
    }
  }

});

module.exports = Tabs;