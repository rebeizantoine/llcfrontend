import React from 'react'
import './view-all-courses.css'
import english from '../components/images/english.png'
import french from '../components/images/french.png'
import dutch from '../components/images/dutch.png'
import chinese from '../components/images/chinese.png'
import spanish from '../components/images/spanish.png'
import italian from '../components/images/italian.png'
const viewAllCourses= () => {
    return (
<div class="all-courses-language">
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

        <div class="language">
            <img src="chinese" alt="chinese" class="img-language-chi"/>
            <p class="name-language">CHINESE LANGUAGE </p>
            <p class="description">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
            <button class="enroll">ENROLL NOW</button>
        </div>


        <div class="language">
            <img src="spanish" alt="spanish" class="img-language-spa"/>
            <p class="name-language">SPANISH LANGUAGE </p>
            <p class="description">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
            <button class="enroll">ENROLL NOW</button>
        </div>


        <div class="language">
            <img src="italian" alt="italian" class="img-language-ita"/>
            <p class="name-language">ITALIAN LANGUAGE </p>
            <p class="description">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
            <button class="enroll">ENROLL NOW</button>
        </div>
    </div>
    )
}
export default viewAllCourses
