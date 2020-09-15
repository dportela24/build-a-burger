import React from 'react'
import IngredientsGrid from './IngredientsGrid/IngredientsGrid'
import OrderButton from '../../UI/OrderButton/OrderButton'
import classes from './OrderPanel.css'

const orderPanel = (props) => {
    return (
        <div className={classes.OrderPanel}>
            <IngredientsGrid 
                ingredientsInfo={props.ingredientsInfo}
                addHandler={props.addHandler}
                removeHandler={props.removeHandler}/>
            <div className={classes.ButtonsPanel}>
                <OrderButton 
                    onClick={props.clearHandler}
                    content="Clear"/>
                <OrderButton
                    onClick={props.orderHandler}
                    content="Order"/>
            </div>
        </div>
    )
}

export default orderPanel;