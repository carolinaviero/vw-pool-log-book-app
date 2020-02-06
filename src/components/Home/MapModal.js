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

class MapModal extends React.Component {
    render() {
        const { trip, isModalVisible, handleModalVisibility } = this.props;
        const { driver, destination } = trip;

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
                    <div>I am a modal</div>
                    <p>details {driver}</p>

                    <iframe
                        title={"map"}
                        width="100%"
                        height="450"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/directions?origin=rato&waypoints=${destination}&destination=rato&key=${process.env.REACT_APP_MAPS_KEY}`}
                        allowFullScreen
                    ></iframe>
                </Modal>
            </>
        );
    }
}

export default MapModal;
