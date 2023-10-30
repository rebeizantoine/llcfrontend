import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/popular-courses.css';
import English from '../images/english.png';
import French from '../images/french.png'
import Dutch from '../images/dutch.png';
const Popular = () => {
    return (
        <div id="Courses">
            <div class="popular-courses">
                <p class="roboto">Popular courses</p>
                <p class="medium">Mi mattis tortor dolor vitae congue purus mi imperdiet<br />
                    aliquam ultrices nunc.</p>
                <Link to="/AllCourses"><button class="view-all-coursess">VIEW ALL COURSES </button></Link>
                <div class="courses-language">

                    <div class="language1">
                        <img src={English} alt="english" class="img-language-eng" />
                        <p class="name-language">ENGLISH LANGUAGE </p>
                        <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                        <button class="enrollf">ENROLL NOW</button>
                    </div>

                    <div class="language1">
                        <img src={French} alt="french" class="img-language-fr" />
                        <p class="name-language">FRENCH LANGUAGE </p>
                        <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                        <button class="enrollf">ENROLL NOW</button>
                    </div>

                    <div class="language1">
                        <img src={Dutch} alt="dutch" class="img-language-dut" />
                        <p class="name-language">DUTCH LANGUAGE </p>
                        <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                        <button class="enrollf">ENROLL NOW</button>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default Popular;