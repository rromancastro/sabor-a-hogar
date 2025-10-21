"use client";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { useCart } from "../context/CartContext";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";

export const Navbar = () => {

    const {quantityItems} = useCart();

    const router = useRouter();

    const [dropOpen, setDropOpen] = useState(false);

    return <><nav style={{borderRadius: dropOpen ? '24px 24px 0 0' : '24px'}}>
        <Image onClick={() => router.push("/")} id="navLogo" src="/logo.png" alt="marian" width={50} height={50} />
        <div id="navUtilities">
            <div onClick={() => router.push("/cart")} id="navCartContainer">
                <FaCartShopping className="navCartContainerIcon" />
                <p>{quantityItems()}</p>
            </div>
            <FaCircleUser onClick={() => router.push("/admin")} className="navCartContainerIcon" />
            <IoIosArrowDown style={{rotate: dropOpen ? '180deg' : '0deg', transition: '.3s'}} onClick={() => setDropOpen(!dropOpen)} className="navCartContainerIcon" />
        </div>
    </nav>
        <div id="navDropDown" style={{opacity: dropOpen ? '1' : '0', top: dropOpen ? '9vh' : '0vh' }}>
            <Link href="/products/postres">POSTRES</Link>
            <Link href="/products/helados">HELADOS</Link>
            <Link href="/products/facturas">FACTURAS</Link>
        </div>
    </> 
}