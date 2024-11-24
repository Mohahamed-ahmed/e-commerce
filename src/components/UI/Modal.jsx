import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
    return (
        <div className={`${classes.modal} ${props.className}`}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay onConfirm={props.onConfirm} className={props.className}>
                    {props.children}
                </ModalOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
};

export default Modal;