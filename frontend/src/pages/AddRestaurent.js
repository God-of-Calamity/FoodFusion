import { Fragment } from 'react';
import { Link, json, redirect } from 'react-router-dom';

import AddRestaurentForm from '../components/AddRestaurentForm';
import classes from './AddRestaurent.module.css';

function AddRestaurent() {
    return (
        <Fragment>
            <div className={classes.bgi}></div>
            <Link to="/" className={classes['website-name']}>Food Fusion</Link>
            <AddRestaurentForm />
        </Fragment>
    )
}

export default AddRestaurent;

export async function action({ request }) {
    const data = await request.formData();
    const password = data.get('password');
    const confirmPassword = data.get('password_check');

    if (password !== confirmPassword) {
        alert('[-] Invalid Credentials....');
        return redirect('/');
    }

    const managerData = {
        restaurentName: data.get('restaurent'),
        userName: data.get('manager'),
        email: data.get('email'),
        password: data.get('password'),
        address: data.get('address'),
        type: "manager"
    }

    const response = await fetch(`http://localhost:4000/managers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(managerData),
    });

    const responseData = await response.json();

    if (!response.ok) {
        return { error: responseData.error }
    }
    const token = responseData.token;
    localStorage.setItem('token', token);

    return redirect('/login');
}