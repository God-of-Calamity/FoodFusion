import { Fragment } from 'react';
import { Form } from 'react-router-dom';

import classes from './AddStaffForm.module.css';

function AddStaffForm() {
    return (
        <Fragment>
            <Form method='POST'>
                <img className={classes.img} src="/images/staff.PNG" alt="form_image" />
                <input className={classes.input} type="text" placeholder="Name" name="userName" required autoFocus />
                <br />
                <input className={classes.input} type="email" placeholder="Email" name="email" required />
                <br />
                <input className={classes.input} type="password" placeholder="Password" name="password" id="password" required />
                <button className={`${classes['add_button']} ${classes.input}`} type="submit">ADD</button>
            </Form>
        </Fragment>
    );
}

export default AddStaffForm;