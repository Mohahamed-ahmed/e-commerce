import apiService from "./apis";

const productsServices = {
    fetchProducts: async({fillter})=>{
        return await apiService.get(`/shop/products?${fillter}`)
    },

    fetchProduct:async({id})=>{
        return await apiService.get(`/shop/product/${id}`)
    }
}

export default productsServices