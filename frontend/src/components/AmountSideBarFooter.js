import { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { cartActions } from '../store/CartSlice';
import { orderMessageAction } from '../store/orderMessage';
import { orderStatusActions } from '../store/orderStatus';
import { getCurrentStatus } from '../store/orderStatus';

import classes from './AmountSideBarFooter.module.css';

function AmountSideBarFooter(props) {
    const dispatch = useDispatch();
    const isClicked = useSelector(state => state.orderMessage.isClicked);
    const statusLoadingState = useSelector(state => state.status.statusMessage);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [isOrdered, setIsOrdered] = useState('');
    const [placingOrder, setPlacingOrder] = useState(false);

    const orderFoodHandler = async () => {
        const orderData = [];
        let restaurentName = null;
        let foodName = null;
        let time = null;
        let price = null;
        let quantity = null;

        setPlacingOrder(true);
        dispatch(orderMessageAction.unregisterClick());
        dispatch(cartActions.replaceCart());
        dispatch(orderStatusActions.unsetStatus());
        for (let i = 0; i < 100000000; i++) { }

        if (!props.cartData.totalOrders) {
            setIsOrdered('failed');
            setPlacingOrder(false);
            return;
        }
        if (props.cartData.totalOrders.length === 0) {
            setIsOrdered('failed');
            setPlacingOrder(false);
            return;
        }


        for (let i = 0; i < (props.cartData.totalOrders).length; i++) {
            for (let j = 0; j < ((props.cartData.totalOrders[i]).orders).length; j++) {
                restaurentName = (props.cartData.totalOrders[i]).restaurentName;
                foodName = (((props.cartData.totalOrders[i]).orders)[j]).foodName;
                time = (((props.cartData.totalOrders[i]).orders)[j]).time;
                price = (((props.cartData.totalOrders[i]).orders)[j]).price;
                quantity = (((props.cartData.totalOrders[i]).orders)[j]).quantity;

                orderData.push({
                    restaurentName,
                    userName: userData.userName,
                    email: userData.email,
                    foodName,
                    quantity,
                    price,
                    time,
                    state: 'start'
                });
            }
        }

        try {
            const response = await fetch('http://localhost:4000/users/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                setIsOrdered('failed');
            } else {
                setIsOrdered('success');
            }
        } catch (error) {
            setIsOrdered('failed');
        }
        setPlacingOrder(false);
    }

    const statusHandler = async () => {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const requestData = {
            userName: userData.userName,
            email: userData.email
        }


        dispatch(getCurrentStatus(requestData));

    }
    return (
        <Fragment>
            <div className={classes.shoppingListTotal}>
                <div className={classes.ShoppingListTotalTitle}>Total</div>
                <div className={classes.ShoppingListTotalAmount}>{props.cartData.totalPrice}/-</div>
            </div>
            <div className={classes.actionButtons}>
                <button disabled={placingOrder} onClick={orderFoodHandler} className={classes.ItemSubmitButton}>{placingOrder ? 'Wait' : 'Order'}</button><br />
                <button onClick={statusHandler} className={classes.ItemSubmitButton}>{statusLoadingState}</button>
                {isOrdered === 'success' && !isClicked && <p className={classes.success}>Your Order Has been placed....</p>}
                {isOrdered === 'failed' && !isClicked && <p className={classes.failed}>Could not place order. Please Try again....</p>}
            </div>
        </Fragment>
    );
}

export default AmountSideBarFooter;