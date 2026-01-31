"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // --- 1. APPEARANCE & STATE ---
  const [navLogo, setNavLogo] = useState('/logo.png');
  const [navSizes, setNavSizes] = useState({ mobile: 40, tablet: 50, pc: 60 }); 
  const [heroLogo, setHeroLogo] = useState('/logo.png');
  const [heroSizes, setHeroSizes] = useState({ mobile: 140, tablet: 250, pc: 450 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // NEW: Global State for Gallery Modal (Fixes "Stuck" navigation)
  const [showGallery, setShowGallery] = useState(false);

  // --- 2. USER SYSTEM ---
  const initialUsers = [
    { id: 1, email: "admin@entrylab.com", password: "password123", role: "admin", isPrimary: true, name: "Super Admin", image: null },
    { id: 2, email: "user@test.com", password: "user123", role: "user", isPrimary: false, name: "Demo User", image: null }
  ];
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, pass) => { const foundUser = users.find(u => u.email === email && u.password === pass); if (foundUser) { setCurrentUser(foundUser); return true; } return false; };
  const signup = (name, email, pass) => { if (users.find(u => u.email === email)) return false; const newUser = { id: Date.now(), email, password: pass, name, role: 'user', isPrimary: false, image: null }; setUsers([...users, newUser]); setCurrentUser(newUser); return true; };
  const logout = () => setCurrentUser(null);
  const updateProfile = (id, data) => { setUsers(users.map(u => u.id === id ? { ...u, ...data } : u)); if (currentUser.id === id) setCurrentUser({ ...currentUser, ...data }); };
  const promoteUser = (id) => setUsers(users.map(u => u.id === id ? { ...u, role: 'admin' } : u));
  const demoteUser = (id) => setUsers(users.map(u => u.id === id ? { ...u, role: 'user' } : u));
  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

  // --- 3. CONTENT ---
  const [aboutData, setAboutData] = useState({ 
    title: "We Build The Future", 
    desc: "At EntryLab, we believe in the power of data to transform businesses. Our team is a diverse group of thinkers, builders, and innovators.",
    heroImage: null, 
    gallery: [] 
  });
  const addAboutGalleryImage = (img) => setAboutData(prev => ({ ...prev, gallery: [...prev.gallery, { id: Date.now(), src: img }] }));
  const removeAboutGalleryImage = (id) => setAboutData(prev => ({ ...prev, gallery: prev.gallery.filter(img => img.id !== id) }));

  const [contactInfo, setContactInfo] = useState({ address: "Tech City, NY", phone: "+1 555 0000", email: "info@entrylab.com" });
  
  const [posts, setPosts] = useState([{ id: 1, title: "AI Analysis", category: "Research", desc: "Initial Study.", image: null, featured: true }]);
  const addPost = (post) => setPosts([...posts, { ...post, id: Date.now(), featured: false }]);
  const deletePost = (id) => setPosts(posts.filter(p => p.id !== id));
  const toggleFeatured = (id) => setPosts(posts.map(p => p.id === id ? { ...p, featured: !p.featured } : p));

  const [jobs, setJobs] = useState([{ id: 1, title: "Senior Data Analyst", description: "Expert needed.", type: "Full-Time", location: "Remote", date: "2026-02-01", status: 'open' }]);
  const addJob = (job) => setJobs([...jobs, { ...job, id: Date.now(), status: 'open' }]);
  const editJob = (id, updatedJob) => setJobs(jobs.map(j => j.id === id ? { ...j, ...updatedJob } : j));
  const toggleJobStatus = (id) => setJobs(jobs.map(j => j.id === id ? { ...j, status: j.status === 'open' ? 'closed' : 'open' } : j));
  const deleteJob = (id) => setJobs(jobs.filter(j => j.id !== id));

  const [inbox, setInbox] = useState([]);
  const sendMessage = (msg) => { setInbox([{ ...msg, id: Date.now(), date: new Date().toLocaleDateString() }, ...inbox]); };

  // --- PERSISTENCE ---
  useEffect(() => {
    const saved = localStorage.getItem("entrylab_v17_navfix");
    if (saved) {
      const p = JSON.parse(saved);
      setNavLogo(p.navLogo||navLogo); setNavSizes(p.navSizes||navSizes);
      setHeroLogo(p.heroLogo||heroLogo); setHeroSizes(p.heroSizes||heroSizes);
      setUsers(p.users||users); setAboutData(p.aboutData||aboutData);
      setContactInfo(p.contactInfo||contactInfo); setPosts(p.posts||posts); setJobs(p.jobs||jobs); setInbox(p.inbox||inbox);
    }
  }, []);

  const saveData = () => {
    try {
      localStorage.setItem("entrylab_v17_navfix", JSON.stringify({ navLogo, navSizes, heroLogo, heroSizes, users, aboutData, contactInfo, posts, jobs, inbox }));
      alert("✅ All Data Saved!");
    } catch (e) {
      alert("❌ BROWSER MEMORY FULL! Delete some images.");
    }
  };

  const handleFileUpload = (file, callback) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsDataURL(file);
        return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 800; 
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6); 
            callback(dataUrl);
        };
    };
  };

  return (
    <DataContext.Provider value={{ 
      navLogo, setNavLogo, navSizes, setNavSizes, heroLogo, setHeroLogo, heroSizes, setHeroSizes,
      isMobileMenuOpen, setIsMobileMenuOpen, showGallery, setShowGallery, // Global Gallery State
      currentUser, login, signup, logout, users, updateProfile, promoteUser, demoteUser, deleteUser,
      aboutData, setAboutData, addAboutGalleryImage, removeAboutGalleryImage,
      contactInfo, setContactInfo,
      posts, addPost, deletePost, toggleFeatured,
      jobs, addJob, editJob, toggleJobStatus, deleteJob,
      inbox, sendMessage,
      handleFileUpload, saveData
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);