import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

class Layout extends Component {
    render () {
        return (
            <div className={classes.Page}>
                <Toolbar isAuth={this.props.isAuth}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </div>
        )
    }
}
    
const mapStateToProps = state => {
    return {
        isAuth: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(Layout);