'use client'
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordPage = () => {
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);


    const handleResetPassword = async (e:any) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            setLoader(true)
            console.log("TOKEN=================>", token)
            const response = await axios.post('/api/users/resetPassword', { token, password });
            setMessage(response.data.message);
            setError("");
            setLoader(false)
        } catch (error:any) {
            setMessage("");
            setLoader(false)
            setError(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        const tokenUrl = window.location.search.split("=")[1];
        setToken(tokenUrl)
    }, [])


    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-6">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Reset Password</h1>
                <form onSubmit={handleResetPassword} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirm-password"
                            id="confirm-password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          {!loader ? "  Reset Password" : "reset..."}
                        </button>
                    </div>
                </form>
                {message && <p className="text-green-600 text-center">{message}</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default ResetPasswordPage;
