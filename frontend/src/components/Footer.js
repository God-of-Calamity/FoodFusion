import { Fragment } from 'react';

import classes from './Footer.module.css';

function Footer() {
    return (
        <Fragment>
            <div className={classes.footer}>
                <p className={classes['first-para']}><span className={classes['span-one']}>FoodFusion</span></p>
                <p className={classes['second-para']}> About </p>
                <hr className={classes['second-break']} />
                <p className={classes['third-para']}><span>Copyright &copy; website name. All rights reserved</span></p>
            </div>
        </Fragment>
    );
}

export default Footer