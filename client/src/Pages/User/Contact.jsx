import React, { useState, useRef, useContext } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import Swal from 'sweetalert2';
import HostContext from '../../Context/HostContext';
const Contact = () => {
    const { host } = useContext(HostContext);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});
    const [captchaToken, setCaptchaToken] = useState('');
    const recaptchaRef = useRef(null);


    const handleChange = (e) => {
        const { name, value } = e.target;

        // Cập nhật state tương ứng với trường dữ liệu
        if (name === 'name') setName(value);
        if (name === 'email') setEmail(value);
        if (name === 'phone') setPhone(value);
        if (name === 'message') setMessage(value);

        // Remove the error for the specific field when the user starts typing
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        const errors = {};
        if (!name) errors.name = 'Name is required';
        if (!email) errors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Email is invalid';

        if (!phone) errors.phone = 'Phone is required';
        else if (!/^\d{10,15}$/.test(phone)) errors.phone = 'Phone number is invalid';

        if (!message) errors.message = 'Message is required';
        if (!captchaToken) errors.captcha = 'Please complete the CAPTCHA';

        return errors;
    };

    const handleCaptchaChange = (value) => {
        setCaptchaToken(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const formData = {
            name,
            email,
            phone,
            message,
            captchaToken  // Bao gồm token reCAPTCHA
        };

        axios.post(`${host}api/contact`, formData)
            .then(response => {
                
                // Thông báo thành công bằng SweetAlert2
                Swal.fire({
                    title: 'Message Sent!',
                    text: 'Your message has been sent successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                ÁDF
                ÁDFASFD
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setErrors({});
                setCaptchaToken(''); // Reset captcha token
                // Reset lại CAPTCHA
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
            })
            .catch(error => {
                console.error(error.response.data);
                alert('Failed to send message.');
            });
    };

    return (
        <>
            <section id="ContactUs">
                <div className="section_1">
                    <div className="titleContainer w-100 d-flex justify-content-center align-items-center">
                        <img className="imgTitle w-100" src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/163901/Originals/911-la-gi-5.jpeg" alt="Contact Us" />
                        <div className="title">Contact Us</div>
                    </div>
                </div>

                <div className="section_2 mt-xl-5">
                    <div className="row">
                        <div className="col-12 col-xl-6 mt-5">
                            <div className='imgEmergencyContainer'>
                                <img className='imgEmergencyImage w-100' src='https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/contact-info-style2__image.jpg' alt="Emergency" />
                            </div>
                        </div>

                        <div className="col-12 col-xl-6 mt-5">
                            <div className='contactDetailsContainer'>
                                <div className="contactInfo">
                                    <i className="contactIcon bi bi-activity"></i>
                                    <h2 className="contactHeading">Contact Us</h2>
                                    <p className="contactIntro">Feel Free to Get in Touch with us</p>
                                    <p className="contactDescription">Nulla quis commodo ligula. Curabitur bibendum ante at nibh lobortis, nec volutpat mauris faucibus. Praesent malesuada et tellus sed efficitur.</p>

                                    <h3 className="contactDetailsHeading mt-4">Contact Details</h3>
                                    <p className="contactAddress">66 Broklyn Golden Street.<br />New York, United States of America</p>
                                    <h2 className="contactPhone mt-4">+1-(246)333-0089</h2>
                                    <h4 className="contactEmail mt-3">info@example.com</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="section_3">
                    <div className="formContactUsContainer container-xl">
                        <div className="subTitleForm text-center pt-3">
                            <i className="bi bi-activity heartIcon"></i>
                        </div>
                        <div className='text-center mt-3 redText'>Send us Message</div>
                        <div className="titleForm text-center">Write us Anytime</div>

                        <div className="formContactUs pt-5">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group i1">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="form-control" 
                                        placeholder="Full Name" 
                                        value={name} 
                                        onChange={handleChange} 
                                    />
                                    {errors.name && <div className="text-danger fs-6">{errors.name}</div>}
                                </div>
                                <div className="form-group i2">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Email Address" 
                                        value={email} 
                                        onChange={handleChange} 
                                    />
                                    {errors.email && <div className="text-danger fs-6">{errors.email}</div>}
                                </div>
                                <div className="form-group i2">
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        className="form-control" 
                                        placeholder="Phone" 
                                        value={phone} 
                                        onChange={handleChange} 
                                    />
                                    {errors.phone && <div className="text-danger fs-6">{errors.phone}</div>}
                                </div>
                                <div className="form-group i3">
                                    <textarea 
                                        name="message" 
                                        className="form-control" 
                                        placeholder="Your Message" 
                                        rows="3" 
                                        value={message} 
                                        onChange={handleChange} 
                                    ></textarea>
                                    {errors.message && <div className="text-danger fs-6">{errors.message}</div>}
                                </div>
                                <div className="form-group">
                                    <ReCAPTCHA
                                        sitekey="6Lflb0cqAAAAAL8tqWL-Tgfo6gNAtsC2hEfRliDh"
                                        onChange={handleCaptchaChange}
                                        ref={recaptchaRef}
                                    />
                                </div>
                                
                                <div className="form-group subContainer">
                                    <button type="submit" className="btn btnContact text-center form-control">
                                        <div className='wrapper-container'>
                                            <div className='wrapper-item'>
                                                Submit
                                            </div>
                                        </div>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="section_4">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.101988018343!2d105.82005117922476!3d21.02860483065242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab743f0f8e6f%3A0x1de980c60e459b76!2sMinistry%20of%20Health%20(MOH)!5e0!3m2!1sen!2s!4v1726723710535!5m2!1sen!2s" width="100%" height="100%"/>
                </div>
            </section>
        </>
    );
}

export default Contact;
