import {Link, Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.jsx";


export const Layout = () => {
    useAuth({middleware: 'auth'})

    return (
        <div>
            <header className="m-3 p-3 bg-gray-800 rounded-2xl flex justify-between items-center ">
                <img className="w-20" src="/img/logo.webp"/>

                <nav className="text-white flex justify-end gap-4 w-2/5">
                    <Link className="font-extrabold text-2xl hover:-translate-y-2 transition-all" to="/">Home</Link>
                    <Link className="font-extrabold text-2xl hover:-translate-y-2 transition-all" to="/contact">Contacto</Link>

                </nav>
            </header>
            <Outlet/>
        </div>
    )
}
