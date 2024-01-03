
import { useRef } from "react";
import "./Modal.scss";

const Modal = ({ children, onClose }) => {
    const thisModal = useRef();
    const outerClose = (e) => {
        e.target === thisModal.current && onClose && onClose();
    }

    const handleClose = () => {
        onClose && onClose();
    }
    return (
        <div className="Modal" ref={thisModal} onClick={outerClose}>
            <button className="close-btn" onClick={handleClose}>
                <i className='bx bx-x'></i>
            </button>
            {children}
        </div>
    );
}

export default Modal;