import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const NavbarComponent = ({onLogout}) => {
   const navigate = useNavigate();
   
   const handleNavigate = (path) => {
    navigate(path);
   }
  return (

    <div className='py-2 px-5 text-center bg-primary text-white'>
        <div className='d-flex flex-row justify-content-center  align-items-center'>
        <div className='p-2 cursor-pointer fw-bold fs-5' onClick={() => handleNavigate('/home')}>Home</div>
        <div className='p-2 cursor-pointer fw-bold fs-5' onClick={() => handleNavigate('/leaderboard')}>Leaderboard</div>
        <div className='p-2 cursor-pointer fw-bold fs-5' onClick={() => handleNavigate('/newsletter')}>Newsletter</div>
        <div className='p-2 cursor-pointer fw-bold fs-5' onClick={() => handleNavigate('/scheduler')}>Scheduler</div>
        <div className='p-2 cursor-pointer fw-bold fs-5' onClick={() => handleNavigate('/payment')}>Payment</div>
        <div className='p-2 cursor-pointer fw-bold fs-5' onClick={() => handleNavigate('/contact')}>Contact Us</div>
        <div className='p-2 cursor-pointer fw-bold fs-5' onClick={() => {
            onLogout(null);
            handleNavigate("/");
        }}>Logout</div>

        </div>
    </div>
  
  );
}

export default NavbarComponent;
