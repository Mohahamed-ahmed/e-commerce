import classes from './offers.module.css'
import offerimage from '../../assets/bg-2.jpg.webp'
import secondofferimage from '../../assets/hero_2.jpg.webp'

function HomeOffers(){
    return(
        <div className={classes['offer-container']}>
            <div className={classes['offerImage-container']}>
                <img src={offerimage} className={classes['offer-image']}></img>
            </div>
            <div className={classes['offer-text']}>
                <h2>It is happenning</h2>
                <p className={classes.parag}>Special offer is here</p>
                <p className={classes['offer-percent']}>25%</p>
            </div>
        </div>
    )

}

export default HomeOffers