import React, { createContext, useState, useEffect } from "react";
import CryptoJS from 'crypto-js';
const AuthContext = createContext({});
const secretKey = 'e9fad54b-0383-424e-82d4-e2d523eceedf'

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useLocalStorage("userData", {})
    

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

function useLocalStorage(key, initialValue) {

    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {

            const item = window.localStorage.getItem(key);
            var bytes = CryptoJS.AES.decrypt(item, secretKey);
            var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            
            return item ? decryptedData : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {

            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            setStoredValue(valueToStore);

            if (typeof window !== "undefined") {
                
                var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
                window.localStorage.setItem(key, ciphertext);
                //window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

export default AuthContext;