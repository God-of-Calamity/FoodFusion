import { Fragment } from 'react';
import { Link } from 'react-router-dom';

import classes from './HomePage.module.css';

function HomePage() {
    return (
        <Fragment>
            <div className={classes.bg}></div>
            <header className={classes.header}>
                <nav className={classes.navigation}>
                    <Link to="login" className={classes.login}>Log In</Link>
                    <Link to="signup" className={classes.signup}>Sign Up</Link>
                </nav>
            </header>

            <div className={classes.welcome}>Welcome to</div>

            <div className={classes.highlight}>
                <div className={classes.web_name}>Food Fusion</div>
                <div className={classes.icon}><img width="116px" src="/images/frontpageIcon.PNG" alt="icon" /></div>
            </div>
        </Fragment>
    );
}

export default HomePage;