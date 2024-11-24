import classes from './categoriesFillter.module.css'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


function PriceFillter(){

    const [params] = useSearchParams()
    const navigate = useNavigate()

    const [selectedPrice,setSelectedPrice] = useState('all')

    useEffect(()=>{
        if(!params.get('minPrice')){
            setSelectedPrice('all')
        }
    })


    const prices = [
        "all",
        { min: 0, max: 50 },
        { min: 50, max: 100 },
        { min: 150, max: 200 },
        { min: 250 },
    ]

    const pricefillterHandler=(price)=>{

        setSelectedPrice(price)

        if(price.min === undefined){
            params.delete('minPrice')
            params.delete('maxPrice')
        }
        else if(price.max === undefined){
            params.delete("maxPrice")
            params.set('minPrice',price.min)
            
        }
        else{
            params.set('minPrice',price.min)
            params.set('maxPrice',price.max)
        }
        navigate(`/shop?${params.toString()}`)
    }

    return(
        <div className={classes['fill-container']}>
            <h2>price</h2>
            <ul className={classes.price}>
                {prices.map((price)=>(
                    <li key={price}>
                        <p onClick={()=>pricefillterHandler(price)} className={`${selectedPrice === price ? classes.activec : ''}`}>{price.min ?? "all"} {price.max && `- ${price.max}`}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default PriceFillter