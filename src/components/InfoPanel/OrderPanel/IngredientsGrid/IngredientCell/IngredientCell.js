import React from 'react';
import QuantityDialer from './QuantityDialer/QuantityDialer';
import classes from './IngredientCell.css'
import icons from '../../../../../assets/icons.svg'

const ingredientCell = (props) => {
    return (
        <div className={classes.Control}>
            <QuantityDialer
                quantity={props.quantity}
                type={props.type}
                addHandler={props.addHandler}
                removeHandler={props.removeHandler}/>
                
            <svg className={classes.Icon}>
                    <use href={icons + `#${props.type}`}/>
            </svg>

            <div className={classes.Legend}>{props.type}</div>
            <div className={classes.Price}>{`${props.price}$`}</div>
        </div>
    );
}

export default ingredientCell;