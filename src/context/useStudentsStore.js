import { create } from "zustand";
import {supabase} from "../libs/api.js";

export const useStudentsStore = create()( (set, get) => ({

    students: [],
    studentsResponses: [],

    getStudents: async () => {

        const { data: students, error } = await supabase
            .from('students')
            .select(`
                                id, 
                                name, 
                                level, 
                                average, 
                                photo_credential, 
                                id_career,
                                careers (
                                    name
                                )
                                `)
        set({students: students})

    },
    registerStudent: async ({name, level, average, id_career, photo_credential}) => {

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
        //console.log(id)
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
    },
    uploadImage: async (file) => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;

        const { data, error } = await supabase
            .storage
            .from('ImagesCredentials')
            .upload(`CredentialsStudents/${fileName}`, file);

        if (error) {
            return {
                error: error,
                statusError: false
            };
        }
        return {
            statusError: true,
            dataImage: data,
            nameImage: fileName
        };

    },
    registerQuestions: async (question_1, question_2, question_3, question_4, question_5, question_6, question_7, question_8, question_9, question_10, id_student) => {

        const { data, error } = await supabase
            .from('student_responses')
            .insert([
                { question_1 , question_2 , question_3 , question_4 , question_5 , question_6 , question_7 , question_8 , question_9 , question_10 , id_student },
            ])
            .select()
        if(!data || error){
            return false
        }
        return true
    },

    getQuestionsStudents: async ()  => {

        let { data: student_responses, error } = await supabase
            .from('student_responses')
            .select(`
                id,     
                id_student,
                question_1,              
                question_10,          
                question_2,           
                question_3,             
                question_4,              
                question_5,              
                question_6,              
                question_7,            
                question_8,                
                question_9,
                students (
                        id,
                        name
                )
            `)
            set({studentsResponses: student_responses})
    }

}));