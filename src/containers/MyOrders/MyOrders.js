import React, {Component} from 'react';
import { connect } from 'react-redux';  
import MyOrdersList from '../../components/MyOrdersList/MyOrdersList';
import TextContainer from '../../hoc/TextContainer/TextContainer';
import Toast from '../../components/UI/Toast/Toast';
import Spinner from '../../components/UI/Spinner/Spinner';
import HighlighText from '../../components/UI/HighlightText/HighlightText';
import icons from '../../assets/icons.svg';
import classes from './MyOrders.css'
import * as actions from '../../store/actions/index';

class Order extends Component {
    componentDidMount = () => {
        const errorToast = {
            type: 'error_myOrders',
            icon: icons + `#error`,
            title: 'Orders history',
            message: 'Could not retrieve orders history...'
        }

        this.props.fetchOrders(this.props.token, this.props.userId, errorToast);
    }

    render () {
        let orderList;
        if (this.props.sendingRequest) {
            orderList = <Spinner />;
        } else {
            orderList = <MyOrdersList orders={this.props.orders}/>;
        }

        return (
            <React.Fragment>
                <TextContainer style={{width:'50%'}}>
                    <div className={classes.OrderList}>
                        <HighlighText
                            styles={{fontSize:"3em"}}
                            content="My Orders"/>
                        {orderList}
                    </div>
                </TextContainer>

                <Toast toastList={this.props.toastList} />
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        sendingRequest: state.order.sendingRequest,
        token: state.auth.token,
        userId: state.auth.userId,
        isAuth: state.auth.token !== null,
        toastList: state.ui.toastList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId, errorToast) => dispatch(actions.fetchOrders(token, userId, errorToast)),
        onAddToast: (toast) => dispatch(actions.addToast(toast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);