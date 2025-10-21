import { ProductCard } from "."
import Loader from "./Loader"

export const ProductsList = ({products, titulo}) => {
    return<> {
        products.length === 0 ? <Loader /> :
        <div id="productsListContainer">
            <h1>{titulo}</h1>
            <div id="productsList">
            {
                products.map((product) => {
                    return <ProductCard key={product.id} data={product} />
                })
            }
                </div>
        </div>}</>
}