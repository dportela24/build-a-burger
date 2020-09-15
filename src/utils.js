export const MAX_NUMBER_INGREDIENTS = 10;

export const INGREDIENTS_PRICES = {
    beef:    2,
    salmon:  2,
    bacon:   1.5, 
    egg:     1,
    cheese:  0.75,
    tomato:  0.5,
    onion:   0.5,
    lettuce: 0.5,
}

export const bundleIngredientsInfo = (ingredients) => {
    const bundledInfo = [];
    for(const ingredient in ingredients) {
        const count = ingredients[ingredient];
        const price = INGREDIENTS_PRICES[ingredient];
        bundledInfo.push([
            ingredient, count, price, count*price 
        ])
    }

    return bundledInfo;
}

export const updateObject = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    }
}