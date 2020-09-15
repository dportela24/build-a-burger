import React from 'react';
import LogoText from './LogoText/LogoText';
import logoImage from '../../../assets/Logo.png'
import classes from './Logo.css'

const logo = (props) => {
    return (
        <div className={classes.Logo} 
            style={{
                ...props.style}
            }>

            <div className={classes.LogoImg}>
                <img src={logoImage} alt="Logo.png"/>
            </div>

            <div className={classes.LogoText}>
                <LogoText/>
            </div>
        </div>
    )
}

export default logo;