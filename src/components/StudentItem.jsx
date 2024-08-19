
import {TrashIcon} from "./TrashIcon.jsx";
import { EditIcon } from "./EditIcon.jsx";
import {Button} from "@mui/material";
import {useStudentsStore} from "../context/useStudentsStore.js";
import Swal from "sweetalert2";
import {Link} from "react-router-dom";


export const StudentItem = ({student}) => {
    const imageUrl = `${import.meta.env.VITE_SUPABASE_URL_IMAGES}/${student.photo_credential}`;
    const deleteStudent = useStudentsStore((state) => state.deleteStudent);


    const handleDeleteStudent = async (id) => {
        Swal.fire({
            title: "¿Seguro que desea Eliminar el Estudiante?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si",
            denyButtonText: `No `
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteStudent(id)
                Swal.fire("Eliminado!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Los cambios no se guardaron", "", "info");
            }
        });
    }

    return (
        <div className="m-2 p-3 flex justify-between items-center hover:bg-gray-300 transition-all duration-300">
            <img
                src={imageUrl}
                alt="Credential Student"
                className="w-32 h-40"
            />

            <h3 className="text-xl font-semibold">{student.name}</h3>

            <p className="font-bold">Semestre: <span className="font-normal">{student.level}</span></p>
            <p className="font-bold">Promedio: <span className="font-normal">{student.average}</span></p>
            <p className="font-bold">Carrera: <span className="font-normal">{student.careers.name}</span></p>

           <div className="flex justify-center gap-2 items-center">
                <Button variant="outlined" color="error"
                            onClick={() => handleDeleteStudent(student.id)}
                    >
                        <TrashIcon/>
                </Button>
               <Link to={`/admin/students/edit/${student.id}`} className=" hover:text-gray-700">
                   <EditIcon/>
               </Link>
           </div>

        </div>
    )
}

