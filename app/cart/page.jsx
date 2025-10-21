"use client";
import Image from "next/image";
import { Navbar } from "../components";
import { useCart } from "../context/CartContext";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

export default function Cart() {

    const {cartItems, quantityItems, plusOneToCart, minusOneToCart, removeFromCart, clearCart, totalPrice} = useCart();

    const whatsappNumber = "5492664749903";

    const generateMessage = () => {
        let message = "Hola! Quisiera hacer un pedido:%0A";
        cartItems.forEach((item) => {
        message += `${item.quantity}x ${item.nombre}%0A`;
        });
        return message;
    };

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${generateMessage()}`;

    return <section id="cartSection">
        <Navbar />
        {
            quantityItems() === 0 ? <h1 style={{fontWeight: 500}}>Tu carrito está vacío</h1> : <>
            <div id="cartContent">
                <h1>Tu carrito:</h1>
                <div id="cartContentProducts">
                    <div id="cartContentProductsTableInfo">
                        <p>Producto</p>
                        <p>Cantidad</p>
                        <p>Total</p>
                        <p>Eliminar</p>
                    </div>
                    <div id="cartContentProductsContent">
                        {
                            cartItems.map((item) => {
                                return <article key={item.id} className="cartContentProduct">
                                    <div className="cartContentProductImageContainer">
                                        <Image src={item.imagen} className="cartContentProductImage" alt="producto" width={100} height={100} />
                                        <p>{item.nombre}</p>
                                    </div>
                                    <div className="cartContentProductCantidad">
                                        <FaMinus onClick={() => minusOneToCart(item.id)} className="cartContentProductCantidadIcon" />
                                        <p>{item.quantity}</p>
                                        <FaPlus onClick={() => plusOneToCart(item.id)} className="cartContentProductCantidadIcon" />
                                    </div>
                                    <p className="precioTotal">${item.precio * item.quantity}</p>
                                    <FaTrash className="cartEliminarItem" onClick={() => removeFromCart(item.id)} />
                                </article>
                            })
                        }
                    </div>
                </div>
                <button onClick={() => clearCart()} id="iniciarSesionButton">Eliminar carrito</button>
            </div>
            <div id="orderSummary">
                <h2>Resumen del pedido</h2>
                <p>Total: <span>${totalPrice()}</span></p>
                <p>Cantidad de productos: <span>{quantityItems()}</span></p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">Continuar compra <IoLogoWhatsapp /></a>
            </div>
        </>}
    </section>
}