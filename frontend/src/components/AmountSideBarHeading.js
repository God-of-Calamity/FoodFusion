import { Fragment } from 'react';

import classes from './AmountSideBarHeading.module.css';

function AmountSideBarHeading() {
    return (
        <Fragment>
            <h1 className={classes.shoppingListTitle}>Items</h1>
            <hr className={classes.breakStyle} />
            <br />

            <div className={classes.shoppingListTableHeadingDiv}>
                <div className={classes.HeadingA}>Names</div>
                <div className={classes.HeadingB}>No.</div>
                <div className={classes.HeadingC}>Amount</div>
            </div>
        </Fragment>
    );
}

export default AmountSideBarHeading;