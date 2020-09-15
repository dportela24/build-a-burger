import React from 'react'
import classes from './Backdrop.css'

const backDrop = (props) => {
    if ( props.show) {
        return (
            <div 
                className={classes.Backdrop}
                onClick={props.clicked}/>
        )
    }

    return null;
}

export default backDrop;