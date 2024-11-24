import { useNavigate } from 'react-router-dom'
import classes from './Profile.module.css'
import { useSelector } from "react-redux"
import { CheckIcon } from "lucide-react"

function ProfileDetails({data,isPending}){

    const navigate = useNavigate()

    const userData = useSelector(state=>state.user.user)

    const orderDetailsHandler=(id)=>{
        navigate(`/orders/${id}`)
    }

    const formatDate = (dateString) => {
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString("en-GB", { 
            day: "2-digit",
            month: "long", 
            year: "numeric"
        });
    };

    return(
        <div className={classes.profCon}>

            <div className={classes['profile-container']}>
                <div className={classes['user-details']}>
                    <div className={classes['user-text']}>
                        <h2>Welcome <span>{userData?.name}</span> happy shopping</h2>
                        <p>this is your profile page</p>
                        <p>you can see your orders here</p>
                    </div>
                </div>
                <div className={classes['orders-container']}>
                    {isPending && <div className={classes.loader}></div>}
                    {data?.orders.map((order)=>(
                        <div className={classes['order-details']} key={order._id}>
                            <div className={classes['order-text']}>
                                <h2>TotalPrice: {order.totalPrice}</h2>
                                <p className={classes['checkout-status']}>status: <span className={classes['span-checkout']}>Paid <CheckIcon></CheckIcon></span></p>
                                <p className={classes['order-date']}>{formatDate(order.orderedAt)}</p>
                                <button className={classes['order-button']} onClick={()=>orderDetailsHandler(order._id)}>View Order Details</button>
                            </div>
                            <div className={classes['order-img']}>
                                <div className={classes['order-image']}>
                                    <img src={`/api/${order.items[0].productId.images[0]}`}></img>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )

}

export default ProfileDetails
