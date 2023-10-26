import React from 'react';
import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/contact-us.css';
const Contact = () => {
    const form = useRef()

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_6xtx3zu', 'template_ugq8rdb', form.current, 'xVLCCoH8RY-hM68S4')
            .then((result) => {
                console.log(result.text);
                console.log("message sent")
            }, (error) => {
                console.log(error.text);
            });
        e.target.reset()
    };
    return (
        <div class="contact-me">
            <form ref={form} onSubmit={sendEmail}>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css"></link>
                <div class="contact-information">
                    <div class="name">
                        <label class="labelf" id='namef'>NAME</label>
                        <div>
                            <input className='inputf' type="text" id="first-name" name="user_name" required placeholder='first' />
                            <input className='inputf' type="text" id="last-name" name="user_lastname" required placeholder='last' />
                        </div>
                    </div>


                    <div class="email">
                        <label class="labelf">EMAIL</label>
                        <input className='inputf' type="text" id="emailf" name="user_email" required />
                    </div>


                    <div class="subject">
                        <label class="labelf">SUBJECT</label>
                        <input className='inputf' type="text" id="subjectf" name="subject" required />
                    </div>


                    <div class="message">
                        <label class="labelf">MESSAGE</label>
                        <textarea id="message" name="message" className='inputf' required></textarea>
                    </div>
                    <button class="submit">Submit</button>
                </div>
            </form>
            <div class="textf">
                <h2 class="contain1">Feel free to contact
                    me for any questions
                    and doubts</h2>

                <h3 class="contain2">Vulputate egestas nullam volutpat diam nisi at venenatis<br />
                    adipiscing massa posuere massa nulla massa id integer.</h3>

                <p class="contain3">Cras ullamcorper fermentum arcu in sed fermentum velit <br />
                    nulla scelerisque pharetra tristique lectus justo faucibus <br />
                    purus est purus gravida nibh odio ante.</p>
                <hr class="linef" />
                <div className="social-container">
                    <ul className="social-icons">
                        <li><a href="#"><i className="fa fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fa fa-facebook"></i></a></li>
                        <li><a href="#"><i className="fa fa-youtube"></i></a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default Contact;