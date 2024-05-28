'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const VerifyEmailPage = () => {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyEmail', { token });
            setVerified(true);
        } catch (error:any) {
            console.log("Error: ", error.message);
            setError(true);
        }
    };

    // When somebody lands on the page, grab the token from the URL
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    // After changing the token, verifyUserEmail function will be called
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-6">
                <h1 className="text-2xl font-semibold text-center text-gray-800">Verify Email</h1>
                <h2 className="text-green-600 text-center font-medium bg-gray-200 p-4 rounded-md">
                    {token ? `Token: ${token}` : "No Token"}
                </h2>
                <div className="pt-10">
                    {verified && (
                        <div className="text-center">
                            <h2 className="text-2xl text-green-700 mb-4">Email Verified</h2>
                            <Link href="/login">
                                <span className="text-indigo-600 hover:text-indigo-500 font-medium cursor-pointer">
                                    Go to Login
                                </span>
                            </Link>
                        </div>
                    )}
                </div>
                <div className="pt-10">
                    {error && (
                        <div className="text-center">
                            <h2 className="text-2xl text-red-500">Verification Failed</h2>
                            <p className="text-gray-600 mt-2">Please try again later or contact support.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerifyEmailPage;
