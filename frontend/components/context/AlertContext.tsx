import React, { useState } from 'react';

import { AlertStatus } from '../../lib/enums';

const AlertContext = React.createContext(null);
AlertContext.displayName = 'AlertContext';

const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(AlertStatus.None);
  const [alertText, setAlertText] = useState("👍");

  return (
    <AlertContext.Provider
      value={{
        alert: alert,
        success: (text: string, timeout: number) => {
          setAlertText(text);
          setAlert(AlertStatus.Success);
          setTimeout(() => {
            setAlert(AlertStatus.None);
          }, timeout * 1000 || 10000)

        },
        error: (text: string, timeout: number) => {
          setAlertText(text);
          setAlert(AlertStatus.Error);
          setTimeout(() => {
            setAlert(AlertStatus.None);
          }, timeout * 1000 || 10000)
        },
        clear: () => (setAlert(AlertStatus.None)),
        alertText: alertText,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;