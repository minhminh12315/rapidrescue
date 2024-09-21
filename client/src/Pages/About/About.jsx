import React from 'react';
import './About.scss';
import { teamv1, teamv2, teamv3, teamv4 } from '../../assets/index.js'
import { FaFacebookF, FaTiktok  } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa6";


const About = () => {
    return (
        <div className='about-container'>
            <section className='about-intro'>
                <div className='intro-content'>
                    <div className='intro-icon'>
                        <span className='icon icon-heartbeat' />
                    </div>
                    <h5 className='intro-subtitle'>Our Benefits List</h5>
                    <h1 className='intro-title'>
                        Our Company Formula
                        <br />
                        for Success
                    </h1>
                </div>
                <div className='about-description'>
                    <h5 className='description-text'>
                        Etiam ligula elit, porta vitae lacus eu adipisi cing elit sed
                        <br />
                        do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </h5>
                </div>
            </section>
            <section className='icon-gallery'>
                <div className='icon-gallery-item'>
                    <div className='icon-item'>
                        <span className='icon icon-medal' />
                    </div>
                    <div className='icon-details'>
                        <h3 className='icon-title'>Longstanding <br /> Service</h3>
                        <p className='icon-description'>Nulla tincidunt maximus lacus vel.</p>
                    </div>
                </div>

                <div className='icon-gallery-item'>
                    <div className='icon-item'>
                        <span className='icon icon-safety' />
                    </div>
                    <div className='icon-details'>
                        <h3 className='icon-title'>High Standard <br /> of Safety</h3>
                        <p className='icon-description'>Integer in consequat nibh, ut porta dolor.</p>
                    </div>
                </div>

                <div className='icon-gallery-item'>
                    <div className='icon-item'>
                        <span className='icon icon-health-insurance' />
                    </div>
                    <div className='icon-details'>
                        <h3 className='icon-title'>Affordable and <br /> Effective</h3>
                        <p className='icon-description'>Sed eu nulla tincidunt, lobortis lorem sit amet.</p>
                    </div>
                </div>

                <div className='icon-gallery-item'>
                    <div className='icon-item'>
                        <span className='icon icon-money-exchange' />
                    </div>
                    <div className='icon-details'>
                        <h3 className='icon-title'>Bedside to <br /> Bedside Care</h3>
                        <p className='icon-description'>Aliquam erat volutpat. Nunc et tincidunt.</p>
                    </div>
                </div>
            </section>
            <section className='professional-team'>
                <div className='team-container'>
                    <div className='intro-icon'>
                        <span className='icon icon-heartbeat' />
                    </div>
                    <div className='team-content'>
                        <h3 className='team-subtitle'>Professional Team</h3>
                        <h1 className='team-title'>Medical Flight Staff</h1>
                    </div>
                </div>
            </section>
            <section className='team-gallery'>
                <div className='team-member'>
                    <img src={teamv1} alt="human" />
                    <div>
                        <h2 className='icon-title'>Jessica Brown</h2>
                        <p>Member</p>
                        <div className='overlay-title'>
                            <h2><a href="#">Jessica Brown</a></h2>
                            <p>Member</p>
                            <ul className='social-links'>
                                <li><FaFacebookF /></li>
                                <li><BsTwitterX/></li>
                                <li><FaInstagram/></li>
                                <li><FaTiktok/></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='team-member'>
                    <img src={teamv2} alt="human" />
                    <div>
                        <h2 className='icon-title'>Kevin Martin</h2>
                        <p>Member</p>
                        <div className='overlay-title'>
                            <h2><a href="#">Kevin Martin</a></h2>
                            <p>Member</p>
                            <ul className='social-links'>
                                <li><FaFacebookF /></li>
                                <li><BsTwitterX/></li>
                                <li><FaInstagram/></li>
                                <li><FaTiktok/></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='team-member'>
                    <img src={teamv3} alt="human" />
                    <div>
                        <h2 className='icon-title'>Sarah Albert</h2>
                        <p>Member</p>
                        <div className='overlay-title'>
                            <h2><a href="#">Sarah Albert</a></h2>
                            <p>Member</p>
                            <ul className='social-links'>
                                <li><FaFacebookF /></li>
                                <li><BsTwitterX/></li>
                                <li><FaInstagram/></li>
                                <li><FaTiktok/></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='team-member'>
                    <img src={teamv4} alt="human" />
                    <div>
                        <h2 className='icon-title'>David Cooper</h2>
                        <p>Member</p>
                        <div className='overlay-title'>
                            <h2><a href="#">David Cooper</a></h2>
                            <p>Member</p>
                            <ul className='social-links'>
                                <li><FaFacebookF /></li>
                                <li><BsTwitterX/></li>
                                <li><FaInstagram/></li>
                                <li><FaTiktok/></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
