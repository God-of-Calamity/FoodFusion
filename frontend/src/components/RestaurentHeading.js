import { Fragment } from 'react';

import classes from './RestaurentHeading.module.css';

function RestaurentHeading(props) {
    return (
        <Fragment>
            <h1 className={classes.RestrauntName}>{props.restaurentName}</h1>
            <hr className={classes.breakStyle} />
        </Fragment>
    );
}

export default RestaurentHeading;