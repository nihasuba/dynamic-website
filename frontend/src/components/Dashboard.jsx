import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import ImageUploader from "./ImageUploader";

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, updateHeader, updateNavbar, updateFooter, saveToBackend, loading, backendEnabled } = useSite();

  const [title, setTitle] = useState(state.header.title);
  const [navbar, setNavbar] = useState(state.navbar.map(n => ({ ...n })));
  const [email, setEmail] = useState(state.footer.email);
  const [phone, setPhone] = useState(state.footer.phone);
  const [address, setAddress] = useState(state.footer.address);
  const [saving, setSaving] = useState(false);

  const handleNavChange = (idx, field, value) => {
    setNavbar((prev) => prev.map((n, i) => (i === idx ? { ...n, [field]: value } : n)));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    
    if (!title.trim()) {
      alert("Please enter a header title");
      return;
    }
    
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    
    for (let i = 0; i < navbar.length; i++) {
      if (navbar[i].url && !navbar[i].url.startsWith('http://') && !navbar[i].url.startsWith('https://') && !navbar[i].url.startsWith('/')) {
        alert(`Link ${i + 1} URL should start with http://, https://, or /`);
        return;
      }
    }
    
    setSaving(true);
    
    
    updateHeader({ title });
    updateNavbar(navbar);
    updateFooter({ email, phone, address });
    
   
    const result = await saveToBackend();
    
    setSaving(false);
    
    if (result.success) {
      alert("✅ Changes saved successfully! Redirecting to your website...");
      
      setTimeout(() => {
        navigate('/website');
      }, 1000);
    } else if (backendEnabled) {
      alert("⚠️ Saved locally, but backend sync failed: " + result.message + "\nRedirecting to website...");
      setTimeout(() => {
        navigate('/website');
      }, 1500);
    } else {
      alert("✅ Changes saved locally! Redirecting to your website...");
      setTimeout(() => {
        navigate('/website');
      }, 1000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-4">
        <button
          onClick={() => navigate('/website')}
          className="text-blue-600 hover:underline flex items-center gap-1"
          type="button"
        >
          ← Back to Website
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Dashboard Editor</h2>
          {!backendEnabled && (
            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              Offline Mode (localStorage only)
            </span>
          )}
        </div>
        
        <form onSubmit={handleSave} className="space-y-6">
        <section className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Header Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Title
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter header title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Header Image
                </label>
                <ImageUploader onUpload={(url) => updateHeader({ imageUrl: url })} />
                {state.header.imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-600">Current image:</p>
                    <img 
                      src={state.header.imageUrl} 
                      alt="Current header" 
                      className="mt-2 w-32 h-32 rounded-lg object-cover border"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>

         
          <section className="border-b pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Navbar Links (3 links)</h3>
            <div className="space-y-3">
              {navbar.map((link, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Link {i + 1} Label
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={link.label}
                      onChange={(e) => handleNavChange(i, "label", e.target.value)}
                      placeholder={`Label ${i + 1}`}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Link {i + 1} URL
                    </label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={link.url}
                      onChange={(e) => handleNavChange(i, "url", e.target.value)}
                      placeholder={`https://example.com`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          
          <section className="pb-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Footer Contact Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Main St, City, Country"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving || loading}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {saving || loading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save All Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
