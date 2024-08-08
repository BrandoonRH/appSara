import {createBrowserRouter} from 'react-router-dom'

import {AuthLayout} from "./views/Layouts/AuthLayout.jsx";
import {Layout} from "./views/Layouts/Layout.jsx";
import {Home} from "./views/home/Home.jsx";
import {Login} from "./views/auth/Login.jsx";
import {Register} from "./views/auth/Register.jsx";
import {Students} from "./views/admin/students/Students.jsx";
import {Careers} from "./views/admin/careers/Careers.jsx";
import {Questions} from "./views/admin/questions/Questions.jsx";
import {Visits} from "./views/admin/visits/Visits.jsx";
import {CreateCareer} from "./views/admin/careers/CreateCareer.jsx";
import { RegisterVisit } from './views/admin/visits/RegisterVisit.jsx';
import {Contact} from "./views/home/Contact.jsx";
import {Support} from "./views/home/Support.jsx";
import { RegisterStudent } from './views/admin/students/RegisterStudent.jsx';


const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true, //Cargar Componente Home, si es false caraga Layout
                element: <Home/>
            },
            {
                path: '/contact',
                element: <Contact/>
            },
            {
                path: '/support',
                element: <Support/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout/>,
        children: [
            {
                path: '/auth/login',
                element: <Login/>
            },
            {
                path: '/auth/register',
                element: <Register/>
            },

        ]
    },
    {
        path: '/admin',
        element: <Layout/>,
        children: [
            {
                path: '/admin/students',
                element: <Students/>
            },
            {
                path: '/admin/students/register',
                element: <RegisterStudent/>
            },
            {
                path: '/admin/careers',
                element: <Careers/>
            },
            {
                path: '/admin/careers/create',
                element: <CreateCareer/>
            },
            {
                path: '/admin/questions',
                element: <Questions/>
            },
            {
                path: '/admin/visits',
                element: <Visits/>
            },
            {
                path: '/admin/visits/register',
                element: <RegisterVisit/>
            }
        ]
    },

]);

export default router;