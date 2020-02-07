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
        padding: 0,        
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
                    style={customStyles}
                    className="mapModalBackground"
                >
                    <div className="mapModalContainer">
                        <h2 className="mapModalTitle">Details of {driver}'s trip</h2>
                        <button className="mapModalButton" onClick={() => handleModalVisibility(false)}>
                        &times;
                        </button>
                    </div>
                    
                    <div className="mapModalContainer">
                    <iframe
                        title={"map"}
                        width="90%"
                        height="500px"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/directions?origin=rato&waypoints=${destination}&destination=rato&key=${process.env.REACT_APP_MAPS_KEY}`}
                        allowFullScreen
                        className="startModalContainer"
                    ></iframe>
                    </div>
                </Modal>
            </>
        );
    }
}

export default MapModal;
