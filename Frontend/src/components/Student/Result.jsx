import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import api from '../../api';
import '../../static/styles/Student/Result.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
function Student_Result() {
    const { id } = useOutletContext(); // Get the student ID from outlet context
    const [students, setStudents] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get(`api/students/${id}`)
            .then((response) => {
                console.log(response.data);
                setStudents(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching student data:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }




    return (
        <div className="result-container">


            {/* Student Info and Performance Chart */}
            <div className="student-header">
                <div className="student-info">
                    <img
                        src={students.profile || "placeholder-profile.jpg"}
                        alt="Student"
                        className="student-photo"
                    />
                    <div className="details">
                        <h3>{students.name}</h3>
                        <p>Roll Number: {students.symbol_number}</p>
                        <p>{students.school_name}</p>
                        <p>{students.address}</p>
                    </div>
                </div>
                <div className="performance-chart">
                    <h2>Overall Performance</h2>
                    <div className="chart">
                            {/* Calculate total obtained and total marks */}
                        <span>
                            {(() => {
                                const totalObtained = students.results?.reduce(
                                    (sum, result) => sum + result.score, 0
                                );
                                const totalMax = students.results?.reduce(
                                    (sum, result) => sum + result.max_score, 0
                                );
                                // Calculate percentage
                                return totalMax > 0
                                    ? ((totalObtained / totalMax) * 100).toFixed(2)
                                    : 0;
                            })()} %
                        </span>
                    </div>
                </div>

                {/* Bar Chart Section */}
                <div className="chart-container">
    <h4>  <i className="bi bi-graph-up"></i> Subject-wise Performance</h4>
    {students.results && students.results.length > 0 ? (
        <Bar
            data={{
                labels: students.results.map((result) => result.course_name),
                datasets: [
                    {
                        label: "Obtained Marks",
                        data: students.results.map((result) => result.score),
                        backgroundColor: "rgba(54, 162, 235, 0.6)",
                        borderColor: "rgba(54, 162, 235, 1)",
                        borderWidth: 1,
                    },
                    {
                        label: "Remaining Marks",
                        data: students.results.map(
                            (result) => result.max_score - result.score
                        ),
                        backgroundColor: "rgba(255, 99, 132, 0.6)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    },
                ],
            }}
            options={{
                responsive: true,
                maintainAspectRatio: true, // Adjust dimensions for responsiveness
                plugins: {
                    legend: {
                        position: "top",
                    },
                },
                scales: {
                    x: {
                        stacked: true, // Enable stacking for X-axis
                        title: {
                            display: true,
                            text: "Subjects",
                            color: "#ffffff",
                        },
                        ticks: {
                            color: "#ffffff",
                            maxRotation: 45,
                            minRotation: 0,
                        },
                    },
                    y: {
                        stacked: true, // Enable stacking for Y-axis
                        title: {
                            display: true,
                            text: "Marks",
                            color: "#ffffff",
                        },
                        ticks: {
                            color: "#ffffff",
                            beginAtZero: true,
                        },
                    },
                },
            }}
            height={200} // Reduced height for compactness
            width={300} // Reduced width for better mobile fit
        />
    ) : (
        <p>No performance data available</p>
    )}
</div>

            </div>



            {/* Subject-wise Results */}
            <div className="result-table">
                <h2> Subjects Result </h2>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks Obtained</th>
                            <th>Total Marks</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(students?.results) && students.results.length > 0 ? (
                            students.results.map((result) => (
                                <tr key={result.id}>
                                    <td>{result.course_name}</td>
                                    <td>{result.score}</td>
                                    <td>{result.max_score}</td>
                                    <td>
                                        {((result.score / result.max_score) * 100).toFixed(2)}%
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No results found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Student_Result;
