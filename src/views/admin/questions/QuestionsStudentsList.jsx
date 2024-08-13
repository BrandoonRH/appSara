import {Link} from "react-router-dom";
import {StudentItem} from "../../../components/StudentItem.jsx";
import {useStudentsStore} from "../../../context/useStudentsStore.js";
import {useEffect} from "react";
import {ResponseStudentItem} from "../../../components/ResponseStudentItem.jsx";


export const QuestionsStudentsList = () => {

    const getQuestionsStudents = useStudentsStore((state) => state.getQuestionsStudents);
    const studentsResponses = useStudentsStore((state) => state.studentsResponses);
    console.log(studentsResponses)


    useEffect(() => {
        getQuestionsStudents();
    }, []);

    return (
        <div className="w-4/5 mx-auto ">
            <h1 className="text-center text-3xl font-extrabold">Preguntas</h1>

            <Link to="/"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>
            <div className="mt-3 bg-white shadow-lg rounded-xl p-3 mb-5 max-h-96 overflow-y-scroll">
                {studentsResponses?.map((item) => (
                        <ResponseStudentItem
                            key={item.id}
                            response={item}
                        />
                ))}
            </div>

            <div className="mx-auto w-1/6">
                <Link to="/admin/questions/register"
                      className="p-2 bg-gray-400  hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-5 inline-block "
                >
                    Registrar Preguntas
                </Link>
            </div>


        </div>
    )
}
