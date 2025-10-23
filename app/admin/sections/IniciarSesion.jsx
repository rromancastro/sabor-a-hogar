"use client";
import { auth } from "@/app/firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Bounce, toast, ToastContainer} from "react-toastify";

export const IniciarSesion = ({setSesionIniciada}) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                setSesionIniciada(true);
                console.log("signed in");
                toast.success('Sesión iniciada', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            })
            .catch((error) => {
                // Error
                console.log(error);
                toast.error('Credenciales incorrectas', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
                });
            });
    }

    return <section id="iniciarSesionSection">
        <section id="iniciarSesionSectionContent">
            <h1>Panel de administrador</h1>
            <h2>Iniciar sesión</h2>
            <div className="inputContainer">
                <label htmlFor="userInput">Usuario</label>
                <input id="userInput" type="text" placeholder="Usuario" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="inputContainer">
                <label htmlFor="passwordInput">Contraseña</label>
                <input id="passwordInput" type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button id="iniciarSesionButton" onClick={handleSubmit}>Iniciar sesión</button>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
        </section>
    </section>
}