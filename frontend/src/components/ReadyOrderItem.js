import { Fragment, useState } from 'react';

import classes from './ReadyOrderItem.module.css';

function ReadyOrderItem(props) {
    const [text, setText] = useState('DELETE');

    const deleteOrder = async () => {
        const data = {
            restaurentName: props.restaurentName,
            foodName: props.foodName,
            email: props.email
        }

        setText('Processing..');
        console.log(`Deleting ${data.email}`);
        const response = await fetch(`http://localhost:4000/foods/deleteOrder`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            setText('Try Again..')
        }
        setText('DELETE');
    }
    return (
        <Fragment>
            <div className={classes['order-content']}>
                <span className={`${classes['odr-row']} ${classes.name}`}>{props.userName}</span>
                <span className={`${classes['odr-row']} ${classes.name}`}>{props.foodName}</span>
                <span className={`${classes['odr-row']} ${classes.odrs} ${classes.email}`}>{props.email}</span>
                <span className={`${classes['status-button']} ${classes.done} ${classes.total}`}>{parseInt(props.quantity) * parseInt(props.price)}</span>
                <button onClick={deleteOrder} className={`${classes['odr-row']} ${classes.clock} ${classes.remove}`}>{text}</button>
            </div>
        </Fragment>
    );
}

export default ReadyOrderItem;