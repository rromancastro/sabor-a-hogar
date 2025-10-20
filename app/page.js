"use client";
import { useEffect, useState } from "react";
import { Footer, Navbar, ProductsList} from "./components";
import { getAllProducts } from "./firebase/getAllProducts";

export default function Home() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
      const fetchProductos = async () => {
          const products = await getAllProducts();
          setProducts(products);
      }
      fetchProductos();
  }, [])

  return (<>
    <Navbar />
    <ProductsList products={products} />
    <Footer />
  </>)
}
