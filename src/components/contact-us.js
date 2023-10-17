import React from 'react'
import './contact-us.css'
const contact= () => {
    return (
        <div class="contact-me">
        <div class="text">
            <h2 class="contain1">Feel free to contact<br />
                me for any questions<br />
                and doubts</h2>

            <h3 class="contain2">Vulputate egestas nullam volutpat diam nisi at venenatis<br />
                adipiscing massa posuere massa nulla massa id integer.</h3>

            <p class="contain3">Cras ullamcorper fermentum arcu in sed fermentum velit <br />
                nulla scelerisque pharetra tristique lectus justo faucibus <br />
                purus est purus gravida nibh odio ante.</p>
            <hr class="line"/>
        </div>
        <div class="contact-information">
            <div class="name">
                <label>NAME</label>
                <div><input type="text" id="first-name" name="first-name" required/>First
                <input type="text" id="last-name" name="last-name" required/>Last</div>
            </div>


            <div class="email">
                <label>EMAIL</label>
               <input type="text" id="email" name="email" required/>
            </div>


            <div class="subject">
                <label>SUBJECT</label>
                <input type="text" id="subject" name="subject" required/>
            </div>


            <div class="message">
                <label>MESSAGE</label>
                <textarea id="message" required></textarea>
            </div>
            <button class="submit">Submit</button>
        </div>
    </div>
    )
}
export default contact-us;