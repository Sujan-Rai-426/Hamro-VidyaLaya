import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Student_Sidebar from '../components/Student/Sidebar'
import api from '../api/'

function Student() {

    const id = 1; // Example student ID
    const [students, setStudents] = useState(null); // Use null for a single student

    useEffect(() => {
        if (id) {
            // Fetch the student data
            api.get(`/api/students/${id}/`)
                .then((response) => {
                    console.log("Student Data:", response.data);
                    setStudents(response.data); // Set the single student object
                })
                .catch((error) => {
                    console.error("Error fetching student data:", error);
                });
        }
    }, [id]);

    if (!students) {
        return <div>Loading...</div>; // Show a loading indicator while fetching data
    }

    return (
        <div>
            
            <div style={{ display: "flex", minHeight: "100vh", }}>
                <Student_Sidebar id={ id } />
                    {/* Student Page Main content: Dynamically updates */}
                <div style={{ flex: 1, padding: "2vh 2vw" }}>
                    <Outlet context={{ id }}/>
                </div>
            </div>
            
        </div>
    )
}

export default Student