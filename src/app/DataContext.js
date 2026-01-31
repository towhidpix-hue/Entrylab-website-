"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // --- 1. APPEARANCE ---
  const [navLogo, setNavLogo] = useState('/logo.png');
  const [navSizes, setNavSizes] = useState({ mobile: 50, tablet: 70, pc: 90 }); 
  const [heroLogo, setHeroLogo] = useState('/logo.png');
  const [heroSizes, setHeroSizes] = useState({ mobile: 140, tablet: 250, pc: 450 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- 2. USER SYSTEM ---
  const initialUsers = [
    { id: 1, email: "admin@entrylab.com", password: "password123", role: "admin", isPrimary: true, name: "Super Admin", image: null },
    { id: 2, email: "user@test.com", password: "user123", role: "user", isPrimary: false, name: "Demo User", image: null }
  ];
  const [users, setUsers] = useState(initialUsers);
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, pass) => {
    const foundUser = users.find(u => u.email === email && u.password === pass);
    if (foundUser) { setCurrentUser(foundUser); return true; }
    return false;
  };
  const signup = (name, email, pass) => {
    if (users.find(u => u.email === email)) return false;
    const newUser = { id: Date.now(), email, password: pass, name, role: 'user', isPrimary: false, image: null };
    setUsers([...users, newUser]); setCurrentUser(newUser); return true;
  };
  const logout = () => setCurrentUser(null);
  
  const updateProfile = (id, data) => {
    setUsers(users.map(u => u.id === id ? { ...u, ...data } : u));
    if (currentUser.id === id) setCurrentUser({ ...currentUser, ...data });
  };
  const promoteUser = (id) => setUsers(users.map(u => u.id === id ? { ...u, role: 'admin' } : u));
  const demoteUser = (id) => setUsers(users.map(u => u.id === id ? { ...u, role: 'user' } : u));
  const deleteUser = (id) => setUsers(users.filter(u => u.id !== id));

  // --- 3. ABOUT & GALLERY ---
  const [aboutData, setAboutData] = useState({ 
    title: "We Build The Future", 
    desc: "At EntryLab, we believe in the power of data to transform businesses. Our team is a diverse group of thinkers, builders, and innovators.",
    heroImage: null, 
    gallery: [] 
  });
  
  const addAboutGalleryImage = (img) => setAboutData(prev => ({ ...prev, gallery: [...prev.gallery, { id: Date.now(), src: img }] }));
  const removeAboutGalleryImage = (id) => setAboutData(prev => ({ ...prev, gallery: prev.gallery.filter(img => img.id !== id) }));

  const [contactInfo, setContactInfo] = useState({ address: "Tech City, NY", phone: "+1 555 0000", email: "info@entrylab.com" });
  const [experienceStats, setExperienceStats] = useState([{ label: "Years", value: "12+" }, { label: "Projects", value: "850+" }]);
  
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
    const saved = localStorage.getItem("entrylab_v15_glow");
    if (saved) {
      const p = JSON.parse(saved);
      setNavLogo(p.navLogo||navLogo); setNavSizes(p.navSizes||navSizes);
      setHeroLogo(p.heroLogo||heroLogo); setHeroSizes(p.heroSizes||heroSizes);
      setUsers(p.users||users); setAboutData(p.aboutData||aboutData);
      setContactInfo(p.contactInfo||contactInfo); setExperienceStats(p.experienceStats||experienceStats);
      setPosts(p.posts||posts); setJobs(p.jobs||jobs); setInbox(p.inbox||inbox);
    }
  }, []);

  const saveData = () => {
    try {
      localStorage.setItem("entrylab_v15_glow", JSON.stringify({ navLogo, navSizes, heroLogo, heroSizes, users, aboutData, contactInfo, experienceStats, posts, jobs, inbox }));
      alert("✅ All Data Saved Successfully!");
    } catch (e) {
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        alert("❌ BROWSER STORAGE FULL! Even with compression, you have reached the browser's limit. Delete old items to save new ones.");
      } else {
        alert("❌ Error: " + e.message);
      }
    }
  };

  // --- SMART COMPRESSOR UPLOAD ---
  // This automatically shrinks images so you can save MORE of them without errors.
  const handleFileUpload = (file, callback) => {
    if (!file) return;
    
    // If it's not an image (like PDF/Video), just read it raw (Higher risk of full storage)
    if (!file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result);
        reader.readAsDataURL(file);
        return;
    }

    // If Image, COMPRESS IT
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1200; // Good HD size
            const scaleSize = MAX_WIDTH / img.width;
            canvas.width = MAX_WIDTH;
            canvas.height = img.height * scaleSize;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            // Compress to JPEG at 70% quality (Massive size reduction)
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7); 
            callback(dataUrl);
        };
    };
  };

  return (
    <DataContext.Provider value={{ 
      navLogo, setNavLogo, navSizes, setNavSizes, heroLogo, setHeroLogo, heroSizes, setHeroSizes,
      isMobileMenuOpen, setIsMobileMenuOpen,
      currentUser, login, signup, logout, users, updateProfile, promoteUser, demoteUser, deleteUser,
      aboutData, setAboutData, addAboutGalleryImage, removeAboutGalleryImage,
      contactInfo, setContactInfo, experienceStats, setExperienceStats,
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