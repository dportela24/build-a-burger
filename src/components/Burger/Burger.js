import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient'

const PRINT_ORDER = ['egg','tomato','bacon','onion','cheese','beef','salmon','lettuce']

const burger = (props) => {

    let ingredientsJSX = PRINT_ORDER.map( (ingredient) => {
            const ingredientJSX = [];

            for (let i=0; i<props.ingredients[ingredient]; i++) {
                ingredientJSX.push(
                    <Ingredient key={ingredient + i} type={ingredient}/>
                )
            }

            return ingredientJSX;
        }).reduce( (joinedArray, element) => {
            return joinedArray.concat(element)
        }, []);

    if (ingredientsJSX.length === 0) {
        ingredientsJSX = <p>Choose your first ingredient!</p>
    }

    return (
        <div className={classes.Burger} style={props.style}>
            <Ingredient type="bread-top"/>
            {ingredientsJSX}
            <Ingredient type="bread-bottom"/>
        </div>
    )
}

export default burger;