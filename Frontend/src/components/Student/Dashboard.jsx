


import React from 'react';
import { Link } from 'react-router-dom';

import Event from './Event';
import Chart from './Chart';
import '../../static/styles/Student/Dashboard.css';
import Student_Profile from './Profile';
import { useOutletContext } from 'react-router-dom';


function Student_Dashboard() {
    
    const { id } = useOutletContext();

    return (
        <div>
            {/* Profile Section */}
            <section>
                <Student_Profile />
            </section>
            
            
            {/* container that contains Available  courses, attendence, results and Achivements */}
            <section className="report-container">
                
                    <Link to={`/students/${id}/student-attendance-report`}>
                        <div className="report-container-box" style={{backgroundColor: '#ff000070'}}>
                            <i className="bi bi-person-check"></i>
                            <p>Attendence</p>
                        </div>
                    </Link>
                
                <Link to={`/students/${id}/student-result`}>
                    <div className="report-container-box" style={{backgroundColor: '#0080008f'}}>
                        <i className="bi bi-clipboard2-check"></i>
                        <p>Results</p>
                    </div>
                </Link>

                <Link to="/students/student-profile">
                    <div className="report-container-box" style={{backgroundColor: '#0000ff8c'}}>
                        <i className="bi bi-mortarboard"></i>
                        <p>Achievements</p>
                    </div>
                </Link>
                
                <Link to={`/students/${id}/student-courses`}>
                    <div className="report-container-box" style={{backgroundColor: '#8000809c'}}>
                        <p><i className="bi bi-book"></i></p>
                        <p>Courses</p>
                    </div>
                </Link>
            </section>

            <section className='chart-event-container'>
                <Chart />
                <Event />
            </section>
            
        </div>
    );
}

export default Student_Dashboard;
