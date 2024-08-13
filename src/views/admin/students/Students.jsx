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
        <div className="w-4/5 mx-auto ">
            <h1 className="text-center text-3xl font-extrabold">Estudiantes Registrados</h1>

            <Link to="/"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>
            <div className="mt-3 bg-white shadow-lg rounded-xl p-3 mb-5 max-h-96 overflow-y-scroll">
                {students.length > 0 ? (
                    students?.map((student) => (
                        <StudentItem
                            key={student.id}
                            student={student}
                        />
                    ))
                ) : (
                    <p className="text-center font-bold">No hay Estudiantes Registrados</p>
                )}

            </div>

          <div className="mx-auto w-1/6">
            <Link to="/admin/students/register"
                    className="p-2 bg-gray-400  hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-5 inline-block "
                >
                    Registrar Estudiante
                </Link>
          </div>


        </div>
    )
}
