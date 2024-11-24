import classes from './ourServices.module.css'
import icon1 from '../../assets/fast-9e7ce1d5.png'
import icon2 from '../../assets/premium-61a4b963.png'
import icon3 from '../../assets/shield-8c8313c1.png'
import Service from './Service'

function OurServices (){
    return (
        <section>
            <div className={classes['services-container']}>
                <Service
                    icon={icon1}
                    title="Free Shipping"
                    description="For shippings over 100$"
                />
                <Service
                    icon={icon2}
                    title="Best Quality"
                    description="Premium quality in your hand"
                />
                <Service
                    icon={icon3}
                    title="Secure Payment"
                    description="All your credit data is safe"
                />
            </div>
        </section>
    )

}

export default OurServices