import { create } from "zustand";
import { supabase } from "../../libs/api";

export const useAuthStore = create()( (set, get) => ({

    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email, password) => {
        const { data: {session}, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(error){
            set({status: 'unauthenticated', token: undefined, user: undefined});
            return false;
        }
        set({status: session.user.aud, token: session?.access_token, user: session.user});
        localStorage.setItem('AUTH_TOKEN', session?.access_token);
        //console.log(data?.user?.user_metadata)
        return true;
    },
    checkStatus: async () => {

    },
    logout: async () => {
        localStorage.clear(); // Borra todo el contenido de localStorage
        return true;

    },
    register: async (email, password) => {
        const { data: { session }, error, } = await supabase.auth.signUp({
            email: email,
            password: password,
        })
        if(!session || error){
            set({status: 'unauthenticated', token: undefined, user: undefined});
            return false;
        }
        set({status: session.user.aud, token: session?.access_token, user: session.user});
        localStorage.setItem('AUTH_TOKEN', session?.access_token);
        //console.log(data?.user?.user_metadata)
        return true;
    },


}))