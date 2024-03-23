import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    );

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    return <AppContext.Provider value={{ loggedIn, setLoggedIn }} >
        {children}
    </AppContext.Provider>
}

const useAppContext = () => useContext(AppContext);

export default useAppContext;