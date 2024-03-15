import { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineTwitter } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import { useUser } from './UserContex';
import Swal from 'sweetalert2';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    // const [, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const {setUser} = useUser();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password } = formData;
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/auth/login', { email, password });
            if (response.data?.access_token) {
                setUser(response.data.user);
                navigate('/home');
            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Credentials',
                    text: 'Invalid email or password.',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Authentication error:', error);

            Swal.fire({
                icon: 'error',
                title: 'Authentication Error',
                text: 'An error occurred during authentication. Please try again later.',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK'
            });
        }
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.authenticated) {
      // Si hay una sesión activa, redirigir al usuario a la página de inicio
      navigate("/home");
    }
    },[navigate])

    return (
        <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
            <div className="md:w-1/3 max-w-sm">
                <img
                    src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    alt="Sample image"
                />
            </div>
            <div className="md:w-1/3 max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="text-center md:text-left">
                        <label className="mr-1">Sign in with</label>
                        <button
                            type="button"
                            className="mx-1 h-9 w-9  rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                        >
                            <BiLogoFacebook
                                size={20}
                                className="flex justify-center items-center w-full"
                            />
                        </button>
                        <button
                            type="button"
                            className="inlne-block mx-1 h-9 w-9 rounded-full bg-blue-600 hover:bg-blue-700 uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca]"
                        >
                            <AiOutlineTwitter
                                size={20}
                                className="flex justify-center items-center w-full"
                            />
                        </button>
                    </div>
                    <div className="my-5 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold text-slate-500">
                            Or
                        </p>
                    </div>
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email Address"
                    />
                    <input
                        className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    <div className="mt-4 flex justify-between font-semibold text-sm">
                        <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
                            <input className="mr-1" type="checkbox" />
                            <span>Remember Me</span>
                        </label>
                        <a
                            className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4"
                            href="#"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="text-center md:text-left">
                        <button
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                    <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
                        Don&apos;t have an account?{" "}
                        <NavLink to={'/register'}
                            className="text-red-600 hover:underline hover:underline-offset-4"
                            
                        >
                            Register
                        </NavLink>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default LoginForm;
