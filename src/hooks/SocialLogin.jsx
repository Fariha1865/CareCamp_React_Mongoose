import { FaGoogle } from "react-icons/fa";
import UseAuth from "./UseAuth";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "./AxiosSecure";
// import Swal from "sweetalert2";

const SocialLogin = () => {

    const { googleLogin, updateUserProfile } = UseAuth();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";
    const axiosSecure = useAxiosSecure();
    

    const handleGoogleLogin = () => {

        googleLogin()
            .then(res => {
                console.log(res.user)
                const user = {
                    name: res?.user?.displayName,
                    email: res?.user?.email
                }
                updateUserProfile(res?.user?.displayName, res?.user?.photo)
                axiosSecure.post("/users", user)
                    .then(data => {
                        console.log(data.data)
                        // Swal.fire("user logged In successfully");

                    })
                navigate(from, { replace: true });
            })
    }
    return (
        <div>
            <button className="btn btn-outline btn-warning" onClick={handleGoogleLogin}>Login with Google <FaGoogle></FaGoogle></button>
        </div>
    );
};

export default SocialLogin;