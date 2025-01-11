import React from "react";
import { useOutletContext } from "react-router-dom";
import "../../static/styles/Student/Course.css"; // Import the corresponding CSS file

function Student_Course() {

  // url of website
  const API_BASE_URL = "http://127.0.0.1:8000";

    // Student id
  const { id, students } = useOutletContext(); // Get the student ID and student api from outlet context


  return (
    <div className="course-container">
      <h2>Courses Offered</h2>
      <h5> <small> { students.school_name } </small> </h5>    

    {students.courses?.length === 0 ? (
        <p>No courses available for this student.</p>
      ) : (
        <div className="courses-list">
          {students.courses.map((course) => (
            <div key={course.id} className="course-card">
              <h3><b>{course.name} </b> [{course.code}]</h3>
              <p>{course.description}</p>
              <p>
                  <small>
                      <i style={{color: '#3f4564'}}> <strong>Credit Hour : </strong> {course.credits || "N/A"} </i>
                  </small>
              </p>
              {/* {course.course_pdf && ( */}
                <a href={`${API_BASE_URL}${course.pdf}`} target="_blank" rel="noopener noreferrer">
                  <button className="btn-view-pdf">View Course</button>
                </a>
              {/* )} */}
            </div>
          ))}
        </div>
      )} 
    </div>
  );
}

export default Student_Course;
