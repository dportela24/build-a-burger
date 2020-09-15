import React from 'react'
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationBar.css'

const navigationBar = (props) => {
    let navigationBar;

    if (props.isAuth) {
        navigationBar = (
            <React.Fragment>
                <NavigationItem link='/' exact>
                    Builder
                </NavigationItem>
                
                <NavigationItem link ='/myOrders'>
                    My Orders
                </NavigationItem>

                <NavigationItem link='/logOut'>
                    Log Out
                </NavigationItem>
            </React.Fragment>
        )
    } else {
        navigationBar = (
            <React.Fragment>
                <NavigationItem link='/' exact>
                    Builder
                </NavigationItem>
                
                <NavigationItem link='/auth'>
                    Log In
                </NavigationItem>
            </React.Fragment>
        )
    }


    return (
        <ul className={classes.NavigationBar}>
           {navigationBar}
        </ul>
    )
}

export default navigationBar;