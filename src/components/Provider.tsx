import * as React from 'react';

const AppContext = React.createContext({});

const useAppContext = () => {
  const context = React.useContext(AppContext);

  if (context == null) {
    throw new Error('useAppContext must be used within a AppProvider');
  }

  return context;
};

const AppProvider = ({ children, value }: { children?: React.ReactNode; value?: object }) => {
  return <AppContext.Provider value={{ ...value }}>{children}</AppContext.Provider>;
};

export { AppProvider, useAppContext };
