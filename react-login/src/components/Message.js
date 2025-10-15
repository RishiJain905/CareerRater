import React from 'react';

const Message = ({ message, type }) => {
  const baseClasses = "p-4 rounded-lg mb-6 font-medium animate-pulse";
  const typeClasses = {
    success: "bg-green-100 text-green-800 border border-green-200",
    error: "bg-red-100 text-red-800 border border-red-200"
  };

  return (
    <div className={`${baseClasses} ${typeClasses[type]}`}>
      {message}
    </div>
  );
};

export default Message;
