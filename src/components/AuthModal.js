import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class DialogModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = { open: false };

    this.handleClose = this.handleClose.bind(this);
    this.onTouchTap = this.onTouchTap.bind(this);
  }

  onTouchTap() {
    this.props.action();
    this.handleClose();
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentWillReceiveProps(nextProps) {
    console.log('nextProps: ', nextProps);
    // set modal from here
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.onTouchTap}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Login" onTouchTap={this.handleOpen} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Username"
          />
          <TextField
            hintText="Password"
          />
        </Dialog>
      </div>
    );
  }
}