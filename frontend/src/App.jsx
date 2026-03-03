import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUpload from './components/FileUpload'; // <-- ADD THIS IMPORT

function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 shadow-xl z-10">
        <h1 className="text-2xl font-bold mb-8 text-blue-400 tracking-wide">Sync-Ed</h1>
        <nav className="space-y-2">
          <Link to="/" className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-slate-800 text-sm font-medium">
            Dashboard Home
          </Link>
          <Link to="/analyze" className="block py-3 px-4 rounded-lg transition duration-200 bg-blue-600 hover:bg-blue-700 text-sm font-medium">
            New Analysis
          </Link>
          <Link to="/reports" className="block py-3 px-4 rounded-lg transition duration-200 hover:bg-slate-800 text-sm font-medium">
            Gap Reports
          </Link>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-10 overflow-y-auto">
        <header className="mb-10 border-b border-gray-200 pb-5">
          <h2 className="text-3xl font-bold text-gray-800">Curriculum Analyzer</h2>
          <p className="text-gray-500 mt-2 text-sm">Upload a syllabus to evaluate its relevance against current industry standards.</p>
        </header>

        {/* The New Functional Uploader */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="text-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Upload Academic Syllabus</h3>
          </div>
          
          <FileUpload /> {/* <-- OUR NEW COMPONENT */}
          
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;