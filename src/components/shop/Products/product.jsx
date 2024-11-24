import classes from './productDetails.module.css'
import { cartActions } from '../../../../store/cartSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { sendCartData } from '../../../../store/cartSlice'
import { notificationActions } from '../../../../store/Notification'
import { getToken } from '../../../utils/auth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Product({product}){
    const token = getToken()
    const navigate = useNavigate()
    const dispatch =  useDispatch()

    // const [isClicked, setIsclicked] = useState(false)
    const [pickedColorName,setPickedColorName] = useState()
    const [selectedColor,setColor] = useState()
    const [selectedSize, setSize] = useState()
    
    const [amount,setAmount] = useState(1)
    const [imageSelected,setImage] = useState()

    // i used useEffect as the data is fetched ayschn so the useState initilaxed before 
    //the whole product loadded so it wasnt able to use the color to set it in the default

    useEffect(() => {
        if (product?.product?.colors?.length > 0) {
            setColor(product.product.colors[0]); // Default to the first color
            setPickedColorName(product.product.colors[0].name)
        }
        if (product?.product?.sizes?.length > 0) {
            setSize(product.product.sizes[0]); // Default to the first size
        }
    }, [product]);

    
    

    
    
    var x = product?.product._id ||''
    var y = product?.product.name ||''
    var z = product?.product.price || 0 
    // var color = product?.product.colors[0]

    const increaseamount=()=>{
        setAmount((prev)=>{
            return prev + 1
        })
    }
    const decreasamount =()=>{
        setAmount((prev)=>{
            return prev - 1
        })
    }

    const passcolor = (name,code,id)=>{
        setColor({
            _id:id,
            name:name,
            code:code
        })
        setPickedColorName(name)
        // setIsclicked(prev=>!prev)
    }

    const passSize = (size)=>{
        setSize(size)
        // setIsclicked(prev=>!prev)

    }
////////

    const addTocart =(e)=>{
        e.preventDefault();

        const productData = {
            productId: x,
            color: selectedColor,
            size: selectedSize,
            quantity: amount,
        };

        if(!token){
            dispatch(notificationActions.passNotification({
                Title:'info',
                Message:'You Have To Login First'
            }))

            navigate('/login')
        }else{
            dispatch(sendCartData(productData))
            dispatch(notificationActions.passNotification({
                Title:'success',
                Message:'Item Added Successfully'
            }))
        }

        console.log('dispatching with',productData)
        
    }

///////////
    const selectImageHandler =(image)=>{
        setImage(image)
        // setIsclicked(prev=>!prev)

    }

    console.log(product)

    return (
        <div className={classes['product-details']}>
            {product || product?.product 
                ? 
                <form onSubmit={addTocart} className={classes['item-form']}>
                <div className={classes.image}>
                    <div className={classes['image-details']}>
                        <img src={imageSelected ? `/api/${imageSelected}` : `/api/${product.product.images[0]}`}></img>
                    </div>
                    <div className={classes['small-images']}>
                        {product?.product.images.map((image)=>(
                            <img src={`/api/${image}`} className={classes['small-image']} onClick={()=>selectImageHandler(image)}></img>
                        ))}
                        {/* <img src={`/api/${product?.product.images[2]}`} className={classes['small-image']}></img>
                        <img src={`/api/${product?.product.images[3]}`} className={classes['small-image']}></img> */}
                    </div>
                </div>
                <div className={classes.details}>
                    <h2>{product?.product.name}</h2>
                    <p>${product?.product.price}</p>
                    <p>{product?.product.description}</p>
                    <div className={classes.colors}>
                        <p>color</p>
                        {product?.product.colors.map((color)=>(
                            <span className={`${classes.color} ${pickedColorName === color.name ? classes.activeC :''}`} key={color._id} onClick={()=>passcolor(color.name,color.code,color._id)} style={color.code? {backgroundColor:color.code} : {borderColor:"transparent"}}></span>
                        ))}
                    </div>
                    <div className={classes.sizes}>
                        <p>size</p>
                        {product?.product.sizes.map((size)=>(
                            <span key={size} className={`${classes.size} ${selectedSize === size ? classes.activeS : ''}`} onClick={()=>passSize(size)}>{size}</span>
                        ))}
                    </div>
                    <div className={classes.quantity}>
                        <p>Quantity</p>
                        <div className={classes['quantity-buttons']}>
                            <button type='button' className={classes.minus} onClick={decreasamount}>-</button>
                            <p>{amount}</p>
                            <button type='button' className={classes.plus} onClick={increaseamount}>+</button>
                        </div>
                    </div>
                    <div className={classes['details-button']}>
                        <button type='submit'>Add To Cart</button>
                    </div>
                </div>
            </form>
            :
            <div className={classes.loader}></div> 
                }
            
        </div>
    )
}

export default Product