import { Fragment } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

import classes from './ProfilePage.module.css';

function ProfilePage(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const data = useLoaderData();
    let url = undefined;

    if (userData.type.toLowerCase() === 'customer') {
        url = '/userHome';
    } else if (userData.type.toLowerCase() === 'manager') {
        url = '/managerHome';
    } else if (userData.type.toLowerCase() === 'staff') {
        url = '/staffHome';
    }

    console.log(data);
    return (
        <Fragment>
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={url} />

                <div className={classes.pic}><p className={classes.initialLetter}>{data.userName[0].toUpperCase()}</p></div>
                <p className={classes.info}>Name: <span className={classes.text1}>{data.userName}</span></p>
                <p className={classes.info}>Email: <span className={classes.text2}>{data.email}</span></p>
                {data.restaurentName && data.type === 'manager' && <p className={classes.info}>Owner Of: <span className={classes.text1}>{data.restaurentName}</span></p>}
                {data.restaurentName && data.type === 'staff' && <p className={classes.info}>Works At: <span className={classes.text1}>{data.restaurentName}</span></p>}
            </div>
            <Footer />
        </Fragment>
    );
}

export default ProfilePage;

export async function loader() {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!token) {
        return redirect('/login');
    }
    if (!userData) {
        return redirect('/login');
    }

    let endPoint = null;
    if (userData.type === 'customer') {
        endPoint = 'users';
    }
    else if (userData.type === 'manager') {
        endPoint = 'managers';
    } else if (userData.type === 'staff') {
        endPoint = 'staffs';
    }

    const response = await fetch(`http://localhost:4000/${endPoint}/fetchProfile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        return redirect('/login');
    }
    return response;
}