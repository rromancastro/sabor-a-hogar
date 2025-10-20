"use client";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";

export const ProductCard = ({data}) => {

    const {addToCart} = useCart();

    const router = useRouter();

    return <article className="productCard">
        <Image className="productCardImage" src={data.imagen} alt="producto" width={200} height={200} />
        <div className="productCardData">
            <p className="productCardDataName"><span>{data.categoria}</span><br />{data.nombre}</p>
            <p className="productCardDataDescripcion">{data.descripcion}</p>
            <p className="productCardDataPrecio">${data.precio}</p>
            <button className="buttonAddToCart" onClick={() => addToCart(data)}>Agregar al carrito</button>
        </div>
    </article>
}