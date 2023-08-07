import { Fragment, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import FoodItem from '../components/FoodItem';
import Footer from '../components/Footer';

import classes from './FoodItemsPage.module.css';

function FoodItemsPage(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = useLoaderData();
    const [foodData, setFoodData] = useState(false);
    const dataExists = (data !== false);

    const changeFoodData = (foodName) => {
        data.items = (data.items).filter(food => food.foodName !== foodName);
        setFoodData(true);
    }

    let parsedData = [];

    if (data && data.items && data.items.length > 0) {
        parsedData = (data.items).map(item => <FoodItem
            key={item._id}
            foodName={item.foodName}
            price={item.price}
            time={item.time}
            owner={item.userName}
            restaurentName={data.restaurentName}
            changeFoodData={changeFoodData}
        />)
    }

    return (
        <Fragment>
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={props.homeURL} />
                <div className={classes.head}>
                    <span className={classes['span-p2-one']}>
                        <span className={classes['restaurant-name']}>{userData.restaurentName} /</span>
                        <small>All Items</small>
                    </span>
                </div>
                <p className={classes.itemListHeading}>All Items</p>
                <div className={classes['food-list']}>
                    {dataExists && data.items.length > 0 && parsedData}
                    {dataExists && data.items.length === 0 && <p className={classes.noFood}>No Food Items Available</p>}
                    {!dataExists}
                </div>

                <div className={classes['add-btn-cl']}>
                    <div className={classes['add_new']}>
                        <Link to="addItem">ADD NEW</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </Fragment >
    );
}

export default FoodItemsPage;

export async function loader() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    const response = await fetch(`http://localhost:4000/foods/getFoods`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        return false;
    }
    const responseData = await response.json();
    console.log('....');
    console.log(responseData);
    return responseData;
}