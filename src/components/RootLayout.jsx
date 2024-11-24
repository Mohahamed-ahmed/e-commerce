import { Outlet } from "react-router-dom"
import MainHeader from "./Layout/MainHeader"
import { useSelector } from "react-redux"
import Notification from "./UI/Notification"
import Footer from "./Layout/Footer"

function RootLayout(){

    const notiChanged = useSelector(state=>state.notification.isChanged)

    return(
        <>
        <MainHeader></MainHeader>
        <main>
            {notiChanged && <Notification></Notification>}
            <Outlet></Outlet>
        </main>
        <Footer></Footer>
        </>
    )
}
export default RootLayout