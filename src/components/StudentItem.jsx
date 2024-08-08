import {TrashIcon} from "./TrashIcon.jsx";
import {Button} from "@mui/material";


export const StudentItem = ({student}) => {
    const imageUrl = `${import.meta.env.VITE_SUPABASE_URL_IMAGES}/${student.photo_credential}`;

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

            >
                <TrashIcon  />
            </Button>

        </div>
    )
}

