import { create } from "zustand";
import { supabase } from "../libs/api";

export const useVisitsStore = create()( (set, get) => ({

    visits: [],
    getVisits: async () => {

        let { data: visits_questions, error } = await supabase
            .from('visits_questions')
            .select(`
                      id,
                      id_student,
                      id_categorie_question,
                      questions_students,
                      students (
                        id,
                        name,
                        level,
                        average
                      ),
                      questions_categories (
                          id,
                          name
                      )
            `)
        set({visits: visits_questions});
    },
    registerVisitStudent: async (id_student, id_categorie_question, questions, date, visitTime) => {

        const { data, error } = await supabase
            .from('visits_questions')
            .insert([
                { id_student, id_categorie_question, questions_students: questions, date, visit_time: visitTime },
            ])
            .select()

        if(!data || error){
            return false
        }
        return true
    }

}));