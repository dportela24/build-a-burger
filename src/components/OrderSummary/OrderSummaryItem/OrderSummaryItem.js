import React from 'react'
import classes from './OrderSummaryItem.css'

const orderSummaryItem = (props) => {
    return (
        <li className={classes.SummaryItem}>
            <span className={classes.ItemLeftText}>
                {props.left}
            </span>

            <span className={classes.ItemRightText}>
                {props.right}
            </span>
        </li>
    )
}

export default orderSummaryItem;