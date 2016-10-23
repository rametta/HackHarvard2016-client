import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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

  onUsernameChange(ev) {
    this.setState({ username: ev.target.value });
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
        <RaisedButton
          primary
          className="loginbtn"
          label={this.props.user.length ? "Logout" : "Login"}
          onTouchTap={this.props.user.length ? this.props.action : this.handleOpen} />
        <Dialog
          title="Sign in to save your portfolio!"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Username"
            onChange={() => this.onUsernameChange()}
          />
          <TextField
            type="password"
            hintText="Password"
          />
        </Dialog>
      </div>
    );
  }
}
