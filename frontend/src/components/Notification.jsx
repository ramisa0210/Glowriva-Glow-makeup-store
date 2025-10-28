import React from 'react';

export const Notification = ({ notification }) => {
  if (!notification) return null;

  const bgColor = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500',
  }[notification.type] || 'bg-blue-500';

  return (
    <div className={`fixed top-4 right-4 z-50 px-6 py-3 text-white rounded-md shadow-lg ${bgColor}`}>
      {notification.message}
    </div>
  );
};