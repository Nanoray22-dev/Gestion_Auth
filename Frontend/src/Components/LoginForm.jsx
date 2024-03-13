import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { email, password, name } = formData;
        try {
            if (isSignUp) {
                await axios.post('http://127.0.0.1:8000/api/auth/register', { name, email, password });
                console.log('Registration successful');
            } else {
                const response = await axios.post('http://127.0.0.1:8000/api/auth/login', { email, password });
                console.log(response)
                if (response.data?.access_token) {
                    navigate('/home'); 
                } else {
                    setErrorMessage('Invalid email or password');
                }
            }
        } catch (error) {
            console.error('Authentication error:', error);
            setErrorMessage('Authentication error. Please try again later.');
        }
    };

    const toggleForm = () => {
        setIsSignUp(!isSignUp);
    };

    

    return (
        <div className={`container ${isSignUp ? 'active' : ''}`}>
            <div className="form-container sign-up">
                <form onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email for registration</span>
                    <input type="text" name='name' placeholder="Name" value={formData.name} onChange={handleChange} />
                    <input type="email" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                    <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                    <button type='submit'>Sign Up</button>
                </form>
            </div>
            <div className="form-container sign-in">
                <form onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="social-icons">
                        <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                        <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your email and password</span>
                    <input type="email" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                    <input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                    <span className="error-message">{errorMessage}</span>
                    <a href="#">Forget Your Password?</a>
                    <button type='submit' onClick={()  => {}}>Sign In</button>
                </form>
            </div>
            <div className="toggle-container">
                <div className="toggle">
                    <div className="toggle-panel toggle-left">
                        <h1>Welcome Back!</h1>
                        <p>Enter your personal details to use all site features</p>
                        <button className="hidden" onClick={toggleForm}>Sign In</button>
                    </div>
                    <div className="toggle-panel toggle-right">
                        <h1>Hello, Friend!</h1>
                        <p>Register with your personal details to use all site features</p>
                        <button className="hidden" onClick={toggleForm}>Sign Up</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
