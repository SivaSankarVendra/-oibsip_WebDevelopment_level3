import React, { useEffect, useState } from 'react';

const Alert = ({ message, type }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-white transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'} ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
    >
      {message}
    </div>
  );
};

export default Alert;
