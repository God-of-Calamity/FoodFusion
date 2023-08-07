import { Fragment } from 'react';
import { Link, json, redirect } from 'react-router-dom';

import SignUpForm from '../components/SignUpForm';
import classes from './SignUpPage.module.css';

function SignUpPage() {
    return (
        <Fragment>
            <div className={classes.bgi}></div>
            <Link to="/" className={classes['website-name']}>Food Fusion</Link>
            <SignUpForm />
        </Fragment>
    );
}

export default SignUpPage;

export async function action({ request }) {
    const data = await request.formData();
    const password = data.get('password');
    const confirmPassword = data.get('password_check');

    if (password !== confirmPassword) {
        alert('[-] Invalid Credentials....');
        return redirect('/');
    }

    const userData = {
        userName: data.get('name'),
        email: data.get('email'),
        password: data.get('password'),
        type: "customer"
    }

    const response = await fetch(`http://localhost:4000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        return ({ error: 'Could not create user...', status: 500 });
    }

    const responseData = await response.json();
    const token = responseData.token;
    localStorage.setItem('token', token);

    return redirect('/login');
}