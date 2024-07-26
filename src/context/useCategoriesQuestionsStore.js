import { create } from "zustand";
import { supabase } from "../libs/api";





export const useCategoriesQuestionsStore = create()( (set, get) => ({

    categoriesQuestions: [],
    getCategoriesQuestions: async () => {
        const { data: categories, error } = await supabase
            .from('questions_categories')
            .select('id , name')
        set({categoriesQuestions: categories})

    },

}));