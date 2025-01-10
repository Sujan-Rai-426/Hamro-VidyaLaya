
import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import api from '../../api';
import '../../static/styles/Student/Profile.css'
import laptop_img from '../../static/images/laptop.jpg'

function Student_Profile() {

    const { id } = useOutletContext();

        // <------------------------------- SCHOOL / Recent_Event JS fetch API and use------------------------------->
    const [student, setStudent] = useState([]);
    useEffect(() => {
        // Fetch Recent Events data from API
        api.get(`/api/students/${id}`)
        .then((response) => {
            console.log(response.data)
            setStudent(response.data); // Update state with API response
        })
        .catch((error) => console.error("Error fetching RecentEvents", error));
    }, []);

    return (

        <div className='Student-Profile-Container'>
            <div className="Student-Profile-Image-Detail-Container">
                <div className="Student-Profile-Image">
                    {/*<------------------------------------ Replace with dynamic cloud image-----------------------------> */}
                    <img src={student.profile || "placeholder-profile.jpg"} alt="Student" className="student-photo" />
                </div>
                <div className="Student-Profile-Detail">
                    
                </div>
            </div>
            <div className="Student-Profile-Info Student-Profile-Detail">
                <h1><b>{student.name}</b></h1>
                <p>{student.school_name}</p>
                <p> <b>STUDENT ID : </b> {student.symbol_number} </p>
            </div>
        </div>
    )
}

export default Student_Profile