import { loadStripe } from "@stripe/stripe-js";
import { Elements, } from "@stripe/react-stripe-js";
import SectionTitle from "../../../Components/SectionTitle";
import CheckoutForm from "./CheckoutForm";
const Payment = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);


    return (
        <div>

            <div>
                <SectionTitle heading="Payment" subHeading="Please Pay to Confirm Registration"></SectionTitle>
                <div>
                    <Elements stripe={stripePromise}>
                       <CheckoutForm></CheckoutForm>
                    </Elements>
                </div>
            </div>


        </div>
    );
};

export default Payment;