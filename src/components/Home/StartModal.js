import React from "react";
import "./MapModal.css";
import Modal from "react-modal";

const customStyles = {
    content: {
        width: "100%",
        height: "vh100",
        border: 0,
        top: 0,
        left: 0,
        right: "auto",
        bottom: "auto",
        padding: 0,
        // marginRight: "-50%",
        // transform: "translate(-50%, -50%)"
    }
};

Modal.setAppElement("#root");

class StartModal extends React.Component {
    state = {
        mileage: this.props.trip.car_start_mileage
    };

    handleInputChange = (e) => {
        this.setState({ mileage: e.target.value });
    };
    
    handleOnSubmit = (e) => {
        e.preventDefault();
        this.props.onEditTripSubmit(this.props.trip, this.state.mileage, this.props.type);
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
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={closeModal}
                    style={customStyles}
                    // contentLabel="Example Modal"
                >
                    <p onClick={() => handleModalVisibility(false)}>
                        CLOSE ME
                    </p>
                    <form onSubmit={this.handleOnSubmit}>
                        <label htmlFor="startMileage">
                            {type === "start" ? `Insert initial car mileage`: `Insert final car mileage` }
                        </label>
                        <input onChange={this.handleInputChange} id="startMileage" type="number" value={mileage} min={initialMil + 1} />
                        <input type="submit" value="DONE"></input>
                    </form>

                </Modal>
            </>
        );
    }
}

export default StartModal;
