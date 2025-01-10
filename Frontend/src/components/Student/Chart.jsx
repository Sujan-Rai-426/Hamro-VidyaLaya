import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { useOutletContext } from 'react-router-dom';
import api from '../../api';
import '../../static/styles/Student/Chart.css';

function Student_Chart() {
    const { id } = useOutletContext(); // Get the student ID from outlet context
    const [students, setStudents] = useState({});
    const [loading, setLoading] = useState(true);
    const chartRef = useRef(null); // Store the chart instance
    const canvasRef = useRef(null); // Store the canvas element reference

    useEffect(() => {
        // Fetch student data
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

    useEffect(() => {
        if (!students.results) return; // Wait until data is fetched

        // Get the canvas context
        const ctx = canvasRef.current.getContext("2d");

        // Destroy the old chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Prepare dynamic data
        const labels = students.results.map((result) => result.course_name); // Subject names
        const data = students.results.map(
            (result) => (result.score / result.max_score) * 100
        ); // Percentage scores

        // Create a new chart instance
        chartRef.current = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels, // Dynamic labels from API
                datasets: [
                    {
                        label: "Marks (%)",
                        data, // Dynamic data from API
                        backgroundColor: [
                            "rgba(75, 192, 192, 0.6)",
                            "rgba(54, 162, 235, 0.6)",
                            "rgba(255, 206, 86, 0.6)",
                            "rgba(153, 102, 255, 0.6)",
                            "rgba(255, 99, 132, 0.6)",
                            // Add more colors as needed
                        ],
                        borderColor: [
                            "rgba(75, 192, 192, 1)",
                            "rgba(54, 162, 235, 1)",
                            "rgba(255, 206, 86, 1)",
                            "rgba(153, 102, 255, 1)",
                            "rgba(255, 99, 132, 1)",
                            // Add matching border colors
                        ],
                        borderWidth: 2,
                        hoverOffset: 10,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                        labels: {
                            color: "white",
                            font: {
                                size: 14,
                            },
                        },
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                const { label, raw } = tooltipItem;
                                return `${label}: ${raw.toFixed(2)}%`; // Show percentage in tooltips
                            },
                        },
                    },
                },
                animation: {
                    duration: 1000,
                    easing: "easeOutCubic",
                },
                cutout: "70%", // Inner cutout to make it a doughnut chart
            },
        });

        // Cleanup function to destroy the chart instance on component unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
                chartRef.current = null; // Reset the reference
            }
        };
    }, [students.results]); // Recreate chart when results change

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="circle-bar-graph-container">
            <h4>
                <i className="bi bi-graph-up"></i> Performance
            </h4>
            <canvas id="myCircleChart" ref={canvasRef}></canvas>
        </div>
    );
}

export default Student_Chart;
