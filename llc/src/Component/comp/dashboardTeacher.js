import React from 'react';
import '../styles/contact-us.css';
const dashboardTeacher = () => {
    return (
        <div class='afterLoginPageTeacher'>

        
        <div className='profileTeacher'>
            <div class="circle">
                <button class="portrait"></button>
            </div>
            <div class="teacherInfos">
                <p class="teacherName">teacherName</p>
                <button class='manageProfileTeacher'>Manage Profile</button>
            </div>
        </div>




        <div class="fonctionsTeachers">


            <div class="img-languge-education">
            </div>


            <div class="assignments">
                <div class="ass">
                    <p>Assignments</p>
                    <button class="createAssignments" id="createAssignments">Create +</button>
                </div>
                <table id="table">
                    <thead>
                        <tr class="premier-row">
                          <th>Date</th>
                          <th>Title</th>
                          <th>View</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="liveClass">
                <div class="ass">
                    <p>Live Class</p>
                    <button class="createAssignments" id="createSession">Create Session</button>
                </div>
                <table id="table">
                    <thead>
                        <tr class="premier-row">
                          <th>Date</th>
                          <th>Title</th>
                          <th>Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                          </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>


            <div class="students-education">
                <p>Students</p>
                <select name="nameofstudents" id="std" size="3" >
                    <option value="std1">std1</option>
                    <option value="std2">std2</option>
                    <option value="std3">std3</option>
                    <option value="std4">std4</option>
                  </select>
            </div>

        </div>
    </div>
    )
}