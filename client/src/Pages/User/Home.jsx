import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';


const Home = () => {
  const images = [
    {
      url: 'https://mehedi.asiandevelopers.com/ambons/assets/images/slides/slide-v1-1.jpg',
      title: ' Emergency Medical Services',
      subTitle: 'Your Health is our Priority'
    },
    {
      url: 'https://mehedi.asiandevelopers.com/ambons/assets/images/slides/slide-v1-2.jpg',
      title: 'The Preferred Air Ambulance Company',
      subTitle: 'Your Health is our Priority'
    },
    {
      url: 'https://mehedi.asiandevelopers.com/ambons/assets/images/slides/slide-v1-3.jpg',
      title: 'Emergency Medical Services ',
      subTitle: 'Your Health is our Priority'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 9000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <section className='slider_home_container'>
        <div className='carousel_custom_container'>
          <div className='slider_custom_wrapper'>
            {images.map((image, index) => {
              return (
                <div key={index} className={`carousel_custom_slide ${currentIndex === index ? 'active' : ''}`} >
                  <div className='image_info'>
                    <div className='d-flex flex-column gap-4 justify-content-center'>
                      <div className='sub_title'>
                        <h3>{image.subTitle}</h3>
                      </div>
                      <div className='big_title'>
                        <h2>{image.title}</h2>
                      </div>
                      <div className='btn_discoverMore_wrapper'>
                        <button className='btn_discoverMore'>
                          <span className='txt'>
                            Call An Ambulance
                          </span>
                        </button>
                      </div>
                    </div>
                    <div className='carousel_custom_controls d-lg-block d-none'>
                      <button onClick={prevSlide} className="btn_prev">
                        <span className="material-symbols-outlined">
                          arrow_back
                        </span>
                      </button>
                      <button onClick={nextSlide} className="btn_next">
                        <span className="material-symbols-outlined">
                          arrow_forward
                        </span>
                      </button>
                    </div>
                  </div>
                  <img src={image.url} alt="Slide" className='slider_image' />
                  <div className='overlay'></div>
                </div>
              );
            })}
          </div>
          <div className='slider_contact_info_box'>
            <div className='slider_contact_info'>
              <div className="icon">
                <div className='inner'>
                  <span className="material-symbols-outlined">
                    call
                  </span>
                </div>
              </div>
              <div className="text">
                <h2>+ 84 (828) 818-334</h2>
                <p>Need help? Call anytime for<br /> ambulance services</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container' style={{ marginTop: "8rem" }}>
        <div className="row">
          <div className="col-xl-6">
            <div className="about-style1__image clearfix">
              <div className="inner">
                <img decoding="async"
                  src="https://mehedi.asiandevelopers.com/ambons/assets/images/about/about-style1__image-1.jpg"
                  alt="Awesome Image" />
              </div>

              <div className="overlay-content">
                <div className="icon">
                  <span className="icon icon-ambulance"></span>
                </div>
                <div className="text">
                  <p>Established in</p>
                  <h2>2024</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6">
            <div className="about-style1__content">

              <div className="sec-title">
                <div className="icon">
                  <span className="material-symbols-outlined">
                    vital_signs
                  </span>
                </div>


                <div className="sub-title">
                  <h3>Our Introductions</h3>
                </div>
                <h2>A Leading Medical Service<br /> Provider</h2>
              </div>

              <div className="inner-content">
                <div className="text">
                  <p>Integer aliquam odio tortor dolor sit am adipi we
                    help you ensure everyone is in the right jobs sicing
                    elit, sed do consulting firms Et leggings across the
                    nation tempor.</p>
                </div>

                <div className="row">

                  <div className="col-xl-6">

                    <div className="single-text-box">
                      <h3 className='d-flex flex-row align-items-center justify-content-start gap-2'><span className="material-symbols-outlined">
                        arrow_right_alt
                      </span>Help
                        us Save a Life</h3>
                      <p>Nullam mollis elit quis dusto is lacinia
                        efficitur</p>
                    </div>

                  </div>

                  <div className="col-xl-6">

                    <div className="single-text-box">
                      <h3 className='d-flex flex-row align-items-center justify-content-start gap-2'><span className="material-symbols-outlined">
                        arrow_right_alt
                      </span>Join
                        our Big Family</h3>
                      <p>Phasellus a aliquet turpis. Proin in leo sed
                        dui </p>
                    </div>

                  </div>
                </div>


                <div className="btns-box">
                  <Link to='/about' className="btn_discoverMore">
                    <span className="txt">
                      Discover About More<i
                        className="icon-refresh arrow"></i>
                    </span>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='container' style={{ marginTop: "8rem" }}>
        <div className="row">
          <div className="col-xl-12">
            <div className="features-style1__content">
              <ul>

                <li>
                  <div className="single-features-style1">

                    <div className="icon-holder">
                      <div className="box"></div>
                      <span className="icon-clinic"></span>
                    </div>


                    <div className="text-holder">
                      <h3><a href="view-all-services/index.html">Impeccable
                        Safety</a></h3>
                      <p>Aliquam auctor, lectus sit amet egestas
                        eleifend.</p>
                    </div>

                  </div>
                </li>

                <li>
                  <div className="single-features-style1">

                    <div className="icon-holder">
                      <div className="box"></div>
                      <span className="icon-diploma"></span>
                    </div>


                    <div className="text-holder">
                      <h3><a href="view-all-services/index.html">Fully
                        Licensed</a></h3>
                      <p>Curabitur congue, tortor at semper tristique.
                      </p>
                    </div>

                  </div>
                </li>

                <li>
                  <div className="single-features-style1">

                    <div className="icon-holder">
                      <div className="box"></div>
                      <span className="icon-ambulance-1"></span>
                    </div>


                    <div className="text-holder">
                      <h3><a href="view-all-services/index.html">Available
                        24/7</a></h3>
                      <p>Pellentesque elit mauris, mattis eget
                        consectetur odio.</p>
                    </div>

                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className='container' style={{ marginTop: "8rem" }}>
        <div className="sec-title  text-center">
          <div className="icon">
            <span className="icon-heartbeat"></span>
          </div>
          <div className="sub-title">
            <h3>What We’re Offering</h3>
          </div>
          <h2>About Our Services</h2>
        </div>
        <div className="row">

          <div className="col-xl-4 col-lg-4">
            <div className="single-service-style1 wow fadeInUp"
              data-wow-delay="100ms" data-wow-duration="1500ms">

              <div className="img-holder">
                <img fetchpriority="high" decoding="async" width="370"
                  height="315"
                  src="wp-content/uploads/2022/02/service-v1-1.jpg"
                  className="attachment-ambons_370x315 size-ambons_370x315 wp-post-image"
                  alt=""
                  srcset="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-1.jpg 370w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-1-300x255.jpg 300w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-1-270x230.jpg 270w"
                  sizes="(max-width: 370px) 100vw, 370px" />
              </div>

              <div className="text-holder">
                <h3><a href="ambulance-car/index.html">Ambulance Car</a>
                </h3>
                <p>Proin ultricies rhoncus neque id dignissim. Nullam congue
                  luna est eget auctor pretium.</p>
                <div className="btn-box">
                  <a href="ambulance-car/index.html">Read More<span
                    className="icon-right-arrow"></span></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4">
            <div className="single-service-style1 wow fadeInUp"
              data-wow-delay="100ms" data-wow-duration="1500ms">

              <div className="img-holder">
                <img decoding="async" width="370" height="315"
                  src="wp-content/uploads/2022/02/service-v1-2.jpg"
                  className="attachment-ambons_370x315 size-ambons_370x315 wp-post-image"
                  alt=""
                  srcset="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-2.jpg 370w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-2-300x255.jpg 300w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-2-270x230.jpg 270w"
                  sizes="(max-width: 370px) 100vw, 370px" />
              </div>

              <div className="text-holder">
                <h3><a href="medical-flight-services/index.html">Medical
                  Flight Services</a></h3>
                <p>Curabitur lectus velit, pulvinar vitae elementum vitae,
                  pharetra in mi.</p>
                <div className="btn-box">
                  <a href="medical-flight-services/index.html">Read
                    More<span className="icon-right-arrow"></span></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-lg-4">
            <div className="single-service-style1 wow fadeInUp"
              data-wow-delay="100ms" data-wow-duration="1500ms">

              <div className="img-holder">
                <img decoding="async" width="370" height="315"
                  src="wp-content/uploads/2022/02/service-v1-3.jpg"
                  className="attachment-ambons_370x315 size-ambons_370x315 wp-post-image"
                  alt=""
                  srcset="https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-3.jpg 370w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-3-300x255.jpg 300w, https://fastwpdemo.com/newwp/ambons/wp-content/uploads/2022/02/service-v1-3-270x230.jpg 270w"
                  sizes="(max-width: 370px) 100vw, 370px" />
              </div>

              <div className="text-holder">
                <h3><a href="medical-escort/index.html">Medical Escort</a>
                </h3>
                <p>Aenean a mi mi. Sed sem eros, commodo ut lacinia ut,
                  eleifend id ipsum.</p>
                <div className="btn-box">
                  <a href="medical-escort/index.html">Read More<span
                    className="icon-right-arrow"></span></a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  )
}

export default Home