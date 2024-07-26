import { create } from "zustand";
import { supabase } from "../libs/api";


export const useCareersStore = create()( (set, get) => ({

    careers:  [],
    getCareers: async () => {
        const { data: careers, error } = await supabase
            .from('careers')
            .select('id , name, id_categorie')
        set({careers: careers})
        //console.log(careers[0])
    },
    registerCareer: async (name, id_categorie) => {
        const { data, error } = await supabase
            .from('careers')
            .insert([
                { name: name, id_categorie: id_categorie},
            ])
            .select()
        if(!data || error){
            return false
        }
        const {getCareers} = get()
        getCareers();
        return true
    },
    deleteCareer: async (id) => {
        const { error } = await supabase
            .from('careers')
            .delete()
            .eq('id', id)
        if(error){
            return false
        }
        const {getCareers} = get()
        getCareers();
        return true
    }

}));