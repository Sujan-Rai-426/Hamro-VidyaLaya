import React from "react";
import { useOutletContext } from "react-router-dom";
import '../../static/styles/Student/Attendance.css';

function Student_Attendance() {
    const { id, students } = useOutletContext();// Get the student ID and student api from outlet context

    // Render the calendar view based on the attendance data
    const renderCalendar = () => {
        const calendarDays = [];
        const daysInMonth = 30;  // Assuming 30 days in the current month (you can dynamically adjust this)

        for (let i = 1; i <= daysInMonth; i++) {
            let status = "Holiday"; // Default status if no attendance record for that day

            if (i <= students.attendance_summary.total_classes) {
                // Adjust this logic based on your attendance report structure
                // Example: If the student is present, mark the day as "present", otherwise "absent"
                status = i <= students.attendance_summary.total_present ? "Present" : "Absent";
            }

            const dayClass = status === "Present" ? "attendance-day present" : (status === "Absent" ? "attendance-day absent" : "attendance-day holiday");

            calendarDays.push(
                <div key={i} className={dayClass}>
                    {i} {/* Show the day number */}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className="attendance-container">
            <h1 className="attendance-header">Attendance for {students.name}</h1>

            <div className="calendar-container">
                {renderCalendar()}
            </div>

            <div className="attendance-summary">
                <p><strong>Total Classes:</strong> {students.attendance_summary.total_classes}</p>
                <p><strong>Total Present:</strong> {students.attendance_summary.total_present}</p>
                <p><strong>Attendance Percentage:</strong> {students.attendance_summary.attendance_percentage}%</p>
            </div>
        </div>
    );
}

export default Student_Attendance;

