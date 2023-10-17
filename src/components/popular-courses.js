import React from 'react'
import './popular-courses.css'
import english from '../components/images/english.png'
import french from '../components/images/french.png'
import dutch from '../components/images/dutch.png'
const popular= () => {
    return (
<div class="popular-courses">
        <p class="roboto">Popular courses</p>
        <p class="medium">Mi mattis tortor dolor vitae congue purus mi imperdiet<br/>
            aliquam ultrices nunc.</p>
        <a href="./contact-us-section/view-all-courses.html"><button class="view-all-courses">VIEW ALL COURSES </button></a>
        <div class="courses-language">
            <div class="language">
                <img src="english" alt="english" class="img-language-eng"/>
                <p class="name-language">ENGLISH LANGUAGE </p>
                <p class="description">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                <button class="enroll">ENROLL NOW</button>
            </div>

            <div class="language">
                <img src="french" alt="french" class="img-language-fr"/>
                <p class="name-language">FRENCH LANGUAGE </p>
                <p class="description">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                <button class="enroll">ENROLL NOW</button>
            </div>

            <div class="language">
                <img src="dutch" alt="dutch" class="img-language-dut"/>
                <p class="name-language">DUTCH LANGUAGE </p>
                <p class="description">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                <button class="enroll">ENROLL NOW</button>
            </div>
        </div>

    </div>
    )
}
export default popular