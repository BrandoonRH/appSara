import {Link, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {useStudentsStore} from "../../../context/useStudentsStore.js";
import {FormControlLabel, FormLabel, RadioGroup, Radio} from "@mui/material";
import Swal from "sweetalert2";




export const Questions = () => {
    const navigate = useNavigate();
    const registerQuestions = useStudentsStore((state) => state.registerQuestions);
    const students = useStudentsStore((state) => state.students);

    const [idStudent, setIdStudent] = useState('');
    const [q1, setQ1] = useState(null);
    const [q2, setQ2] = useState(null);
    const [q3, setQ3] = useState(null);
    const [q4, setQ4] = useState(null);
    const [q5, setQ5] = useState(null);
    const [q6, setQ6] = useState(null);
    const [q7, setQ7] = useState(null);
    const [q8, setQ8] = useState(null);
    const [q9, setQ9] = useState(null);
    const [q10, setQ10] = useState(null);

    const handleChangeQ1 = (event) => {
        setQ1(Number(event.target.value));
    };
    const handleChangeQ2 = (event) => {
        setQ2(Number(event.target.value));
    };
    const handleChangeQ3 = (event) => {
        setQ3(Number(event.target.value));
    };
    const handleChangeQ4 = (event) => {
        setQ4(Number(event.target.value));
    };
    const handleChangeQ5 = (event) => {
        setQ5(Number(event.target.value));
    };
    const handleChangeQ6 = (event) => {
        setQ6(Number(event.target.value));
    };
    const handleChangeQ7 = (event) => {
        setQ7(Number(event.target.value));
    };
    const handleChangeQ8 = (event) => {
        setQ8(Number(event.target.value));
    };
    const handleChangeQ9 = (event) => {
        setQ9(Number(event.target.value));
    };
    const handleChangeQ10 = (event) => {
        setQ10(Number(event.target.value));
    };



    const handleChangeStudent = (event) => {
        event.preventDefault();
        setIdStudent(event.target.value);
    };

    const handleRegister = async () => {
        const response = registerQuestions(q1,q2,q3,q4,q5,q6,q7,q8,q9,q10, idStudent);
        if(response){
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Se registraron las Respuestas",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/');
        }
    }

    return (
        <div className="w-3/5 mx-auto">
            <div className="flex justify-center items-center">
                <h1 className="text-3xl text-center font-bold mt-5">Preguntas a los Estudiantes</h1>
                <img className="w-20" src="/img/preguntas-80.webp"/>
            </div>
            <Link to="/"
                  className="p-3 bg-gray-400 hover:bg-gray-500 transition-all hover:text-white font-bold rounded-lg mt-10 inline-block "
            >
                Volver
            </Link>
            <p className="text-2xl text-center font-extrabold">Preguntas</p>
            <div className="my-4">
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
            <div className="mt-10  max-h-96 rounded-xl overflow-y-scroll">

                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Has participado en un programa de
                            intercambio estudiantil antes?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q1}
                            onChange={handleChangeQ1}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Estás interesado en participar en un
                            programa de intercambio internacional?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q2}
                            onChange={handleChangeQ2}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Cumples con los requisitos de idioma para el
                            programa de intercambio al que deseas aplicar?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q3}
                            onChange={handleChangeQ3}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Tienes un pasaporte vigente para viajar al
                            extranjero?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q4}
                            onChange={handleChangeQ4}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Te gustaría estudiar en un país de habla
                            inglesa?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q5}
                            onChange={handleChangeQ5}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Estás dispuesto a vivir en una residencia
                            estudiantil durante tu intercambio?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q6}
                            onChange={handleChangeQ6}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Has consultado a un asesor de intercambio
                            sobre tus opciones disponibles?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q7}
                            onChange={handleChangeQ7}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Tienes un plan financiero para cubrir los
                            gastos del intercambio?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q8}
                            onChange={handleChangeQ8}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Estás al tanto de los plazos de solicitud
                            para los programas de intercambio?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q9}
                            onChange={handleChangeQ9}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
                <div className="my-2">
                    <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">¿Cuentas con un seguro médico internacional
                            para tu estancia en el extranjero?</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={q10}
                            onChange={handleChangeQ10}
                        >
                            <FormControlLabel value={1} control={<Radio/>} label="Si"/>
                            <FormControlLabel value={0} control={<Radio/>} label="No"/>
                        </RadioGroup>
                    </FormControl>
                </div>
            </div>

            <button type="button"
                    onClick={handleRegister}
                    className="p-3 my-5 rounded-xl w-full font-bold bg-indigo-600 text-white hover:bg-indigo-800 hover:font-extrabold transition-all duration-200  "
            >Guardar</button>
        </div>
    )
}
