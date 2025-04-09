import {toast, Bounce} from 'react-toastify'


const showSuccessToast = (message) =>  toast.success(message, {
    autoClose: 1000,
    transition: Bounce,
    closeOnClick: true
    });

    export default showSuccessToast