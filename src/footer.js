import React from 'react';
import './style.css' ; 

function Footer() {
  return (
    <div>
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css"></link>
      <div className="form">
        <div className="sub">
          <h4 className="t1">Stay in the know</h4>
          <h2 className="t2">Subscribe mailing list</h2>
          <label htmlFor="email"></label>
          <input type="email" className="email" name="email" placeholder="Enter your email" required />
          <button className="subscribe-button">Subscribe</button>
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
          <p>Duis nulla eleifend tincidunt cum amet id mi,<br />
            sodales amet ut non habitant accumsan risus,<br />
            malesuada sit nibh consectetur rutrum quis augue.</p>
        </div>
        <div className="AM">
          <h3 className="c2">About Me</h3>
          <ul>
            <li>My Story</li>
            <li>My Expertise</li>
            <li>Awards &amp; Honors</li>
            <li>News &amp; Blog</li>
          </ul>
        </div>
        <div className="MO">
          <h3 className="c3">My Offering</h3>
          <ul>
            <li>Baking Course</li>
            <li>Virtual Classes</li>
            <li>Private Events</li>
            <li>Gift Certificates</li>
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
        <p>Powered by LLC</p>
        <p>© 2023 LLC</p>
      </div>
    </div>
  );
}

export default Footer;