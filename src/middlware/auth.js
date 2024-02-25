

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/store";

///proteger l'acces pour  /profile si user n'est pas connecté !
export const AuthorizeUser = ({children}) =>{
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to={'/'} replace={true}></Navigate>
    }

    return children;
}


//// ne peut acceder à /password ssi il a fait input du username
export const ProtectRoute = ({children}) =>{
    const username = useAuthStore.getState().auth.username;
    if(!username){
        return <Navigate to={'/'} replace={true}></Navigate>
    }
    return children;
}