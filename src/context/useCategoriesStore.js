import { create } from "zustand";
import { supabase } from "../libs/api";





export const useCategoriesStore = create()( (set, get) => ({

    categories: [],
    getCategories: async () => {
        const { data: categories, error } = await supabase
            .from('categories')
            .select('id , name_categorie')
        set({categories: categories})

    },

}));