
import {useState, useEffect, createRef} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useCategoriesStore} from "../../../context/useCategoriesStore.js";
import {Link, useNavigate} from "react-router-dom";
import {useCareersStore} from "../../../context/useCareersStore.js";
import Swal from "sweetalert2";




export const CreateCareer = () => {
    const getCategories = useCategoriesStore((state) => state.getCategories);
    const registerCareer = useCareersStore((state) => state.registerCareer);
    const navigate = useNavigate();

    const nameCareerRef = createRef();
    const [idCareer, setIdCareer] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setIdCareer(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            const data = {
                name: nameCareerRef.current.value,
                id_categorie: idCareer
            }
        const response = await   registerCareer(data.name, data.id_categorie);
        if(response){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Se registro la Visita",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/admin/careers');
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div className="w-4/6 mx-auto">
            <h1 className="text-center  text-2xl font-extrabold">Registrar Nueva Carrera</h1>
            <Link to="/admin/careers"
                  className="p-3 bg-gray-400 my-5 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>
            <form
                onSubmit={handleSubmit}
                noValidate
            >
                <div className="mb-4">
                    <label htmlFor="name" className="text-slate-600">Nombre de la Carrera:</label>
                    <input type="text" name="name" ref={nameCareerRef}  placeholder="Tu Nombre"
                           className="mt-2 w-full p-3 bg-gray-100"/>
                </div>
                <div className="mb-4">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idCareer}
                                label="Age"
                                onChange={handleChange}
                            >

                                <MenuItem value={1}>Humanidades</MenuItem>
                                <MenuItem value={2}>Ingeniería</MenuItem>
                                <MenuItem value={3}>Negocios</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </div>


                <input type="submit" value="Registrar Carrera"
                       className="rounded-md bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"/>
            </form>

        </div>
    )
}
