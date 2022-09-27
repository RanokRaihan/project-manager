import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import LoginForm from "../forms/LoginForm";
import LoginCredentialsModal from "../ui/LoginCredentialsModal";

const Login = () => {
  const [showModal, setShowModal] = useState(false);

  //for examiner
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const close = () => {
    setShowModal(false);
  };
  return (
    <div className='grid place-items-center h-screen bg-[#F9FAFB'>
      <div className='min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md w-full space-y-8'>
          <div>
            <img className='mx-auto h-12 w-auto' src={logo} alt='Learn with sumit' />
            <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
          </div>
          <LoginForm credentials={credentials} />
          <button className='text-indigo-600 ml-auto block' onClick={() => setShowModal(true)}>
            view login credentials
          </button>
        </div>
      </div>

      {showModal && <LoginCredentialsModal close={close} setCredentials={setCredentials} />}
    </div>
  );
};

export default Login;
