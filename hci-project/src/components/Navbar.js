import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {toast, ToastContainer, Bounce} from 'react-toastify'
import '../App.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Toaster from './Toaster';

const NavbarComponent = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showToaster, setShowToaster] = useState(false)
  // const notify = () =>  toast.success('Logged out succesfully', {
  //   autoClose: 1000,
  //   transition: Bounce,
  //   closeOnClick: true
  //   });


  const toggle = () => setIsModalOpen(!isModalOpen)
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    // notify();
    setShowToaster(true)

    setTimeout(() => {
      onLogout(null);
      handleNavigate("/");
      setShowToaster(false)
    }, 1000)
  }

  return (
    <div className='py-2 px-5 text-center text-white' style={{ backgroundColor: 'rgb(70, 50, 55)' }}>
        {/* <div className='d-flex flex-row justify-content-between align-items-center'> */}
            {/* Logo on the left side */}

            {/* Navbar Items on the right side */}
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <div className={`${location.pathname == '/' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={ () => handleNavigate('/')}>Home</div>
                <div className={`${location.pathname == '/leaderboard' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={user ? () => handleNavigate('/leaderboard') : () => setIsModalOpen(true)}>Leaderboard</div>
                <div className={`${location.pathname == '/newsletter' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={() => handleNavigate('/newsletter')}>Events</div>
                <div className={`${location.pathname == '/scheduler' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={user ? () => handleNavigate('/scheduler') : () => setIsModalOpen(true)}>Scheduler</div>
                <div className={`${location.pathname == '/payment' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={user ? () => handleNavigate('/payment') : () => setIsModalOpen(true)}>Payment</div>
                <div className={`${location.pathname == '/contact' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={() => handleNavigate('/contact')}>Contact Us</div>

                {/* Login/Logout */}
                {user ? (
                    <div className='p-2 cursor-pointer fw-bold fs-6' onClick={handleLogout}>Logout</div>
                ) : (
                    <div className='p-2 cursor-pointer fw-bold fs-6' onClick={() => handleNavigate("/login")}>Login</div>
                )}
            </div>
        {/* </div> */}
      <Modal isOpen={isModalOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Attention</ModalHeader>
      <ModalBody>
        Please Login to access the desired page
      </ModalBody>
      <ModalFooter>
        <Button color='primary' onClick={ () => {
          setIsModalOpen(false)
          handleNavigate("/login")
        }
        }>Log In</Button>
      </ModalFooter>

    </Modal>
    {/* <ToastContainer /> */}
    {showToaster && (<Toaster message="Logged out" title="Log out confirmation"/>)}
    </div>
  );
}

export default NavbarComponent;
