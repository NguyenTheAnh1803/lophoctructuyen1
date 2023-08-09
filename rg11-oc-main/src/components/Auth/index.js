import { useState, createContext, useContext } from 'react';

const AuthContext = createContext(null);
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [data, setData] = useState(null);
    const [token, setToken] = useState(false);

    const login = (user, password, data) => {
        setUser(user);
        setPassword(password);
        setData(data);
        setToken(data[0].token);
        localStorage.setItem('username', JSON.stringify(user));
        localStorage.setItem('data', JSON.stringify(data));
        // localStorage.setItem('pass', JSON.stringify(password));
    };
    const logout = () => {
        setUser(null);
        setPassword(null);
        setToken(null);
        setData(null);
    };

    const setTokens = (token) => {
        localStorage.setItem('token', JSON.stringify(token));
    };

    const getTokens = () => {
        const items = JSON?.parse(localStorage?.getItem('token'));
        return items;
    };

    return (
        <AuthContext.Provider value={{ user, password, data, token, login, logout, setTokens, getTokens }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
