import {useEffect} from "react";
import {useStudentsStore} from "../../../context/useStudentsStore.js";
import {StudentItem} from "../../../components/StudentItem.jsx";
import {Link} from "react-router-dom";

export const Students = () => {


const getStudents = useStudentsStore((state) => state.getStudents);
const students = useStudentsStore((state) => state.students);

useEffect(() => {
    getStudents();
}, [])



    return (
        <div className="w-4/5 mx-auto bg-gray-300">
            <h1 className="text-center text-3xl font-extrabold">Estudiantes Registrados</h1>

            <Link to="/"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>
            <div className="mt-3 bg-white shadow-lg mb-5 max-h-96 overflow-y-scroll">
                {students?.map((student) => (
                    <StudentItem
                        key={student.id}
                        student={student}
                    />
                ))}
            </div>


        </div>
    )
}
