import classes from './OrderDetails.module.css'
import { CheckIcon } from 'lucide-react'

function OrderDetails({order}){
    return(
        <div className={classes['con']}>
            {order 
            ?
            <div className={classes['orderDetails-container']}>
                <div className={classes['order-address']}>
                    <p>{order?.order[0].totalPrice}</p>
                    <p>{order?.order[0].shippingAddress.address1}</p>
                    <p>{order?.order[0].shippingAddress.city}</p>
                    <p className={classes['order-status']}><span className={classes['span-orderStatus']}>Paid <CheckIcon></CheckIcon></span></p>
                </div>
                <div className={classes['orderItems-details']}>
                    <p className={classes.word}>Items:</p>
                    {order?.order[0].items.map((item)=>(
                        <div className={classes['itemDetails-order']} key={item._id}>
                            <div className={classes['orderImage-details']}>
                                <img src={`/api/${item.productId.images[0]}`}></img>
                            </div>
                            <div className={classes['itemOrder-text']}>
                                <p>{item.productId.name}</p>
                                <p>{item.productId.description}</p>
                                <p>Quantity: {item.quantity}</p>
                                <p>{item.productId.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            :
            <div className={classes.loader}></div>
         }
            
        </div>
    )

}

export default OrderDetails