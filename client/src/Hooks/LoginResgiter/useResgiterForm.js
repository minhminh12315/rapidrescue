import { useState } from "react";

const useForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
    phone: false,
    address: false,
  });

  const [errorMessages, setErrorMessages] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "phone") {
      const isValidNumber = /^[0-9]*$/.test(value);

      if (isValidNumber && value.length <= 15) {
        setFormData({
          ...formData,
          [name]: value,
        });
        setErrors({
          ...errors,
          phone: false,
        });
        setErrorMessages({
          ...errorMessages,
          phone: "",
        });
      } else {
        setErrors({
          ...errors,
          phone: true,
        });
        setErrorMessages({
          ...errorMessages,
          phone: "Số điện thoại chỉ được chứa số và không quá 15 ký tự.",
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
      setErrors({
        ...errors,
        [name]: false,
      });
      setErrorMessages({
        ...errorMessages,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {
      first_name: formData.first_name.trim() === "",
      last_name: formData.last_name.trim() === "",
      email: formData.email.trim() === "",
      password: formData.password.trim() === "",
      confirmPassword:
        formData.confirmPassword.trim() === "" ||
        formData.password !== formData.confirmPassword, // Thêm kiểm tra mật khẩu xác nhận
      phone:
        formData.phone.trim() === "" || !/^[0-9]{1,15}$/.test(formData.phone),
    };
    setErrors(newErrors);

    const newErrorMessages = {
      first_name:
        formData.first_name.trim() === "" ? "First Name is required." : "",
      last_name:
        formData.last_name.trim() === "" ? "Last Name is required." : "",
      email: formData.email.trim() === "" ? "Email is required." : "",
      password: formData.password.trim() === "" ? "Password is required." : "",
      confirmPassword:
        formData.confirmPassword.trim() === ""
          ? "Confirm Password is required."
          : formData.password !== formData.confirmPassword
          ? "Passwords do not match."
          : "", // Thêm thông báo lỗi mật khẩu xác nhận
      phone:
        formData.phone.trim() === ""
          ? "Phone is required."
          : "Số điện thoại chỉ được chứa số và không quá 15 ký tự.",
    };
    setErrorMessages(newErrorMessages);

    return !Object.values(newErrors).some((error) => error);
  };

  return {
    formData,
    errors,
    errorMessages,
    handleChange,
    validateForm,
  };
};

export default useForm;
