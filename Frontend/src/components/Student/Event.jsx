import React from 'react'
import { useOutletContext } from 'react-router-dom';
import '../../static/styles/Student/Event.css'

function School_Event() {
    const { id, students } = useOutletContext(); // Get the student ID and student api from outlet context

    return (
        <div style={{ margin: "0 .5vw" }}>

            {/* -------------------------Section for the Upcoming Events------------------------- */}
            <section className="upcoming-events">
                <h2 style={{ color: "#bb1616", fontSize: "1.5rem" }}>
                    <b> <i className="bi bi-alarm mx-2"></i> Upcoming Events </b>
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        { students.upcoming_events.map((upcoming_event) => (
                                <tr key={upcoming_event.id}>
                                    <td>{upcoming_event.title}</td>
                                    <td>{new Date(upcoming_event.event_date).toLocaleDateString()}</td>
                                    <td>{new Date(upcoming_event.event_date).toLocaleTimeString()}</td>
                                </tr>
                            )) }
                    </tbody>
                </table>
            </section>

                {/* -------------------------Section for the Recent Events------------------------- */}
            <section className="upcoming-events">
                <h2 style={{ color: "#bb1616", fontSize: "1.5rem" }}>
                    <b> <i className="bi bi-clock-history mx-2"></i> Past Events </b>
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Event</th>
                            <th>Date</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.recent_events.map((recent_event) => (
                                <tr key={recent_event.id}>
                                    <td>{recent_event.title}</td>
                                    <td>{new Date(recent_event.event_date).toLocaleDateString()}</td>
                                    <td>{new Date(recent_event.event_date).toLocaleTimeString()}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

export default School_Event