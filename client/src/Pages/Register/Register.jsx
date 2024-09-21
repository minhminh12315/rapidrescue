import { useContext, useState } from "react";
import "./Register.scss";
import { login } from "../../assets/index.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useResgiterForm from "../../Hooks/LoginResgiter/useResgiterForm.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Context/UserContext.js";
const Register = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const { formData, errors, errorMessages, handleChange, validateForm } =
    useResgiterForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const submitRegister = () => {
    if (!validateForm()) {
      console.error("Có lỗi trong biểu mẫu.");
      return;
    }

    console.log("Register");
    axios
      .post("http://127.0.0.1:8000/api/register", {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
        phone: formData.phone,
      })
      .then((response) => {
        console.log("Register successful:", response.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("There was an error registing in:", error);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="resgiter-container">
      <div className="resgiter-image">
        <img src={login} alt="Login" />
      </div>
      <div className="resgiter-form">
        <div className="form-header">
          <div className="form-title">
            <h1>Create your Rapidrescue account</h1>
            <p>
              If you already have a Rapidrescue account, please sign in. We’ll use
              your existing details for a faster checkout.
            </p>
          </div>
          <div className="form-body">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={errors.first_name ? "invalid" : ""}
              />
              {errors.first_name && (
                <div className="error-message">{errorMessages.first_name}</div>
              )}
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={errors.last_name ? "invalid" : ""}
              />
              {errors.last_name && (
                <div className="error-message">{errorMessages.last_name}</div>
              )}
            </div>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "invalid" : ""}
              />
              {errors.email && (
                <div className="error-message">{errorMessages.email}</div>
              )}
            </div>
            <div className="input-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "invalid" : ""}
                />
                <span onClick={togglePasswordVisibility} className="eye-icon">
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.password && (
                <div className="error-message">{errorMessages.password}</div>
              )}
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "invalid" : ""}
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="eye-icon"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="error-message">
                  {errorMessages.confirmPassword}
                </div>
              )}
            </div>
            <div className="input-group">
              <label>Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? "invalid" : ""}
              />
              {errors.phone && (
                <div className="error-message">{errorMessages.phone}</div>
              )}
            </div>
            <div className="submit-button">
              <button onClick={submitRegister}>Create Account</button>
            </div>
          </div>
          <div className="form-footer">
            <p>
              <strong>*Mandatory field.</strong>
            </p>
            <p>
              Your personal data is processed by Rapidrescue as data controller, for
              your account creation or/and personalized marketing material if
              consented. For more information, please see our{" "}
              <a href="#">Privacy policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
