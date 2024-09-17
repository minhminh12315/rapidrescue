import { useContext, useState } from 'react';
import useLoginForm from '../../Hooks/LoginResgiter/useLoginForm.js';
import './Login.scss';
import { login, tick } from '../../assets/index.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { IoMdClose } from "react-icons/io";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import UserContext from '../../Context/UserContext.js';

const Login = (props) => {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const { formData, errors, errorMessages, handleChange, validateForm, checkEmail } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showForgotPasswordDialog, setShowForgotPasswordDialog] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const submitSignIn = async () => {
        if (!validateForm()) {
            console.error("Có lỗi trong biểu mẫu.");
            return;
        }

        const isUsernameValid = await checkEmail();
        if (!isUsernameValid) {
            console.error("Tên tài khoản không tồn tại.");
            return;
        }

        console.log("Sign In");
        axios.post('http://localhost:8000/api/login', {
            email: formData.email,
            password: formData.password
        })
            .then(response => {
                console.log('Login successful:', response.data);
                setUser(response.data.user);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                navigate('/');
            })
            .catch(error => {
                console.error('There was an error logging in:', error);
            });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleForgotPasswordClick = (e) => {
        e.preventDefault();
        setShowForgotPasswordDialog(true);
    };

    const handleCloseDialog = () => {
        setShowForgotPasswordDialog(false);
        setForgotPasswordEmail('');
        setEmailError('');
        setEmailSent(false);
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSendResetInstructions = () => {
        if (!validateEmail(forgotPasswordEmail)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setEmailSent(true);
        setEmailError('');
    };

    return (
        <div className='login-container'>
            <div className='login-image'>
                <img src={login} alt="Login" />
            </div>
            <div className='login-form'>
                <div className='form-header'>
                    <div className='form-title'>
                        <h1>Sign in to your account</h1>
                        <p>If you already have a RIMOWA account, please sign in.
                            We’ll use your existing details for a faster checkout.
                        </p>
                    </div>
                    <div className='form-body'>
                        <div className='input-group'>
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                                className={errors.email ? 'invalid' : ''}
                            />
                            {errors.email && (
                                <div className="error-message">{errorMessages.email}</div>
                            )}
                        </div>
                        <div className='input-group'>
                            <label>Password</label>
                            <div className='password-wrapper'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={errors.password ? 'invalid' : ''}
                                />
                                <span onClick={togglePasswordVisibility} className="eye-icon">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            {errors.password && <div className="error-message">{errorMessages.password}</div>}
                            <a href="#" onClick={handleForgotPasswordClick}>Forgot your password?</a>
                        </div>
                        <div className='submit-button'>
                            <button onClick={submitSignIn}>Sign in</button>
                        </div>
                    </div>
                </div>
                <div className='signup-container'>
                    <div className='signup-title'>
                        <h1>Don't have an account?</h1>
                        <p>Get more out of your experience by signing up to:</p>
                    </div>
                    <div className='signup-benefits'>
                        <div className='benefit-item'>
                            <img src={tick} alt="tick" />
                            <p>Manage your orders and returns</p>
                        </div>
                        <div className='benefit-item'>
                            <img src={tick} alt="tick" />
                            <p>Easily enjoy your lifetime guarantee</p>
                        </div>
                        <div className='benefit-item'>
                            <img src={tick} alt="tick" />
                            <p>Create a wish list</p>
                        </div>
                        <div className='benefit-item'>
                            <img src={tick} alt="tick" />
                            <p>Enjoy personalised recommendations</p>
                        </div>
                        <div className='create-account-button'>
                            <Link to="/Register">
                                <button>Create Account</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {showForgotPasswordDialog && (
                <div className="forgot-password-dialog">
                    <div className="dialog-content">
                        <div className='content-icon'>
                            <IoMdClose size={30} onClick={handleCloseDialog}/>
                        </div>
                        <div className='content-form'>
                            <h2>Forgot your password ?</h2>
                            <p>
                                Enter the email address you registered with RIMOWA and <br />
                                well tell you how to reset your password.</p>
                            
                            <input
                                type="email"
                                placeholder="Your email"
                                value={forgotPasswordEmail}
                                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                            />
                            {emailError && <p className="error-message">{emailError}</p>}
                            {emailSent && <p className="success-message">Reset instructions sent to your email.</p>}
                            <button onClick={handleSendResetInstructions}>Send reset instructions</button>
                            <p onClick={handleCloseDialog}>Cancel</p>
                        </div>
                    </div>
                    <div className="dialog-overlay"/>

                </div>
            )}
        </div>
    );
};

export default Login;
