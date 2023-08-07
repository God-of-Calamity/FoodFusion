import { Fragment } from 'react';

import classes from './StaffContent.module.css';

function StaffContent(props) {
    return (
        <Fragment>
            <div className={classes['staff-content']}>
                <span className={`${classes['staff-row']} ${classes.name}`}>{props.userName}</span>
                <span className={`${classes['staff-row']} ${classes.email}`}>{props.email}</span>
                <button className={`${classes['status-button']} ${classes.done}`}> DELETE</button >
            </div >
        </Fragment >
    );
}

export default StaffContent;