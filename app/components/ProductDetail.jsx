"use client";
import Image from "next/image";
import { Navbar } from "."
import { useCart } from "../context/CartContext";

export const ProductDetail = ({productData}) => {

    const { addToCart } = useCart();

    return <section id="productDetail">
            <Navbar />
            <div id="productDetailContent">
                <Image id="productDetailImage" src={productData.imagen} alt="producto" width={600} height={600} />
                <div id="productDetailData">
                    <h2>Nombre</h2>
                    <h1>{productData.nombre}</h1>
                    <h2>Descripción</h2>
                    <p>{productData.descripcion}</p>
                    <h2>Precio</h2>
                    <p>${productData.precio}</p>
                    <button onClick={() => addToCart(productData)} id="iniciarSesionButton">Agregar al carrito</button>
                </div>
            </div>
        </section>
}