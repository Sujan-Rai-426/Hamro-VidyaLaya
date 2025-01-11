


import React from 'react'
import Teacher_Sidebar from '../components/Teacher/Sidebar'
import { Outlet } from 'react-router-dom'

function Teacher() {

    return (

        <div>
            <div style={{ display: "flex", minHeight: "100vh", }}>
                <Teacher_Sidebar />
                    {/* Student Page Main content: Dynamically updates */}
                <div style={{ flex: 1, padding: "2vh 2vw" }}>
                    <Outlet />
                </div>
            </div>
        </div>

    )

}

export default Teacher