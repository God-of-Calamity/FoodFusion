import { Fragment } from 'react';

import classes from './OrderListHeading.module.css';

function OrderListHeading() {
    return (
        <Fragment>
            <div className={classes['order-head']}>
                <span className={`${classes.heading} ${classes.name}`}>Name</span>
                <span className={`${classes.heading} ${classes.name}`}>Item</span>
                <span className={`${classes.heading} ${classes.odrs}`}>C Odrs</span>
                <span className={`${classes.heading} ${classes.odrs}`}>Total</span>
                <span className={`${classes.heading} ${classes.status}`}>Status</span>
                <span className={`${classes.heading} ${classes.status}`}>Clock</span>
            </div>
        </Fragment>
    );
}

export default OrderListHeading;