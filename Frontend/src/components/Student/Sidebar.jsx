
import React from 'react'
import '../../static/styles/Student/Sidebar.css'
import { Link } from 'react-router-dom'

function Student_Sidebar({id}) {



    return (

        <div>
            {/* Sidebar: Always visible */}
            <div className="student-sidebar">
                <h5 style={{marginBottom: '5vh', marginTop: '4vh'}}> <b> <i className="bi bi-grid-1x2 "></i>  </b></h5>
                <p> <Link to={`/students/${id}/student-profile`}> <i className="bi bi-person "></i>  </Link> </p>
                <p> <Link to={`/students/${id}/student-dashboard`}> <i className="bi bi-speedometer2 "></i>  </Link> </p>
                <p> <Link to={`/students/${id}/student-courses`}> <i className="bi bi-book "></i>  </Link> </p>
                <p> <Link to={`/students/${id}/student-grade`}> <i className="bi bi-diagram-3 "></i>  </Link> </p>
                {/* <p> <Link to={`/students/${id}/student-post`}> <i className="bi bi-calendar-month mx-1"></i> Posts </Link> </p> */}
                <p> <Link to={`/students/${id}/student-setting`}> <i className="bi bi-person-gear "></i>  </Link> </p>
            </div>
        </div>

    )
}

export default Student_Sidebar