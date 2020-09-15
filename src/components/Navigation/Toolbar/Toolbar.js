import React from 'react';
import classes from './Toolbar.css';
import Logo from '../../UI/Logo/Logo';
import NavigationBar from '../NavigationBar/NavigationBar';

const toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <div className={classes.Logo}>
                <Logo />
            </div>

            <nav className={classes.NavigationBar}>
                <NavigationBar isAuth={props.isAuth}/>
            </nav>
        </header>
    )
};

export default toolbar;