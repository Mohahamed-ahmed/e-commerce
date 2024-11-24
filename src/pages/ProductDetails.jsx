import Product from "../components/shop/Products/product"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import productsServices from "../components/Services/products"

function ProductDetails(){

    const params = useParams()

    const {data} = useQuery({
        queryKey:["product",{productId: params.productId}],
        queryFn:({signal})=>productsServices.fetchProduct({signal, id:params.productId})
    })


    return(
        <Product product={data?.data}></Product>
    )

}
export default ProductDetails