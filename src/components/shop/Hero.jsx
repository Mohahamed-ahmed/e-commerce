import classes from './Hero.module.css'
import { Link } from 'react-router-dom'
import hero from '../../assets/hero-1.jpg'
function Hero(){
    return(
        <div className={classes['landing-container']}>
            <img src={hero} className={classes['hero-image']}></img>
            <div className={classes.text}>
                <h1>New Season</h1>
                <p className={classes['discover-now']}>Discover Winter Collection 2025</p>
                <Link to='/shop'>
                    <button className={classes['shop-button']}>Shop Now</button>
                </Link>
            </div>
        </div>
    )
}

export default Hero