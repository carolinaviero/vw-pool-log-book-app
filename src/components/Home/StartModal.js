import React from "react";
import "./MapModal.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    width: "100%",
    height: "100%",
    border: 0,
    top: 0,
    left: 0,
    right: "auto",
    bottom: "auto",
    padding: 0
  }
};

Modal.setAppElement("#root");

class StartModal extends React.Component {
  state = {
    mileage: this.props.trip.car_start_mileage
  };

  handleInputChange = e => {
    this.setState({ mileage: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.onEditTripSubmit(
      this.props.trip,
      this.state.mileage,
      this.props.type
    );
    // this.props.handleModalVisibility(false, {});
  };

  render() {
    const { mileage } = this.state;
    const { trip, isModalVisible, handleModalVisibility, type } = this.props;
    const { car_start_mileage: initialMil } = trip;

    return (
      <>
        <Modal
          isOpen={isModalVisible}
          style={customStyles}
          className="startModalContainer"
        >
          <button
            className="startModalButton"
            onClick={() => handleModalVisibility(false)}
          >
            &times;
          </button>
          <form onSubmit={this.handleOnSubmit}>
            <label htmlFor="startMileage" className="startMileage">
              {type === "start"
                ? `Before starting your trip, what's the car's current mileage?`
                : `Thanks for ending the trip. What's the car's current mileage?`}
            </label>
            <input
              onChange={this.handleInputChange}
              id="startMileage"
              type="number"
              value={mileage}
              min={+initialMil + 1}
            />

            <input
              className="submit-button submitStart"
              type="submit"
              value="OK"
            ></input>
          </form>
        </Modal>
      </>
    );
  }
}

export default StartModal;
