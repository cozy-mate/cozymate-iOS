import { getRefreshToken } from '@/utils/token'
import React, { createContext, ReactNode, useContext, useEffect } from 'react'

type AuthContextType = {
    isLoggedIn: boolean;
    broadcastLogin: () => void;
    broadcastLogout: () => void;
}

type AuthProviderProps = {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    broadcastLogin: () => { },
    broadcastLogout: () => { }
});

export const useAuthProvider: () => AuthContextType = () => {
    const authContext = useContext(AuthContext);
    return authContext;
}


const AuthProvider = ({ children }: AuthProviderProps) => {

    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

    const checkLoginStatus = async () => {

        const refreshToken = await getRefreshToken();
        setIsLoggedIn(refreshToken !== null);
        return refreshToken !== null;
    }

    useEffect(() => {
        checkLoginStatus();
    }, []);

    useEffect(() => {
        console.log('isLoggedIn', isLoggedIn)
    }
        , [isLoggedIn])

    const broadcastLogin = () => {
        setIsLoggedIn(true);
    }

    const broadcastLogout = () => {
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, broadcastLogin, broadcastLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider