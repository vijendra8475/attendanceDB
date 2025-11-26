import React, { useState } from "react";
import { postData } from "../utils/api";

const AdminLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const result = await postData('/admin/login', {email, password})
        console.log(result);

        if(result.admin){
            localStorage.setItem('admin', true);
            window.location.href = '/dashboard';
        }
        else {
            alert('Invalid Credentials');
        }
        
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

        <input
          className="border px-3 py-2 w-full mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="border px-3 py-2 w-full mb-3"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
