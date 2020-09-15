import React from 'react';
import OrderPanel from './OrderPanel/OrderPanel'
import HighlightText from '../UI/HighlightText/HighlightText'
import LogoText from '../UI/Logo/LogoText/LogoText'
import classes from './InfoPanel.css'

const infoPanel = (props) => {
    return (
        <div className={classes.Info}>
            <LogoText 
                size="50px"/>
            <HighlightText 
                styles={{
                    fontSize: "4em"
                }}
                content={`${props.totalPrice}$`}/>

            <p className={classes.NumberIngredients}> {`${props.numberIngredients}/10 ingredients used`}</p>
            <OrderPanel 
                ingredientsInfo={props.ingredientsInfo}
                addHandler={props.addHandler}
                removeHandler={props.removeHandler}
                clearHandler={props.clearHandler}
                orderHandler={props.orderHandler}/>
        </div>
    );
}

export default infoPanel;