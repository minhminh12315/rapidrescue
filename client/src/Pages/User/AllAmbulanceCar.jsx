import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from './Pagination';
import PaginationCtxt from '../../Context/PaginationCtxt';

const AllAmbulanceCar = () => {
    const [ambulanceCars, setAmbulanceCars] = useState([]);
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
        axios.get('https://6463-2405-4802-1d42-2030-3b-e46f-6a75-9c8b.ngrok-free.app/api/ambulances')
            .then(response => {
                setAmbulanceCars(response.data);
                setCurrentData(response.data.slice(0, 9)); // Set initial page data
            })
            .catch((error) => {
                console.error("There was an error logging in:", error);
            });
    }, []);

    return (
        <PaginationCtxt.Provider value={{ data: currentData, setHospitals: setCurrentData }}>
            <div className="boxed_wrapper ltr">
                <section className="breadcrumb-area">
                    <div className="breadcrumb-area-bg"
                        style={{ "background-image": "url('https://mehedi.asiandevelopers.com/ambons/assets/images/breadcrumb/breadcrumb-1.jpg');" }}></div>
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="inner-content">
                                    <div className="title">
                                        <h2> All Our Ambulance Car</h2>
                                    </div>
                                    <div className="breadcrumb-menu">
                                        <ul>
                                            <li className="breadcrumb-item">
                                                <Link to='/'>Home &nbsp;</Link>
                                            </li>
                                            <li className="breadcrumb-item">All Our Ambulance Car</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div data-elementor-type="wp-page" data-elementor-id="70" className="elementor elementor-70">
                    <section className="elementor-section elementor-top-section elementor-element elementor-element-201b8c7 elementor-section-full_width elementor-section-height-default elementor-section-height-default"
                        data-id="201b8c7" data-element_type="section">
                        <div className="elementor-container elementor-column-gap-default">
                            <div className="elementor-column elementor-col-100 elementor-top-column elementor-element elementor-element-8f94b4a"
                                data-id="8f94b4a" data-element_type="column">
                                <div className="elementor-widget-wrap elementor-element-populated">
                                    <div className="elementor-element elementor-element-d221daf elementor-widget elementor-widget-ambons_blog_style_1"
                                        data-id="d221daf" data-element_type="widget"
                                        data-widget_type="ambons_blog_style_1.default">
                                        <div className="elementor-widget-container">
                                            <section className="blog-page-one">
                                                <div className="container">
                                                    <div className="row">
                                                        {currentData.map((ambulance, index) => {
                                                            return (
                                                                <div className="col-xl-4 col-lg-4 col-md-6" key={index}>
                                                                    <div className="single-blog-style1">
                                                                        <div className="img-holder">
                                                                            <img fetchpriority="high" decoding="async" width="370"
                                                                                height="290"
                                                                                src={ambulance.image}
                                                                                className="attachment-ambons_370x290 size-ambons_370x290 wp-post-image"
                                                                                alt="" />
                                                                        </div>
                                                                        <div className="text-holder">
                                                                            <div className="meta-info">
                                                                                <p><span className="icon-ambulance"></span> {ambulance.type}</p>
                                                                            </div>
                                                                            <h3>
                                                                                <a href="../2022/03/trusted-international-air-ambulance-company-4/index.html">{ambulance.name}</a>
                                                                            </h3>
                                                                            <p>{ambulance.price}/ chuyến</p>
                                                                            <div className="btn-box">
                                                                                <a href="../2022/03/trusted-international-air-ambulance-company-4/index.html">Read
                                                                                    More</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
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
    );
}

export default AllAmbulanceCar;
