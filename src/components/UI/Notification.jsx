import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import { toast } from "react-toastify"
import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { notificationActions } from "../../../store/Notification";
import classes from './notification.module.css'

function Notification(){
    // const notiChanged = useSelector(state=>state.notification.isChanged)
    const notification = useSelector(state=>state.notification.notification)
    const dispatch = useDispatch()
    console.log(notification)

    useEffect(()=>{
        if(notification.Message){

            const options = {
                position:'bottom-left',
                autoClose:3000,
                // hideProgressBar: true
            }

            if(notification.Title === 'success'){
                toast.success(notification.Message,options)
            }
            else if(notification.Title === 'error'){
                toast.error(notification.Message,options)
            }
            else if(notification.Title === 'info'){
                toast.info(notification.Message,options)
            }

            dispatch(notificationActions.passNotification({}));

        }

    },[notification,dispatch])

   

    return(
        <div>
            <ToastContainer className={classes['custom-toast']}></ToastContainer>
            {/* <h2>{notification.successMessage}</h2> */}
            {/* <h2>{notification.errorMessage}</h2> */}
        </div>
    )

}

export default Notification