import { Fragment } from 'react';

import classes from '../components/Loader.module.css';

function Loader(props) {
    return (
        <div className={classes.loader}>
            <p className={classes.text}>{props.text || 'Loading...'}</p>
            <div className={classes.mainLoader}></div>
        </div>
    )
}

export default Loader;