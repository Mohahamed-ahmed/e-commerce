import classes from './NewArrival.module.css'
import { useQuery } from '@tanstack/react-query'
import productsServices from '../Services/products'
import ProductCard from '../UI/ProductCard'

function NewArrival(){

    const {data} = useQuery({
        queryKey:["products" , {tags:'new-arrivals'}],
        queryFn:({signal})=>productsServices.fetchProducts({signal, fillter: "&tags=new-arrivals"})
    })


    return(
        <div className={classes['newArrival-container']}>
            <h1>New Arrivals</h1>
            <div className={classes['newArrival-products']}>
                <ProductCard data={data?.data}></ProductCard>
            </div>
        </div>
    )
}

export default NewArrival