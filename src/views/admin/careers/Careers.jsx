
import {Link} from "react-router-dom";
import {useCareersStore} from "../../../context/useCareersStore.js";
import {CareerItem} from "../../../components/CareerItem.jsx";


export const Careers = () => {

    const careers = useCareersStore((state) => state.careers);




    return (
        <div className="w-4/5 mx-auto ">
            <h1 className="text-center text-3xl font-extrabold">Carreras Registradas</h1>
            <Link to="/"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>

            <div className="mt-3 bg-white shadow-lg mb-5 max-h-96 overflow-y-scroll">
                {careers?.map((career) => (
                    <CareerItem
                        key={career.id}
                        career={career}
                    />
                ))}
            </div>
            <div className="mx-auto w-2/5">
                <Link to="/admin/careers/create"
                      className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-5 inline-block "
                >
                    Registrar Carrera
                </Link>
            </div>

        </div>
    )
}
