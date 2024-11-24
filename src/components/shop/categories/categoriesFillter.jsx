import { NavLink } from "react-router-dom"
import classes from './categoriesFillter.module.css'
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useParams } from "react-router-dom"


function CategoriesFillter(){

    const [params] = useSearchParams()

    const [selectedCategory, setSelectedCategory] = useState(params.get('category')??'all')



    const categoriesLinks = ["all","men", "women", "accessories"]

    const setcategoryhandler=(category)=>{

        setSelectedCategory(category)
    }

    return (
        <div className={classes['links-container']}>
            {categoriesLinks.map((link)=>(
                <NavLink 
                    key={link} 
                    to={link === 'all' ? '/shop' : `/shop?category=${link}`} 
                    onClick={()=>setcategoryhandler(link)}
                    className={` ${classes.categoryLink} ${selectedCategory === link ? classes.activec : ''}`}
                    >
                    {link}
                </NavLink>
            ))}
        </div>
        
    )
}

export default CategoriesFillter