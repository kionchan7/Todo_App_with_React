import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import { View, TextInput } from "react-native";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";

//  Create Ref for multiline text input
let description = React.createRef();

export class AddDescription extends Component {
  constructor(props) {
    super(props);
    this.state = { snackbaropen: false, snackbarmsg: "" };
  }

  //  Set description
  handleClick = (event) => {
    this.props.setDescription(description.current.value);
  };

  //  Close Modal
  snackbarClose = (event) => {
    this.setState({ snackbaropen: false });
  };

  //  Render Modal with animation, multiline textbox, close button, and submit button
  //  Close Modal when clicking outside the Modal
  render() {
    return (
      <div className="container">
        
        {/* Animation */}
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={this.state.snackbaropen}
          autoHideDuration={3000}
          onClose={this.snackbarClose}
          message={<span id="message-id">{this.state.snackbarmsg}</span>}
          action={[
            <IconButton
              key="close"
              arial-label="Close"
              color="inherit"
              onClick={this.snackbarClose}
            >
              x
            </IconButton>,
          ]}
        />

        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title className="todo-input1">
              <h2>
                <b>Add Task Description</b>
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <View>
              <TextInput
                ref={description}
                style={{
                  height: 150,
                  margin: 0,
                  padding: 0,
                  borderColor: "gray",
                  borderWidth: 3,

                  fontSize: 25,
                }}
                multiline={true}
                autoFocus={true}
              />
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClick} variant="primary" type="button">
              Submit
            </Button>
            <Button variant="danger" onClick={this.props.onHide}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
