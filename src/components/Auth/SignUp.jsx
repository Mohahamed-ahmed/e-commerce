import { Link } from 'react-router-dom'
import classes from './AuthForm.module.css'
import { useState } from 'react'
import authServices from '../Services/auth'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import useInput from '../../Hooks/use-input'
import { notificationActions } from '../../../store/Notification'
import { useDispatch } from 'react-redux'

function SignUp(){
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
        value:fullnameValue,
        isValid:fullnameValueIsValid,
        hasError:fullnameHasError,
        valueChangeHandelr:fullnameChangeHandler,
        valueBlurHandler:fullnameBlurHandler
    } = useInput((value)=>value.trim() !== '')

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
    }=useInput((value)=> value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm))

    const {
        value: passwordConfirmationValue,
        isValid: passwordConfirmationIsValid,
        hasError: passwordConfirmationHasError,
        valueBlurHandler: passwordConfirmationBlurHandler,
        valueChangeHandelr: passwordConfirmationChangeHandler,
        reset: passwordConfirmationReset,
      } = useInput((value) => value === passwordValue);

    // const [name,setName] = useState('')
    // const [email,setEmail] = useState('')
    // const [password,setPassword] = useState('')
    // const [passwordConfirmation,setPasswordConfirmation] = useState('')

    const {mutate ,isError, error , isPending,data} = useMutation({
        mutationFn: authServices.SignUp,
        onSuccess: (response)=>{
            if(response.data){
                console.log(response.data)
                dispatch(notificationActions.passNotification({
                    Title:'success',
                    Message:response.data.message || "You Have Created Account Successfully"
                }))
                navigate('/login')
            }else{
                console.log(response.error.data.message)
                passwordReset()
                passwordConfirmationReset()
                dispatch(notificationActions.passNotification({
                    Title:'error',
                    Message : response.error.data.message || "something went wrong"
                }))
            }
        },
    })

        // overall form validity
    let formIsValid = false;

    if (
        fullnameValueIsValid &&
        emailValueIsValid &&
        passwordValueIsValid &&
        passwordConfirmationIsValid
    ) {
        formIsValid = true;
    }

    const signupHandler = (e)=>{
        e.preventDefault()
        const signupData = {
            name:fullnameValue,
            email:emailValue,
            password:passwordValue,
            passwordConfirmation:passwordConfirmationValue
        }

        mutate(signupData)
    } 

    let errors;

    if(isError){
        errors = errors.info.errors.map((err)=>(
            <li className={classes.error}>{err.msg}</li>
        ))

        console.log(errors)
    }

    return (
        <div className={classes['form-container']}>
            <form method='POST' onSubmit={signupHandler}>
                <h2>Sign Up</h2>
                <p>Join Atlas and start shopping today!</p>
                {isError && (
          <ul className={classes.errors}>
            <div>{errors}</div>
          </ul>
        )}
                <div className={classes.input}>
                    <label htmlFor='username'>username</label>
                    <input
                        className={classes['input-field']}
                        type='text' 
                        id='username' 
                        value={fullnameValue} 
                        onBlur={fullnameBlurHandler}
                        onChange={fullnameChangeHandler}>
                    </input>
                    {fullnameHasError && <p className={classes.errormsg}>Enter a Valid Name</p>}
                </div>
                <div className={classes.input}>
                    <label htmlFor='email'>Email</label>
                    <input 
                        className={classes['input-field']}
                        type='email' 
                        id='email' 
                        value={emailValue}
                        onBlur={emailBlurHandler}
                        onChange={emailChangeHandler}>
                    </input>
                    {emailHasError && <p className={classes.errormsg}>Enter a Valid Email</p>}
                </div>
                <div className={classes.input}>
                    <label htmlFor='password'>Password</label>
                    <input 
                        className={classes['input-field']}
                        type='password' 
                        id='password' 
                        value={passwordValue} 
                        onBlur={passwordBlurHandler}
                        onChange={passwordChangeHandler}>
                    </input>
                    {passwordHasError && <p className={classes.errormsg}>Enter a Strong Password</p>}
                </div>
                <div className={classes.input}>
                    <label htmlFor='confirm-password'>confirm Password</label>
                    <input 
                        className={classes['input-field']}
                        type='password' 
                        id='confirm-password' 
                        value={passwordConfirmationValue}
                        onBlur={passwordConfirmationBlurHandler}
                        onChange={passwordConfirmationChangeHandler}>
                    </input>
                    {passwordConfirmationHasError && <p className={classes.errormsg}>password Should Match</p>}
                </div>
                <div className={classes.button}>
                    <div className={classes.links}>
                        <p>Already Have Account?</p>
                        <Link to='/login'>Login</Link>
                    </div>
                    <button type='submit'>{isPending?<div className={classes.loader}></div>:"Join Our Community"}</button>
                </div>
            </form>
        </div>
    )
}

export default SignUp