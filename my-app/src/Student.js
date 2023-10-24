import React from 'react';
import './styles.css'; // Import the CSS file
import english from './english.jpg'
import spanish from './spanish.png'

function Student() {
  return (
    <div className="sh1">
      <h1>LLC</h1>
      <h2>My courses</h2>
      <div className="container">
        <div className="container1">
          <img src={english} alt="Image Description" />
          <div className="Engf">
            <h1>ENGLISH LANGUAGE</h1>
            <p>Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
          </div>
        </div>
        <div className="container2">
          <img className="Imaged" src={spanish} alt="Image Description" />
          <div className="Spaf">
            <h1>SPANISH LANGUAGE</h1>
            <p>Eu adipiscing nec erat amet at aliquam blandit gravida massa suscipit massa.</p>
          </div>
        </div>
      </div>
      <h2>MY SCHEDULE</h2>
      <table className="week">
        <tr>
          <th></th>
          <th className="weekdays">Monday</th>
          <th className="weekdays">Tuesday</th>
          <th className="weekdays">Wednesday</th>
          <th className="weekdays">Thursday</th>
          <th className="weekdays">Friday</th>
        </tr>
        <tr>
          <td>10:00 - 12:00</td>
          <td>Eng A2</td>
          <td></td>
          <td></td>
          <td></td>
          <td>Eng A2</td>
        </tr>
        <tr>
          <td>12:00 - 14:00</td>
          <td></td>
          <td></td>
          <td>Spa. B1</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>14:00 - 16:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>16:00 - 18:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td>Spa. B1</td>
          <td></td>
        </tr>
        <tr>
          <td>18:00 - 20:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>20:00 - 22:00</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>
    </div>
  );
}

export default Student;