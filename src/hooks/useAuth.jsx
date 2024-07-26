import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const useAuth = ({middleware}) =>{

    const token = localStorage.getItem('AUTH_TOKEN');

    const navigate = useNavigate();

    useEffect(() => {
        if(middleware === 'guest' && token !== null){
            navigate('/');
        }
        if(middleware === 'auth' && token === null){
            navigate('/auth/login');
        }



    }, [token]);

}