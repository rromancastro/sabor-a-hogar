"use client";
import { useState } from "react";
import { Navbar } from "../components";
import { IniciarSesion, PanelAdministrador } from "./sections";

export default function Admin() {

    const [sesionIniciada, setSesionIniciada] = useState(false);

    return (<>
        <Navbar />
        { !sesionIniciada ?
            <IniciarSesion setSesionIniciada={setSesionIniciada} /> : <PanelAdministrador />
        }
    </>)
}