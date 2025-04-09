import React, {useState, useEffect} from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import convertToSubCurrency from "../lib/convertToSubCurrency"
import { Alert, Spinner, Container } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import showSuccessToast from "../lib/showSuccessToast"
import Toaster from "./Toaster"

const CheckoutPageFirstTime = ({ user, setUser, setLocation}) => {
    const stripe = useStripe()
    const elements = useElements()
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState()
    const [clientSecret, setClientSecret] = useState("")
    const[loading, setLoading] = useState(false)
    const [showToaster, setShowToaster] = useState(false)

    useEffect(() => {
        fetch("http://localhost:4000/create-payment-intent",{
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify({amount: convertToSubCurrency(user.amount)}),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))

        setLocation("/paymentfirsttime")
        
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)

        if(!stripe || !elements){
            return
        }

        const {error: submitError} = await elements.submit()

        if(submitError){
            setErrorMessage(submitError.message)
            setLoading(false)
            return
        }

        const {error} = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                // return_url: `http://www.localhost:3000/payment-success?amount=${amount}`
                return_url: "http://www.localhost:3000"
            },
            redirect: "if_required"
        })

        if(error){
            setErrorMessage(error.message)
        }else{
             // Get current date
        const paymentDate = new Date();

        // Calculate next payment date based on the selected plan
        let nextPaymentDate = new Date();
        switch (user.plan) {
          case 'Bi-weekly':
            nextPaymentDate.setDate(paymentDate.getDate() + 14); // 14 days for biweekly
            break;
          case 'Monthly':
            nextPaymentDate.setMonth(paymentDate.getMonth() + 1); // 30 days for monthly
            break;
          case 'Yearly':
            nextPaymentDate.setFullYear(paymentDate.getFullYear() + 1); // 365 days for yearly
            break;
          default:
            nextPaymentDate = null;
            break;
        }

        // Create the new user instance with all form data and new fields (paymentDate and nextPaymentDate)
        const newUser = {
          ...user,
          paymentDate: paymentDate.toISOString(), // Store the payment date in ISO format
          nextPaymentDate: nextPaymentDate ? nextPaymentDate.toISOString() : null, // Store the next payment date in ISO format
        };

        fetch("http://localhost:5000/users",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newUser),
        })
        .then((response) => response.json())
        .then((data) => {
            setUser(data)
            setShowToaster(true)
            setTimeout(() => {
                navigate("/")
                setShowToaster(false)
            }, 1000)
          })
          .catch((error) => {
            // console.error("Error creating account", error);
            // setError("Error creating account");
          });
        
            // showSuccessToast("Payment Succesful")
        
            
            
        }
        setLoading(false)




    }

    if(!clientSecret || !stripe || !elements){
        return <div className="d-flex flex-row justify-content-center align-items-center vh-100"><Spinner 
        style={{
            height: '4rem',
            width: '4rem'
          }}
        /></div>
    }

    return(
        <Container className="vh-100 p-3">
            <h1>Payment</h1>
            <h3>Selected Plan : {user.plan}</h3>
            <h3>Amount : ${user.amount}</h3>
            {/* <div className="vh-100"> */}
                <form onSubmit={handleSubmit}>
                    {clientSecret && <PaymentElement className="border-0" />}
                    {errorMessage && <Alert color="danger">{errorMessage}</Alert>}
                    <div className="d-flex flex-row justify-content-start">
                        <button className="text-white bg-primary rounded border-0 my-2 px-4 py-2">{loading ? <Spinner size="sm" /> : "Pay"}</button>
                    </div>
                </form>
            {/* </div> */}
            {/* <ToastContainer /> */}
            {showToaster && (<Toaster message="Payment Accepted" title="Payment Confirmation" />)}
        </Container>
        
       
        
    )



}

export default CheckoutPageFirstTime