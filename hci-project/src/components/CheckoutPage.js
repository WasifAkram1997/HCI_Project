import React, {useState, useEffect} from "react"
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js"
import convertToSubCurrency from "../lib/convertToSubCurrency"
import { Alert, Spinner, Container } from "reactstrap"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import showSuccessToast from "../lib/showSuccessToast"
import Toaster from "./Toaster"

const CheckoutPage = ({amount}) => {
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
            body: JSON.stringify({amount: convertToSubCurrency(amount)}),
        })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        
    }, [amount])

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
            // showSuccessToast("Payment Succesful")
            setShowToaster(true)
            setTimeout(() => {
                navigate("/")
                setShowToaster(false)
            }, 1000)
            
            
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

export default CheckoutPage