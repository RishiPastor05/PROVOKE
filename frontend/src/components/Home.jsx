import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="bg-gradient-to-r from-blue-900 to-blue-600 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-4xl font-extrabold">Welcome to Our Website</h1>
            <p className="text-lg mt-4">Explore our amazing features:</p>
            <div className="flex mt-8 space-x-4">
                <div className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg text-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    <Link to="/signup">Sign Up</Link>
                </div>
                <div className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-xl cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
