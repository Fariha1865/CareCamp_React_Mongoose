import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
       
        return <div className="flex justify-center items-center pt-60"><span className="loading loading-dots loading-lg"></span></div>
    }
    else {
        if (user) {
          
            return children;
        }
        return <Navigate to="/login" state={{from: location}} replace></Navigate>
    }

};

export default PrivateRoute;