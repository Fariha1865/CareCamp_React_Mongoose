import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import useAxiosSecureCalls from "../../../hooks/AxiosSecureCalls";
import UseAuth from "../../../hooks/UseAuth";
import Swal from "sweetalert2";




const CheckoutForm = ({ camp }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const axiosSecure = useAxiosSecureCalls();
    const [clientSecret, setClientSecret] = useState('');
    const { user } = UseAuth();
    const [transactionId, setTransactionId] = useState('');

    console.log(camp?.campData?.CampFees)
    useEffect(() => {

        axiosSecure.post('/create-payment-intent', { price: camp?.campData?.CampFees })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })


    }, [axiosSecure, camp?.campData?.CampFees])


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
            setError(error?.message);

        }
        else {
            console.log('payment method', paymentMethod)
            setError("");

        }


        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        console.log(paymentIntent)
        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

               
                    axiosSecure.get(`/registeredUser/${user?.email}`)
                        .then(data => {
                            console.log(data.data)
                     
            
                        })
               

                // const payment = {
                //     email: user?.email,
                //     price: fees,
                //     transactionId: paymentIntent.id,
                //     date: new Date(), // utc date convert. use moment js to 
                //     menuItemIds: cart.map(item => item.menuId),
                //     status: 'pending'
                // }

                // const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                // refetch();
                // if (res.data?.paymentResult?.insertedId) {
                //     Swal.fire({
                //         position: "top-end",
                //         icon: "success",
                //         title: "Thank you for the taka paisa",
                //         showConfirmButton: false,
                //         timer: 1500
                //     });


                }
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

                    <Button gradientDuoTone="greenToBlue" className="border-2 mt-20 border-blue-800" type="submit" disabled={!stripe || !clientSecret}>Pay</Button>
                    <p className="text-red-600">{error}</p>
                    {transactionId && <p className="text-blue-700 mt-10"> <span className="text-lg font-bold">Your transaction id:</span> {transactionId}</p>}

                </form>


            </div>
        );
    };

    export default CheckoutForm;