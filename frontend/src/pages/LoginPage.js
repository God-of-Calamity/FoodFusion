import { Fragment } from 'react';
import { Link, redirect } from 'react-router-dom';

import LoginForm from "../components/LoginForm";

import classes from './LoginPage.module.css';

function LoginPage() {
    return (
        <Fragment>
            <div className={classes.bgi}></div>
            <Link className={classes['website-name']} to="/">Food Fusion</Link>
            <LoginForm />
        </Fragment>
    );
}

export default LoginPage;

export async function action({ request }) {
    const data = await request.formData();
    const userData = {
        email: data.get('email'),
        password: data.get('password'),
        type: data.get('type')
    }
    let endPoint = (data.get('type') === 'customer') ? 'users/login' : 'managers/login';
    if (data.get('type') === 'customer') {
        endPoint = 'users/login';
    }
    else if (data.get('type') === 'manager') {
        endPoint = 'managers/login';
    }
    else {
        endPoint = 'staffs/login';
    }
    const response = await fetch(`http://localhost:4000/${endPoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        return ({ error: 'Unable to login user....', status: 400 });
    }

    const responseData = await response.json();
    localStorage.setItem('token', responseData.token);
    console.log(responseData);

    if (responseData.manager && responseData.manager.type === 'manager') {
        localStorage.setItem('userData', JSON.stringify({
            _id: responseData.manager._id,
            userName: responseData.manager.userName,
            email: responseData.manager.email,
            restaurentName: responseData.manager.restaurentName,
            address: responseData.manager.address,
            type: 'manager'
        }));
        return redirect('/managerHome');
    }
    if (responseData.user && responseData.user.type === 'customer') {
        localStorage.setItem('userData', JSON.stringify({
            _id: responseData.user._id,
            userName: responseData.user.userName,
            email: responseData.user.email,
            type: 'customer'
        }));

        return redirect('/userHome');
    }
    if (responseData.staff && responseData.staff.type === 'staff') {
        localStorage.setItem('userData', JSON.stringify({
            _id: responseData.staff._id,
            restaurentName: responseData.staff.restaurentName,
            userName: responseData.staff.userName,
            email: responseData.staff.email,
            type: 'staff'
        }));
        return redirect('/staffHome');
    }
    return null;
}