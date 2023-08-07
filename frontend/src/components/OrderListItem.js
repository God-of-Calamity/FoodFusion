import { Fragment, useState } from 'react';
import { json } from 'react-router-dom';
import classes from './OrderListItem.module.css';

// For counter setup on backend disabled=true

function OrderListItem(props) {
    const [processingState, setProcessingState] = useState(props.state.toLowerCase());
    // const [processing, setProcessing] = useState(false);
    // const [timeClock, setTimeClock] = useState(secondsToTime(calcSec(props.time, props.quantity)));
    const userData = JSON.parse(localStorage.getItem('userData'));

    function secondsToTime(sec) {
        let seconds = 0;
        let minutes = 0;
        let hours = 0;
        let time = '';
        if (sec >= 60) {
            minutes = Math.floor((sec) / 60);
            seconds = sec % 60;
        }
        if (minutes >= 60) {
            hours = Math.floor((minutes) / 60);
            minutes = minutes % 60;
        }
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }
        if (minutes < 10) {
            minutes = `0${minutes}`;
        }
        if (hours < 10) {
            hours = `0${hours}`;
        }
        time = `${hours}:${minutes}:${seconds}`;
        return time;
    }
    function calcSec(time, quantity) {
        const timeArray = (time).split(':');
        let timeInSec = 0;
        for (let i = 0; i < timeArray.length; i++) {
            timeInSec += parseInt(timeArray[i]) * (Math.pow(60, timeArray.length - i - 1));
        }
        timeInSec = timeInSec * parseInt(quantity);
        return timeInSec;
    }

    const changeProcessingState = async () => {
        const processingData = {
            restaurentName: userData.restaurentName,
            foodName: props.foodName,
            email: props.email,
            state: processingState.toLowerCase(),
            _id: props._id,
            quantity: props.quantity,
            time: props.time,
            price: props.price,
            userName: props.userName
        }

        // if (processingState.toLowerCase() === 'start') {
        //     setProcessing(true);
        //     let time = calcSec(timeClock, 1);
        //     const interval = setInterval(function () {
        //         setProcessing(false);
        //         clearInterval(interval);
        //     }, time * 1000);

        //     // const interval2 = setInterval(function () {
        //     //     if (calcSec(timeClock, 1) !== 0) {
        //     //         setTimeClock(calcSec(timeClock, 1) - 1);
        //     //         console.log(`timeClock: ${timeClock}: ${calcSec(timeClock, 1) - 1}`);
        //     //     } else {
        //     //         clearInterval(interval2);
        //     //     }
        //     // }, 1000);
        // }

        const response = await fetch(`http://localhost:4000/foods/changeProcessingState`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(processingData)
        });

        if (!response.ok) {
            // setProcessing(false);
            throw json({ error: 'Could Not Update Processing State...' });
        }

        if (processingState.toLowerCase() === 'start') {
            setProcessingState('processing');
        }
        else if (processingState.toLowerCase() === 'processing') {
            setProcessingState('done');
        }
    }

    let buttonCss = '';
    if (props.state === 'start') {
        buttonCss = 'start';
    } else if (props.state === 'processing') {
        buttonCss = 'in-process';
    }

    return (
        <Fragment>
            <div className={classes['order-content']}>
                <span className={`${classes['odr-row']} ${classes.name}`}>{props.userName}</span>
                <span className={`${classes['odr-row']} ${classes.name}`}>{props.foodName}</span>
                <span className={`${classes['odr-row']} ${classes.odrs}`}>{props.quantity}</span>
                <span className={`${classes['odr-row']} ${classes.odrs}`}>{parseInt(props.price) * parseInt(props.quantity)}</span>
                <button className={`${classes[buttonCss]} ${classes['status-button']}`} onClick={changeProcessingState} >{props.state}</button>
                <span className={`${classes['odr-row']} ${classes.clock}`}>{secondsToTime(calcSec(props.time, props.quantity))}</span>
            </div>
        </Fragment>
    );
}

export default OrderListItem;