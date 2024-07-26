import {Link} from "react-router-dom";



export const Questions = () => {
    return (
        <div className="w-3/5 mx-auto">
            <h1 className="text-3xl text-center font-bold mt-5">Preguntas a los Estudiantes</h1>
            <Link to="/"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>


        </div>
    )
}
