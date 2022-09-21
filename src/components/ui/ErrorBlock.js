import React from "react";

const ErrorBlock = ({ message }) => {
  return <div className='w-full py-2 px-4 bg-rose-200 text-rose-700 rounded-md'>{message}</div>;
};

export default ErrorBlock;
