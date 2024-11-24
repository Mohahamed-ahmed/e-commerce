import Hero from "../components/shop/Hero"
import NewArrival from "../components/shop/NewArrival"
import Categories from "../components/shop/Categories"
import HomeOffers from "../components/shop/offers"
import OurServices from "../components/shop/ourServices"
import { useEffect } from "react"

function Home(){

    // useEffect(()=>{
    //     const fetchdata = async()=>{
    //         const res = await fetch("/api/shop/products")

    //         if(!res.ok){
    //             console.log(await res.json());
                
    //         }
    //         else{
    //             const data = await res.json()
    //             console.log(data)
    //         }
    //     }

    //     fetchdata()

    // },[])
    return(
        <>
            <Hero></Hero>
            <NewArrival></NewArrival>
            <Categories></Categories>
            <HomeOffers></HomeOffers>
            <OurServices></OurServices>
        </>
    )
}

export default Home