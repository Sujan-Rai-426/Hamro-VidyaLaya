
import React from 'react'
import { useOutletContext } from 'react-router-dom';
import '../../static/styles/Student/Profile.css'

function Student_Profile() {

    const { id, students } = useOutletContext(); // Get the student ID and student api from outlet context

    return (

        <div className='Student-Profile-Container'>
            <div className="Student-Profile-Image-Detail-Container">
                <div className="Student-Profile-Image">
                    {/*<------------------------------------ Replace with dynamic cloud image-----------------------------> */}
                    <img src={students.profile || "placeholder-profile.jpg"} alt="Student" className="student-photo" />
                </div>
                <div className="Student-Profile-Detail">
                    
                </div>
            </div>
            <div className="Student-Profile-Info Student-Profile-Detail">
                <h1><b>{students.name}</b></h1>
                <p>{students.school_name}</p>
                <p> <b>STUDENT ID : </b> {students.symbol_number} </p>
            </div>
        </div>
    )
}

export default Student_Profile