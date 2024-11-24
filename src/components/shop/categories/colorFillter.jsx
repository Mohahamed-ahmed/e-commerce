import classes from './categoriesFillter.module.css'
import { useSearchParams,useNavigate } from 'react-router-dom'
import { useEffect} from 'react'
import { useState } from 'react'

function ColorFillter(){
    const [params] = useSearchParams()
    const [selectedColor,setSelectedColor] = useState('all')

    const navigate = useNavigate()

    const colors = [
        {name:"all"},
        {name:"black", code:"#000"},
        { name:"white", code: "#fff" },
        { name: "navy", code: "#202a44" },
        { name: "gray", code: "gray" },
    ]

    useEffect(()=>{
        if(!params.get("color")){
            setSelectedColor('all')
        }

    })

    const colorSelectHandler=(color)=>{
        setSelectedColor(color.name)

        if(color.name === 'all'){
            params.delete("color")
        }
        else{
            params.set("color",color.name)
            navigate(`/shop?${params.toString()}`)
        }

    }

    return(
        <div className={classes['fill-container']}>
            <h2>color</h2>
            <ul className={classes.colors}>
                {colors.map((color)=>(
                    <li key={color.code}>
                        <span style={color.code? {backgroundColor: color.code} : {borderColor:"transparent"}}></span>
                        <p onClick={()=>colorSelectHandler(color)} className={` ${color.name === selectedColor? classes.activec : ''} `}>{color.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ColorFillter