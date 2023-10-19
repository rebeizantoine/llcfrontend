import React from 'react';
import '../styles/view-all-courses.css';
import English from '../images/english.png';
import French from '../images/french.png';
import Dutch from '../images/dutch.png';
import Chinese from '../images/chinese.png';
import Spanish from '../images/spanish.png';
import Italian from '../images/italian.png';
const viewAllCourses = () => {
    return (
        <div class="all-courses-language">
            <div class="all-courses-language1">

                <div class="language">
                    <img src={English} alt="english" class="img-language-eng" />
                    <p class="name-language">ENGLISH LANGUAGE </p>
                    <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                    <button class="enrollf">ENROLL NOW</button>
                </div>

                <div class="language">
                    <img src={French} alt="french" class="img-language-fr" />
                    <p class="name-language">FRENCH LANGUAGE </p>
                    <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                    <button class="enrollf">ENROLL NOW</button>
                </div>

                <div class="language">
                    <img src={Dutch} alt="dutch" class="img-language-dut" />
                    <p class="name-language">DUTCH LANGUAGE </p>
                    <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                    <button class="enrollf">ENROLL NOW</button>
                </div>
            </div>
            <div class="all-courses-language2">
                <div class="language">
                    <img src={Chinese} alt="chinese" class="img-language-chi" />
                    <p class="name-language">CHINESE LANGUAGE </p>
                    <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                    <button class="enrollf">ENROLL NOW</button>
                </div>


                <div class="language">
                    <img src={Spanish} alt="spanish" class="img-language-spa" />
                    <p class="name-language">SPANISH LANGUAGE </p>
                    <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                    <button class="enrollf">ENROLL NOW</button>
                </div>


                <div class="language">
                    <img src={Italian} alt="italian" class="img-language-ita" />
                    <p class="name-language">ITALIAN LANGUAGE </p>
                    <p class="descriptionf">Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
                    <button class="enrollf">ENROLL NOW</button>
                </div>
            </div>
        </div>
    )
}
export default viewAllCourses