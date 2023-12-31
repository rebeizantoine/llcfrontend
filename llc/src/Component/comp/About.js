import React from 'react';
import '../styles/about.css';
import image1 from '../images/image-hero1.png';
import image2 from '../images/image-hero2.png';
import image3 from '../images/image-hero3.png';
const About = () => {
    const scrollToTestimonials = () => {
        const testimonialsSection = document.getElementById('testimonial');
        if (testimonialsSection) {
            testimonialsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <div id="About" >
            <div className="about123">
                <h2>About Us</h2>
            </div>
            <div className="container">
                <div className="container1">
                    <div className="container12">
                        <div className="h3about">
                            <h3>
                                We are LLC, a professional <br /> language center with over 10 years <br /> of experience
                            </h3>
                            <img className="image1" src={image1} alt="Image 1" />
                        </div>
                    </div>
                    <div className="image-container">
                        <img className="image2" src={image2} alt="Image 2" />
                    </div>
                </div>
                <div className="big1">
                    <div className="section2">
                        <div className="images">
                            <img className="image3" src={image3} alt="Image 3" />
                        </div>
                        <div className="aboutustext">
                            <div className="text">
                                <p className="text11">
                                    Vulputate egestas nullam volutpat diam nisi at venenatis adipiscing massa
                                    posuere massa nulla massa id integer.
                                </p>
                                <p className="text21">
                                    Cras ullamcorper fermentum arcu in sed fermentum velit nulla scelerisque
                                    pharetra tristique lectus justo faucibus purus est purus gravida nibh odio ante.
                                </p>
                                <button className="aboutbutton" onClick={scrollToTestimonials}>MORE ABOUT US</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;