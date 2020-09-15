import * as actionTypes from '../actions/actionTypes'
import { INGREDIENTS_PRICES, MAX_NUMBER_INGREDIENTS, updateObject} from '../../utils'

const initialState = {
    ingredients:{
        tomato: 0,
        onion: 0,
        egg: 0,
        cheese: 0,
        lettuce: 0,
        beef: 0,
        salmon: 0,
        bacon: 0,
    },
    numberIngredients: 0,
    totalPrice: 0,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):    return addIngredient(state, action);
        case (actionTypes.REMOVE_INGREDIENT): return removeIngredient(state, action);
        case (actionTypes.CLEAR_INGREDIENTS): return {...initialState}
        default: return state;
    }
}

const addIngredient = (state, action) => {
    const ingredient = action.ingredient;

    if (state.numberIngredients === MAX_NUMBER_INGREDIENTS) return state;
    
    const ingredientAdded = updateObject(state.ingredients, {
        [ingredient]: state.ingredients[ingredient] + 1
    });
    return updateObject(state, {
        ingredients: ingredientAdded,
        numberIngredients: state.numberIngredients + 1,
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[ingredient]
    })
}

const removeIngredient = (state, action) => {
    const ingredient = action.ingredient;

    if (state.ingredients[ingredient] === 0) return state;

    const ingredientRemoved = updateObject(state.ingredients, {
        [ingredient]: state.ingredients[ingredient] - 1
    });
    return updateObject(state, {
        ingredients: ingredientRemoved,
        numberIngredients: state.numberIngredients - 1,
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[ingredient]
    })
}

export default reducer;