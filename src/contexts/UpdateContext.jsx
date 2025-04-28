import {createContext, useState} from 'react';

const UpdateContext = createContext(null);

const UpdateContextProvider = ({children}) => {
  const [update, setUpdate] = useState(false);
  return (
    <UpdateContext.Provider value={{update, setUpdate}}>
      {children}
    </UpdateContext.Provider>
  );
};

export {UpdateContext, UpdateContextProvider};
