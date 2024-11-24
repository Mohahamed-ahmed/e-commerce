import classes from '../shop/NewArrival.module.css'
// import classe from '../shop/shop.module.css'
import { Link } from 'react-router-dom'


function ProductCard({data}){

    
    return(
        <>
                {data?.products.map((product)=>(
                <Link className={classes['product-card']} key={product?._id} to={`/products/${product?._id}`}>
                    <img src={`/api/${product?.images[0]}`}></img>
                    <div className={classes.text}>
                        <p>{product?.name}</p>
                        {/* <p className={classes.add}>Add to cart +</p> */}
                        <p>{product?.price}</p>
                    </div>
                </Link>
                ))}
        </>
    )
}

export default ProductCard