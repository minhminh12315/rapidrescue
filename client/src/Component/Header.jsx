import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";

const Header = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);

  const handleMobileMenuToggle = () => {
    document.body.classList.toggle('mobile-menu-visible')
  };
  const closeMobileMenuToggle = () => {
    document.body.classList.remove('mobile-menu-visible')
  };
  // console.log(user)

  return (
    <header className="main-header header-style-one">
      <div className="header-top">
        <div className="auto-container">
          <div className="outer-box">
            <div className="header-top__left">
              <div className="main-logo-box">
                <Link to="/" title="Ambons">
                  <img
                    src="https://mehedi.asiandevelopers.com/ambons/assets/images/resources/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>

            <div className="header-top__right">
              <div className="header-contact-info-style1">
                <ul>
                  <li>
                    <div className="icon">
                      <span className="icon-telephone"></span>
                    </div>
                    <div className="text">
                      <p>Call anytime</p>
                      <h5>
                        <a href="tel:123456789">+ 84 (828) 818-334</a>
                      </h5>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <span className="icon-email"></span>
                    </div>
                    <div className="text">
                      <p>Write email</p>
                      <h5>
                        <a href="mailto:info@example.com">
                          an.ld.2433@aptechlearning.edu.vn
                        </a>
                      </h5>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="header-button-style1">
                <Link to="/call-ambulance" className="btn-one">
                  <span className="txt">Call An Ambulance</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="header">
        <div className="auto-container">
          <div className="d-flex flex-row justify-content-center align-items-center">
            <div className="header-left">
              <div className="nav-outer style1 clearfix">
                <div className="mobile-nav-toggler" onClick={handleMobileMenuToggle}>
                  <div className="inner">
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </div>
                </div>
                <nav className="main-menu style1 navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix m-0 ">
                      <li id="menu-item-128" className="">
                        <Link to="/">Home</Link>
                      </li>
                      <li id="menu-item-167" className=" ">
                        <Link to="/About">About</Link>
                      </li>
                      <li id="menu-item-171" className="">
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li id="menu-item-172" className="">
                        <Link to="/hospital">Hospital</Link>
                      </li>
                      <li id="menu-item-173" className="">
                        <Link to="/ambulance-car">Ambulance Car</Link>
                      </li>
                      {user ? (
                        <li id="menu-item-173" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-173 dropdown">
                          <Link
                            data-toggle="dropdown1"
                            class="hvr-underline-from-left1" aria-expanded="false" data-scroll
                            data-options="easing: easeOutQuart"
                          >
                            {user.first_name + " " + user.last_name}
                          </Link>
                          <ul class="submenu">
                            <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-136">
                              <Link to="/login"
                                onClick={() => {
                                  setUser(null);
                                  localStorage.removeItem("user");
                                  navigate("/login");
                                }}><i className="ri-logout-box-line"></i>LOG OUT</Link>
                            </li>
                          </ul>
                        </li>
                      ) : (
                        <>
                          <li id="menu-item-173" className="">
                            <Link to="/login">Login</Link>
                          </li>
                          <li id="menu-item-173" className="">
                            <Link to="/register">Register</Link>
                          </li>{" "}
                        </>
                      )}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky-header">
        <div className="container">
          <div className="clearfix">
            <div className="logo float-left">
              <div className="img-responsive">
                <Link to="/">
                  <img
                    src="https://mehedi.asiandevelopers.com/ambons/assets/images/resources/logo.png"
                    alt="logo"
                  />
                </Link>
              </div>
            </div>
            <div className="right-col float-right">
              <nav className="main-menu clearfix">
                <ul className="navigation clearfix m-0 ">
                  <li id="menu-item-128" className="">
                    <Link to="/">Home</Link>
                  </li>
                  <li id="menu-item-167" className=" ">
                    <Link to="/About">About</Link>
                  </li>
                  <li id="menu-item-171" className="">
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li id="menu-item-172" className="">
                    <Link to="/hospital">Hospital</Link>
                  </li>
                  <li id="menu-item-173" className="">
                    <Link to="/ambulance-car">Ambulance Car</Link>
                  </li>
                  {user ? (
                    <li id="menu-item-173" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-173 dropdown">
                      <Link
                        data-toggle="dropdown1"
                        class="hvr-underline-from-left1" aria-expanded="false" data-scroll
                        data-options="easing: easeOutQuart"
                      >
                        {user.first_name + " " + user.last_name}
                      </Link>
                      <ul class="submenu">
                        <li class="menu-item menu-item-type-post_type menu-item-object-page menu-item-136">
                          <Link to="/login"
                            onClick={() => {
                              setUser(null);
                              localStorage.removeItem("user");
                              navigate("/login");
                            }}><i className="ri-logout-box-line"></i>LOG OUT</Link>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <>
                      <li id="menu-item-173" className="">
                        <Link to="/login">Login</Link>
                      </li>
                      <li id="menu-item-173" className="">
                        <Link to="/register">Register</Link>
                      </li>{" "}
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={closeMobileMenuToggle}></div>
        <div className="close-btn" onClick={closeMobileMenuToggle}>
          <span className="icon fa fa-times-circle"></span>
        </div>
        <nav className="menu-box">
          <div className="nav-logo">
            <a href="index.html" title="Ambons">
              <img
                src="https://mehedi.asiandevelopers.com/ambons/assets/images/footer/footer-logo.png"
                alt="logo"
              />
            </a>
          </div>
          <div className="menu-outer">
            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className="navigation clearfix m-0 ">
                <li id="menu-item-128" className="">
                  <a href="/">Home</a>
                </li>
                <li id="menu-item-167" className=" ">
                  <a href="/About">About</a>
                </li>
                <li id="menu-item-171" className="">
                  <a href="/contact">Contact</a>
                </li>
                <li id="menu-item-172" className="">
                  <a href="/hospital">Hospital</a>
                </li>
                <li id="menu-item-173" className="">
                  <a href="/ambulance-car">Ambulance Car</a>
                </li>
                {user ? (
                  <li id="menu-item-173" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-173 dropdown">
                    <a
                      href="/login"
                      onClick={() => {
                        setUser(null);
                        localStorage.removeItem("user");
                        navigate("/login");
                      }}
                    >
                      Logout
                    </a>
                    <ul>
                      <li>LOG OUT</li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li id="menu-item-173" className="">
                      <a href="/login">Login</a>
                    </li>
                    <li id="menu-item-173" className="">
                      <a href="/register">Register</a>
                    </li>{" "}
                  </>
                )}
              </ul>
            </div>
          </div>
          <div className="social-links">
            <ul className="clearfix">
              <li>
                <a href="https://www.facebook.com/">
                  <span className="fa fa-facebook"></span>
                </a>
              </li>
              <li>
                <a href="https://www.pinterest.com/">
                  <span className="fa fa-pinterest"></span>
                </a>
              </li>
              <li>
                <a href="https://www.skype.com/">
                  <span className="fa fa-skype"></span>
                </a>
              </li>
              <li>
                <a href="https://www.twitter.com/">
                  <span className="fa fa-twitter"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
