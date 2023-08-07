import { Fragment } from 'react';
import { useLoaderData, json } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import Restaurent from '../components/Restaurent';
import AmountSideBar from '../components/AmountSideBar';
import Footer from '../components/Footer';

import classes from './UserHomePage.module.css';

const restaurentData = [
    [
        'Pillai Canteen', [{
            foodName: 'Paneer',
            time: '10:00',
            price: '50',
            location: ''
        }, {
            foodName: 'Magii',
            time: '2:00',
            price: '30',
            location: ''
        }, {
            foodName: 'Burger',
            time: '5:00',
            price: '40',
            location: ''
        }]], ['Ojha Traders', [{
            foodName: 'Honey Chilly',
            time: '5:10',
            price: '60',
            location: ''
        }, {
            foodName: 'Pizza',
            time: '15:00',
            price: '50',
            location: ''
        }, {
            foodName: 'Roti',
            time: '2:00',
            price: '5',
            location: ''
        }]
    ]
];

function parseData(restaurentData) {
    const parsedData = [];
    for (const [name, items] of restaurentData) {
        parsedData.push(<Restaurent key={name} restaurentName={name} items={items} />)
    }
    return parsedData;
}

function UserHomePage() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const homeURL = '/userHome';
    const loaderData = useLoaderData();
    const restaurentList = parseData(loaderData);

    return (
        <Fragment>
            <MainHeader userData={userData} />

            <div className={classes.main}>
                <Navigation homeURL={homeURL} />

                <div className={classes.MainContent}>
                    <div className={classes.RestaurentList}>
                        {restaurentList}
                    </div>

                    <div className={classes.shoppingList}>
                        <AmountSideBar />
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default UserHomePage;

export async function loader() {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:4000/AllRestaurents/`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json({ error: 'Could Not Fetch Restaurents Data' }, { status: 500 });
    }
    return response;
}