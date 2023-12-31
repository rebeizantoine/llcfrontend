import React from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/style.css';

function Footer() {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_6xtx3zu', 'template_iz77l0n', form.current, 'xVLCCoH8RY-hM68S4')
            .then((result) => {
                console.log(result.text);
                console.log("message sent")
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <div>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css"></link>
            <div className="form">
                <div className="sub">
                    <h4 className="t1">Stay in the know</h4>
                    <h2 className="t2">Subscribe mailing list</h2>
                    <form ref={form} onSubmit={sendEmail}>
                        <label htmlFor="emailff"></label>
                        <div className='subscribe123'>
                            <input type="email" className="emailff" name="mailing_email" placeholder="  Enter your email" required />
                            <button type="submit" className="subscribe-button123" >Subscribe</button> {/* Changed onClick to type="submit" */}
                        </div>
                    </form>
                </div>

                <div className="Social">
                    <h4 className="t3">Follow Us on Social media</h4>
                    <div className="social-container">
                        <ul className="social-icons">
                            <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                            <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr />
            <div className="footer">
                <div className="titre">
                    <h3 className="c1">LLC</h3>
                    <p class="tezbeet">Duis nulla eleifend tincidunt cum amet id mi,
                        sodales amet ut non habitant accumsan risus,
                        malesuada sit nibh consectetur rutrum quis augue.</p>
                </div>
                <div className="AM">
                    <h3 className="c2">About Me</h3>
                    <ul class="aboutme">
                        <li>Our Story</li>
                        <li>Our Expertise    </li>
                        <li>Awards </li>
                        <li>News</li>
                    </ul>
                </div>
                <div className="MO">
                    <h3 className="c3">Our Offering</h3>
                    <ul class="offer">
                        <li>Speaking Lessons </li>
                        <li>Speaking Lessons</li>
                        <li>Private Events</li>
                        <li>Gifts</li>
                    </ul>
                </div>
                <div className="CI">
                    <h3 className="c4">Contact Information</h3>
                    <p>123 Fifth Avenue, New York, NY 12004. United States.<br />
                        mail@example.com<br />
                        +01 – 123 456 78 90</p>
                </div>

            </div>
            <div className="final">
                <p>Powered by LLC-© 2023 LLC</p>

            </div>

        </div>
    );
}

export default Footer;