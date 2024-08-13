import {TrashIcon} from "./TrashIcon.jsx";
import {Button} from "@mui/material";
import {useStudentsStore} from "../context/useStudentsStore.js";
import Swal from "sweetalert2";


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

            <p>Semestre: {student.level}</p>
            <p>Promedio: {student.average}</p>

            <Button variant="outlined" color="error"
                onClick={() => handleDeleteStudent(student.id)}
            >
                <TrashIcon  />
            </Button>

        </div>
    )
}

