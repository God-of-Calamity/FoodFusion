import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import classes from './ManagerHomePage.module.css';

function ManagerHomePage(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return (
        <Fragment>
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={props.homeURL} />
                <div className={classes['restaurent-name']}>{userData.restaurentName}</div>
                <div className={classes.container}>
                    <Link to="foodItems" className={`${classes.links} ${classes.anchor}`}>Food Items</Link>
                    <Link to="orders" className={`${classes.links} ${classes.anchor}`}>Orders</Link>
                    {props.showStaff && <Link to="staffDetails" className={`${classes.links} ${classes.anchor}`}>Staff</Link>}
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default ManagerHomePage;