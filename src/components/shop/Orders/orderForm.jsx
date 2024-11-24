import classes from '../../Auth/AuthForm.module.css'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { checkout } from '../../Services/order'
import { redirect } from 'react-router-dom'
import useInput from '../../../Hooks/use-input'
function OrderForm(){

    const {
        value: address1Value,
        isValid: address1IsValid,
        hasError: address1HasError,
        valueChangeHandelr: address1ChangeHandler,
        valueBlurHandler: address1BlurHandler,
      } = useInput((value) => value.trim() !== "");
    
      const {
        value: address2Value,
        isValid: address2IsValid,
        hasError: address2HasError,
        valueChangeHandelr: address2ChangeHandler,
        valueBlurHandler: address2BlurHandler,
      } = useInput((value) => true);
    
      const {
        value: cityValue,
        isValid: cityIsValid,
        hasError: cityHasError,
        valueChangeHandelr: cityChangeHandler,
        valueBlurHandler: cityBlurHandler,
      } = useInput((value) => value.trim() !== "");
    
      const {
        value: postalCodeValue,
        isValid: postalCodeIsValid,
        hasError: postalCodeHasError,
        valueChangeHandelr: postalCodeChangeHandler,
        valueBlurHandler: postalCodeBlurHandler,
      } = useInput((value) => value.match(/^[0-9]{5}$/g));
    
      let formIsValid =
        address1IsValid && address2IsValid && cityIsValid && postalCodeIsValid;

    const {mutate,isPending} = useMutation({
        mutationFn:checkout,
        onSuccess:(data)=>{
            if(data){
                console.log(data.url)
                // return redirect(data.url)
                window.location.replace(data.url)

            }
        }
    })

    const orderHandler = (e)=>{
        e.preventDefault()

        const shippingAddress  = {
            address1: address1Value,
            address2: address2Value,
            city: cityValue,
            postalCode: postalCodeValue,
        }

        mutate({ shippingAddress })

    }

    return (
        <div className={classes['form-container']}>
            <form method='POST' onSubmit={orderHandler}>
                <h2>Shipping Info</h2>
                <div className={classes.input}>
                    <label htmlFor='address1'>address1</label>
                    <input 
                        type='text' 
                        id='address1' 
                        value={address1Value} 
                        onChange={address1ChangeHandler}
                        onBlur={address1BlurHandler}
                        >
                    </input>
                    {address1HasError && <p className={classes.errormsg}>Enter a Valid Address</p>}
                </div>
                <div className={classes.input}>
                    <label htmlFor='address2'>address2</label>
                    <input 
                        type='text' 
                        id='address2' 
                        value={address2Value} 
                        onChange={address2ChangeHandler}
                        onBlur={address2BlurHandler}
                        >
                    </input>
                </div>
                <div className={classes.input}>
                    <label htmlFor='city'>city</label>
                    <input 
                        type='text' 
                        id='city' 
                        value={cityValue} 
                        onChange={cityChangeHandler}
                        onBlur={cityBlurHandler}
                        >
                    </input>
                    {cityHasError && <p className={classes.errormsg}>Enter an Existing City</p>}
                </div>
                <div className={classes.input}>
                    <label htmlFor='postalCode'>postal Code</label>
                    <input 
                        type='text' 
                        id='postalCode' 
                        value={postalCodeValue}
                        onChange={postalCodeChangeHandler} 
                        onBlur={postalCodeBlurHandler}
                        >
                    </input>
                    {postalCodeHasError && <p className={classes.errormsg}>Enter a Valid PostalCode</p>}
                </div>
                <div className={classes.button}>
                    <button type='submit'>{isPending?<div className={classes.loader}></div>:"Proceed To Checkout"}</button>
                </div>
            </form>
        </div>
    )

}

export default OrderForm