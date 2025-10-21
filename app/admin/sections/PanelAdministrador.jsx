"use client";
import { auth, db } from "@/app/firebase/firebaseConfig";
import { getAllProducts } from "@/app/firebase/getAllProducts";
import { addDoc, collection, updateDoc, doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const PanelAdministrador = () => {
    const [user, setUser] = useState(null);

    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState("");

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "nextjs_upload");
        formData.append("cloud_name", "dpc0kmpzz");

        const res = await fetch("https://api.cloudinary.com/v1_1/dpc0kmpzz/image/upload", {
            method: "POST",
            body: formData,
            });

            const data = await res.json();
            setImagen(data.secure_url);
            console.log(data.secure_url);
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((u) => {
            setUser(u);
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (nombre === "" || descripcion === "" || precio === "" || imagen === "") {
            toast.error('Asegurate de llenar todos los campos', {
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
        } else {
            const data = {
                nombre: nombre,
                descripcion: descripcion,
                categoria: categoria,
                precio: precio,
                imagen: imagen,
            }

            const docRef = await addDoc(collection(db, "products"), data);

            toast.success(`Producto subido correctamente, vuelve a ingresar para editarlo`, {
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

            setDescripcion("");
            setNombre("");
            setPrecio("");
            setImagen("");
        }
    }

    //input editar productos
    const [productSelected, setProductSelected] = useState(null);
    const [nombreSelected, setNombreSelected] = useState("");
    const [descripcionSelected, setDescripcionSelected] = useState("");
    const [categoriaSelected, setCategoriaSelected] = useState("");
    const [precioSelected, setPrecioSelected] = useState("");
    const [imagenSelected, setImagenSelected] = useState("");

    useEffect(() => {
        if (productSelected === null) return;
        setNombreSelected(productSelected.nombre);
        setDescripcionSelected(productSelected.descripcion);
        setCategoriaSelected(productSelected.categoria);
        setPrecioSelected(productSelected.precio);
        setImagenSelected(productSelected.imagen);
    }, [productSelected])

    const handleSubmitChange = async (e) => {
        e.preventDefault();
        if (nombreSelected === "" || descripcionSelected === "" || precioSelected === "" || imagenSelected === "") {
            toast.error('Asegurate de llenar todos los campos', {
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
        } else {
            const data = {
                nombre: nombreSelected,
                descripcion: descripcionSelected,
                categoria: categoriaSelected,
                precio: precioSelected,
                imagen: imagenSelected,
            }

            const docRef = doc(db, "products", productSelected.id);

            await updateDoc(docRef, data);

            toast.success(`Producto editado correctamente`, {
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

            setProductSelected(null);
        }
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        const docRef = doc(db, "products", productSelected.id);

        await deleteDoc(docRef);

        toast.success(`Producto eliminado correctamente`, {
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

        setProductSelected(null);
    }

    //cargar productos
    const [products, setProducts] = useState([]);
    useEffect(() => {
          const fetchProductos = async () => {
              const products = await getAllProducts();
              setProducts(products);
          }
          fetchProductos();
    }, [productSelected])

    return <section id="panelAdministradorSection">
        <h2>Subir producto</h2>
        <div className="inputContainer">
            <label htmlFor="nombreInput">Nombre</label>
            <input id="nombreInput" type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="inputContainer">
            <label htmlFor="descripcionInput">Descripción</label>
            <input id="descripcionInput" type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>
        <div className="seleccionarCategoria">
            <p>Categoria</p>
            <select id="categoriaSelect" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="postres">Postres</option>
                <option value="helados">Helados</option>
                <option value="facturas">Facturas</option>
            </select>
        </div>
        <div className="inputContainer">
            <label htmlFor="precioInput">Precio</label>
            <input id="precioInput" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)} />
        </div>
        <div className="inputContainer">
            <label htmlFor="precioInput">Imagen</label>
            { imagen === "" ?
                <input id="inputImagenes" type="file" onChange={handleUploadImage} /> :
                <Image id="panelAdministradorImagen" src={imagen} alt="producto" width={200} height={200} />
            }
        </div>
        <button onClick={handleSubmit} id="iniciarSesionButton">Subir producto</button>

        <h2 id="editarProductosSectionTitle">Editar productos</h2>
        {productSelected === null ? <section style={{padding: '4vw'}} id="productsList">
            {
                products.map((product) => {
                    return <article key={product.id} className="cardProductoEditar">
                            <article className="productCard">
                                    <Image className="productCardImage" src={product.imagen} alt="producto" width={200} height={200} />
                                    <div className="productCardData">
                                        <p className="productCardDataName"><span>{product.categoria}</span><br />{product.nombre}</p>
                                        <p className="productCardDataDescripcion">{product.descripcion}</p>
                                        <p className="productCardDataPrecio">${product.precio}</p>
                                        <button className="buttonAddToCart" onClick={() => setProductSelected(product)}>Editar <FaPen /></button>
                                    </div>
                                </article>
                    </article>
                })
            }
        </section>
        :
        <section style={{display: 'flex', flexDirection: 'column'}}>
            <div className="inputContainer">
                <label htmlFor="nombreInput">Nombre</label>
                <input id="nombreInput" type="text" placeholder="Nombre" value={nombreSelected} onChange={(e) => setNombreSelected(e.target.value)} />
            </div>
            <div className="inputContainer">
                <label htmlFor="descripcionInput">Descripción</label>
                <input id="descripcionInput" type="text" placeholder="Descripción" value={descripcionSelected} onChange={(e) => setDescripcionSelected(e.target.value)} />
            </div>
            <div className="seleccionarCategoria">
                <p>Categoria</p>
                <select id="categoriaSelect" value={categoriaSelected} onChange={(e) => setCategoriaSelected(e.target.value)}>
                    <option value="postres">Postres</option>
                    <option value="helados">Helados</option>
                    <option value="facturas">Facturas</option>
                </select>
            </div>
            <div className="inputContainer">
                <label htmlFor="precioInput">Precio</label>
                <input id="precioInput" type="number" placeholder="Precio" value={precioSelected} onChange={(e) => setPrecioSelected(e.target.value)} />
            </div>
            <div className="inputContainer">
                <label htmlFor="precioInput">Imagen</label>
                    <Image id="panelAdministradorImagen" src={imagenSelected} alt="producto" width={200} height={200} />
            </div>
            <button onClick={handleSubmitChange} id="iniciarSesionButton">Guardar</button>
            <button style={{color: '#ffffff', backgroundColor: '#b91e1eff', marginTop: 10}} onClick={handleDelete} id="iniciarSesionButton">Eliminar</button>
        </section>
        }

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
}