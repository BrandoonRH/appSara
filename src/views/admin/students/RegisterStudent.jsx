import {createRef, useEffect, useState} from "react";
import {useCareersStore} from "../../../context/useCareersStore.js";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useStudentsStore} from "../../../context/useStudentsStore.js";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";


export const RegisterStudent = () => {
    const nameRef = createRef();
    const levelRef = createRef();
    const averageRef = createRef();
    const [photoUrl, setPhotoUrl] = useState('');
    const [photoName, setPhotoName] = useState('');

    const [idCareer, setIdCareer] = useState('');

    const navigate = useNavigate();
    const careers = useCareersStore((state) => state.careers);
    const getCareers = useCareersStore((state) => state.getCareers);
    const registerStudent = useStudentsStore((state) => state.registerStudent);
    const uploadImage = useStudentsStore((state) => state.uploadImage);


    const handleChangeCareer = (event) => {
        event.preventDefault();
        setIdCareer(event.target.value);
    };
    const handlePhotoChange = async (event) => {
        const response = await uploadImage(event.target.files[0]);

        setPhotoUrl(response.dataImage.fullPath)
        setPhotoName(response.nameImage)
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: nameRef.current.value,
            level: Number(levelRef.current.value),
            avergate: Number(averageRef.current.value),
            id_career: idCareer,
            photo_credential: photoName
        }

        const response = await registerStudent(data);
        if(response){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Se registro el Estudiante",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/admin/students');
        }
    }

    useEffect(() => {
        if(!careers.length > 0){
            getCareers();
        }
    }, []);

    return (
        <div className="w-4/6 mx-auto">
                <h1 className="text-center text-5xl font-bold">Registrar Estudiante</h1>
                <p className="text-center text-gray-500 text-xl my-5">Llene el siguiente formulario para registrar un nuevo estudiante</p>
                <div className="">
                    <form
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="mb-4">
                            <label htmlFor="name" className="text-slate-600">Nombre Estudiante:</label>
                            <input type="text" name="name" ref={nameRef} placeholder="Nombre Completo"
                                   className="mt-2 w-full rounded-xl p-3 bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lavel" className="text-slate-600">Semestre Actual Cursando:</label>
                            <input type="number" name="leve" ref={levelRef} placeholder="Semestre"
                                   className="mt-2 w-full p-3 rounded-xl bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="averga" className="text-slate-600">Promedio Actual del Estudiante:</label>
                            <input type="number" name="averga" ref={averageRef} placeholder="Promedio"
                                   className="mt-2 w-full p-3 rounded-xl bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                            <Box sx={{minWidth: 120}}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Seleccione una Carrera</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={idCareer}
                                        label="Seleccione un Estudiante Registrado"
                                        onChange={handleChangeCareer}
                                    >
                                        {careers?.map((career) => (
                                            <MenuItem key={career?.id} value={career?.id}>{career?.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </div>
                        <div className="mb-2 flex">
                            <img className="w-20" src="/img/uploadphoto.webp"/>
                            <input
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="mt-2 w-full p-3 rounded-xl bg-gray-100"
                                onChange={handlePhotoChange}
                            />
                        </div>

                        <div className="mb-2">
                            {photoName ? (
                                <img
                                    src={`https://ptsxwfpwfgovybmsvloa.supabase.co/storage/v1/object/public/ImagesCredentials/CredentialsStudents/${photoName}`}
                                    alt="Credential Student"
                                    className="w-30 h-40 mx-auto rounded-xl"
                                />
                            ) : (
                                <img className=" mx-auto" src="/img/credential.webp"/>
                            )}
                        </div>


                        <input type="submit" value="Registrar Estudiante"
                               className="rounded-md bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"/>
                    </form>

                </div>
        </div>
    )
}
