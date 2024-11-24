import { Link } from 'react-router-dom'
import classes from './AuthForm.module.css'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authServices from '../Services/auth'
import { useDispatch } from 'react-redux'
import { authActions } from '../../../store'
import { fetchCartData } from '../../../store/cartSlice'
import { userActions } from '../../../store/userSlice'
import { getUserData } from '../../../store/userSlice'
import { notificationActions } from '../../../store/Notification'
import useInput from '../../Hooks/use-input'


function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const {
        value:emailValue,
        isValid:emailValueIsValid,
        hasError:emailHasError,
        valueChangeHandelr:emailChangeHandler,
        valueBlurHandler:emailBlurHandler
    } = useInput((value)=> value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g))

    const {
        value:passwordValue,
        isValid:passwordValueIsValid,
        hasError:passwordHasError,
        valueChangeHandelr:passwordChangeHandler,
        valueBlurHandler:passwordBlurHandler,
        reset:passwordReset
    }=useInput((value)=> value.trim() !== '')
    

    const {mutate,isPending} = useMutation({
        mutationFn:authServices.login,
        onSuccess:(response)=>{
            if(response.data){
                localStorage.setItem('token',response.data.token)
                dispatch(userActions.setUser({user:response.data.user}))
                // dispatch(getUserData())
                dispatch(notificationActions.passNotification({
                    Title:'success',
                    Message:response.data.message||"you have logged in ",
                }))
                navigate('/')
                dispatch(fetchCartData())
            }else{
                dispatch(notificationActions.passNotification({
                    Title:'error',
                    Message:response.error.data.message||"something went wrong"
                }))
                console.log(response.error)
            }
        },
        
    })

    const loginHandler=(e)=>{
        e.preventDefault();
        const loginData = {
            email:emailValue,
            password:passwordValue
        }
        mutate(loginData)

        dispatch(authActions.login())

        // navigate('/')
    }

    //overall form validity 
    let formIsValid = false

    if(emailValueIsValid && passwordValueIsValid){
        formIsValid = true
    }

    return (
        <div className={classes['form-container']}>
            <form method='POST' onSubmit={loginHandler}>
                <h2>Login</h2>
                <p>Log in to your Atlas account</p>
                <div className={classes.input}>
                    <label htmlFor='email'>Email</label>
                    <input 
                        className={classes['input-field']}
                        type='email' 
                        id='email'
                        onChange={emailChangeHandler} 
                        value={emailValue}
                        onBlur={emailBlurHandler}
                        >
                        </input>
                {emailHasError && <p className={classes.errormsg}>Enter a Valid Email</p>}
                </div>
                <div className={classes.input}>
                    <label htmlFor='password'>Password</label>
                    <input 
                        className={classes['input-field']}
                        type='password' 
                        id='password' 
                        onChange={passwordChangeHandler} 
                        value={passwordValue}
                        onBlur={passwordBlurHandler}
                        >
                        </input>
                </div>
                <div className={classes.button}>
                    <div className={classes.links}>
                        <p>Dont Have an Account?</p>
                        <Link to='/signup'>Sign Up</Link>
                    </div>
                    <button type='submit' disabled={!formIsValid}>{isPending?<div className={classes.loader}></div>:"login"}</button>
                </div>
            </form>
        </div>
    )
}

export default Login