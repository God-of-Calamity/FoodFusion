import { Fragment } from 'react';
import { Link, json, useLoaderData } from 'react-router-dom';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import StaffContent from '../components/StaffContent';
import Footer from '../components/Footer';

import classes from './AllStaffDetailPage.module.css';

function AllStaffDetailPage(props) {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const staffData = useLoaderData();
    console.log(staffData);
    console.log(staffData);
    return (
        <Fragment>
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={props.homeURL} />
                <div className={classes.head}>
                    <span className={classes['span-p2-one']}>
                        <span className={classes['restaurant-name']}>{userData.restaurentName} /</span>
                        <small>Staff</small>
                    </span>
                </div>

                <div className={classes.staffs}>
                    <div className={classes['staff-head']}>
                        <span className={`${classes.heading} ${classes.name}`}>Name</span>
                        <span className={`${classes.heading} ${classes.email}`}>Email</span>
                    </div>
                    <div className={classes['staff-list']}>
                        {staffData.length > 0 && (staffData[0] !== '500') && (staffData).map(data => <StaffContent key={data._id} userName={data.userName} email={data.email} />)}
                        {staffData.length === 0 && <p className={classes.noStaff}>You Currently have no Staff Members....</p>}
                        {staffData.length > 0 && staffData[0] === '500' && 'Internal Server Error: 500'}
                    </div>
                </div>
                <div className={classes['add-btn-cl']}>
                    <div className={classes['add_new']}>
                        <Link to="addStaff">ADD NEW STAFF</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </Fragment >
    );
}

export default AllStaffDetailPage;

export async function loader() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    const response = await fetch('http://localhost:4000/staffs/allDetails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        return (['500', { error: 'Could Not Fetch Staff Data...' }, { status: 500 }]);
    }
    return response;
}