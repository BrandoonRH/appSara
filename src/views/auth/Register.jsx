import {createRef, useState} from "react"
import {Link} from "react-router-dom";
import {useAuthStore} from "../../context/auth/useAuthStore.js";
import Spinner from "../../components/Spinner.jsx";

export const Register = () => {

    const register = useAuthStore((state) => state.register);

    const nameRef = createRef();
    const emailRef = createRef();
    const passwordRef = createRef();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async e => {
        e.preventDefault();
        setLoading(true);
        const data = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        const response = await register(data.email, data.password);
        setLoading(!response);
    }


    return (
        <>
            <h1  className="text-4xl font-black text-center">Crea tu Cuenta</h1>
            <p className="text-center mb-10">Crea tu cuenta en  llenando el formulario</p>

            {loading ? (
                <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
                    <Spinner text="Cargando..."/>
                </div>
            ) : (
                <div className="">

                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="mb-4">
                            <label htmlFor="name" className="text-slate-600">Nombre:</label>
                            <input type="text" name="name" ref={nameRef} placeholder="Tu Nombre"
                                   className="mt-2 w-full p-3 bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="text-slate-600">Email:</label>
                            <input type="email" name="email" ref={emailRef} placeholder="Tu Email"
                                   className="mt-2 w-full p-3 bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="text-slate-600">Password:</label>
                            <input type="password" ref={passwordRef} name="password" placeholder="Tu Password"
                                   className="mt-2 w-full p-3 bg-gray-100"/>
                        </div>

                        <input type="submit" value="Crear Cuenta"
                               className="rounded-md bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"/>
                    </form>
                    <nav className="mt-5">
                        <Link to="/auth/login">
                            ¿Ya tienes cuenta? Inicia Sesión
                        </Link>
                    </nav>
                </div>
            )}


        </>
    )//Return
}


