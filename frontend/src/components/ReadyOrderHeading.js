import { Fragment } from 'react';

import classes from './ReadyOrderHeading.module.css';

function ReadyOrderHeading() {
    return (
        <Fragment>
            <div className={classes['order-head']}>
                <span className={`${classes.heading} ${classes.name}`}>Name</span>
                <span className={`${classes.heading} ${classes.name}`}>Item</span>
                <span className={`${classes.heading} ${classes.odrs} ${classes.email}`}>Email</span>
                <span className={`${classes.heading} ${classes.status} ${classes.total}`}>Total</span>
                <span className={`${classes.heading} ${classes.status}`}>Remove</span>
            </div>
        </Fragment>
    );
}

export default ReadyOrderHeading;