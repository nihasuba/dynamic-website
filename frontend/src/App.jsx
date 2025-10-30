import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { SiteProvider, useSite } from "./context/SiteContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import "./index.css";


const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md">
          <div className="mb-6">
            <svg
              className="w-20 h-20 mx-auto text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Dashboard Manager
          </h1>
          <p className="text-gray-600 mb-8">
            Create and manage your website content dynamically
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition transform hover:scale-105 shadow-lg font-semibold text-lg"
          >
            Go to Dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
};


const WebsitePage = () => {
  const { state } = useSite();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        title={state.header.title} 
        imageUrl={state.header.imageUrl}
        links={state.navbar}
      />
      <main className="flex-1 container mx-auto p-8 justify-center align-center">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Welcome to Your Website
          </h2>
          <p className="text-gray-600 mb-6 text-lg">
            This is your live website preview. All the content you edited in the dashboard is displayed here.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
            <p className="text-blue-800">
              <strong>✨ Dynamic Content:</strong> Header, Navbar, and Footer are all editable from the dashboard.
            </p>
          </div>
          <Link 
            to="/dashboard" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Edit Dashboard
          </Link>
        </div>
      </main>
      <Footer 
        email={state.footer.email} 
        phone={state.footer.phone} 
        address={state.footer.address} 
      />
    </div>
  );
};


const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <Dashboard />
      </div>
    </div>
  );
};

function App() {
  return (
    <SiteProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/website" element={<WebsitePage />} />
        </Routes>
      </BrowserRouter>
    </SiteProvider>
  );
}

export default App;
