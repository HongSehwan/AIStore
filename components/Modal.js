import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal-content">
                <span className="close-btn" onClick={onClose}>
                    &times;
                </span>
                {children}
            </div>
        </div>,
        document.getElementById("modal-root")
    );
};

export default Modal;
