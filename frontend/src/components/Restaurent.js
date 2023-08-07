import { Fragment } from 'react';

import RestaurentHeading from './RestaurentHeading';
import RestaurentItem from './RestaurentItem';

import classes from './Restaurent.module.css';

function parseItems(name, items) {
    const parsedItems = [];

    for (const item of items) {
        parsedItems.push(<RestaurentItem key={item.foodName} restaurentName={name} itemData={item} />)
    }
    return parsedItems
}

function Restaurent(props) {
    const parsedItems = parseItems(props.restaurentName, props.items);
    return (
        <Fragment>
            <div className={classes.RestrauntListEntry}>
                <RestaurentHeading restaurentName={props.restaurentName} />
                <div className={classes.RestrauntListEntries}>
                    {parsedItems}
                </div>
            </div>
        </Fragment>
    );
}

export default Restaurent;