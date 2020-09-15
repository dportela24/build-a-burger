import React from 'react';
import classes from './Ingredient.css';
import PropTypes from "prop-types";

const ingredient = (props) => {
    const ingredientClasses = [classes.Ingredient];

    let fileName = '';
    switch(props.type) {    
        case ('bread-top'):
            fileName = 'bread-top.png';
            ingredientClasses.push(classes.BreadTop);
            break;
            case ('tomato'):
            fileName = 'tomato.png';
            ingredientClasses.push(classes.Tomato);
            break;
        case ('onion'):
            fileName = 'onion.png';
            ingredientClasses.push(classes.Onion);
            break;
        case ('egg'):
            fileName = 'egg.png';
            ingredientClasses.push(classes.Egg);
            break;
        case ('cheese'):
            fileName = 'cheese.png';
            ingredientClasses.push(classes.Cheese);
            break;
        case ('lettuce'):
            fileName = 'lettuce.png';
            ingredientClasses.push(classes.Lettuce);
            break;
        case ('bacon'):
            fileName = 'bacon.png';
            ingredientClasses.push(classes.Bacon);
            break;
        case ('beef'):
            fileName = 'beef.png';
            ingredientClasses.push(classes.Beef);
            break;
        case ('salmon'):
            fileName = 'salmon.png';
            ingredientClasses.push(classes.Salmon);
            break;
        case ('bread-bottom'):
            fileName = 'bread-bottom.png';
            ingredientClasses.push(classes.BreadBottom);
            break;
        default:
            fileName = '';
    }

    return <img className={ingredientClasses.join(' ')} src={require('../../../assets/' + fileName)} alt={fileName}/>
}

ingredient.propTypes = {
    type: PropTypes.string.isRequired
};

export default ingredient;