import React, { useState, useEffect } from 'react';
import classes from './Toast.css'

const AUTO_DELETE_TIMER = 2500;

const toast = (props) => {
    const toastList = props.toastList;
    const [stateList, setStateList] = useState([]);

    useEffect(() => {
        toastList.forEach( element => {
            const id = Math.floor((Math.random() * 101) + 1);
            element.id = id;
        })

        setStateList([...toastList])
    }, [toastList])

    useEffect( () => {
        const interval = setInterval( () => {
            if (stateList.length) {
                deleteToast(stateList[0].id)
            }
        }, AUTO_DELETE_TIMER)

        return () => {
            clearInterval(interval);
        }
    }, [stateList])

    const deleteToast = id => {
        const toastListIndex = toastList.findIndex(e => e.id === id);
        toastList.splice(toastListIndex, 1);
        setStateList([...toastList]);
    }

    const toasts = stateList.map( (toast, i) => (
        <div key={i} className={classes.Toast}>
            <div className={classes.ToastIcon}>
                <svg>
                    <use href={toast.icon}/>
                </svg>
            </div>
            <div>
                <p className={classes.ToastTitle}>{toast.title}</p>
                <p className={classes.ToastMessage}>
                    {toast.message}
                </p>
            </div>
        </div>
    ))

    return (
        <div className={classes.ToastContainer}>
            {toasts}
        </div>
    )
}

export default toast;