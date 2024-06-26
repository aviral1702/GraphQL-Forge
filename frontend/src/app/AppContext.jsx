import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";
import toast,{ Toaster } from 'react-hot-toast';

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const router = useRouter();

    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('user'))
    );

    const [loggedIn, setLoggedIn] = useState(currentUser !== null);

    const logout = () => {
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        setLoggedIn(false);
        toast.success('Logged out successfully');
        router.push('/login');
    }

    return <AppContext.Provider value={{ loggedIn, setLoggedIn, logout }} >
        {children}
    </AppContext.Provider>
}

const useAppContext = () => useContext(AppContext);

export default useAppContext;