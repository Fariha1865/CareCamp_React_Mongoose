import { useContext } from "react";
import { AuthContext } from "../Providers/Authprovider";

const UseAuth = () => {
     
    const useAuth = useContext(AuthContext);
    return useAuth;
};

export default UseAuth;