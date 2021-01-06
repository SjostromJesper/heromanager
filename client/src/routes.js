import {Login} from "./pages/Login/Login.js";
import {LoggedInPage} from "./pages/LoggedInPage/LoggedInPage.js";


const routes =[
    {
        path:'/',
        component: Login
    },
    {
        path:'/dashboard',
        component: LoggedInPage
    }
]

export default routes
