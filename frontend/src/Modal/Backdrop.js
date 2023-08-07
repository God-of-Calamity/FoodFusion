import { Fragment } from 'react';

import classes from './Backdrop.module.css'

function Backdrop(props) {
    return (
        <Fragment>
            <div onClick={props.onConfirm} className={classes.backdrop}></div>
        </Fragment>
    );
}

export default Backdrop;