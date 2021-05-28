import React, { Component } from "react";
import { AddDescription } from "./AddDescription";

export class Description extends Component {
  constructor(props) {
    super(props);
    this.state = { addModalShow: false };
  }

  //  Render the lightbulb button
  render() {
    let addModalClose = () => this.setState({ addModalShow: false });
    return (
      <div>
        <button
          type="button"
          size="sm"
          variant="outline-dark"
          onClick={() => this.setState({ addModalShow: true })}
        >
          <i className="fas fa-lightbulb"></i>
        </button>
        <AddDescription
          show={this.state.addModalShow}
          onHide={addModalClose}
          setDescription={this.props.setDescription}
        />
      </div>
    );
  }
}
