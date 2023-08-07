import { Fragment, useState } from 'react';

import ReadyOrderHeading from './ReadyOrderHeading';
import ReadyOrderItem from './ReadyOrderItem';

import classes from './ReadyOrders.module.css';

function ReadyOrders(props) {
    let parsedData = [];
    const parseData = (data) => {
        parsedData = [];

        for (let i = 0; i < data.length; i++) {

            parsedData.push(<ReadyOrderItem
                key={data[i].key}
                userName={data[i].userName}
                foodName={data[i].foodName}
                email={data[i].email}
                quantity={data[i].quantity}
                price={data[i].price}
                restaurentName={data[i].restaurentName}
            />);
        }
    }

    parseData(props.data);
    return (
        <Fragment>
            <div className={classes.complete}>
                <p className={classes.ready}>Ready Orders....</p>
            </div>

            <div>
                <div className={classes.orders}>
                    <ReadyOrderHeading />
                    <div className={classes['order-list']}>
                        {parsedData.length > 0 && parsedData}
                        {parsedData.length === 0 && <p className={classes.noReady}>No Orders Ready yet</p>}
                    </div>

                </div>
            </div >
        </Fragment >
    );
}

export default ReadyOrders;