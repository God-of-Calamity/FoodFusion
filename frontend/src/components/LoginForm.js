import { Fragment, useState } from 'react';
import { Form, Link, useNavigation, useActionData } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/CartSlice';

import Loader from './Loader';
import classes from './LoginForm.module.css';

function LoginForm() {
    const errorData = useActionData();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    const replaceCartHandler = () => {
        dispatch(cartActions.replaceCart());
    }

    return (
        <Fragment>
            {isSubmitting && <Loader />}
            <div className={classes.box} >
                <div className={classes.cmi}>
                    <Link className={classes.anchor} to="/">
                        <img src="/images/lg_cm.png" alt="cross mark" style={{
                            height: '5vh'
                        }} />
                    </Link>
                </div>
                <br />

                <img src="/images/lg_MenuIcon.png" alt="mi" style={{ height: '4vh' }} />
                <img src="/images/lg_dish_icon.png" alt="di" style={{ height: '4vh' }} />
                <img src="/images/lg_fork_icon.png" alt="fi" style={{ height: '4vh' }} />
                <br />
                <hr className={classes.hr} />

                <img src="/images/lg_emoji.png" alt="emoji" style={{ height: '7vh' }} />
                <br />
                <img src="/images/lg_ItsTimeToEat.png" alt="time to eat" style={{ height: '1.5vh' }} />
                <br /><br />

                {errorData && <p className={classes.error}>{errorData.error}</p>}
                <Form method="POST">
                    <label className={classes.label} htmlFor="email">Email</label>
                    <input name="email" id="email" type="email" />
                    <br />

                    <label className={classes.label} htmlFor="password">Password</label>
                    <input name="password" id="password" type="password" />
                    <br />

                    <select className={classes.select} name="type" id="option">
                        <option value="customer">Customer</option>
                        <option value="staff">Staff</option>
                        <option value="manager">Manager</option>
                    </select>
                    <button onClick={replaceCartHandler} className={classes.btn} type="submit" disabled={isSubmitting}>{isSubmitting ? 'Logging' : 'Log In'}</button>
                </Form>

                <span className={classes.span}>No account? </span>
                <Link className={classes.anchor} to="/signup">
                    <span className={`${classes.span} ${classes.signup}`} >
                        Sign up
                    </span>
                </Link>
            </div>
        </Fragment>
    );
}

export default LoginForm;