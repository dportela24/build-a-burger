import React from 'react'
import OrderSummaryItem from './OrderSummaryItem/OrderSummaryItem'
import classes from './OrderSummary.css'

const sortByTotalPrice = (ingredientList) => ingredientList.sort( (a,b) => {
    return a[1]*a[2] - b[1]*b[2];
})

const orderSummary = (props) => {   
    let totalPrice = 0;

    const ingredientsSummary = sortByTotalPrice(props.ingredientsInfo)
        .map ( (ingredient) => {
            const [type, count, , price] = ingredient;

            if(!count) return null;

            totalPrice += price;

            const leftText = `${count} x ${type.charAt(0).toUpperCase() + type.slice(1)}`;
            const rightText = `${price}$`


            return (
                <OrderSummaryItem
                    key={type}
                    left={leftText}
                    right={rightText}/>
            )
        })

    const total = (
        <OrderSummaryItem
            key='Total'
            left='Total'
            right={`${totalPrice}$`}/>
    )

    return (
        <div className={classes.OrderSummary} style={{fontSize: props.fontSize ? props.fontSize : '1em'}}>
            <div className={classes.SubTitle}>A burger built with:</div>
            <ul className={classes.SummaryList}>
                {ingredientsSummary}
                {total}
            </ul>
        </div>
    )
}

export default orderSummary;