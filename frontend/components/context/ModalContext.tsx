import React, { useState } from 'react';

const ModalContext = React.createContext(null);
ModalContext.displayName = 'ModalContext';

const ModalProvider = ({ children }) => {
  const [childComponent, setChildComponent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        childComponent: childComponent,
        setChildComponent: (component: ChildNode) => {
          setChildComponent(component);
        },
        isOpen: isOpen,
        open: () => (setIsOpen(true)),
        close: () => (setIsOpen(false)),
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider };
export default ModalContext;