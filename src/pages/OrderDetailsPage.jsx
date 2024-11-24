import OrderDetails from "../components/shop/Orders/OrderDetails"
import { useQuery } from "@tanstack/react-query"
import { getOrderDetails } from "../components/Services/order"
import { useParams } from "react-router-dom"

function OrderDetailsPage(){

    const params = useParams()

    const {data} = useQuery({
        queryKey:['orders', {orderId:params.orderId}],
        queryFn:({signal})=>getOrderDetails({signal, id:params.orderId})
    })

    return (
        <OrderDetails order={data}></OrderDetails>
    )

}

export default OrderDetailsPage