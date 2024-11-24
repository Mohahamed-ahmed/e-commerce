import Modal from "../../UI/Modal";
import { useQuery } from "@tanstack/react-query";
import productsServices from "../../Services/products";
import classes from "./Search.module.css";
import SearchIcon from "../../UI/searchIcon";
import { Link } from "react-router-dom";
import { useState } from "react";

function SearchModal(props){

    const [searchTerm, setSearchTerm] = useState('')


    const {data, isError, error ,isPending} = useQuery({
        queryKey:["products", {searchTerm}],
        queryFn: ({signal})=>productsServices.fetchProducts({signal, fillter: "searchBy=" + searchTerm})
    })

    const searchHandler = (e) => {
        setSearchTerm((prev) => e.target.value);
      };

    let content;

    console.log(data?.data)

    if (data) {
        content = data.data.products.map((product) => (
        <li key={product._id}>
            <img src={`/api/${product.images[0]}`} alt="" />
            <Link to={`/products/${product._id}`} onClick={props.onHideSearch}>{product.name}</Link>
        </li>
        ));
    }

    if (isError) {
        content = <p>{error.info?.message || "Something went wrong!"}</p>;
    }
    
    return(
            <Modal className={classes.modal} onClose={props.onHideSearch}>
                <div className="container">
                    <div
                        className={`${classes["search-bar"]} ${
                        searchTerm !== "" ? classes.active : ""
                        }`}
                    >
                        <form action="">
                        <input
                            type="text"
                            name="search"
                            placeholder="Search products"
                            onChange={searchHandler}
                        />
                        <button type="button" className={classes['search-button']}>
                            <SearchIcon />
                        </button>
                        </form>
                    </div>
                    <div className={classes.products}>
                        {content?.length > 0 && searchTerm !== '' ? (
                        <ul>{content}</ul>
                        ) : (
                        <div className={classes.center}>
                            {!isPending && searchTerm === '' && "Enter a product name."}
                            {!isPending && searchTerm !== '' && "No products matched."}
                        </div>
                        )}
                    </div>
                </div>
        </Modal>    
      )
}

export default SearchModal