import classes from './Service.module.css'

function Service({icon,title,description}){
    return(
        <div className={classes.service}>
            <img src={icon}></img>
            <div className={classes['service-text']}>
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    )

}

export default Service