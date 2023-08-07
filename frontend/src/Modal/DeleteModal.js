import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import Backdrop from './Backdrop';
import Modal from './Modal';

function DeleteModal(props) {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />, document.getElementById('backdrop_root'))}
            {ReactDOM.createPortal(<Modal onConfirm={props.onConfirm} foodName={props.foodName} changeFoodData={props.changeFoodData} />, document.getElementById('modal_root'))}
        </Fragment>
    );
}

export default DeleteModal;