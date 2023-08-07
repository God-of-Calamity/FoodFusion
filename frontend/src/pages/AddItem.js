import { Fragment, useState } from 'react';

import MainHeader from '../components/MainHeader';
import Navigation from '../components/Navigation';
import AddItemForm from '../components/AddItemForm';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

import classes from './AddItem.module.css';

function AddItem(props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const userData = JSON.parse(localStorage.getItem('userData'));

    const setToSubmitHandler = () => {
        setIsSubmitting(true);
    }

    const setToRequestCompletedHandler = () => {
        setIsSubmitting(false);
    }

    return (
        <Fragment>
            {isSubmitting && <Loader text='Submitting...' />}
            <MainHeader userData={userData} />
            <div className={classes.main}>
                <Navigation homeURL={props.homeURL} />
                <div className={classes.head}>
                    <span className={classes['span-p2-one']}>
                        <span className={classes['restaurant-name']}>{userData.restaurentName} /</span>
                        <small>Add Food</small>
                    </span>
                </div>

                <h1 className={classes.heading2}>Add New Food</h1>
                <div className={classes['add_item']}>
                    <AddItemForm setToTrue={setToSubmitHandler} setToFalse={setToRequestCompletedHandler} />
                </div>
            </div>
            <Footer />
        </Fragment>
    );
}

export default AddItem;