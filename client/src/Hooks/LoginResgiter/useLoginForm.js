import { useState } from 'react';
import axios from 'axios';

const useLoginForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        name: false,
        password: false,
    });

    const [errorMessages, setErrorMessages] = useState({
        name: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validateForm = () => {
        const newErrors = {
            email: formData.email.trim() === '',
            password: formData.password.trim() === '',
        };

        const newErrorMessages = {
            email: formData.email.trim() === '' ? 'Name is required.' : '',
            password: formData.password.trim() === '' ? 'Password is required.' : '',
        };

        setErrors(newErrors);
        setErrorMessages(newErrorMessages);

        return !Object.values(newErrors).some(error => error);
    };

    const checkEmail = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/check-email', {
                email: formData.email
            });

            if (!response.data.exists) {
                setErrors(prevErrors => ({ ...prevErrors, email: true }));
                setErrorMessages(prevMessages => ({ ...prevMessages, email: 'Email does not exist.' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, email: false }));
                setErrorMessages(prevMessages => ({ ...prevMessages, email: '' }));
            }

            return response.data.exists;
        } catch (error) {
            console.error('Error checking email:', error);
            return false;
        }
    };

    return {
        formData,
        errors,
        errorMessages,
        handleChange,
        validateForm,
        checkEmail,
    };
};

export default useLoginForm;
