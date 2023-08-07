import { Fragment, useState, useEffect, useCallback } from 'react';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import OrderListHeading from '../components/OrderListHeading';
import OrderListItem from '../components/OrderListItem';
import ReadyOrders from '../components/ReadyOrders'
import Footer from '../components/Footer';

import classes from './Orders.module.css';

function Orders(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [orderData, setOrderData] = useState([]);
    const [readyData, setReadyData] = useState([]);
    let parsedData = [];
    let readyFoodData = [];

    const fetchData = useCallback(async () => {
        const response = await fetch(`http://localhost:4000/foods/activeOrders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ restaurentName: userData.restaurentName })
        });
        const responseData = await response.json();
        parsedData = [];
        readyFoodData = [];

        for (let i = 0; i < responseData.length; i++) {
            if ((responseData[i]).state.toLowerCase() !== 'done') {
                parsedData.push(<OrderListItem
                    key={(responseData[i])._id}
                    userName={(responseData[i]).userName}
                    foodName={(responseData[i]).foodName}
                    quantity={(responseData[i]).quantity}
                    time={(responseData[i]).time}
                    state={(responseData[i]).state}
                    email={(responseData[i]).email}
                    price={(responseData[i]).price}
                    _id={(responseData[i])._id}
                />);
            }

            if ((responseData[i]).state.toLowerCase() === 'done') {
                readyFoodData.push({
                    key: (responseData[i])._id,
                    userName: (responseData[i]).userName,
                    foodName: (responseData[i]).foodName,
                    email: (responseData[i]).email,
                    quantity: (responseData[i]).quantity,
                    price: (responseData[i]).price,
                    restaurentName: (responseData[i]).restaurentName
                });
            }
        }
        setOrderData(parsedData);
        setReadyData(readyFoodData);
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        const interval = setInterval(() => {
            fetchData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Fragment>
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={props.homeURL} />
                <div className={classes.head}>
                    <span className={classes['span-p2-one']}>
                        <span className={classes['restaurant-name']}>{userData.restaurentName} /</span>
                        <small>Orders</small>
                    </span>
                </div>

                <div>
                    <p className={classes['in-process']}>Orders In Process....</p>
                </div>
                <div>
                    <div className={classes.orders}>
                        <OrderListHeading />
                        <div className={classes['order-list']}>
                            {orderData.length > 0 && orderData}
                            {orderData.length === 0 && <p className={classes.noOrders}>No Orders To Process....</p>}
                        </div>
                    </div>
                </div>

                <ReadyOrders data={readyData} />
            </div>
            <Footer />
        </Fragment >
    );
}

export default Orders;