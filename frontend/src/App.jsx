import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import ReviewsPage from './pages/Reviews';
import Stories from './pages/Stories';
import Donate from './pages/Donate';
import AdminDashboard from './pages/AdminDashboard';
import StoriesDetails from './pages/StoriesDetails';
import Transparency from './pages/Transparency';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/stories" element={<Stories />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/stories/:id" element={<StoriesDetails />} />
              <Route path="/transparency" element={<Transparency />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
