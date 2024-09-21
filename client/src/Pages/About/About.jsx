import React from 'react';
import './About.scss';
import { Link } from 'react-router-dom';


const About = () => {
    return (
        <div>
            <section className="breadcrumb-area">
                <div className="breadcrumb-area-bg"
                    style={{ "background-image": "url('https://mehedi.asiandevelopers.com/ambons/assets/images/breadcrumb/breadcrumb-1.jpg');" }}></div>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="inner-content">
                                <div className="title">
                                    <h2> About us</h2>
                                </div>
                                <div className="breadcrumb-menu">
                                    <ul>
                                        <li className="breadcrumb-item">
                                            <Link to='/'>Home &nbsp;</Link>
                                        </li>
                                        <li className="breadcrumb-item">About us</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="about-style1-area">
                <div class="container">
                    <div class="row text-right-rtl">
                        <div class="col-xl-6">
                            <div class="about-style3__image">
                                <div class="inner">
                                    <img decoding="async"
                                        src="https://mehedi.asiandevelopers.com/ambons/assets/images/about/about-style3__image-1.jpg"
                                        alt="Awesome Image" />
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-6">
                            <div class="about-style3__content">
                                <div class="sec-title">

                                    <div class="icon">
                                        <span class="icon-heartbeat"></span>
                                    </div>


                                    <div class="sub-title">
                                        <h3>Read More About us</h3>
                                    </div>

                                    <h2>Let’s Get to Know About<br /> Ambulance Services</h2>
                                </div>
                                <div class="inner-content">

                                    <div class="text">
                                        <p>Quisque tempus varius facilisis. Duis placerat turpis
                                            everyone is
                                            in the right jobs sicing elit, sed do consulting
                                            firms Et leggings across the nation tempor.</p>
                                    </div>

                                    <div class="row">
                                        <div class="col-xl-6">
                                            <div class="single-box">
                                                <ul>

                                                    <li><span
                                                        class="icon-checked"></span>Nsectetur
                                                        cing elit.</li>

                                                    <li><span
                                                        class="icon-checked"></span>Nsectetur
                                                        cing elit.</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div class="col-xl-6">
                                            <div class="single-box">
                                                <ul>
                                                    <li><span class="icon-checked"></span>Suspe
                                                        ndisse suscipit leo.</li>
                                                    <li><span class="icon-checked"></span>If you
                                                        are to a passage.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="progress-levels">

                                        <div class="progress-box  wow">
                                            <div class="inner count-box">
                                                <div class="text">Air Ambulance</div>
                                                <div class="bar">
                                                    <div class="bar-innner">
                                                        <div class="skill-percent">
                                                            <span class="count-text"
                                                                data-speed="3000"
                                                                data-stop="95">0</span>
                                                            <span class="percent">%</span>
                                                        </div>
                                                        <div class="bar-fill" data-percent="95">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="progress-box last-child wow">
                                            <div class="inner count-box">
                                                <div class="text">Car Ambulance</div>
                                                <div class="bar">
                                                    <div class="bar-innner">
                                                        <div class="skill-percent">
                                                            <span class="count-text"
                                                                data-speed="3000"
                                                                data-stop="70">0</span>
                                                            <span class="percent">%</span>
                                                        </div>
                                                        <div class="bar-fill" data-percent="70">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="features-style2-area gray-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="features-style2__title">
                                <div class="sec-title">

                                    <div class="icon">
                                        <span class="icon-heartbeat"></span>
                                    </div>


                                    <div class="sub-title">
                                        <h3>Our Benefits List</h3>
                                    </div>

                                    <h2>Our Company Formola<br /> for Success</h2>
                                </div>


                                <div class="text">
                                    <p>Etiam ligula elit, porta vitae lacus eu adipisi cing elit
                                        sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-xl-12">
                            <ul class="features-style2__content">

                                <li class="single-features-style2" data-aos="fade-left"
                                    data-aos-easing="linear" data-aos-duration="1500">
                                    <div class="icon-holder">
                                        <span class="icon icon-medal"></span>
                                    </div>

                                    <div class="text-holder">
                                        <h3><a href="../view-all-services/index.html">Longstanding<br />
                                            Service</a></h3>
                                        <p>Nulla tincidunt maximus lacus vel .</p>
                                    </div>
                                </li>

                                <li class="single-features-style2" data-aos="fade-left"
                                    data-aos-easing="linear" data-aos-duration="1500">
                                    <div class="icon-holder">
                                        <span class="icon icon-safety"></span>
                                    </div>

                                    <div class="text-holder">
                                        <h3><a href="../view-all-services/index.html">High
                                            Standard<br /> of Safety</a></h3>
                                        <p>Integer in consequat nibh, ut porta dolor.</p>
                                    </div>
                                </li>

                                <li class="single-features-style2" data-aos="fade-left"
                                    data-aos-easing="linear" data-aos-duration="1500">
                                    <div class="icon-holder">
                                        <span class="icon icon-health-insurance"></span>
                                    </div>

                                    <div class="text-holder">
                                        <h3><a href="../view-all-services/index.html">Bedside
                                            to<br /> Bedside Care</a></h3>
                                        <p>Aliquam erat volutpat. Nunc et tincidunt.</p>
                                    </div>
                                </li>

                                <li class="single-features-style2" data-aos="fade-left"
                                    data-aos-easing="linear" data-aos-duration="1500">
                                    <div class="icon-holder">
                                        <span class="icon icon-money-exchange"></span>
                                    </div>

                                    <div class="text-holder">
                                        <h3><a href="../view-all-services/index.html">Affordable
                                            and<br /> Effective</a></h3>
                                        <p>Sed eu nulla tincidunt, lobortis lorem sit amet.</p>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <section class="team-style1-area">
                <div class="auto-container">
                    <div class="sec-title text-center">

                        <div class="icon">
                            <span class="icon-heartbeat"></span>
                        </div>


                        <div class="sub-title">
                            <h3>Professional Team</h3>
                        </div>

                        <h2>Medical Flight Staff</h2>
                    </div>

                    <div class="row">


                        <div class="col-xl-3 col-lg-6 col-md-6">
                            <div class="single-team-style1 wow fadeInUp" data-wow-delay="100ms"
                                data-wow-duration="1500ms">
                                <div class="img-holder">

                                    <div class="inner">
                                        <img decoding="async" width="370" height="445"
                                            src="../wp-content/uploads/2022/02/team-v1-1.jpg"
                                            class="attachment-ambons_370x445 size-ambons_370x445 wp-post-image"
                                            alt=""
                                            srcSet="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-1.jpg 370w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-1-249x300.jpg 249w"
                                            sizes="(max-width: 370px) 100vw, 370px" />
                                    </div>

                                    <div class="title-holder text-center">
                                        <h2><a href="../team/jessica-brown/index.html">Jessica
                                            Brown</a></h2>
                                        <h3>Member</h3>
                                        <div class="overlay-title">
                                            <h2><a href="../team/jessica-brown/index.html">Jessica
                                                Brown</a></h2>
                                            <h3>Member</h3>

                                            <ul class="social-links">
                                                <li><a href="https://www.facebook.com/"><i
                                                    class="fa fa-facebook"></i></a></li>
                                                <li><a href="https://www.linkedin.com/"><i
                                                    class="fa fa-linkedin"></i></a></li>
                                                <li><a href="https://www.skype.com/"><i
                                                    class="fa fa-skype"></i></a></li>
                                                <li><a href="https://www.twitter.com/"><i
                                                    class="fa fa-twitter"></i></a></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-lg-6 col-md-6">
                            <div class="single-team-style1 wow fadeInUp" data-wow-delay="100ms"
                                data-wow-duration="1500ms">
                                <div class="img-holder">

                                    <div class="inner">
                                        <img loading="lazy" decoding="async" width="370"
                                            height="445"
                                            src="../wp-content/uploads/2022/02/team-v1-2.jpg"
                                            class="attachment-ambons_370x445 size-ambons_370x445 wp-post-image"
                                            alt=""
                                            srcSet="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-2.jpg 370w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-2-249x300.jpg 249w"
                                            sizes="(max-width: 370px) 100vw, 370px" />
                                    </div>

                                    <div class="title-holder text-center">
                                        <h2><a href="../team/kevin-martin/index.html">Kevin
                                            Martin</a></h2>
                                        <h3>Member</h3>
                                        <div class="overlay-title">
                                            <h2><a href="../team/kevin-martin/index.html">Kevin
                                                Martin</a></h2>
                                            <h3>Member</h3>

                                            <ul class="social-links">
                                                <li><a href="https://www.facebook.com/"><i
                                                    class="fa fa-facebook"></i></a></li>
                                                <li><a href="https://www.linkedin.com/"><i
                                                    class="fa fa-linkedin"></i></a></li>
                                                <li><a href="https://www.skype.com/"><i
                                                    class="fa fa-skype"></i></a></li>
                                                <li><a href="https://www.twitter.com/"><i
                                                    class="fa fa-twitter"></i></a></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-lg-6 col-md-6">
                            <div class="single-team-style1 wow fadeInUp" data-wow-delay="100ms"
                                data-wow-duration="1500ms">
                                <div class="img-holder">

                                    <div class="inner">
                                        <img loading="lazy" decoding="async" width="370"
                                            height="445"
                                            src="../wp-content/uploads/2022/02/team-v1-3.jpg"
                                            class="attachment-ambons_370x445 size-ambons_370x445 wp-post-image"
                                            alt=""
                                            srcSet="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-3.jpg 370w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-3-249x300.jpg 249w"
                                            sizes="(max-width: 370px) 100vw, 370px" />
                                    </div>

                                    <div class="title-holder text-center">
                                        <h2><a href="../team/sarah-albert/index.html">Sarah
                                            Albert</a></h2>
                                        <h3>Member</h3>
                                        <div class="overlay-title">
                                            <h2><a href="../team/sarah-albert/index.html">Sarah
                                                Albert</a></h2>
                                            <h3>Member</h3>

                                            <ul class="social-links">
                                                <li><a href="https://www.facebook.com/"><i
                                                    class="fa fa-facebook"></i></a></li>
                                                <li><a href="https://www.linkedin.com/"><i
                                                    class="fa fa-linkedin"></i></a></li>
                                                <li><a href="https://www.skype.com/"><i
                                                    class="fa fa-skype"></i></a></li>
                                                <li><a href="https://www.twitter.com/"><i
                                                    class="fa fa-twitter"></i></a></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-xl-3 col-lg-6 col-md-6">
                            <div class="single-team-style1 wow fadeInUp" data-wow-delay="100ms"
                                data-wow-duration="1500ms">
                                <div class="img-holder">

                                    <div class="inner">
                                        <img loading="lazy" decoding="async" width="370"
                                            height="445"
                                            src="../wp-content/uploads/2022/02/team-v1-4.jpg"
                                            class="attachment-ambons_370x445 size-ambons_370x445 wp-post-image"
                                            alt=""
                                            srcSet="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-4.jpg 370w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/team-v1-4-249x300.jpg 249w"
                                            sizes="(max-width: 370px) 100vw, 370px" />
                                    </div>

                                    <div class="title-holder text-center">
                                        <h2><a href="../team/david-cooper/index.html">David
                                            Cooper</a></h2>
                                        <h3>Member</h3>
                                        <div class="overlay-title">
                                            <h2><a href="../team/david-cooper/index.html">David
                                                Cooper</a></h2>
                                            <h3>Member</h3>

                                            <ul class="social-links">
                                                <li><a href="https://www.facebook.com/"><i
                                                    class="fa fa-facebook"></i></a></li>
                                                <li><a href="https://www.linkedin.com/"><i
                                                    class="fa fa-linkedin"></i></a></li>
                                                <li><a href="https://www.skype.com/"><i
                                                    class="fa fa-skype"></i></a></li>
                                                <li><a href="https://www.twitter.com/"><i
                                                    class="fa fa-twitter"></i></a></li>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
