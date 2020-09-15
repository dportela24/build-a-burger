import React from 'react'
import classes from './Modal.css'
import Backdrop from '../../components/UI/Backdrop/Backdrop'


const renderEqual = (prevProps, nextProps) => {
    const modalNotVisible = !prevProps.show && !nextProps.show;
    const contentIsSame = nextProps.show && prevProps.children === nextProps.children;

    return  modalNotVisible || contentIsSame;
}

const modal = (props) => {
    const classArray = [classes.Modal];

    if (!props.show) {
        classArray.push(classes.Hidden);
    }

    return (
        <React.Fragment>
            <Backdrop 
                show={props.show}
                clicked={props.outsideClick}/>

            <div className={classArray.join(' ')}>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default React.memo(modal, renderEqual);