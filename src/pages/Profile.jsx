import ProfileDetails from "../components/profileDeatails"
import { getOrders } from "../components/Services/order"
import { useQuery } from "@tanstack/react-query"

function Profile(){
    const {data,isPending} = useQuery({
        queryKey:['orders'],
        queryFn:getOrders
    })
    return(
        <ProfileDetails data={data} isPending={isPending}></ProfileDetails>
    )

}
export default Profile