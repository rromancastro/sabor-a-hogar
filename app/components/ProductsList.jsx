import { ProductCard } from "."
import Loader from "./Loader"

export const ProductsList = ({products}) => {
    return<> {
        products.length === 0 ? <Loader /> :
        <div id="productsList">
        {
            products.map((product) => {
                return <ProductCard key={product.id} data={product} />
            })
        }
    </div>}</>
}