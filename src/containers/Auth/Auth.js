import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index'
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/OrderButton/OrderButton';
import TextContainer from '../../hoc/TextContainer/TextContainer';
import Toast from '../../components/UI/Toast/Toast';
import Logo from '../../components/UI/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.css';
import icons from '../../assets/icons.svg';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                isValid: true,
                validation: {
                    required: true
                }
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                isValid: true,
                validation: {
                    required: true
                }
            }
        },
        isLoggingIn: true
    }

    isValid = (value, validation) => {
        let isValid = true;

        if (validation.required) {
            isValid &= value.trim() !== "";
        }

        return isValid;
    }

    formIsValid = () => {
        let formIsValid = true;

        const controls = {
            ...this.state.controls,
        };

        for (let element in controls) {
            const formElement = {
                ...controls[element]
            }

            formElement.isValid = this.isValid(formElement.value, formElement.validation);
            formIsValid &= formElement.isValid;
            controls[element] = formElement;
        }

        this.setState({controls});

        return formIsValid;
    }

    onChangeHandler = (event, key) => {
        const controls = {
            ...this.state.controls,
        };

        const formElement = {
            ...controls[key]
        };

        formElement.value = event.target.value;
        formElement.isValid = this.isValid(formElement.value, formElement.validation);
        controls[key] = formElement;

        this.setState({controls});
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        const controls = {};

        for (let element in this.state.controls) {
            controls[element] = this.state.controls[element].value;
        }

        if(this.formIsValid()) {
            const errorToast = {
                type: 'auth_fail',
                icon: icons + `#error`,
                title: 'Error',
                message: 'Cannot authenticate user...'
            }
            this.props.auth(this.state.controls.email.value, this.state.controls.password.value, this.state.isLoggingIn, errorToast)
        }
    }

    onChangeAuthModeHandler = () => {
        this.setState(prevState => {
            return {isLoggingIn: !prevState.isLoggingIn};
        })
    }

    render () {
        let authDisplay;

        if (!this.props.sendingRequest) {

            const formElementArray = [];

            for (let key in this.state.controls) {
                formElementArray.push({
                    id: key,
                    config: this.state.controls[key]
                })
            }

            const formJSX = formElementArray.map( formElement => (
                <Input key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    valid={formElement.config.isValid}
                    onChange={(event) => this.onChangeHandler(event, formElement.id)}/>
            ))
        
            authDisplay = (
                    <div className={classes.Auth}>
                        <Logo 
                            style={{fontSize:"2em",marginBottom:"2em"}} />
                        <form onSubmit={this.onSubmitHandler}>
                            {formJSX}
                            <Button content={this.state.isLoggingIn ? "Log In" : "Sign In"}/>
                        </form>
                    </div> 
            )
        } else {
            authDisplay = (
                <div className={classes.Auth}>
                        <Logo style={{fontSize:"2em",marginBottom:"2em"}} />
                        <Spinner style={{fontSize: '6em'}}/>;
                </div> 
            )
        }

        return (
            <React.Fragment>
                <TextContainer>
                    {authDisplay}
                    
                    <div className={classes.authModeChanger}>
                        <p>
                            {this.state.isLoggingIn ? "No account yet? " : "Already have an account "}
                            <span onClick={this.onChangeAuthModeHandler}>
                                {this.state.isLoggingIn ? "Create one!" : "Log in!"}
                            </span>
                        </p>
                    </div>
                </TextContainer>

                <Toast toastList={this.props.toastList} />

            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        sendingRequest: state.auth.sendingRequest,
        isAuth: state.auth.token !== null,
        toastList: state.ui.toastList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, authMode, errorToast) => dispatch(actions.auth(email, password, authMode, errorToast))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);