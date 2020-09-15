import React from 'react';
import classes from './QuantityDialer.css'
import icons from '../../../../../../assets/icons.svg'

const quantityDialer = (props) => {
    return (
        <div className={classes.Dialer}>
            <button className={classes.RemoveBtn} onClick={() => props.removeHandler(props.type)}>
                <svg className={classes.Icon}>
                    <use href={icons + '#minus'}/>
                </svg>
            </button>

            <div className={classes.Quantity}>{props.quantity}</div>

            <button className={classes.AddBtn} onClick={() => props.addHandler(props.type)}>
                <svg className={classes.Icon}>
                    <use href={icons + '#plus'}/>
                </svg>
            </button>
        </div>
    );
}

export default quantityDialer;