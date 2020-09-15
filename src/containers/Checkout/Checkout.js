import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import TextContainer from '../../hoc/TextContainer/TextContainer';
import HighlightText from '../../components/UI/HighlightText/HighlightText';
import DeliveryForm from '../../components/DeliveryForm/DeliveryForm';
import Spinner from '../../components/UI/Spinner/Spinner';
import Toast from '../../components/UI/Toast/Toast';
import classes from './Checkout.css';
import { bundleIngredientsInfo } from '../../utils';
import icons from '../../assets/icons.svg';
import * as actions from '../../store/actions/index'

class Checkout extends Component {
    placeOrderHandler = (deliveryInfo) => {
        const finalOrder = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            deliveryInfo,
            userId: this.props.userId
        }

        const successToast = {
            type: 'order_placed',
            icon: icons + `#success`,
            title: 'Order placed',
            message: 'Your burger is being constructed!'
        }

        const errorToast = {
            type: 'error_order',
            icon: icons + `#error`,
            title: 'Error',
            message: 'Your order could not be placed...'
        }

        this.props.placeOrder(finalOrder, this.props.token, successToast, errorToast);
    }
    
    render() {

        let atLeastOneIngredient = false;

        for (const ingredient in this.props.ingredients) {
            atLeastOneIngredient |= this.props.ingredients[ingredient];
        }

        let checkout = <Redirect to="/"/>;

        if (atLeastOneIngredient && !this.props.requestFullfilled) {
            let form = <DeliveryForm onSubmit={this.placeOrderHandler}/>;
            if(this.props.sendingRequest) {
                form = <Spinner />;
            }

            checkout = (
                <div className={classes.Checkout}>
                <TextContainer>
                    <HighlightText
                        styles={{
                            fontSize:"2.5em",
                            textAlign:"center"
                        }}
                        content="Here's your order"/>
                    <div className={classes.Overview}>
                        <OrderSummary
                            fontSize="25px"
                            ingredientsInfo={bundleIngredientsInfo(this.props.ingredients)}
                            confirmOrder="2"/>
                        <Burger ingredients={this.props.ingredients}/>
                    </div>
                </TextContainer>

                <TextContainer>
                    {form}
                </TextContainer>

                <Toast toastList={this.props.toastList} />
            </div>
            )
        }

        return checkout
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        sendingRequest: state.order.sendingRequest,
        requestFullfilled: state.order.requestFullfilled,
        token: state.auth.token,
        userId: state.auth.userId,
        toastList: state.ui.toastList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        placeOrder: (orderData, token, successToast, errorToast) => dispatch(actions.placeOrder(orderData, token, successToast, errorToast)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
