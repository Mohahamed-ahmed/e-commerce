import classes from './categoriesFillter.module.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function SortFillter(){
    const [params] = useSearchParams()
    const navigate = useNavigate()

    const [selectedSort,setSelectedSort] = useState('default')

    const sort =[
        { title: "default" },
        { title: "newness", field: "-createdAt" },
        { title: "price: low to high", field: "price" },
        { title: "price: high to low", field: "-price" },
    ]

    useEffect(()=>{
        if(!params.get('sortBy')){
            setSelectedSort('default')
        }
    })

    const sortfillterHandler = (sort)=>{

        setSelectedSort(sort)

        if(sort.title === 'default'){
            params.delete('sortBy')
        }
        else{
            params.set('sortBy',sort.field)
        }
        
        navigate(`/shop?${params.toString()}`)
    }

    return(
        <div className={classes['fill-container']}>
            <h2>sort by</h2>
            <ul className={classes.sort}>
                {sort.map((sor)=>(
                    <li key={sor.title}>
                        <p onClick={()=>sortfillterHandler(sor)} className={`${selectedSort === sor.title ? classes.activec : ''}`}>{sor.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default SortFillter