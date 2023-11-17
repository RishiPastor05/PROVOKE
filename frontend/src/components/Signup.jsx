import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';


const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading]= useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
        setLoading(true);
        const res = await axios.post('/api/v1/signup', {
            name: formData.username,
            email: formData.email,
            password: formData.password,
        });

        console.log(res);

        if (res.data.success) {
            toast.success("Signup successfull");
            setFormData({
                username: '',
                email: '',
                password: '',
            });
        }
        setLoading(false);
    } catch (error) {
        // console.log(error);
        setLoading(false);

        if (error.response && error.response.status === 400 && error.response.data.errors) {
            const errorMessages = error.response.data.errors;
            toast.error(errorMessages.join('\n'));
        } else {
            toast.error("An error occurred while processing your request");
        }
    }
  };

  return (
 <div className='w-screen h-screen flex items-center justify-center'>
     <div className=" w-[90%] max-w-[500px] bg-gradient-to-r from-blue-900 to-blue-600 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto">
    <h2 className="text-2xl font-bold mb-4">Signup</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username:</label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email:</label>
            <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            />
        </div>
        <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password:</label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded focus:outline-none focus:border-blue-500"
            />
        </div>
        {
            loading ? (
                <div className="text-center">
                    Loading ...
                </div>
            ) : (
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Signup
                </button>
            )
        }
        <p className="mt-4 text-center">
            Already have an account? <Link to="/login" className="text-white hover:underline">Login</Link>
        </p>
    </form>
</div>

 </div>
  );
};

export default Signup;
