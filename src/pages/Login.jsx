import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const response = await axios.post("http://localhost:5000/employee/login", {
                username,
                password,
            });
            
            console.log(response.data.msg);
            if (response.data.msg === "successful") {
                navigate("/employee");
            } else {
                setError("Invalid username or password");
            }
        } catch (error) {
            console.error("Login failed:", error);

            if (error.response) {
                if (error.response.status === 400) {
                    setError("Invalid username or password");
                } else if (error.response.status === 401) {
                    setError("Unauthorized - Please check your credentials");
                } else if (error.response.status === 500) {
                    setError("Server error - Please try again later");
                } else {
                    setError("Login failed - Please try again");
                }
            } else if (error.request) {
                setError("No response from server - Check your connection");
            } else {
                setError("Login failed - Please try again");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto mt-10 max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Employee Login</h2>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            <form onSubmit={handleLogin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Login;