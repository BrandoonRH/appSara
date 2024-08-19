import {useNavigate, useParams} from "react-router-dom";
import {useStudentsStore} from "../../../context/useStudentsStore.js";
import {createRef, useEffect, useState} from "react";
import Spinner from "../../../components/Spinner.jsx";
import {useCareersStore} from "../../../context/useCareersStore.js";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";




export const EditStudent = () => {
  const params = useParams();
  const {id} = params;
  const getStudentById = useStudentsStore((state) => state.getStudentById);
  const navigate = useNavigate();
  const careers = useCareersStore((state) => state.careers);
  const getCareers = useCareersStore((state) => state.getCareers);
  const updateStudent = useStudentsStore((state) => state.updateStudent);
  const uploadImage = useStudentsStore((state) => state.uploadImage);

  const [studentEdit, setEstudentEdit] = useState({
    name: '',
    level: '',
    average: '',
    photo_credential: '',
    id_career: ''
  });
  const imageUrl = `${import.meta.env.VITE_SUPABASE_URL_IMAGES}/${studentEdit.photo_credential}`;

  const [photoUrl, setPhotoUrl] = useState('');
  const [photoName, setPhotoName] = useState('');


  const getStudent = async () => {
    const student = await getStudentById(id);
    setEstudentEdit({
      name: student.name,
      level: student.level,
      average: student.average,
      photo_credential: student.photo_credential,
      id_career: student.id_career
    })
  }

  const handleChangeCareer = (event) => {
    event.preventDefault();
    //setIdCareer();
    setEstudentEdit({...studentEdit, id_career: event.target.value})
  };
  const handlePhotoChange = async (event) => {
    const response = await uploadImage(event.target.files[0]);
    //console.log(response);
    setPhotoUrl(response.dataImage.fullPath)
    setEstudentEdit({...studentEdit, photo_credential: response.nameImage})
    setPhotoName(response.nameImage)
  }//handlePhotoChange

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await updateStudent(id, studentEdit);
    if(response){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se Actualizo el Estudiante",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/admin/students');
    }
  }//handleSubmit

  useEffect(() => {
    getStudent();
    if(!careers.length > 0){
      getCareers();
    }
  }, [id]);

  return (
      <>
        {
          Object.keys(studentEdit).length === 0
              ? (
                  <Spinner text="Cargando..."/>
              ) : (
                  <div className="bg-gray-300 rounded my-10 w-4/6 mx-auto p-5">
                    <h1 className="text-5xl font-extrabold text-center ">{studentEdit.name}</h1>
                    <img
                        src={imageUrl}
                        alt="Credential Student"
                        className="w-52 h-60  mx-auto mt-5"
                    />
                    <div className="my-3">
                      <form
                          onSubmit={handleSubmit}
                          noValidate
                      >
                        <div className="mb-4">
                          <label htmlFor="name" className="text-slate-600">Nombre Estudiante:</label>
                          <input type="text" name="name" value={studentEdit.name}
                                 onChange={(e) => setEstudentEdit({...studentEdit, name: e.target.value})} placeholder="Nombre Completo"
                                 className="mt-2 w-full rounded-xl p-3 bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="lavel" className="text-slate-600">Semestre Actual Cursando:</label>
                          <input type="number" name="leve" value={studentEdit.level}
                                 onChange={(e) => setEstudentEdit({...studentEdit, level: e.target.value})} placeholder="Semestre"
                                 className="mt-2 w-full p-3 rounded-xl bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="averga" className="text-slate-600">Promedio Actual del Estudiante:</label>
                          <input type="number" name="averga" value={studentEdit.average}
                                 onChange={(e) => setEstudentEdit({...studentEdit, average: e.target.value})} placeholder="Promedio"
                                 className="mt-2 w-full p-3 rounded-xl bg-gray-100"/>
                        </div>
                        <div className="mb-4">
                          <Box sx={{minWidth: 120}}>
                            <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Seleccione una Carrera</InputLabel>
                              <Select
                                  labelId="demo-simple-select-label"
                                  id="demo-simple-select"
                                  value={studentEdit.id_career}
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


                        <input type="submit" value="Actualizar Estudiante"
                               className="rounded-md bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-2 mb-10 p-3 uppercase font-bold cursor-pointer"/>
                      </form>

                    </div>

                  </div>
              )
        }
      </>
  )
}
