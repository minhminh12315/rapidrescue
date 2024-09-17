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
            name: formData.name.trim() === '',
            password: formData.password.trim() === '',
        };

        const newErrorMessages = {
            name: formData.name.trim() === '' ? 'Name is required.' : '',
            password: formData.password.trim() === '' ? 'Password is required.' : '',
        };

        setErrors(newErrors);
        setErrorMessages(newErrorMessages);

        return !Object.values(newErrors).some(error => error);
    };

    const checkUsername = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/check-username', {
                name: formData.name
            });

            if (!response.data.exists) {
                setErrors(prevErrors => ({ ...prevErrors, name: true }));
                setErrorMessages(prevMessages => ({ ...prevMessages, name: 'Username does not exist.' }));
            } else {
                setErrors(prevErrors => ({ ...prevErrors, name: false }));
                setErrorMessages(prevMessages => ({ ...prevMessages, name: '' }));
            }

            return response.data.exists;
        } catch (error) {
            console.error('Error checking username:', error);
            return false;
        }
    };

    return {
        formData,
        errors,
        errorMessages,
        handleChange,
        validateForm,
        checkUsername,
    };
};

export default useLoginForm;
