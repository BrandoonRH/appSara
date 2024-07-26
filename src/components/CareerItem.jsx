import {TrashIcon} from "./TrashIcon.jsx";
import {useCareersStore} from "../context/useCareersStore.js";
import {Button} from "@mui/material";
import Swal from "sweetalert2";


export const CareerItem = ({career}) => {
    const deleteCareer = useCareersStore((state) => state.deleteCareer);
    const handleDeleteCareer = async () => {
        Swal.fire({
            title: "¿Seguro que desea Eliminar la Carrera?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Si",
            denyButtonText: `No `
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                deleteCareer(career.id)
                Swal.fire("Eliminado!", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Los cambios no se guardaron", "", "info");
            }
        });
    }
    return (
        <div className="m-2 p-3 flex justify-between items-center">
            <p><span className="font-bold">ID</span>: {career.id}</p>
            <span>{career.name}</span>
            <Button variant="outlined" color="error"
                    onClick={handleDeleteCareer}
            >
                <TrashIcon  />
            </Button>


        </div>
    )
}
