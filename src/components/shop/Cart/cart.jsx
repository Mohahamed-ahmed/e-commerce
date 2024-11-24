import classes from './cartDetails.module.css'
import { useSelector } from 'react-redux'
import { cartActions } from '../../../../store/cartSlice'
import { useDispatch } from 'react-redux'
import CartItem from './cartItem'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

function Cart (){

    const dispatch = useDispatch()
    const cartProducts = useSelector(state=>state.cart.items)
    const cartPrice = useSelector(state=>state.cart.totalPriceOfCart)
    const navigate = useNavigate()


    const handelCheckout=()=>{
        navigate('/checkout')
    }

    return (
        <>
        {cartProducts?.length > 0 ?
            <div className={classes['cart-container']}>
                <div>
                    <div className={classes['cart-headlines']}>
                        <h3>Product</h3>
                        <h3>Price</h3>
                        <h3>Quantity</h3>
                        <h3 className={classes['totalprice-head']}>Total</h3>
                    </div>
                    <CartItem cartitems={cartProducts}></CartItem> 
                    <div className={classes.subtotal}>
                        <h3>SubTotal</h3>
                        <p>${cartPrice}</p>
                        <p>Taxes and shipping calculated at checkout</p>
                        <button className={classes['checkout-button']} onClick={handelCheckout}>Checkout</button>
                        <div className={classes.arrow}>
                            <Link to={'/shop'}><ArrowLeft></ArrowLeft>Continue Shopping</Link>
                        </div>
                    </div>
                </div>
            </div>
            :
            <div className={classes['empty-cart']}>
                <h2>Your Cart Is Currently Empty</h2>
                <div className={classes.arrow}>
                    <Link to={'/shop'}><ArrowLeft></ArrowLeft>Start Shopping</Link>
                </div>
            </div>
            }
        </>
        // </div>
    )

}

export default Cart