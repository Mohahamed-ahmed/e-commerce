import { useQuery } from "@tanstack/react-query"
import ProductCard from "../components/UI/ProductCard"
import productsServices from "../components/Services/products"
import classes from '../components/shop/shop.module.css'
import Pagination from "../components/shop/Pagination/Pagination"
import { useSearchParams } from "react-router-dom"
import CategoriesFillter from "../components/shop/categories/categoriesFillter"
import SubcategoriesFillter from "../components/shop/categories/subcategoriesFillter"
import ColorFillter from "../components/shop/categories/colorFillter"
import PriceFillter from "../components/shop/categories/priceFillter"
import SortFillter from "../components/shop/categories/sortbyFillter"

function Shop(){

    const [params] = useSearchParams()

    let fillter = params.toString()
    

    const {data,isPending} = useQuery({
        queryKey:["products", {fillter}],
        queryFn:({signal})=>productsServices.fetchProducts({signal , fillter})
    })



    return (
        <div className={classes.shop}>
            <CategoriesFillter></CategoriesFillter>
            {/* <CategoriesFillter></CategoriesFillter> */}
            <div className={classes['shop-fillter']}>
                {/* <CategoriesFillter></CategoriesFillter> */}
                <div className={classes.fillter}>
                    <SubcategoriesFillter></SubcategoriesFillter>
                    <ColorFillter></ColorFillter>
                    <PriceFillter></PriceFillter>
                    <SortFillter></SortFillter>
                </div>
                <div className={classes['shop-products-wrapper']}>
                    {isPending &&<div className={classes.loader}></div>}
                    {data?.data.products.length === 0 && <h2 className={classes['empty-array']}>No Products Found</h2>}
                    <div className={classes['shop-products']}>
                        <ProductCard data={data?.data}></ProductCard>
                    </div>
                </div>
            </div>
            <Pagination data={data?.data}></Pagination>
        </div>
    )

}

export default Shop