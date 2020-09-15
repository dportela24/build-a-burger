import React from 'react'
import classes from './LogoText.css'

const logoText = (props) => {
    return (
        <div style={{fontSize: props.size}} className={classes.LogoText}>
            <p className={classes.SubTitle}>Build-a-</p>
            <p className={classes.Title}>Burger</p>
        </div>
    )
}

export default logoText;