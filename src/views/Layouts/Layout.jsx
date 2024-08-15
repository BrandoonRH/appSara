import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.jsx";
import {Button} from "@mui/material";
import {useAuthStore} from "../../context/auth/useAuthStore.js";


export const Layout = () => {
    useAuth({middleware: 'auth'})
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout =  () => {
        const response = logout();
        if (response) {
            navigate('/auth/login');
        }
    }

    return (
        <div>
            <header className="m-3 p-3 bg-gray-800 rounded-2xl flex justify-between items-center ">
                <img className="w-20" src="/img/logo.webp"/>

                <nav className="text-white flex justify-end gap-4 w-2/5">
                    <Link className="font-extrabold text-2xl hover:-translate-y-2 transition-all" to="/">Home</Link>
                    <Link className="font-extrabold text-2xl hover:-translate-y-2 transition-all" to="/contact">Contacto</Link>
                    <Button onClick={handleLogout} color="error">Cerrar Sesión</Button>
                </nav>
            </header>
            <Outlet/>
        </div>
    )
}
