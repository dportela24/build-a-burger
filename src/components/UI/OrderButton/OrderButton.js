import React from 'react';
import classes from './OrderButton.css'

const orderButton = (props) => {
    return <button
        className={classes.OrderBtn}
        onClick={props.onClick}>
            {props.content}
        </button>
}

export default orderButton;