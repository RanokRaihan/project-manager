import React, { useEffect, useState } from "react";
import { useLoginMutation } from "../../features/auth/authApi";
import ErrorBlock from "../ui/ErrorBlock";

const LoginForm = ({ credentials }) => {
  //destructure
  const { email: credentialEmail, password: credentialPassword } = credentials || {};

  //local states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading, isError, error }] = useLoginMutation();

  useEffect(() => {
    if (credentialEmail && credentialPassword) {
      setEmail(credentialEmail);
      setPassword(credentialPassword);
    }
  }, [credentialEmail, credentialPassword]);

  //login function
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  return (
    <form className='mt-8 space-y-6' onSubmit={handleLogin}>
      <input type='hidden' name='remember' value='true' />
      <div className='rounded-md shadow-sm -space-y-px'>
        <div>
          <label htmlFor='email-address' className='sr-only'>
            Email address
          </label>
          <input
            id='email-address'
            name='email'
            type='email'
            required
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm'
            placeholder='Email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password' className='sr-only'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            required
            className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          disabled={isLoading}
          type='submit'
          className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500'
        >
          {isLoading ? "Please Wait..." : "Sign in"}
        </button>
      </div>
      {isError && <ErrorBlock message={error?.data || "Login Failed!"} />}
    </form>
  );
};

export default LoginForm;
