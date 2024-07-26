import {TrashIcon} from "./TrashIcon.jsx";


export const StudentItem = ({student}) => {
    const imageUrl = `${import.meta.env.VITE_SUPABASE_URL_IMAGES}/${student.photo_credential}`;

    return (
        <div className="m-2 p-3 flex justify-between items-center">
            <img
                src={imageUrl}
                alt="Credential Student"
                className="w-32 h-40"
            />

            <h3 className="text-xl font-semibold">{student.name}</h3>

            <p>Semestre: {student.level}</p>
            <p>Promedio: {student.average}</p>

            <div>
                <TrashIcon/>
            </div>

        </div>
    )
}

