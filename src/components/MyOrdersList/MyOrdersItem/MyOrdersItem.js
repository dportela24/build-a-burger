import React from 'react';
import Burger from '../../Burger/Burger'
import classes from './MyOrdersItem.css'

const myOrdersItem = (props) => {

    const ingredientsArray = [];

    for (const ingredient in props.ingredients) {
        const count = props.ingredients[ingredient]
        if (count) {
            ingredientsArray.push({
                name: ingredient,
                count: count
            })
        }
    }

    const ingredientsStr = ingredientsArray.map( ingredient => {
        return `${ingredient.count} x ${ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1)}`
    }).join(', ')

    return (
        <div className={classes.MyOrdersItem}>
            <div>
                <p>Ingredients: {ingredientsStr}</p>
                <p>Price: {props.price}$</p>
            </div>
            
            <Burger ingredients={props.ingredients} style={{fontSize:"5px"}}/>
        </div>
    )
}

export default myOrdersItem;