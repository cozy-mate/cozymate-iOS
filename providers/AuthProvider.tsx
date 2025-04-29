import { getRefreshToken } from '@/utils/token'
import React, { createContext, ReactNode, useContext, useEffect } from 'react'

type AuthContextType = {
    isLoggedIn: boolean | null;
    broadcastLogin: () => void;
    broadcastLogout: () => void;
    isReady: boolean;
}

type AuthProviderProps = {
    children: ReactNode;
    appLoaded: boolean;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: null,
    broadcastLogin: () => { },
    broadcastLogout: () => { },
    isReady: false
})

export const useAuthProvider: () => AuthContextType = () => {
    const authContext = useContext(AuthContext);
    return authContext;
}


const AuthProvider = ({ children, appLoaded }: AuthProviderProps) => {

    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

    const [isReady, setIsReady] = React.useState(false);

    const checkLoginStatus = async () => {
        const refreshToken = await getRefreshToken();
        return refreshToken !== null;
    }

    useEffect(() => {
        if (appLoaded) {
            checkLoginStatus().then(res => {
                res ? broadcastLogin() : broadcastLogout();
            }).finally(() => setIsReady(true));
        }
    }, [appLoaded]);

    const broadcastLogin = () => {
        setIsLoggedIn(prev => prev ? prev : true);
    }

    const broadcastLogout = () => {
        setIsLoggedIn(prev => prev ? false : prev);
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, broadcastLogin, broadcastLogout, isReady }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider