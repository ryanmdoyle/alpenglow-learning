import React, { useState } from 'react';


const AlertContext = React.createContext(null);
AlertContext.displayName = 'AlertContext';

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState('success');
  const [alertText, setAlertText] = useState("👍");

  return (
    <AlertContext.Provider
      value={{
        alert: alert,
        setAlert: () => (setAlert(!alert)),
        alertStatus: alertStatus,
        setAlertStatus: (status) => (setAlertStatus(status)),
        alertText: alertText,
        setAlertText: (text) => (setAlertText(text)),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;