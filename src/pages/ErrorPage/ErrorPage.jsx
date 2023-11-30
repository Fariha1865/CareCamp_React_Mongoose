import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {

    const navigate = useNavigate();

    const goBack = () => {

        navigate("/");
    }
    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-14">Ooopsss!!! Page Not Found</h1>

            {
                <div className="flex justify-center mt-5">

                    <Button onClick={goBack} gradientDuoTone="greenToBlue" className="mt-4">Return to Website</Button>

                </div>
            }
            <div className="flex justify-center h-90">
                <img src="https://i.ibb.co/SyszR9s/no.gif" alt="" />
            </div>

        </div>
    );
};

export default ErrorPage;