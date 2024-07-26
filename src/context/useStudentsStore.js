import { create } from "zustand";
import {supabase} from "../libs/api.js";





export const useStudentsStore = create()( (set, get) => ({

    students: [],

    getStudents: async () => {

        const { data: students, error } = await supabase
            .from('students')
            .select('id, name, level, average, photo_credential, id_career')
        set({students: students})

    },
    registerStudent: async (name, level, average, id_career, photo_credential) => {

        const { data, error } = await supabase
            .from('students')
            .insert([
                { name: name, level: level, average: average, id_career: id_career, photo_credential: photo_credential},
            ])
            .select()
        if(!data || error){
            return false
        }
        return true
    },
    deleteStudent: async (id) => {
        const { error } = await supabase
            .from('students')
            .delete()
            .eq('id', id)
        if(error){
            return false
        }
        const {getStudents} = get()
        getStudents();
        return true
    }


}));