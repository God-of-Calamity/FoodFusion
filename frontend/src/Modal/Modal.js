import { Fragment } from 'react';
import { json } from 'react-router-dom'
import classes from './Modal.module.css';

function Modal(props) {
    const deleteItem = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:4000/foods/deleteItem', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                restaurentName: userData.restaurentName,
                foodName: props.foodName
            })
        });

        if (!response.ok) {
            throw json({ error: 'Could Not delete item...' })
        }
        props.onConfirm();
        props.changeFoodData(props.foodName);
    }

    return (
        <Fragment>
            <div className={classes.modal}>
                <header className={classes.header}>
                    <h2>Delete Food Item</h2>
                </header>
                <div className={classes.content}>
                    <p>Are you sure ?</p>
                </div>
                <div className={classes.actions}>
                    <button onClick={deleteItem} className={classes.buttons}>Yes</button>
                    <button onClick={props.onConfirm} className={classes.buttons}>No</button>
                </div>
            </div>
        </Fragment>
    );
}

export default Modal;