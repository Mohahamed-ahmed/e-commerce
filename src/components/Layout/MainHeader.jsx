import { NavLink ,Link} from "react-router-dom"
import classes from './MainHeader.module.css'
import Cart from '../UI/cartItem'
import SearchIcon from '../UI/searchIcon'
import UserIcon from '../UI/userIcon'
import { useEffect ,useState} from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { logouth } from "../../../store/userSlice"
import { redirect } from "react-router-dom"
import SearchModal from "../shop/Search/SearchModal"
import { ScrollRestoration } from "react-router-dom"


function MainHeader(){
    const [scrolled, SetScrolled] = useState(false)
    const [showSearch, setShowSearch] = useState(false);
    const [toggleNav, setToggleNav] = useState(false);


    const navigate = useNavigate()

    const isAuthenticated = useSelector(state=>state.user.isAuthenticated)
    const user = useSelector(state=>state.user.user)



    const totalCartQuantity = useSelector(state=>state.cart.totalCartAmount)
    const dispatch = useDispatch()

    const toggleNavHandler = () => {
        setToggleNav((prev) => !prev);
      };

    useEffect(()=>{
        const handleScroll=()=>{
            const offset = window.scrollY
            if(offset>50){
                SetScrolled(true)
            }
            else{
                SetScrolled(false)
            }
        }
        window.addEventListener('scroll',handleScroll)
        return ()=>{
            window.removeEventListener('scroll',handleScroll)
        }
    },[])

    const loginHandler=()=>{
        navigate('/login')
    }

    const logoutHandler= ()=>{
        dispatch(logouth())
        redirect('/')
    }

    const links = (
        <ul>
            <li>
                <NavLink 
                    to='/'
                    className={({isActive}) => isActive? classes.active : undefined}
                    end
                >
                Home
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/shop'
                    className={({isActive}) => isActive? classes.active : undefined}
                    end
                >
                Shop
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/about'
                    className={({isActive}) => isActive? classes.active : undefined}
                    end
                >
                About
                </NavLink>
            </li>
            <li>
                <NavLink 
                    to='/contact'
                    className={({isActive}) => isActive? classes.active : undefined}
                    end
                >
                Contact Us
                </NavLink>
            </li>
            <ScrollRestoration></ScrollRestoration>
        </ul>
    )

    return(
            <header className={`${classes.header} ${ scrolled ? classes.scrolled : ''}`} >
                <NavLink to='/' className={classes.logo}>
                    <div className={classes.circle}>
                        <div className={classes.diamond}></div>
                    </div>
                    Atlas
                </NavLink>
                <nav>{links}</nav>
                <div>
                {isAuthenticated ?
                <div className={classes.icons}>
                    <Link to={'/cart'} className={classes['cart-button']}>
                        <span className={classes.cartNum}>{totalCartQuantity}</span>
                        <Cart></Cart>
                    </Link>
                    <SearchIcon onClick={() => setShowSearch(prev => true)} />
                    {showSearch && (
                    <SearchModal onHideSearch={() => setShowSearch(prev => false)} />
                    )}
                    <Link to={'/orders'} className={classes['cart-button']}>
                        <UserIcon></UserIcon>
                    </Link>                    
                    {/* <ShoppingCart className={classes.shopping}></ShoppingCart> */}
                    <button onClick={logoutHandler} className={classes.logout}>Logout</button>
                    <div
                        className={`${classes.mobileNav} ${toggleNav ? classes.active : ''}`}
                        onClick={toggleNavHandler}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className={classes.links}>
                            {links}
                            <li className={classes['li-logout']}>
                                <button onClick={logoutHandler} className={classes['logoutinsid']}>Logout</button>
                            </li>
                        </div>
                    </div>
                </div>
                :
                <div className={classes.icons}>
                    <button onClick={loginHandler} className={classes.login}>Login</button>
                    <div
                        className={`${classes.mobileNav} ${toggleNav ? classes.active : ''}`}
                        onClick={toggleNavHandler}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <div className={classes.links}>{links}</div>
                    </div>
                </div>
                }
                </div>
            </header>
    )
}

export default MainHeader