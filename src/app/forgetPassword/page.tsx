import React from 'react';

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Forgot Password</h2>
        <p className="text-center text-gray-600">Enter your email address to receive a password reset link.</p>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-600">
          Remembered your password? <a href="/login" className="text-indigo-600 hover:text-indigo-500">Log in</a>
        </p>
      </div>
    </div>
  );
}
