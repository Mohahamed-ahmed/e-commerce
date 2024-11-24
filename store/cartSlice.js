import { createSlice } from "@reduxjs/toolkit"
import { getToken } from "../src/utils/auth"
import { addToart ,decreaseFromCart,removeItemFromCart} from "../src/components/Services/cart1"
import { getCart } from "../src/components/Services/cart1"
import { refreshTokenHandler } from "./userSlice"
import { notificationActions } from "./Notification"

const initialCartState = {
    changed:false,
    items:[],
    totalCartAmount:0,
    totalPriceOfCart:0
}
const CartSlice = createSlice({
    name:'cart',
    initialState: initialCartState,
    reducers:{
        replaceCart(state,action){
            state.items = action.payload.items
            state.totalCartAmount = action.payload.totalCartAmount
            state.totalPriceOfCart = action.payload.totalPriceOfCart
        },
        setCartChanged(state,payload){
            state.changed = payload
        },
        AddItemToCart(state,action){
            const newItem = action.payload
            const existingItem = state.items.find(item=> item.id === newItem.id)
            state.totalCartAmount = state.totalCartAmount + newItem.quantity
            state.totalPriceOfCart = state.totalPriceOfCart + newItem.price * newItem.quantity

            if(!existingItem){
                state.items.push({
                    productId:newItem.id,
                    color:newItem.color,
                    // name:newItem.name,
                    // price:newItem.price,
                    size:newItem.size,
                    quantity:newItem.quantity,
                    // totalPrice:newItem.price * newItem.quantity,
                    // image:newItem.image,
                })
                
            }else{
                existingItem.quantity = existingItem.quantity + newItem.quantity
                existingItem.totalPrice = existingItem.totalPrice + newItem.quantity * newItem.price
            }

            // state.totalPriceOfCart = existingItem.totalPrice + newItem.totalPrice
        },
        decrease(state,action){
            const itemId = action.payload
            const existingItem = state.items.find(item=> item.id === itemId)
            state.totalCartAmount--
            state.totalPriceOfCart = state.totalPriceOfCart - existingItem.price

            if(existingItem.quantity === 1){
                state.items = state.items.filter((item)=> item.id !== itemId)
            }else{
                existingItem.quantity--
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price
            }
        },
        removeItem(state,action){
            const itemId = action.payload
            const existingItem = state.items.find(item=> item.id === itemId)
            state.totalCartAmount = state.totalCartAmount - existingItem.quantity
            state.totalPriceOfCart = state.totalPriceOfCart - existingItem.totalPrice
            
            if(existingItem){
                state.items = state.items.filter((item)=> item.id !== itemId)
            }
        }
    }
})



export const fetchCartData = ()=>{
    return async (dispatch)=>{
        try{
            const {items,totalQuantity,subTotal} = await getCart()
            dispatch(cartActions.replaceCart({
                items : items || [],
                totalCartAmount : totalQuantity,
                totalPriceOfCart : subTotal
            }))
        }catch(error){
                  // get a new refresh token and re-execute
                if(error.info.message === 'jwt expired' && getToken()){
                    dispatch(refreshTokenHandler(getCart))
                }else{
                    dispatch(notificationActions.passNotification({
                        Title:'error',
                        Message:'something went wrong about token'
                    }))
                }
            console.log(error)
        }
    }
}

export const sendCartData=(product)=>{
    return async (dispatch)=>{
        if (!product || !product.productId || !product.color || !product.size || product.quantity <= 0) {
            console.error('Invalid product data:', product);
            return;
        }
        try{
            dispatch(cartActions.setCartChanged(true))
            await addToart(product)

            dispatch(cartActions.setCartChanged(false))

        }catch(error){
            // get a new refresh token and re-execute
            if (error.info.message === 'jwt expired' && getToken()){
                dispatch(refreshTokenHandler(addToart(product)));
            }else{
                dispatch(notificationActions.passNotification({
                    Title:'error',
                    Message:'something went wrong about token'
                }))
            }
            console.log(error)
        }
}
}

export const DecreaseItemFromCart=(productId)=>{
    return async (dispatch)=>{

        try{
            
            dispatch (cartActions.setCartChanged(true))
            await decreaseFromCart(productId)
            dispatch(cartActions.setCartChanged(false))
    
        }catch(error){
            // get a new refresh token and re-execute
            if (error.info.message === 'jwt expired' && getToken()){
                dispatch(refreshTokenHandler(productId));
            }
            else{
                dispatch(notificationActions.passNotification({
                    Title:'error',
                    Message:'something went wrong about token'
                }))
            }
            console.log(error)
        }
    }
}

export const RemoveItemFromCart=(productId)=>{
    return async(dispatch)=>{

        try{

            dispatch(cartActions.setCartChanged(true))
            await dispatch(removeItemFromCart(productId))
            dispatch(cartActions.setCartChanged(false))

        }catch(error){
            // get a new refresh token and re-execute
            if (error.info.message === 'jwt expired' && getToken()){
                dispatch(refreshTokenHandler(productId));
            }else{
                dispatch(notificationActions.passNotification({
                    Title:'error',
                    Message:'something went wrong about token'
                }))
            }
            console.log(error)
        }
    }
}



export const cartActions  = CartSlice.actions

export default CartSlice