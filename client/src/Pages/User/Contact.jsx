import React from 'react'

const Contact = () => {
  return (
    <div>
      <section className="breadcrumb-area">
        <div className="breadcrumb-area-bg" style={{ backgroundImage: "url('https://mehedi.asiandevelopers.com/ambons/assets/images/breadcrumb/breadcrumb-1.jpg');" }}>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="inner-content">
                <div className="title">
                  <h2> Contact</h2>
                </div>
                <div className="breadcrumb-menu">
                  <ul>
                    <li className="breadcrumb-item"><a href="../index.html">Home &nbsp;</a></li>
                    <li className="breadcrumb-item">Contact</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact-info-style2-area">
        <div className="container">
          <div className="row text-right-rtl">
            <div className="col-xl-6">
              <div className="contact-info-style2__image">
                <div className="inner">
                  <img decoding="async"
                    src="https://mehedi.asiandevelopers.com/ambons/assets/images/resources/contact-info-style2__image.jpg"
                    alt="Awesome Image" />
                </div>
              </div>
            </div>
            <div className="col-xl-6">
              <section className="main-contact-form-area " id="contact">
                <div className="sec-title text-center p-2">
                  <div className="icon">
                    <span className="icon-heartbeat"></span>
                  </div>
                  <div className="sub-title">
                    <h3>Send us Message</h3>
                  </div>
                  <h2>Write us Anytime</h2>
                </div>

                <div className="row">
                  <div className="col-xl-12">
                    <div className="contact-form">
                      <div className="default-form2">

                        <div className="wpcf7 no-js" id="wpcf7-f452-p81-o1" lang="en-US" dir="ltr">
                          <form
                            action="https://fastwpdemo.com/newwp/ambons/contact/#wpcf7-f452-p81-o1"
                            method="post" className="wpcf7-form init"
                            aria-label="Contact form" novalidate="novalidate"
                            data-status="init">
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="d-flex justify-content-center">
                                  <div className="text-center mb-4">
                                    <div className="rating">
                                      <input type="radio" name="rating" value="5" id="5" />
                                      <label htmlFor="5">☆</label>
                                      <input type="radio" name="rating" value="4" id="4" />
                                      <label htmlFor="4">☆</label>
                                      <input type="radio" name="rating" value="3" id="3" />
                                      <label htmlFor="3">☆</label>
                                      <input type="radio" name="rating" value="2" id="2" />
                                      <label htmlFor="2">☆</label>
                                      <input type="radio" name="rating" value="1" id="1" />
                                      <label htmlFor="1">☆</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-12">
                                <div className="form-group">
                                  <div className="input-box">
                                    <textarea cols="40" rows="8"
                                      className="wpcf7-form-control wpcf7-textarea h-100"
                                      placeholder="Write a Message"
                                      name="textarea-290">
                                    </textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-xl-12 text-center">
                                <div className="button-box">
                                  <p><button className="btn-one" type="submit"
                                    data-loading-text="Please wait..."><span
                                      className="txt">send a
                                      message</span></button>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="google-map-area">
        <div className="auto-container">
          <div className="contact-page-map-outer">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.9242787880803!2d105.81644891118356!3d21.03571558745814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab145bf89bd7%3A0xd94a869b494c04b6!2zMjg1IFAuIMSQ4buZaSBD4bqlbiwgTGnhu4V1IEdpYWksIEJhIMSQw6xuaCwgSMOgIE7hu5lpIDEwMDAwMCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1726633165725!5m2!1svi!2s" width="100%" height="550" style={{ border: "0;" }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact