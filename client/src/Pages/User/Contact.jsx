import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({});

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

        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Tạo đối tượng formData từ các state riêng biệt
        const formData = {
            name,
            email,
            phone,
            message
        };
         console.log(formData);
        axios.post('http://127.0.0.1:8000/api/contact', formData)
            .then(response => {
                // Handle success
                console.log(response.data);
                alert('Message sent successfully!');
                // Xóa các giá trị input sau khi gửi thành công
                setName('');
                setEmail('');
                setPhone('');
                setMessage('');
                setErrors({});
            })
            .catch(error => {
                // Handle error
                console.error(error);
                alert('Failed to send message.');
            });
    };

    return (
        <>
            <section id="ContactUs">
                <div className="section_1">
                    <div className="titleContainer w-100 d-flex justify-content-center align-items-center">
                        <img className="imgTitle w-100" src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/163901/Originals/911-la-gi-5.jpeg" />
                        <div className="title">Contact Us</div>
                    </div>
                </div>

                <div className="section_2 mt-xl-5">
                    <div className="row">
                        <div className="col-12 col-xl-6 mt-5">
                            <div className='imgEmergencyContainer'>
                                <img className='imgEmergencyImage w-100' src='https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/contact-info-style2__image.jpg' />
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
                                    <h4 className="contactEmail">info@example.com</h4>
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
                                <div className="form-group mt-4 i1">
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="form-control" 
                                        placeholder="Full Name" 
                                        value={name} 
                                        onChange={handleChange} 
                                    />
                                    {errors.name && <div className="text-danger">{errors.name}</div>}
                                </div>
                                <div className="form-group mt-4 i2">
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Email Address" 
                                        value={email} 
                                        onChange={handleChange} 
                                    />
                                    {errors.email && <div className="text-danger">{errors.email}</div>}
                                </div>
                                <div className="form-group mt-4 i2">
                                    <input 
                                        type="text" 
                                        name="phone" 
                                        className="form-control" 
                                        placeholder="Phone" 
                                        value={phone} 
                                        onChange={handleChange} 
                                    />
                                    {errors.phone && <div className="text-danger">{errors.phone}</div>}
                                </div>
                                <div className="form-group mt-4 i3">
                                    <textarea 
                                        name="message" 
                                        className="form-control" 
                                        placeholder="Your Message" 
                                        rows="3" 
                                        value={message} 
                                        onChange={handleChange} 
                                    ></textarea>
                                    {errors.message && <div className="text-danger">{errors.message}</div>}
                                </div>
                                <div className="form-group mt-4">
                                    <button type="submit" className="btn btnContact text-center form-control">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="section_4">
                    <iframe className="mapGoogle w-100 h-100"
                        src="https://maps.google.com/maps?ll=21.037811,105.809581&q=285 Đội Cấn&t=&z=14&ie=UTF8&iwloc=&output=embed"
                       ></iframe>
                </div>
            </section>
        </>
    );
}

export default Contact;
