import React from 'react'
import classes from './Spinner.css'

const spinner = (props) => (
    <div className={classes.Spinner}
        style={props.style}>
            Loading...
    </div>
)

export default spinner;