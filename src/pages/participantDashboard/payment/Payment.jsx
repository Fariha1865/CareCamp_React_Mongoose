import { loadStripe } from "@stripe/stripe-js";
import { Elements, } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useAxiosSecureCalls from "../../../hooks/AxiosSecureCalls";
import UseAuth from "../../../hooks/UseAuth";
import { useEffect, useState } from "react";
const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
    const { id } = useParams();
    const axiosSecure = useAxiosSecureCalls();
    const { user } = UseAuth();
    const [camp, setCamp] = useState({});

    useEffect(() => {
        axiosSecure.get(`/registeredUser/${user?.email}`)
            .then(data => {
                console.log(data.data)
                const campAllData = data?.data?.find(item => item.campData?._id === id);
                console.log(campAllData)
                setCamp(campAllData)

            })
    }, [axiosSecure,user?.email,id])





    return (
        <div>

            <div>
                <SectionTitle heading="Payment" subHeading="Please Pay to Confirm Registration"></SectionTitle>
                <div>
                    <Elements stripe={stripePromise}>

                        {camp && Object.keys(camp).length !== 0 && camp.constructor === Object && (
                            <CheckoutForm camp={camp} />
                        )}
                    </Elements>
                </div>
            </div>


        </div>
    );
};

export default Payment;