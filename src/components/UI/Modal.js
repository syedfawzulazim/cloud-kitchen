import React from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.css'

const Backdrop = props => {
    return <div className={styles.backdrop} onClick={props.onHideCart}></div>
}
const ModalOverlay = props => {
    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>

    )
}

const portalElement = document.getElementById('overlays');

function Modal(props) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop onHideCart={props.onHideCart} />, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}

        </>
    )
}

export default Modal
