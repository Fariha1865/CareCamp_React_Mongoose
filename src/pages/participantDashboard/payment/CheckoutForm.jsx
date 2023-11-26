import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";




const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            console.log('payment error', error);
           
        }
        else {
            console.log('payment method', paymentMethod)
           
        }
  

    }


    return (
        <div className="max-w-4xl mx-auto mt-20">
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#05222a',
                                },
                                
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <input type="submit" value="Pay" />

            </form>


        </div>
    );
};

export default CheckoutForm;