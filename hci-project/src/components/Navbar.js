import React, {useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../App.css';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const NavbarComponent = ({ onLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user1, setUser1] = useState(user)

  const toggle = () => setIsModalOpen(!isModalOpen)
  
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className='py-2 px-5 text-center text-white sticky-top' style={{ backgroundColor: 'rgb(70, 50, 55)' }}>
        {/* <div className='d-flex flex-row justify-content-between align-items-center'> */}
            {/* Logo on the left side */}

            {/* Navbar Items on the right side */}
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <div className={`${location.pathname == '/' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={ () => handleNavigate('/')}>Home</div>
                <div className={`${location.pathname == '/leaderboard' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={user1 ? () => handleNavigate('/leaderboard') : () => setIsModalOpen(true)}>Leaderboard</div>
                <div className={`${location.pathname == '/newsletter' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={() => handleNavigate('/newsletter')}>Events</div>
                <div className={`${location.pathname == '/scheduler' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={user1 ? () => handleNavigate('/scheduler') : () => setIsModalOpen(true)}>Scheduler</div>
                <div className={`${location.pathname == '/payment' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={user1 ? () => handleNavigate('/payment') : () => setIsModalOpen(true)}>Payment</div>
                <div className={`${location.pathname == '/contact' ? "p-2 mx-3 cursor-pointer fw-bold fs-6 text-decoration-underline" : "p-2 mx-3 cursor-pointer fw-bold fs-6" }`} onClick={() => handleNavigate('/contact')}>Contact Us</div>

                {/* Login/Logout */}
                {user ? (
                    <div className='p-2 cursor-pointer fw-bold fs-6' onClick={() => {
                        onLogout(null);
                        // window.history.replaceState(null, "", "/login")
                        // window.location.replace("/login")
                        window.history.pushState(null, "", "/login");
                        window.history.pushState(null, "", "/login");
                        window.history.pushState(null, "", "/login");
                        window.history.pushState(null, "", "/login");
                        window.history.pushState(null, "", "/login");
                        window.history.pushState(null, "", "/login");
                        window.history.pushState(null, "", "/login");
                        window.history.pushState(null, "", "/login");
                        localStorage.clear()
                        handleNavigate("/login");
                    }}>Logout</div>
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
    </div>
  );
}

export default NavbarComponent;
