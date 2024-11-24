import classes from './Categories.module.css'
import image from '../../assets/cloth_2.jpg.webp'
import img from '../../assets/watch_1.jpg.webp'
import imag from '../../assets/product_7.jpg.webp'


import { Link } from 'react-router-dom'

function Categories(){
    return(
        <div className={classes['categories-container']}>
            <h1>Categories</h1>
            <div className={classes['home-categories']}>
                <div className={classes['mens-card']}>
                    <div className={classes['categories-image']}>
                        <img src={image} className={classes['men-image']}></img>
                    </div>
                    <div className={classes.text}>
                        <h2>Mens Collection 2025</h2>
                        <Link to={'/shop?category=men'}>Discover Now</Link>
                    </div>
                </div>
                <div className={classes['women-card']}>
                    <div className={classes['categories-image']}>
                        <img src={imag} className={classes['women-image']}></img>
                    </div>                    
                    <div className={classes.text}>
                        <h2>Women Collection 2025</h2>
                        <Link to={'/shop?category=women'}>Discover Now</Link>
                    </div>
                </div>
                <div className={classes['access-card']}>
                    <div className={classes['categories-image']}>
                        <img src={img} className={classes['acces-image']}></img>
                    </div>
                    <div className={classes.text}>
                        <h2>
                            Accessories Collection
                            2025
                        </h2>
                        <Link to={'/shop?category=accessories'}>Discover Now</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories