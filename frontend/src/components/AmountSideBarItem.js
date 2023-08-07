import { Fragment } from 'react';

import classes from './AmountSideBarItem.module.css';

function AmountSideBarItem(props) {
    return (
        <Fragment>
            <div className={classes.shoppingListTableDiv}>
                <div className={classes.ItemA}>{props.counter}</div>
                <div className={classes.ItemB}>{props.foodName}</div>
                <div className={classes.ItemC}>{props.quantity}</div>
                <div className={classes.ItemD}>{parseInt(props.price) * parseInt(props.quantity)}/-</div>
            </div>
        </Fragment>
    );
}

export default AmountSideBarItem;