import axios from "axios";
import { useEffect } from "react";
// import { getAuth, signOut } from "firebase/auth";
// import app from "../../firebase.config";


// const auth = getAuth(app);
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});

const useAxiosSecure = () => {

    
    // const logOut = () => {

    //     return signOut(auth)
    // }
 
    
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, 
        // error => {
        //     console.log('error tracked in the interceptor', error.response)
        //     if (error.response.status === 401 || error.response.status === 403) {
        //         console.log('logout the user')
        //         // logOut()
        //         //     .then(() => { 
        //         //         window.location.href = '/login';
        //         //     })
        //         //     .catch(error => console.log(error))
        //     }
        // }
        )
    }, [])

  
    return axiosSecure;
};

export default useAxiosSecure;