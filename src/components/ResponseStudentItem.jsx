

export const ResponseStudentItem = ({response}) => {
    return (
        <div className="m-2 p-3 border-2 border-b-gray-500  hover:bg-gray-300 transition-all duration-300">
            <p className="font-bold">Estudiante: <span className="font-normal"> {response?.students.name}</span></p>
            <p className="font-bold">Preguntas y sus Respuestas</p>
            <p className="font-normal">1-. ¿Has participado en un programa de intercambio estudiantil antes? <span
                className="font-bold">{response?.question_1 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">2-. ¿Estás interesado en participar en un programa de intercambio
                internacional? <span
                    className="font-bold">{response?.question_2 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">3-.¿Cumples con los requisitos de idioma para el programa de intercambio al que
                deseas aplicar? <span
                    className="font-bold">{response?.question_3 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">4-.¿Tienes un pasaporte vigente para viajar al extranjero? <span
                    className="font-bold">{response?.question_4 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">5-.¿Te gustaría estudiar en un país de habla inglesa? <span
                    className="font-bold">{response?.question_5 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">6-.¿Estás dispuesto a vivir en una residencia estudiantil durante tu intercambio? <span
                    className="font-bold">{response?.question_6 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">7-.¿Has consultado a un asesor de intercambio sobre tus opciones disponibles?<span
                    className="font-bold">{response?.question_7 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">8-.¿Tienes un plan financiero para cubrir los gastos del intercambio? <span
                    className="font-bold">{response?.question_8 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">9-.¿Estás al tanto de los plazos de solicitud para los programas de intercambio? <span
                    className="font-bold">{response?.question_9 ? 'Si' : 'No'}</span></p>
            <p className="font-normal">10-.¿Cuentas con un seguro médico internacional para tu estancia en el extranjero? <span
                    className="font-bold">{response?.question_10 ? 'Si' : 'No'}</span></p>
        </div>
    )
}
