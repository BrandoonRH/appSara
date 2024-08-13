import { useEffect, useState } from "react";
import { useStudentsStore } from "../../../context/useStudentsStore.js";
import { useCategoriesQuestionsStore } from "../../../context/useCategoriesQuestionsStore.js";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import {useVisitsStore} from "../../../context/useVisitsStore.js";
import Swal from "sweetalert2";
import {Link, useNavigate} from "react-router-dom";

export const RegisterVisit = () => {


    const getCategoriesQuestions = useCategoriesQuestionsStore((state) => state.getCategoriesQuestions);
    const categoriesQuestions = useCategoriesQuestionsStore((state) => state.categoriesQuestions);
    const students = useStudentsStore((state) => state.students);
    const registerVisitStudent = useVisitsStore((state) => state.registerVisitStudent);
    const navigate = useNavigate();

    const [idStudent, setIdStudent] = useState('');
    const [idCategorieQuestion, setIdCategorieQuestion] = useState('');
    const [questions, setQuestions] = useState([]); //Arreglo de preguntas
    const [questionInput, setQuestionInput] = useState('');//Pregunta que se esta escribiendo en el input
    const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]); // Fecha actual por defecto
    const [visitTime, setVisitTime] = useState(new Date().toLocaleTimeString('en-GB').slice(0, 5));

    useEffect(() => {
        
        getCategoriesQuestions();
    }, []);

    const handleChangeStudent = (event) => {
        event.preventDefault();
        setIdStudent(event.target.value);
    };
    const handleChangeCategorie = (event) => {
        event.preventDefault();
        setIdCategorieQuestion(event.target.value);
    };
    const handleDateChange = (event) => {
        event.preventDefault();
        setVisitDate(event.target.value);
    };
    const handleTimeChange = (event) => {
        setVisitTime(event.target.value);
    };
    const handleQuestionInput = (event) => {
        const { value } = event.target;
        if (event.key === 'Enter' || event.key === ',') {
            event.preventDefault();
            setQuestions([...questions, value.trim()]);
            setQuestionInput('');
        } else {
            setQuestionInput(value);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

       // Aquí puedes enviar los datos a Supabase
        const response = await registerVisitStudent(idStudent, idCategorieQuestion, questions, visitDate, visitTime);
        if(response){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Se registro la Visita",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/admin/visits');
        }

    };

    return (
        <div className="w-3/5 mx-auto">
            <h1 className="text-3xl font-bold mt-5">Registre una Nueva Visita</h1>
            <Link to="/admin/visits"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>
            <form onSubmit={handleSubmit} noValidate className="mt-10">
                <div className="mb-4">

                </div>
                <div className="mb-4">
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Seleccione un Estudiante Registrado</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idStudent}
                                label="Seleccione un Estudiante Registrado"
                                onChange={handleChangeStudent}
                            >
                                {students?.map((student) => (
                                    <MenuItem key={student?.id} value={student?.id}>{student?.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="mb-4">
                    <Box sx={{minWidth: 120}}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Seleccione una Categoria</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={idCategorieQuestion}
                                label="Seleccione una Categoria"
                                onChange={handleChangeCategorie}
                            >
                                {categoriesQuestions?.map((categorieQuestion) => (
                                    <MenuItem key={categorieQuestion?.id}
                                              value={categorieQuestion?.id}>{categorieQuestion?.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                </div>
                <div className="mb-4">
                    <TextField
                        label="Agregue una pregunta"
                        value={questionInput}
                        onChange={handleQuestionInput}
                        onKeyDown={handleQuestionInput}
                        fullWidth
                        multiline
                    />
                </div>
                <div className="mb-4">
                    <ul>
                        {questions.map((question, index) => (
                            <li key={index}>{question}</li>
                        ))}
                    </ul>
                </div>
                <div className="mb-4">
                    <label htmlFor="visitDate" className="text-slate-600">Fecha de Visita:</label>
                    <input
                        type="date"
                        id="visitDate"
                        name="visitDate"
                        value={visitDate}
                        onChange={handleDateChange}
                        className="mt-2 w-full p-3 bg-gray-100"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="visitTime" className="text-slate-600">Hora de Visita:</label>
                    <input
                        type="time"
                        id="visitTime"
                        name="visitTime"
                        value={visitTime}
                        onChange={handleTimeChange}
                        className="mt-2 w-full p-3 bg-gray-100"
                    />
                </div>

                <input type="submit" value="Registrar Visita"
                       className="rounded-md bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 mb-10 p-3 uppercase font-bold cursor-pointer"/>
            </form>
        </div>
    );
};
