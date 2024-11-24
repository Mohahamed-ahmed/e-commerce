import classes from './Pagination.module.css'
import { useState } from 'react'
import { useNavigate,useSearchParams } from 'react-router-dom'

function Pagination({data}){
    const [pageNum,setPage]=useState(1)

    const navigate = useNavigate()
    const [params] = useSearchParams();

    
    const increasePageNumber=()=>{
        let nextPage = data?.currentPage === data?.numberOfPages ? data?.currentPage : data?.currentPage + 1
        setPage(nextPage)
        params.set("page",nextPage)
        navigate(`/shop?${params.toString()}`)//we need this to update the url so we can get it from params in the shop page and pas it to the url to make the request and make the rerender
    }

    const decreasePageNumber=()=>{
        let nextPage = data?.currentPage === 1 ? data?.currentPage : data?.currentPage - 1

        setPage(nextPage)

        params.set('page',nextPage)
        navigate(`/shop?${params.toString()}`)
    }

    return(
        <div className={classes.container}>
            <button onClick={decreasePageNumber}>Previous</button>
            <p>page {data?.currentPage} of {data?.numberOfPages}</p>
            <button onClick={increasePageNumber}>Next</button>
        </div>
    )
}

export default Pagination