import React, { useState } from 'react';
import HighlightText from '../UI/HighlightText/HighlightText';
import Input from '../UI/Input/Input';
import Button from '../UI/OrderButton/OrderButton';
import classes from './DeliveryForm.css'

const deliveryForm = (props) => {
    const [state, setState] = useState({
        deliveryForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                isValid: true,
                validation: {
                    required: true
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your email'
                },
                value: '',
                isValid: true,
                validation: {
                    required: true
                }
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your address'
                },
                value: '',
                isValid: true,
                validation: {
                    required: true
                }
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your city'
                },
                value: '',
                isValid: true,
                validation: {
                    required: true
                }
            },
        }
    });

    const isValid = (value, validation) => {
        let isValid = true;

        if (validation.required) {
            isValid &= value.trim() !== ""
        }

        return isValid;
    }

    const formIsValid = () => {
        let formIsValid = true;

        const deliveryForm = {
            ...state.deliveryForm,
        };

        for (let element in deliveryForm) {
            const formElement = {
                ...deliveryForm[element]
            }

            formElement.isValid = isValid(formElement.value, formElement.validation);
            formIsValid &= formElement.isValid;
            deliveryForm[element] = formElement;
        }

        setState({deliveryForm});

        return formIsValid;
    }

    const onChangeHandler = (event, key) => {
        const deliveryForm = {
            ...state.deliveryForm,
        };

        const formElement = {
            ...deliveryForm[key]
        };

        formElement.value = event.target.value;
        formElement.isValid = isValid(formElement.value, formElement.validation);
        deliveryForm[key] = formElement;

        setState({deliveryForm});
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        const deliveryInfo = {};

        for (let element in state.deliveryForm) {
            deliveryInfo[element] = state.deliveryForm[element].value;
        }

        if(formIsValid()) {
            props.onSubmit(deliveryInfo)
        }
    }

    const formElementArray = [];

    for (let key in state.deliveryForm) {
        formElementArray.push({
            id: key,
            config: state.deliveryForm[key]
        })
    }

    const formJSX = formElementArray.map( formElement => (
        <Input key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            valid={formElement.config.isValid}
            onChange={(event) => onChangeHandler(event, formElement.id)}/>
    ))

    return (
        <div className={classes.CustomerForm}>
            <HighlightText 
                styles={{
                    fontSize: "2.5em"
                }}
                content="Delivery Info"/>
            <form onSubmit={onSubmitHandler}>
                {formJSX}
                <Button content="Place Order"/>
            </form>
        </div>
    )

}

export default deliveryForm;