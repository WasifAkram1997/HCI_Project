import {Toast, ToastHeader, ToastBody} from 'reactstrap'

const Toaster = ({message, title}) => {
    console.log(message)
return(
        <div className="position-fixed top-0 end-0 p-3 rounded opacity-100 z-3">
              <Toast>
                <ToastHeader icon="success" className='text-dark'>{title}</ToastHeader>
                <ToastBody className='text-dark text-start'>{message}</ToastBody>
              </Toast>
            </div>
)
}

export default Toaster