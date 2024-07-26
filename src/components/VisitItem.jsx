
export const VisitItem = ({visit}) => {

    return (
        <div>
            <div className="m-2 p-3 ">
                <p><span className="font-bold">ID</span>: {visit.id}</p>
                <p><span className="font-bold">Estudiante</span>: {visit.students.name}</p>
                <p><span className="font-bold">Categoria de Sus preguntas</span>: {visit.questions_categories.name}</p>
                <p><span className="font-bold">Preguntas:</span>{visit.questions_students}</p>
            </div>
        </div>
    )
}
