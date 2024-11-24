import classes from './categoriesFillter.module.css'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'


function SubcategoriesFillter(){

    const subcategories = ["all", "hoodies", "jeans", "jackets", "shoes"]
    const [selectedSubcategory,setSelectedSubcategory] = useState('all')


    const [params] = useSearchParams();
    const navigate = useNavigate()

    useEffect(()=>{
        if(!params.get('subCategory')){
            setSelectedSubcategory('all')
        }
    })

    const subcategorybuttonHandler=(subcategory)=>{

        setSelectedSubcategory(subcategory)

        if(subcategory === 'all'){
            params.delete("subCategory")
        }else{
            params.set("subCategory",subcategory)
        }
        navigate(`/shop?${params.toString()}`)

    }

    return (
        <div className={classes['fill-container']}>
            <h2>SubCategories</h2>
            <ul className={classes.subs}>
                {subcategories.map((sub)=>(
                <li key={sub}>
                    <p onClick={()=>subcategorybuttonHandler(sub)} className={`${selectedSubcategory === sub ? classes.activec : ''}`}>{sub}</p>
                </li>
                ))}
            </ul>
        </div>
    )

}

export default SubcategoriesFillter