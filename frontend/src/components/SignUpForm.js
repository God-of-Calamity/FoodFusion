import { Fragment } from 'react';
import { Link, Form, useNavigation, useActionData } from 'react-router-dom';

import Loader from './Loader';
import classes from './SignUpForm.module.css';

function SignUpForm() {
    const errorData = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Fragment>
            {isSubmitting && <Loader />}
            <div className={classes.box} >
                <div className={classes.cmi}>
                    <Link className={classes.anchor} to="/">
                        <img src="/images/signup/su_cm.png" alt="cross mark" style={{ height: '5vh' }} />
                    </Link>
                </div>
                <br />

                <img src="/images/signup/su_MenuIcon.png" alt="mi" style={{ height: '4vh' }} />
                <img src="/images/signup/su_dish_icon.png" alt="di" style={{ height: '4vh' }} />
                <img src="/images/signup/su_fork_icon.png" alt="fi" style={{ height: '4vh' }} />
                <br />
                <hr className={classes.hr} />

                <img src="/images/signup/su_emoji.png" alt="emoji" style={{ height: '7vh' }} />
                <br />
                <img src="/images/signup/LetsGetStarted.png" alt="Lets Get Started!" style={{ height: '2vh' }} />
                <br /><br />

                {errorData && <p className={classes.error}>{errorData.error}</p>}
                <Form method="POST">
                    <input className={classes.inputText} type="text" name="name" placeholder="Name" required autoFocus />
                    <br />
                    <input className={classes.inputText} type="email" name="email" placeholder="Email" required />
                    <br />
                    <input className={classes.inputText} type="password" name="password" placeholder="Password" required />
                    <br />
                    <input className={classes.inputText} type="password" name="password_check" placeholder="Confirm Password" required />
                    <br /><br />
                    <button className={classes.btn} type="submit" >Sign Up</button>
                </Form>

                <b className={classes.bold}>Add New Restaurant?</b>
                <Link className={classes.anchor} to="/addRestaurent">
                    <b className={`${classes.clickHere} ${classes.bold}`}>
                        Click here
                    </b>
                </Link>
            </div>
        </Fragment>
    );
}

export default SignUpForm;