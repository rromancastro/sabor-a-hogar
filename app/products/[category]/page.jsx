"use client";
import { Footer, Navbar, ProductsList } from "@/app/components";
import { getAllProducts } from "@/app/firebase/getAllProducts";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function ProductsCategory({params}) {
    const [products, setProducts] = useState([]);
    const category = useParams().category;

    useState(() => {
        const fetchProductos = async () => {
            const products = await getAllProducts();
            setProducts(products.filter((product) => product.categoria === category));
        }
        fetchProductos();
    }, [category])

    return <section id="productsByCategorySection">
        <Navbar />
        {products.length === 0 ? <div id="productsByCategorySectionError"><h1>No hay productos</h1></div> : <ProductsList titulo={category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()} products={products} />}
        <Footer />
    </section>
}