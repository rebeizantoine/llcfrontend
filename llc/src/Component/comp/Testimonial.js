import React from 'react'
import '../styles/about2.css'
import image21 from '../images/image-round1.png'
import image22 from '../images/image-round2.png'
import image23 from '../images/image-round3.png'
import image24 from '../images/image-round4.png'

const Testimonial = () => {
    return (
        <div className="container">
            <div className="header">
                <h2>What our students say about
                    the courses
                </h2>
            </div>
            <div className="student-about">
                <div className="left">
                    <div className="all1" id="first">
                        <img className="imageround" src={image21} alt="" />
                        <div className="text">
                            <p className="text1">“Justo vestibulum risus imperdiet consectetur consectetur pretium urna nibh
                                augue
                                etiam
                                risus accumsan volutpat urna, eu semper enim,
                                est aliquam laoreet urna fringilla viverra.”</p>
                            <p className="text2">Julia Moore</p>
                        </div>

                    </div>
                    <div className="all1" id="second">
                        <img className="imageround" src={image22} alt="" />
                        <div className="text">
                            <p className="text1">“Justo vestibulum risus imperdiet consectetur consectetur pretium urna nibh
                                augue
                                etiam
                                risus accumsan volutpat urna, eu semper enim,
                                est aliquam laoreet urna fringilla viverra.”</p>
                            <p className="text2">Olivia Holmes</p>
                        </div>

                    </div>
                </div>
                <div className="right" id="third">
                    <div className="all1">

                        <img className="imageround" src={image23} alt="" />
                        <div className="text">
                            <p className="text1">“Justo vestibulum risus imperdiet consectetur consectetur pretium urna nibh
                                augue
                                etiam
                                risus accumsan volutpat urna, eu semper enim,
                                est aliquam laoreet urna fringilla viverra.”</p>
                            <p className="text2">Roberto Lopez</p>
                        </div>

                    </div>
                    <div className="all1" id="fourth">
                        <img className="imageround" src={image24} alt="" />
                        <div className="text">
                            <p className="text1">“Justo vestibulum risus imperdiet consectetur consectetur pretium urna nibh
                                augue
                                etiam
                                risus accumsan volutpat urna, eu semper enim,
                                est aliquam laoreet urna fringilla viverra.”</p>
                            <p className="text2">Maria Anna</p>
                        </div>

                    </div>
                </div>

            </div>
        </div >
    )
}

export default Testimonial;