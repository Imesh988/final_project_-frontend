import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [Loading, setLoading] = useState(true);


     const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    

    return (
        <AuthContext.Provider value={{ user, setUser, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}