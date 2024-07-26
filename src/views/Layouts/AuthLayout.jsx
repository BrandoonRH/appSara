import {Outlet} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth.jsx";

export const AuthLayout = () => {
    useAuth({middleware: 'guest'})
  return (
      <div className="mx-auto lg:w-3/5 mt-5">
          <h1 className="text-4xl text-center font-extrabold text-gray-600">Sistema Gestor de Visitas y Preguntas</h1>

          <img className="w-1/5 mx-auto" src="/img/logo.webp"/>
          <Outlet/>
      </div>
  )
}
