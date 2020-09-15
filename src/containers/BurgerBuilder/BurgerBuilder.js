import React, {Component} from 'react'
import { connect } from 'react-redux'
import Burger from '../../components/Burger/Burger'
import InfoPanel from '../../components/InfoPanel/InfoPanel'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import OrderButton from '../../components/UI/OrderButton/OrderButton'
import Modal from '../../hoc/Modal/Modal'
import Toast from '../../components/UI/Toast/Toast'
import {MAX_NUMBER_INGREDIENTS, INGREDIENTS_PRICES, bundleIngredientsInfo} from '../../utils'
import HightlightText from '../../components/UI/HighlightText/HighlightText'

import classes from './BurgerBuilder.css'
import icons from '../../assets/icons.svg'
import * as actions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        showSummary: false
    };

    canAddIngredient = () => this.props.numberIngredients < MAX_NUMBER_INGREDIENTS;

    orderHandler = () => {
        if (this.props.numberIngredients) {
            if (this.props.isAuth) {
                this.setState({ showSummary: true });
            } else {
                this.props.history.push('/auth');
            }
        } else {
            const toastList = [...this.props.toastList];

            if (toastList.find( toast => toast.type === 'no_ingredients')) return;

            this.props.onAddToast({
                type: 'no_ingredients',
                icon: icons + `#error`,
                title: 'No ingredients',
                message: 'Cannot build burger with nothing...'
            });
        }
    }

    cancelOrderHandler = () => {
        this.setState({
            showSummary: false
        })
    }

    confirmOrderHandler = () => {
        this.props.placeOrderInit();
        this.props.history.push('/checkout');
    }

    render() {
        const orderSummary = (
                <React.Fragment>
                    <HightlightText
                        size="2em"
                        content="Here's your order"/>
                    <OrderSummary
                        fontSize='20px'
                        ingredientsInfo={bundleIngredientsInfo(this.props.ingredients, INGREDIENTS_PRICES)}
                        confirmOrder={this.confirmOrderHandler}/>
                    
                    <div style={{textAlign:"center"}}>
                        <OrderButton
                            onClick={this.confirmOrderHandler}
                            content='Proceed to checkout'/>
                    </div>
                </React.Fragment>
            )

        return (
            <div className={classes.BurgerBuilder}>
                <Modal 
                    show={this.state.showSummary}
                    outsideClick={this.cancelOrderHandler}>
                    {orderSummary}
                </Modal>
                
                <Burger ingredients={this.props.ingredients} style={{fontSize:"1.2em"}}/>
                <InfoPanel
                    ingredientsInfo = {bundleIngredientsInfo(this.props.ingredients, INGREDIENTS_PRICES)}
                    numberIngredients={this.props.numberIngredients}
                    totalPrice={this.props.totalPrice}
                    addHandler={this.props.onAddIngredient}
                    removeHandler={this.props.onRemoveIngredient}
                    clearHandler={this.props.onClearIngredients}
                    orderHandler={this.orderHandler}/>

                <Toast toastList={this.props.toastList} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        numberIngredients: state.burgerBuilder.numberIngredients,
        totalPrice: state.burgerBuilder.totalPrice,
        isAuth: state.auth.token !== null,
        toastList: state.ui.toastList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onClearIngredients: () => dispatch(actions.clearIngredients()),
        placeOrderInit: () => dispatch(actions.placeOrderInit()),
        onAddToast: (toast) => dispatch(actions.addToast(toast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);