import {useEffect, useState} from "react";
import {useStudentsStore} from "../../../context/useStudentsStore.js";
import {StudentItem} from "../../../components/StudentItem.jsx";
import {Link} from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useCareersStore} from "../../../context/useCareersStore.js";

export const Students = () => {


const getStudents = useStudentsStore((state) => state.getStudents);
const students = useStudentsStore((state) => state.students);
const careers = useCareersStore((state) => state.careers);
const getCareers = useCareersStore((state) => state.getCareers);
const getStudentsForCareer = useStudentsStore((state) => state.getStudentsForCareer);

const [idCareer, setIdCareer] = useState('');

const handleChangeCareer = (event) => {
    event.preventDefault();
    getStudentsForCareer(event.target.value);
    setIdCareer(event.target.value);
};

useEffect(() => {
    getStudents();
    if(!careers.length > 0 || !students.length > 0){
        getCareers();
        getStudents();
    }
}, [])



    return (
        <div className="w-4/5 mx-auto ">
            <h1 className="text-center text-3xl font-extrabold">Estudiantes Registrados</h1>

           <div className="flex justify-between p-2 rounded-2xl  items-center mt-5 bg-gray-300  w-full">
              <div className="w-2/6">
                  <Link to="/"
                        className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg  inline-block "
                  >
                      Volver
                  </Link>
              </div>
              <div className=" items-center w-4/6 space-y-0.5">
                  <p className="text-xl font-bold">Filtre por Carrera</p>
                  <Box sx={{minWidth: 120}}>
                      <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">Seleccione una Carrera</InputLabel>
                          <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={idCareer}
                              label="Seleccione"
                              onChange={handleChangeCareer}
                          >
                              {careers?.map((career) => (
                                  <MenuItem key={career?.id} value={career?.id}>{career?.name}</MenuItem>
                              ))}
                          </Select>
                      </FormControl>
                  </Box>
              </div>
           </div>
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
