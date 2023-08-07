import { Fragment } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';

import classes from './Navigation.module.css';

function Navigation(props) {
    const navigate = useNavigate();
    const logoutHandler = () => {
        const logout = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/');
            }

            let endPoint = null;
            if (userData.type === 'customer') {
                endPoint = 'users';
            }
            else if (userData.type === 'manager') {
                endPoint = 'managers';
            } else if (userData.type === 'staff') {
                endPoint = 'staffs';
            }

            const response = await fetch(`http://localhost:4000/${endPoint}/logout`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

            if (!response.ok) {
                throw json({ error: 'Internal Server Error', status: 500 });
            }
        }
        try {
            logout();
            navigate('/');
        } catch (error) {
            throw json({ error: 'Could not logout...' });
        }

    }

    const logoutHandlerAll = () => {
        const logout = async () => {
            const userData = JSON.parse(localStorage.getItem('userData'));
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/');
            }

            let endPoint = null;
            if (userData.type === 'customer') {
                endPoint = 'users';
            }
            else if (userData.type === 'manager') {
                endPoint = 'managers';
            } else if (userData.type === 'staff') {
                endPoint = 'staffs';
            }

            const response = await fetch(`http://localhost:4000/${endPoint}/logoutAll`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

            if (!response.ok) {
                throw json({ error: 'Internal Server Error', status: 500 });
            }
        }
        try {
            logout();
            navigate('/');
        } catch (error) {
            throw json({ error: 'Could not logout...' });
        }

    }

    return (
        <Fragment>
            <div className={`${classes['button-home']} ${classes.grp1} ${classes.home}`}>
                <span className={classes['span-button-home']}>
                    <Link className={classes['home-btn']} to={props.homeURL}>
                        <img src="/images/home_icon.png" className={classes.homeImage} alt="hi" />
                        Home
                    </Link>
                </span>
            </div>
            <div className={`${classes.buttons} ${classes.grp1}`}><span className={classes['span-button-one']}><Link to="/aboutUs" className={classes.link}>About</Link></span></div>

            <div className={`${classes.buttons} ${classes.grp2}`}><span className={classes['span-button-one']}><Link to="/userProfile" className={classes.link}>Profile</Link></span></div>
            <div className={`${classes.buttons} ${classes.grp2}`}>
                <span className={classes['span-button-one']}>
                    <Link onClick={logoutHandler} className={`${classes.link}`}>Logout</Link>
                </span>
            </div>
            <div className={`${classes.buttons} ${classes.grp2}`}>
                <span className={classes['span-button-one']}>
                    <Link onClick={logoutHandlerAll} className={`${classes.link}`}>LogoutAll</Link>
                </span>
            </div>

            <hr className={classes['first-break']} />
        </Fragment>
    );
}

export default Navigation;