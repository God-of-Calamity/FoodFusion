import { Fragment, useState } from 'react';

import DeleteModal from '../Modal/DeleteModal';

import classes from './FoodItem.module.css';

function FoodItem(props) {
    const [showModal, setShowModal] = useState(false);
    const showModalHandler = () => setShowModal(true);
    const closeModalHandler = () => setShowModal(false);

    return (
        <Fragment>
            {showModal && <DeleteModal onConfirm={closeModalHandler} foodName={props.foodName} changeFoodData={props.changeFoodData} />}
            <div className={classes.RestrauntItem}>
                <div className={classes.RestrauntItemHeading}><div>{props.foodName}</div><div className={classes.cross} onClick={showModalHandler}>❌</div></div>
                <div className={classes.RestrauntItemImage}>
                    <img className={classes.image} src={`http://localhost:4000/${props.restaurentName}/${props.foodName}/resize`} />
                </div>
                <div className={classes.RestrauntItemMenu}>
                    <div className={`${classes.MenuComponents} ${classes.Time}`}>Made By: {props.owner}</div>
                    <div className={`${classes.MenuComponents} ${classes.Price}`}>Price: {props.price}/-</div>
                    <div className={`${classes.MenuComponents} ${classes.Time}`}>Time: {props.time}</div>
                </div>
            </div>
        </Fragment>
    );
}

export default FoodItem;