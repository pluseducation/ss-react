import { useLocation, Navigate, Outlet } from "react-router-dom";
import { GetLogin } from '../../api/login/loginService'
import useAuth from '../../hook/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth, setAuth } = useAuth();
    const location = useLocation();
    
    // console.log(auth.user)
    // if(auth.user)
    // {
    //     GetLogin(auth.user, auth.pwd).then((value) => {
    //         try
    //         {
    //         let user = value.data.user.username;
    //         let accessToken = value.data.token.access_token;
    //         let pwd = '';
    //         let roles = value.data.user.role_id;
    //         setAuth({ user, pwd, roles, accessToken });
    //         } catch {
    //             setAuth({});
    //         }
    //     });
    // } else {
    //     setAuth({});
    // }


    return (
        auth.user? <Outlet /> : <Navigate to="/" state={{ from: location }} replace />
    );
}

export default RequireAuth;