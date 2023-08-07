import { Fragment } from 'react';
import { Form, Link, useNavigation, useActionData } from 'react-router-dom';

import Loader from './Loader';
import classes from './AddRestaurentForm.module.css';

function AddRestaurentForm() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const errordata = useActionData();
    return (
        <Fragment>
            {isSubmitting && <Loader />}
            <div className={classes.box} >
                <div className={classes.cmi}>
                    <Link to="/" className={classes.anchor}>
                        <img src="/images/addRestaurant/su_cm.png" alt="cross mark" style={{ height: '5vh' }} />
                    </Link>
                </div>

                <br />
                <img src="/images/addRestaurant/su_MenuIcon.png" alt="mi" style={{ height: '4vh' }} />
                <img src="/images/addRestaurant/su_dish_icon.png" alt="di" style={{ height: '4vh' }} />
                <img src="/images/addRestaurant/su_fork_icon.png" alt="fi" style={{ height: '4vh' }} />
                <br />
                <hr className={classes.hr} />

                <img src="/images/addRestaurant/cap.png" alt="emoji" style={{ height: '7vh' }} />
                <br /><br />

                {/* <Form action="/add_restaurant" method="post"> */}
                {errordata && errordata.error && <p className={classes.error}>{errordata.error}</p>}
                <Form method='POST'>
                    <input className={classes.input} type="text" name="restaurent" placeholder="Name of restaurant" required autoFocus /><br />
                    <input className={classes.input} type="text" name="manager" placeholder="Name of Manager/Owner" required /><br />
                    <input className={classes.input} type="email" name="email" placeholder="Email Address" required /><br />
                    <input className={classes.input} type="password" name="password" placeholder="Password" required /><br />
                    <input className={classes.input} type="password" name="password_check" placeholder="Confirm Password" required /><br />
                    <input className={classes.input} type="text" name="address" placeholder="Address" required /><br /><br />
                    <button className={classes.btn} type="submit" >Add</button>
                </Form>
            </div>
        </Fragment>
    );
}

export default AddRestaurentForm;