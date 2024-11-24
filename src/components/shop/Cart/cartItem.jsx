import classes from './cartDetails.module.css'
import { useDispatch } from 'react-redux'
import { sendCartData } from '../../../../store/cartSlice'
import { DecreaseItemFromCart } from '../../../../store/cartSlice'
import { RemoveItemFromCart } from '../../../../store/cartSlice'
import { useState } from 'react'

function CartItem({cartitems}){

    const dispatch = useDispatch()

    const increseitemInsideCart =(id,color,size)=>{

        dispatch(sendCartData({
            productId:id,
            color:color,
            size:size
        }))

    }

    const decreaseitemshandler =(id,quat)=>{
        if(quat === 1){
            dispatch(RemoveItemFromCart({
                productId:id
            }))
        }else{
            dispatch(DecreaseItemFromCart({
                productId:id
            }))
        }
    }

    const removeItem =(id)=>{
        dispatch(RemoveItemFromCart({
            productId:id
        }))
    }



    return(
        <div>
            {cartitems.map(prod=>(
                <div key={prod._id} className={classes['cart-item']}>
                    <div>
                        <img src={`/api/${prod.productId.images[0]}`} className={classes['cart-image']}></img>
                        <div>
                            <p>{prod.productId.name}</p>
                            <p>{prod.size}</p>
                            <p>{prod.color.name}</p>
                        </div>
                    </div>
                    <p className={classes['item-price']}>${prod.productId.price}</p>
                    <div className={classes['container-buttons']}>
                        <div className={classes['quantity-buttons']}>
                            <button className={classes.plus} onClick={()=>decreaseitemshandler(prod._id,prod.quantity)}>-</button>
                            <p>{prod.quantity}</p>
                            <button className={classes.minus} onClick={()=>increseitemInsideCart(prod.productId._id,prod.color,prod.size)}>+</button>
                        </div>
                        <div>
                            <button onClick={()=>removeItem(prod._id)} className={classes['remove-button']}>remove item</button>
                        </div>
                    </div>
                    <p className={classes.totalprice}>${(prod.productId.price * prod.quantity)}</p>
                </div>
            ))}

        </div>
    )
}

export default CartItem