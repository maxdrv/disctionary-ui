import React from 'react';
import axios from "../api/axios";
import useAuth from "./useAuth";

const UseLogout = () => {
    const {setAuth} = useAuth();

    const logout = async () => {
        setAuth({});

        try {
            const response = await axios('/api/v1/auth/logout', {
                withCredentials: true
            });
        } catch (err) {
            console.log(err)
        }
    }
    return logout
}

export default UseLogout;