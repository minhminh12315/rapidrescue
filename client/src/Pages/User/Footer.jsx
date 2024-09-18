import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer-area">

      <div className="footer-area-shape float-bob"
        style={{ 'background-image': 'url(wp-content/uploads/2022/03/shape-2.png);' }}>
      </div>

      <div className="footer">
        <div className="container">
          <div className="row text-right-rtl">
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div id="ambons_about_company-2"
                className="footer-widget single-footer-widget widget_ambons_about_company">
                <div className="marbtm50">
                  <div className="our-company-info">
                    <div className="footer-logo">
                      <a href="index.html"><img
                        src="https://mehedi.asiandevelopers.com/ambons/assets/images/footer/footer-logo.png"
                        alt="Awesome Logo" /></a>
                    </div>
                    <div className="text-box">
                      <p>There are many variatio of lorem ipsum available.</p>
                    </div>
                    <div className="footer-widget-contact-info">
                      <ul>
                        <li>
                          <div className="inner">
                            <div className="icon phone">
                              <span className="icon-email"></span>
                            </div>
                            <div className="text">
                              <p>
                                <a
                                  href="mailto:info@example.com">an.ld.2433@aptechlearing.edu.vn</a>
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inner">
                            <div className="icon">
                              <span className="icon-telephone"></span>
                            </div>
                            <div className="text">
                              <p>
                                <a href="tel:+111-222-3333">+ 84 (828) 818-334</a>
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="inner">
                            <div className="icon mapmarker">
                              <span className="icon-pin"></span>
                            </div>
                            <div className="text">
                              <p>285 Doi Can, Ba Dinh, Ha Noi</p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>

                  </div>
                </div>

              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div id="nav_menu-3" className="footer-widget single-footer-widget widget_nav_menu">
                <div className="title">
                  <h3>Quick Links</h3>
                </div>
                <div className="menu-footer-quick-links-menu-container">
                  <ul id="menu-footer-quick-links-menu" className="menu">
                    <li id="menu-item-1033"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1033">
                      <Link to='/About'>Our About</Link>
                    </li>
                    <li id="menu-item-1030"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1030">
                      <Link to='/contact'>Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div id="nav_menu-4" className="footer-widget single-footer-widget widget_nav_menu">
                <div className="title">
                  <h3>Services</h3>
                </div>
                <div className="menu-services-sidebar-menu-container">
                  <ul id="menu-services-sidebar-menu" className="menu">
                    <li id="menu-item-967"
                      className="menu-item menu-item-type-post_type menu-item-object-page menu-item-967">
                      <Link to='/'>Ambulance Car</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
              <div id="ambons_we_can_help-2"
                className="footer-widget single-footer-widget widget_ambons_we_can_help">
                <div className="margintop pdtop20">
                  <div className="footer-widget-quote-box">
                    <h3>We can help,<br /> today.</h3>
                    <p>24 hours a day,<br /> 7 days a week support.<br /> Free, no obligation<br />
                      price quotes.</p>
                    <div className="btn-box">
                      <a className="btn-one" href="contact/index.html">
                        <span className="txt">Get a Free Quote</span>
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="bottom-inner">
            <div className="copyright">
              <p>Copyright &copy; 2024 <a href="#">Ambons</a> All Rights Reserved.</p>
            </div>
            <div className="footer-social-link">
              <ul className="clearfix">
                <li><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a></li>
                <li><a href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a></li>
                <li><a href="https://www.skype.com/"><i className="fa fa-skype"></i></a></li>
                <li><a href="https://www.twitter.com/"><i className="fa fa-twitter"></i></a></li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer