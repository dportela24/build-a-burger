import React from 'react'
import MyOrdersItem from './MyOrdersItem/MyOrdersItem'

const myOrdersList = (props) => {

    const orderList = props.orders.map( order => {
        return (
            <MyOrdersItem
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
        )
    })

    return (
        <React.Fragment>
            {orderList}
        </React.Fragment>
    )
}

export default myOrdersList;