import { useState } from "react"

const useInput =(inputValidation)=>{

    const [enteredValue,setEnteredValue] = useState("")
    const [isTouched,setIsTouched] = useState(false)

    
    const enterdValueIsValid = inputValidation(enteredValue)
    const hasError = !enterdValueIsValid && isTouched



    const valueChangeHandelr=(e)=>{
        setEnteredValue(e.target.value)
        setIsTouched(true)
    }

    const valueBlurHandler=()=>{
        setIsTouched(true)
    }

    const reset=()=>{
        setEnteredValue('')
        setIsTouched(false)
    }

    return {
        value:enteredValue,
        isValid:enterdValueIsValid,
        hasError,
        valueChangeHandelr,
        valueBlurHandler,
        reset
    }

}

export default useInput