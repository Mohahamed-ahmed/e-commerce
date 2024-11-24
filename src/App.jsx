import { RouterProvider,createBrowserRouter, json} from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { client } from "./components/Services/apis"
import RootLayout from "./components/RootLayout"
import Home from "./pages/Home"
import SignUp from "./components/Auth/SignUp"
import Login from "./components/Auth/Login"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import CartPage from "./pages/Cart"
import { useEffect } from "react"
import { getToken } from "./utils/auth"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { sendCartData } from "../store/cartSlice"
import { cartActions } from "../store/cartSlice"
import { fetchCartData } from "../store/cartSlice"
import { getUserData } from "../store/userSlice"
import OrderForm from "./components/shop/Orders/orderForm"
import Profile from "./pages/Profile"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import ContactPage from "./pages/Contact"
import AboutPage from "./pages/About"

function App() {

  const token = getToken() 
  // const items = useSelector(state=>state.cart.items)
  const dispatch = useDispatch()
  const changed = useSelector(state=>state.cart.changed)
  const auth = useSelector(state=>state.user.isAuthenticated)


  useEffect(()=>{
    if(!token){
      return
    }

    dispatch(fetchCartData())

  },[dispatch,changed])//this dispatch will never change so the thing that will make us fetch the cartData 
  //is 2 things, first if we call the function by dispatch it in the login comp after we press the button and we do this already,
  // and the second thng is when the cart changed and its changed when we add something so it will reexcute

  useEffect(()=>{
    if(!token){
      return
    }

    dispatch(getUserData())

  },[dispatch,auth])


  const router = createBrowserRouter([
    {
      path:'/',
      element:<RootLayout></RootLayout>,
      children:[
        {
          index:true,
          element:<Home></Home>
        },
        {
          path:'products/:productId',
          element:<ProductDetails></ProductDetails>
        },
        {
          path:'orders/:orderId',
          element:<OrderDetailsPage></OrderDetailsPage>
        },
        {
          path:'/shop',
          children:[
            {
              index:true,
              element:<Shop></Shop>
            },
            // {
            //   path:'product/:productId',
            //   element:<ProductDetails></ProductDetails>
            // }
          ]
        },
        {
          path:'/about',
          element:<AboutPage></AboutPage>
        },
        {
          path:'/contact',
          element:<ContactPage></ContactPage>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/cart',
          element:<CartPage></CartPage>
        },
        {
          path:'/checkout',
          element:<OrderForm></OrderForm>
        },
        {
          path:'/orders',
          element:<Profile></Profile>
        }
      ]
    }
  ])
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  )
}

export default App
