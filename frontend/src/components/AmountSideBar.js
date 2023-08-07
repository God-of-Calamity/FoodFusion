import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import AmountSideBarHeading from './AmountSideBarHeading';
import AmountSideBarItem from './AmountSideBarItem';
import AmountSideBarFooter from './AmountSideBarFooter';

import classes from './AmountSideBar.module.css';

function parseCartData(cartData) {
    const parsedData = [];
    let foodName = null;
    let price = null;
    let quantity = null;
    let uniqueKey = null;
    let conuter = 1;
    if (cartData.totalOrders) {
        for (let i = 0; i < cartData.totalOrders.length; i++) {
            for (let j = 0; j < ((cartData.totalOrders)[i]).orders.length; j++) {
                foodName = ((((cartData.totalOrders)[i]).orders)[j]).foodName
                price = ((((cartData.totalOrders)[i]).orders)[j]).price
                quantity = ((((cartData.totalOrders)[i]).orders)[j]).quantity;
                uniqueKey = `${((cartData.totalOrders)[i]).restaurentName}_${foodName}`
                parsedData.push(<AmountSideBarItem key={uniqueKey} counter={conuter} foodName={foodName} price={price} quantity={quantity} />);
                conuter++;
            }
        }
    }
    return parsedData;
}

function parseStatusData(statusData) {
    if (!statusData.loadStatus) {
        return [];
    }
    if (statusData.items && statusData.items.length > 0) {
        const parsedData = [];
        (statusData.items).map(item => parsedData.push(<AmountSideBarItem
            key={item._id}
            foodName={item.foodName}
            quantity={item.quantity}
            price={item.price}
            counter={'✅'}
        />))
        return parsedData;
    }
    return [];
}

function AmountSideBar(props) {
    const cartData = useSelector((state) => state.cart);
    const statusData = useSelector(state => state.status);

    const parsedCartData = parseCartData(cartData);
    const parsedStatusData = parseStatusData(statusData);

    return (
        <Fragment>
            <AmountSideBarHeading />
            <div className={classes.shoppingListTableMainDiv}>
                {!statusData.loadStatus && parsedCartData}
                {statusData.loadStatus && !(statusData.error) && (parsedStatusData.length === 0) && <p>No Order is Ready yet 😢</p>}
                {statusData.loadStatus && !(statusData.error) && (parsedStatusData.length > 0) && parsedStatusData}
                {statusData.loadStatus && (statusData.error) && <p>You have no orders 😢</p>}
            </div>
            <br />
            <AmountSideBarFooter cartData={cartData} />
        </Fragment>
    );
}

export default AmountSideBar;