import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import PaginationCtxt from '../../Context/PaginationCtxt';

const HospitalUser = () => {
    const [hospitals, setHospitals] = useState([]);
    const [currentData, setCurrentData] = useState([]);
    const recordsPerPage = 9;

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/hospitals')
            .then(response => {
                setHospitals(response.data);
                setCurrentData(response.data.slice(0, recordsPerPage));
                console.log(response.data);
            })
            .catch((error) => {
                console.error("There was an error logging in:", error);
            });
    }, []);

    return (
        <PaginationCtxt.Provider value={{ data: hospitals, setHospitals: setCurrentData }}>
            <div className="boxed_wrapper ltr">
                <section className="breadcrumb-area">
                    <div className="breadcrumb-area-bg"
                        style={{ "background-image": "url('https://mehedi.asiandevelopers.com/ambons/assets/images/breadcrumb/breadcrumb-1.jpg');" }}></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="inner-content">
                                    <div className="title">
                                        <h2> All Hospital</h2>
                                    </div>
                                    <div className="breadcrumb-menu">
                                        <ul>
                                            <li className="breadcrumb-item">
                                                <Link to='/'>Home &nbsp;</Link>
                                            </li>
                                            <li className="breadcrumb-item">All Hospital</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div data-elementor-type="wp-page" data-elementor-id="32" className="elementor elementor-32">
                    <section
                        className="elementor-section elementor-top-section elementor-element elementor-element-d202927 elementor-section-full_width elementor-section-height-default elementor-section-height-default"
                        data-id="d202927" data-element_type="section">
                        <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-fc873e9"
                                data-id="fc873e9" data-element_type="column">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div className="elementor-element elementor-element-25ff001 elementor-widget elementor-widget-ambons_all_services"
                                        data-id="25ff001" data-element_type="widget"
                                        data-widget_type="ambons_all_services.default">
                                        <div className="elementor-widget-container">
                                            <section className="service-page">
                                                <div className="container">
                                                    <div className="row">
                                                        {currentData.map((hospital, index) => (
                                                            <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                                                                <div className="single-service-style1 wow fadeInUp"
                                                                    data-wow-delay="100ms" data-wow-duration="1500ms">
                                                                    <div className="img-holder">
                                                                        <img decoding="async" width="370" height="315"
                                                                            src={hospital.image}
                                                                            className="attachment-ambons_370x315 size-ambons_370x315 wp-post-image"
                                                                            alt=""
                                                                            sizes="(max-width: 370px) 100vw, 370px" />
                                                                    </div>
                                                                    <div className="text-holder">
                                                                        <h3>
                                                                            <a href="../medical-flight-services/index.html">{hospital.name}</a>
                                                                        </h3>
                                                                        <p className='d-flex align-items-center justify-content-start  gap-2'>
                                                                            <i class="fa-solid fa-location-dot"></i>
                                                                            {hospital.address_street}
                                                                        </p>
                                                                        <div className="btn-box">
                                                                            <a href="../medical-flight-services/index.html">Read
                                                                                More<span className="icon-right-arrow"></span></a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Pagination />
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PaginationCtxt.Provider>
    )
}

export default HospitalUser;
