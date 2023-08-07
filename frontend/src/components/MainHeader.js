import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './MainHeader.module.css';

function MainHeader(props) {
    const userName = props.userData.userName;
    return (
        <Fragment>
            <div className={classes.header}>
                <span className={classes.logo}></span><Link to="/" className={`${classes['website-name']} ${classes.link}`}>FoodFusion</Link>
                <span className={classes['customer-name']}>Hello Mr. {userName}</span>
                <img className={classes.smiley} src="/images/smiley.png" alt="mi" />
            </div>
        </Fragment>
    );
}

export default MainHeader;