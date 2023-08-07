import { Fragment } from 'react';
import { json, useActionData, useNavigation } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import AddStaffForm from '../components/AddStaffForm';
import Loader from '../components/Loader';
import Footer from '../components/Footer';

import classes from './AddStaffPage.module.css';

function AddStaffPage(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const isCreated = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    console.log(isCreated);
    return (
        <Fragment>
            {isSubmitting && <Loader text={'Submitting'} />}
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={props.homeURL} />
                <div className={classes.head}>
                    <span className={classes['span-p2-one']}>
                        <span className={classes['restaurant-name']}>{userData.restaurentName} /</span>
                        <small>Add Staff</small>
                    </span>
                </div>

                <h1 className={classes.heading2}>Add New Staff</h1>
                <div className={classes['add_item']}>
                    {isCreated && <p className={classes.staffCreated}>{isCreated.success}</p>}
                    <AddStaffForm />
                </div>
            </div>

            <Footer />
        </Fragment>
    );
}

export default AddStaffPage;

export async function action({ request }) {
    const data = await request.formData();
    const userData = JSON.parse(localStorage.getItem('userData'));
    const staffData = {
        restaurentName: userData.restaurentName,
        userName: data.get('userName'),
        email: data.get('email'),
        password: data.get('password'),
        type: 'staff'
    };

    const response = await fetch('http://localhost:4000/staffs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(staffData)
    });

    if (!response.ok) {
        throw json({ error: 'Could Not create a staff member.', status: 500 }, { status: 500 });
    }
    return { success: 'Staff Member Created' };
}