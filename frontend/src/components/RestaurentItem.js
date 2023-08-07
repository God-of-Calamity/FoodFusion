import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';
import { orderMessageAction } from '../store/orderMessage';
import { orderStatusActions } from '../store/orderStatus';

import classes from './RestaurentItem.module.css';

function RestaurentItem(props) {
    const dispatch = useDispatch();
    const userData = JSON.parse(localStorage.getItem('userData'));

    const addToCartHandler = () => {
        dispatch(orderStatusActions.unsetStatus());
        dispatch(cartActions.addItemToCart({
            userName: userData.userName,
            _id: userData._id,
            foodName: props.itemData.foodName,
            time: props.itemData.time,
            price: props.itemData.price,
            restaurentName: props.restaurentName,
        })); // totaQuantity totalPrice
        dispatch(orderMessageAction.registerClick());
    };

    const removeFromCartHandler = () => {
        dispatch(orderStatusActions.unsetStatus());
        dispatch(cartActions.removeItemFromCart({
            userName: userData.userName,
            _id: userData._id,
            foodName: props.itemData.foodName,
            time: props.itemData.time,
            price: props.itemData.price,
            restaurentName: props.restaurentName,
        }));
        dispatch(orderMessageAction.registerClick());
    };

    return (
        <Fragment>
            <div className={classes.RestrauntItem}>
                <div className={classes.RestrauntItemHeading}>{props.itemData.foodName}</div>
                <div className={classes.RestrauntItemImage}>
                    <img src={`http://localhost:4000/${props.restaurentName}/${props.itemData.foodName}`} />
                </div>
                <div className={classes.RestrauntItemMenu}>
                    <div className={`${classes.MenuComponents} ${classes.Price}`}>{props.itemData.price}/-</div>
                    <div className={`${classes.MenuComponents} ${classes.Time}`}>{props.itemData.time}</div>
                    <img onClick={removeFromCartHandler} src="/images/Minus.png" className={`${classes.MenuComponents} ${classes.Minus}`} />
                    <div className={`${classes.MenuComponents} ${classes.Quantity}`}>00</div>
                    <img onClick={addToCartHandler} src="/images/Plus.png" className={`${classes.MenuComponents} ${classes.Plus}`} />
                    <div onClick={addToCartHandler} className={`${classes.MenuComponents} ${classes.Add}`}>Add+</div>
                </div>
            </div>
        </Fragment>
    );
}

export default RestaurentItem;