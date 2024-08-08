import {Link} from "react-router-dom";
import {ArrowIcon} from "../../components/ArrowIcon.jsx";
import {useEffect} from "react";
import {useCareersStore} from "../../context/useCareersStore.js";
import {useStudentsStore} from "../../context/useStudentsStore.js";


export const Home = () => {

    const getCareers = useCareersStore((state) => state.getCareers);
    const getStudents = useStudentsStore((state) => state.getStudents);

    useEffect(() => {
        getCareers();
        getStudents();
    }, []);

    return (
        <div className=" mx-auto w-3/6 grid grid-cols-2 bg-gray-500 text-white mt-32 m-2 p-5 rounded-2xl gap-10 ">
            <div className="">
                <h2 className="text-center text-3xl font-bold">Estudiantes</h2>
                <img className="w-24 mx-auto" src="/img/iconsstudents.webp" alt=""/>
                <Link to="/admin/students" className=" hover:text-gray-700">
                        <ArrowIcon/>
                </Link>
            </div>
            <div>
                <h2 className="text-center text-3xl font-bold">Carreras</h2>
                <img className="w-24 mx-auto" src="/img/universidad.webp" alt=""/>
                <Link  to="/admin/careers" className=" hover:text-gray-700">
                    <ArrowIcon/>
                </Link>
            </div>
            <div>
                <h2 className="text-center text-3xl font-bold mb-1">Preguntas</h2>
                <img className="w-24 mx-auto" src="/img/preguntas.webp" alt=""/>
                <Link to="/admin/questions" className=" hover:text-gray-700">
                    <ArrowIcon/>
                </Link>
            </div>
            <div>
                <h2 className="text-center text-3xl font-bold">Visitas</h2>
                <img className="w-24 mx-auto" src="/img/visitas.webp" alt=""/>
                <Link to="/admin/visits" className=" hover:text-gray-700">
                    <ArrowIcon/>
                </Link>
            </div>
        </div>
    )
}
