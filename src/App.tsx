import { Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import StudentInfoPage from './pages/StudentInfoPage'
import AdminPage from './pages/AdminPage'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/student-info" element={<StudentInfoPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  )
}

export default App