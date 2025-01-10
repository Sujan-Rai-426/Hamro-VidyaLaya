import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import './App.css'

// import for "pages" folder 
import Navbar_Home from './pages/Navbar_Home'
import Footer_Home from './pages/Footer_Home'
import Home from './pages/Home'
import Teacher from './pages/Teacher'

// import for "components/Student" folder
import School from './pages/School'
import Student from './pages/Student'
import Student_Dashboard from './components/Student/Dashboard'
import Student_Profile from './components/Student/Profile'
import Student_Attendance from './components/Student/Attendance'
import Student_Result from './components/Student/Result'
import Student_Course from './components/Student/Course'

function App() {


    // Toggle button function for background mode
  const [mode, setMode] = useState( { backgroundColor: '#070d3d', color: 'white' } )
  const toggleMode = () => {
      if (mode.backgroundColor === '#070d3d'){
          setMode( { backgroundColor: '#92919a', color: 'black'  } )
      }
      else{
          setMode( { backgroundColor: '#070d3d', color: 'white' } )
      }
  }


  return (

    <div style={mode} >
            <Router>
            
                <Navbar_Home mode={mode}  toggleMode={toggleMode} />

                <div className="container" style={{minHeight: '87.5vh', padding: '10vh 0 0 0'}}>
                    
                      <Routes>
                      
                            {/* Home Route */}
                          <Route exact path='/' element={ <Home /> } />

                            {/* School Route */}
                          <Route exact path='/schools/*' element={ <School /> } />


                            {/* Teacher Route */}
                          <Route exact path='/teachers/*' element={ <Teacher /> } />


                            {/* Student Route */}
                          <Route exact path='/students/:id/*' element={ <Student /> } >
                              <Route index element={<Navigate to="student-dashboard/"  />} />  {/* <---- Default route for /student */}
                              <Route path="student-profile/" element={<Student_Profile />} />
                              <Route path="student-dashboard/" element={<Student_Dashboard />} />
                              <Route path="student-attendance-report/" element={<Student_Attendance />} />
                              <Route path="student-courses/" element={<Student_Course />} />
                              <Route path="student-result/" element={<Student_Result />} />
                              <Route path="*" element={<Navigate to="students/dashboard/"  />} /> {/* <--- Fallback route for undefined path */}
                          </ Route>
                      
                      </Routes>

                </div>

                <Footer_Home />
            
            </Router>
    </div>

  )
}

export default App
