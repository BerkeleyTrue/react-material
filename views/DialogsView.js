/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Button = require('../components/Button');
var Dialog = require('../components/Dialog');
var Overlay = require('../components/Overlay');

var Colors = require('../style/Colors');

var DialogsView = React.createClass({

	styles: {
		buttonBarStyle: ReactStyle({
			position: 'absolute',
			bottom: -12,
			right: -8,
			display: 'inline-block'
		}),

		textStyle: ReactStyle({
			paddingBottom: 40
		})
	},

  getInitialState() {
    return {
      show: false
    };
  },

  render() {
		var styles = this.styles;
    var state = this.state;
    return <div>
      <Button ref="button" onClick={this.onOpenDialogClick}>Open dialog</Button>
      <Overlay show={state.show} onClick={this.onOverlayClick}/>
      <Dialog title="Permissions" triggerElement={this.refs.button} width={300} show={state.show}>
        <div styles={styles.textStyle}>
          This app determines your phone's location and shares it with
          Hypnotoad in order to serve personalized ads for you. This
          allows for a better overall app experience.
        </div>
        <div styles={styles.buttonBarStyle}>
          <Button onClick={this.onOverlayClick}>Decline</Button>
          <Button onClick={this.onOverlayClick} styles={ReactStyle({color:Colors.blue.P500})}>Accept</Button>
        </div>
      </Dialog>
    </div>;
  },

  onOpenDialogClick() {
    this.setState({show: true});
  },

  onOverlayClick() {
    this.setState({show: false});
  }

});

module.exports = DialogsView;
