import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import MyOrders from './containers/MyOrders/MyOrders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

class App extends Component {
  constructor (props) {
    super(props)
    props.getAuthFromLocalStorage();
  }

  render() {
    let routes;

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/myOrders" component={MyOrders}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path="/auth" component={Auth}/>
          <Route path="/" component={BurgerBuilder}/>
          <Redirect to="/"/>
        </Switch>
      )
    }
    
    return (
      <React.Fragment>
        <Layout>
          {routes}
        </Layout>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAuthFromLocalStorage: () => dispatch(actions.getAuthFromLocalStorage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
