import {Link} from 'react-router-dom'
import {useVisitsStore} from "../../../context/useVisitsStore.js";
import {useEffect} from "react";
import {VisitItem} from "../../../components/VisitItem.jsx";

export const Visits = () => {
    const getVisits = useVisitsStore((state) => state.getVisits);
    const visits = useVisitsStore((state) => state.visits);

    useEffect(() => {
        getVisits();
    }, []);

    return (
        <div className="w-3/5 mx-auto">
            <h1 className="text-3xl font-bold mt-5">Visitas en el departamento</h1>
            <Link to="/"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>

            <div className="mt-3 bg-white shadow-lg mb-5 max-h-96 overflow-y-scroll">
                {visits?.map((visit) => (
                    <VisitItem
                        key={visit.id}
                        visit={visit}
                    />
                ))}
            </div>
            <Link to="/admin/visits/register"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-5 inline-block "
            >
                Registrar Visita
            </Link>
        </div>
    )
}
