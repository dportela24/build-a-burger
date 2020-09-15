import React from 'react'
import IngredientCell from './IngredientCell/IngredientCell'
import classes from './IngredientsGrid.css'

const sortByPrice = (ingredientList) => ingredientList.sort( (a, b) => {
    return b[2] - a[2];
})

const orderControls = (props) => {

    let ingredientsJSX = sortByPrice(props.ingredientsInfo)
        .map( (ingredient) => {
            const type = ingredient[0];
            return <IngredientCell
                key={type}
                type={type} 
                quantity={ingredient[1]}
                price={ingredient[2]}
                addHandler={props.addHandler}
                removeHandler={props.removeHandler}
            />
        })

    return (
        <div className={classes.Controls}> 
            {ingredientsJSX}
         </div>
    )
}

export default orderControls;