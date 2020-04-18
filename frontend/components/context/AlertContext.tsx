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
        success: () => (setAlert(AlertStatus.Success)),
        error: () => (setAlert(AlertStatus.Error)),
        clear: () => (setAlert(AlertStatus.None)),
        alertText: alertText,
        setAlertText: (text: string) => (setAlertText(text)),
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertProvider };
export default AlertContext;