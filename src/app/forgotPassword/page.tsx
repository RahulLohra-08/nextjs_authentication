'use client'
import axios from 'axios';
import React, { useState } from 'react';
import Link from 'next/link';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);

    const handleForgotPassword = async (e:any) => {
        e.preventDefault();
        try {
            setLoader(true)
            const response = await axios.post('/api/users/forgotPassword', { email });
            setMessage(response.data.message);
            setError("");
            setLoader(false)
        } catch (error:any) {
            setMessage("");
            setLoader(false)
            setError(error.response?.data?.error || "An error occurred. Please try again.");
        }
    };



    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-6">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h1>
                <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full  flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            { !loader ? "Send Reset Link" : "Sending...." }
                        </button>
                    </div>
                </form>
                {message && <p className="text-green-600 text-center">{message}</p>}
                {error && <p className="text-red-600 text-center">{error}</p>}
                <p className="text-center text-sm text-gray-600">
                    Remember your password? <Link href="/login"><span className="text-indigo-600 hover:text-indigo-500 cursor-pointer">Login</span></Link>
                </p>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
