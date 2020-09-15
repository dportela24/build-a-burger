import React from 'react'
import classes from './HighlightText.css'

const hightlightText = (props) => {
    return (
        <div 
            className={classes.Text}
            style={props.styles}>
            {props.content}
        </div>
    )
}

export default hightlightText;