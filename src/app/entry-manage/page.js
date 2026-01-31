"use client";
import { useState } from "react";
import { useData } from "../../app/DataContext";
import { Layout, FileText, Briefcase, Mail, Settings, LogOut, Save, Trash2, Download, Users, UserCog, Image as ImageIcon, Star, StarOff, Edit2, PlusCircle, Upload, X, Paperclip, checkCircle, CheckCircle } from "lucide-react";

export default function EntryManage() {
  const { 
    currentUser, login, signup, logout, saveData, handleFileUpload,
    navLogo, setNavLogo, navSizes, setNavSizes,
    heroLogo, setHeroLogo, heroSizes, setHeroSizes,
    aboutData, setAboutData, addGalleryEntry, deleteGalleryEntry, // New functions
    contactInfo, setContactInfo,
    posts, addPost, deletePost, toggleFeatured,
    jobs, addJob, editJob, toggleJobStatus, deleteJob,
    inbox,
    users, updateProfile, promoteUser, demoteUser, deleteUser
  } = useData();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [authEmail, setAuthEmail] = useState(""); const [authPass, setAuthPass] = useState(""); const [authName, setAuthName] = useState("");
  const [activeTab, setActiveTab] = useState("logos");

  // Gallery Staging States
  const [galleryTitle, setGalleryTitle] = useState("");
  const [galleryDesc, setGalleryDesc] = useState("");
  const [stagedImages, setStagedImages] = useState([]);

  const [postTitle, setPostTitle] = useState(""); const [postDesc, setPostDesc] = useState(""); const [postCat, setPostCat] = useState("Research"); const [postImage, setPostImage] = useState(null);
  const [editingJobId, setEditingJobId] = useState(null); const [jobTitle, setJobTitle] = useState(""); const [jobDesc, setJobDesc] = useState(""); const [jobLoc, setJobLoc] = useState(""); const [jobType, setJobType] = useState("Full-Time");
  const [newName, setNewName] = useState(currentUser?.name || ""); const [newEmail, setNewEmail] = useState(currentUser?.email || ""); const [newPass, setNewPass] = useState(currentUser?.password || "");

  const startEditJob = (job) => { setEditingJobId(job.id); setJobTitle(job.title); setJobDesc(job.description); setJobLoc(job.location); setJobType(job.type); };
  const handleJobSubmit = () => { const jobData = { title: jobTitle, description: jobDesc, location: jobLoc, type: jobType, date: new Date().toISOString().split('T')[0] }; if (editingJobId) { editJob(editingJobId, jobData); setEditingJobId(null); } else { addJob(jobData); } setJobTitle(""); setJobDesc(""); setJobLoc(""); };
  const handlePostSubmit = () => { addPost({title:postTitle, desc:postDesc, category:postCat, image:postImage}); setPostTitle(""); setPostDesc(""); setPostImage(null); };

  // Gallery Handlers
  const handleStageImage = (img) => setStagedImages([...stagedImages, { id: Date.now(), src: img }]);
  const handleUnstageImage = (id) => setStagedImages(stagedImages.filter(img => img.id !== id));
  const handleAddGalleryEntry = () => {
    if (!galleryTitle || stagedImages.length === 0) { alert("Please add a title and at least one image."); return; }
    addGalleryEntry({ title: galleryTitle, description: galleryDesc, images: stagedImages });
    setGalleryTitle(""); setGalleryDesc(""); setStagedImages([]); // Reset form
  };


  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white p-4">
        <form onSubmit={(e) => { e.preventDefault(); if(isLoginMode) { if(!login(authEmail, authPass)) alert("Invalid Credentials"); } else { if(!signup(authName, authEmail, authPass)) alert("Email already exists"); } }} className="bg-[#0f172a]/50 p-8 md:p-12 rounded-3xl border border-white/10 w-full max-w-md space-y-6 shadow-2xl">
          <h1 className="text-3xl font-bold text-center">EntryLab <span className="text-[#0ea5e9]">Portal</span></h1>
          {!isLoginMode && <input required type="text" onChange={(e) => setAuthName(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#0ea5e9]" placeholder="Full Name"/>}
          <input required type="email" onChange={(e) => setAuthEmail(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#0ea5e9]" placeholder="Email Address"/>
          <input required type="password" onChange={(e) => setAuthPass(e.target.value)} className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-[#0ea5e9]" placeholder="Password"/>
          <button className="w-full bg-[#0ea5e9] text-black font-bold py-4 rounded-xl hover:scale-[1.02] transition-transform">{isLoginMode ? "Login" : "Create Account"}</button>
          <p className="text-center text-gray-400 text-sm cursor-pointer hover:text-white" onClick={() => setIsLoginMode(!isLoginMode)}>{isLoginMode ? "No account? Create one" : "Already have an account? Login"}</p>
        </form>
      </div>
    );
  }

  const isAdmin = currentUser.role === 'admin';

  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-sans h-screen overflow-hidden">
      <aside className="w-64 bg-[#0f172a] border-r border-white/10 flex flex-col h-full z-20 flex-shrink-0">
        <div className="p-6 border-b border-white/5"><div className="flex items-center gap-3">{currentUser.image ? <img src={currentUser.image} className="w-12 h-12 rounded-full object-cover border-2 border-[#0ea5e9]"/> : <div className="w-12 h-12 rounded-full bg-[#0ea5e9]/20 flex items-center justify-center text-[#0ea5e9]"><UserCog size={24}/></div>}<div><h2 className="font-bold truncate w-32">{currentUser.name}</h2><p className="text-xs text-gray-400 capitalize">{currentUser.role}</p></div></div></div>
        <nav className="flex-grow overflow-y-auto p-4 space-y-2">
          {isAdmin && <button onClick={() => setActiveTab("logos")} className={`w-full flex gap-3 px-4 py-3 rounded-xl transition-all ${activeTab==="logos"?"bg-[#0ea5e9] text-black font-bold":"text-gray-400 hover:bg-white/5"}`}><Layout size={18}/> Logos</button>}
          {isAdmin && <button onClick={() => setActiveTab("content")} className={`w-full flex gap-3 px-4 py-3 rounded-xl transition-all ${activeTab==="content"?"bg-[#0ea5e9] text-black font-bold":"text-gray-400 hover:bg-white/5"}`}><FileText size={18}/> Research Posts</button>}
          {isAdmin && <button onClick={() => setActiveTab("jobs")} className={`w-full flex gap-3 px-4 py-3 rounded-xl transition-all ${activeTab==="jobs"?"bg-[#0ea5e9] text-black font-bold":"text-gray-400 hover:bg-white/5"}`}><Briefcase size={18}/> Careers</button>}
          {isAdmin && <button onClick={() => setActiveTab("footer")} className={`w-full flex gap-3 px-4 py-3 rounded-xl transition-all ${activeTab==="footer"?"bg-[#0ea5e9] text-black font-bold":"text-gray-400 hover:bg-white/5"}`}><Settings size={18}/> Footer & About</button>}
          {isAdmin && <button onClick={() => setActiveTab("inbox")} className={`w-full flex gap-3 px-4 py-3 rounded-xl transition-all ${activeTab==="inbox"?"bg-[#0ea5e9] text-black font-bold":"text-gray-400 hover:bg-white/5"}`}><Mail size={18}/> Inbox <span className="ml-auto bg-red-500 text-white text-xs px-2 rounded-full">{inbox.length}</span></button>}
          {isAdmin && <button onClick={() => setActiveTab("admin_settings")} className={`w-full flex gap-3 px-4 py-3 rounded-xl transition-all ${activeTab==="admin_settings"?"bg-[#0ea5e9] text-black font-bold":"text-gray-400 hover:bg-white/5"}`}><Users size={18}/> Users & Profile</button>}
          {!isAdmin && <div className="p-4 bg-blue-500/10 rounded-xl text-sm text-blue-200">Welcome User! Go to Home Page to apply.</div>}
        </nav>
        <div className="p-4 border-t border-white/10 bg-[#0f172a] sticky bottom-0 z-30">
          {isAdmin && <button onClick={saveData} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 mb-3 shadow-lg transition-all"><Save size={18}/> Save All</button>}
          <button onClick={logout} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 py-3 rounded-xl flex justify-center items-center gap-2 transition-all"><LogOut size={18}/> Logout</button>
        </div>
      </aside>

      <main className="flex-grow ml-0 p-10 max-w-6xl mx-auto space-y-8 overflow-y-auto h-full">
        {!isAdmin && <div className="text-center pt-20"><h2 className="text-2xl">User Dashboard</h2><a href="/" className="text-[#0ea5e9] underline mt-4 block">Go to Home Page</a></div>}
        {isAdmin && activeTab === "logos" && (<div className="space-y-6"><h1 className="text-3xl font-bold">Logo Settings</h1><div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10"><h3 className="text-[#0ea5e9] font-bold mb-4">Navbar Logo (% of Navbar Height)</h3><div className="relative group flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-[#0ea5e9] cursor-pointer"><input type="file" onChange={(e) => handleFileUpload(e.target.files[0], setNavLogo)} className="absolute inset-0 opacity-0 cursor-pointer"/><div className="text-center text-gray-400 flex flex-col items-center"><Upload size={20}/><span>Upload Navbar Logo</span></div></div><div className="grid grid-cols-3 gap-4 mt-4"><label className="text-xs text-gray-400">Mobile {navSizes.mobile}%<input type="range" min="10" max="100" value={navSizes.mobile} onChange={(e)=>setNavSizes({...navSizes, mobile:e.target.value})} className="w-full accent-[#0ea5e9]"/></label><label className="text-xs text-gray-400">Tablet {navSizes.tablet}%<input type="range" min="10" max="100" value={navSizes.tablet} onChange={(e)=>setNavSizes({...navSizes, tablet:e.target.value})} className="w-full accent-[#0ea5e9]"/></label><label className="text-xs text-gray-400">PC {navSizes.pc}%<input type="range" min="10" max="100" value={navSizes.pc} onChange={(e)=>setNavSizes({...navSizes, pc:e.target.value})} className="w-full accent-[#0ea5e9]"/></label></div></div><div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10"><h3 className="text-[#0ea5e9] font-bold mb-4">Hero Logo (Pixels)</h3><div className="relative group flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-[#0ea5e9] cursor-pointer"><input type="file" onChange={(e) => handleFileUpload(e.target.files[0], setHeroLogo)} className="absolute inset-0 opacity-0 cursor-pointer"/><div className="text-center text-gray-400 flex flex-col items-center"><Upload size={20}/><span>Upload Hero Logo</span></div></div><div className="grid grid-cols-3 gap-4 mt-4"><label className="text-xs text-gray-400">Mobile {heroSizes.mobile}px<input type="range" min="50" max="300" value={heroSizes.mobile} onChange={(e)=>setHeroSizes({...heroSizes, mobile:e.target.value})} className="w-full accent-[#0ea5e9]"/></label><label className="text-xs text-gray-400">Tablet {heroSizes.tablet}px<input type="range" min="100" max="500" value={heroSizes.tablet} onChange={(e)=>setHeroSizes({...heroSizes, tablet:e.target.value})} className="w-full accent-[#0ea5e9]"/></label><label className="text-xs text-gray-400">PC {heroSizes.pc}px<input type="range" min="150" max="800" value={heroSizes.pc} onChange={(e)=>setHeroSizes({...heroSizes, pc:e.target.value})} className="w-full accent-[#0ea5e9]"/></label></div></div></div>)}
        {isAdmin && activeTab === "content" && (<div className="space-y-6"><h1 className="text-3xl font-bold">Manage Research</h1><div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10 space-y-4"><h3 className="text-[#0ea5e9] font-bold">Add Research Post</h3><div className="grid grid-cols-1 gap-4"><input value={postTitle} onChange={e=>setPostTitle(e.target.value)} placeholder="Title" className="bg-black/30 border border-white/10 p-3 rounded-lg text-white"/></div><textarea value={postDesc} onChange={e=>setPostDesc(e.target.value)} placeholder="Description" className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white"/><div className="bg-black/20 p-4 rounded-lg border border-white/5"><h4 className="text-sm font-bold mb-2 flex items-center gap-2"><Paperclip size={16}/> Attach File (Any Type)</h4><div className="relative group flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-6 hover:border-[#0ea5e9] transition-colors cursor-pointer"><input type="file" onChange={e=>handleFileUpload(e.target.files[0], setPostImage)} className="absolute inset-0 opacity-0 cursor-pointer"/><div className="text-center text-gray-400 flex flex-col items-center gap-2"><Upload size={24}/><span>{postImage ? "File Selected" : "Click to Upload File"}</span></div></div></div><button onClick={handlePostSubmit} className="bg-[#0ea5e9] text-black font-bold px-6 py-2 rounded-lg">Publish Post</button></div><div className="space-y-2">{posts.filter(p=>p.category==='Research').map(p=>(<div key={p.id} className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center border border-white/5"><div className="flex items-center gap-3">{p.image && <img src={p.image} className="w-10 h-10 rounded object-cover"/>}<span>{p.title}</span></div><div className="flex gap-2"><button onClick={()=>toggleFeatured(p.id)} className={`p-2 rounded-lg ${p.featured?'bg-yellow-500/20 text-yellow-400':'bg-gray-700 text-gray-400'}`}>{p.featured?<Star size={16}/>:<StarOff size={16}/>}</button><button onClick={()=>deletePost(p.id)} className="text-red-400 p-2"><Trash2 size={16}/></button></div></div>))}</div></div>)}
        {isAdmin && activeTab === "jobs" && (<div className="space-y-6"><h1 className="text-3xl font-bold">Careers</h1><div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10 space-y-4"><h3 className="text-[#0ea5e9] font-bold flex items-center gap-2">{editingJobId ? <Edit2 size={18}/> : <PlusCircle size={18}/>} {editingJobId ? "Edit Position" : "Post New Position"}</h3><div className="grid grid-cols-3 gap-4"><input value={jobTitle} onChange={e=>setJobTitle(e.target.value)} placeholder="Job Title" className="bg-black/30 border border-white/10 p-3 rounded-lg text-white"/><input value={jobLoc} onChange={e=>setJobLoc(e.target.value)} placeholder="Location (e.g. Remote, NY)" className="bg-black/30 border border-white/10 p-3 rounded-lg text-white"/><select value={jobType} onChange={e=>setJobType(e.target.value)} className="bg-black/30 border border-white/10 p-3 rounded-lg text-white"><option>Full-Time</option><option>Contract</option><option>Internship</option></select></div><textarea value={jobDesc} onChange={e=>setJobDesc(e.target.value)} placeholder="Job Description & Requirements..." className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white h-40"/><div className="flex gap-4"><button onClick={handleJobSubmit} className={`flex-1 font-bold px-6 py-3 rounded-lg text-black ${editingJobId ? "bg-yellow-500 hover:bg-yellow-400" : "bg-[#0ea5e9] hover:bg-white"}`}>{editingJobId ? "Update Position" : "Post Position"}</button>{editingJobId && <button onClick={()=>{setEditingJobId(null); setJobTitle(""); setJobDesc(""); setJobLoc("");}} className="bg-gray-700 text-white px-4 rounded-lg">Cancel</button>}</div></div><div className="grid grid-cols-2 gap-4">{jobs.map(j=>(<div key={j.id} className={`bg-[#1e293b] p-6 rounded-xl border ${j.status==='open'?'border-green-500/30':'border-red-500/30'} flex flex-col justify-between h-40`}><div><div className="flex justify-between items-start"><h4 className="font-bold text-lg">{j.title}</h4><p className={`text-xs font-bold uppercase px-2 py-1 rounded-full ${j.status==='open'?'bg-green-500/20 text-green-400':'bg-red-500/20 text-red-400'}`}>{j.status}</p></div><p className="text-sm text-gray-400 mt-2">{j.type} • {j.location}</p></div><div className="flex gap-2 mt-4 justify-end"><button onClick={()=>startEditJob(j)} className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"><Edit2 size={18}/></button><button onClick={()=>toggleJobStatus(j.id)} className={`p-2 rounded-lg ${j.status==='open'?'text-green-400 bg-green-500/10':'text-red-400 bg-red-500/10'}`}>{j.status==='open'?"Close":"Open"}</button><button onClick={()=>deleteJob(j.id)} className="text-red-400 p-2"><Trash2 size={18}/></button></div></div>))}</div></div>)}
        
        {isAdmin && activeTab === "footer" && (
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Footer & About Info</h1>
            {/* Contact Info & Hero Image Sections (Unchanged) */}
            <div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10 space-y-4"><h3 className="text-[#0ea5e9] font-bold">Contact Details</h3><div className="grid grid-cols-3 gap-4"><input value={contactInfo.address} onChange={e=>setContactInfo({...contactInfo, address:e.target.value})} className="bg-black/30 border border-white/10 p-3 rounded-lg text-white" placeholder="Address"/><input value={contactInfo.phone} onChange={e=>setContactInfo({...contactInfo, phone:e.target.value})} className="bg-black/30 border border-white/10 p-3 rounded-lg text-white" placeholder="Phone"/><input value={contactInfo.email} onChange={e=>setContactInfo({...contactInfo, email:e.target.value})} className="bg-black/30 border border-white/10 p-3 rounded-lg text-white" placeholder="Email"/></div></div>
            <div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10 space-y-6"><h3 className="text-[#0ea5e9] font-bold">About Section Content</h3><div className="grid md:grid-cols-2 gap-6"><div className="space-y-4"><input value={aboutData.title} onChange={e=>setAboutData({...aboutData, title:e.target.value})} className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white" placeholder="About Title"/><textarea value={aboutData.desc} onChange={e=>setAboutData({...aboutData, desc:e.target.value})} className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white h-48" placeholder="About Description"/></div><div className="space-y-2"><p className="text-sm font-bold mb-2 flex items-center gap-2"><ImageIcon size={16}/> Main Hero Image</p><div className="relative group flex items-center justify-center border-2 border-dashed border-gray-600 rounded-lg h-60 hover:border-[#0ea5e9] transition-colors cursor-pointer overflow-hidden">{aboutData.heroImage ? <img src={aboutData.heroImage} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity"/> : <div className="text-center text-gray-400 flex flex-col items-center gap-2"><Upload size={32}/><span>Upload Hero Image</span></div>}<input type="file" onChange={(e)=>handleFileUpload(e.target.files[0], (img)=>setAboutData({...aboutData, heroImage:img}))} className="absolute inset-0 opacity-0 cursor-pointer"/></div></div></div></div>
            
            {/* --- NEW GALLERY ENTRY MANAGEMENT --- */}
            <div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10 space-y-6">
              <h3 className="text-[#0ea5e9] font-bold flex items-center gap-2"><PlusCircle size={20}/> Add New Gallery Entry</h3>
              
              {/* Form to Add New Entry */}
              <div className="space-y-4 p-4 bg-black/20 rounded-2xl border border-white/5">
                <input value={galleryTitle} onChange={e=>setGalleryTitle(e.target.value)} placeholder="Entry Title (e.g., Office Party)" className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white"/>
                <textarea value={galleryDesc} onChange={e=>setGalleryDesc(e.target.value)} placeholder="Description..." className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white"/>
                
                {/* Image Staging Area */}
                <div>
                  <p className="text-sm font-bold mb-2 text-gray-400">Add Images to this Entry (Multiple allowed)</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {stagedImages.map(img => (
                      <div key={img.id} className="relative group w-24 h-24 rounded-xl overflow-hidden border border-white/20">
                        <img src={img.src} className="w-full h-full object-cover"/>
                        <button onClick={()=>handleUnstageImage(img.id)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
                      </div>
                    ))}
                    <div className="relative group w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-600 rounded-xl hover:border-[#0ea5e9] cursor-pointer">
                      <Upload size={20} className="text-gray-400 group-hover:text-[#0ea5e9]"/>
                      <input type="file" multiple onChange={(e) => Array.from(e.target.files).forEach(file => handleFileUpload(file, handleStageImage))} className="absolute inset-0 opacity-0 cursor-pointer"/>
                    </div>
                  </div>
                </div>
                <button onClick={handleAddGalleryEntry} className="bg-[#0ea5e9] text-black font-bold px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-white transition-colors"><CheckCircle size={18}/> Add Entry to Gallery</button>
              </div>

              {/* List of Existing Entries */}
              <div className="mt-8">
                <h4 className="font-bold text-lg mb-4">Existing Gallery Entries ({aboutData.galleryEntries.length})</h4>
                <div className="space-y-3">
                  {aboutData.galleryEntries.length === 0 ? <p className="text-gray-500">No entries yet.</p> : aboutData.galleryEntries.map(entry => (
                    <div key={entry.id} className="bg-[#1e293b] p-4 rounded-xl flex justify-between items-center border border-white/5">
                      <div className="flex items-center gap-4">
                        {entry.images.length > 0 && <img src={entry.images[0].src} className="w-12 h-12 rounded-lg object-cover border border-white/10"/>}
                        <div>
                          <h5 className="font-bold text-lg">{entry.title}</h5>
                          <p className="text-sm text-gray-400">{entry.images.length} image(s)</p>
                        </div>
                      </div>
                      <button onClick={()=>deleteGalleryEntry(entry.id)} className="text-red-400 p-2 hover:bg-red-500/10 rounded-lg transition-colors"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {isAdmin && activeTab === "inbox" && (<div className="space-y-6"><h1 className="text-3xl font-bold">Inbox</h1><div className="space-y-4">{inbox.length === 0 ? <p className="text-gray-500">No messages.</p> : inbox.map(msg => (<div key={msg.id} className="bg-[#1e293b] p-6 rounded-xl border border-white/5 space-y-2"><div className="flex justify-between"><div><span className={`text-xs font-bold px-2 py-1 rounded uppercase ${msg.type==='Job Application' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>{msg.type}</span><h3 className="font-bold text-lg mt-1">{msg.senderName} <span className="text-sm font-normal text-gray-400">({msg.senderEmail})</span></h3></div><span className="text-xs text-gray-500">{msg.date}</span></div><p className="text-gray-300 bg-black/20 p-3 rounded-lg">{msg.message}</p>{msg.attachment && <a href={msg.attachment} download="attachment" className="inline-flex items-center gap-2 text-[#0ea5e9] hover:underline text-sm"><Download size={14}/> Download Attachment</a>}</div>))}</div></div>)}
        {isAdmin && activeTab === "admin_settings" && (<div className="space-y-8"><h1 className="text-3xl font-bold">Admin Settings</h1><div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10"><h3 className="text-[#0ea5e9] font-bold mb-4">My Profile</h3><div className="flex items-start gap-6"><div className="w-24 h-24 bg-black/30 rounded-full overflow-hidden border-2 border-[#0ea5e9] relative group">{currentUser.image?<img src={currentUser.image} className="w-full h-full object-cover"/>:<div className="w-full h-full flex items-center justify-center text-gray-500"><ImageIcon/></div>}<input type="file" onChange={(e)=>handleFileUpload(e.target.files[0], (img)=>updateProfile(currentUser.id, {image:img}))} className="absolute inset-0 opacity-0 cursor-pointer"/></div><div className="flex-grow space-y-4"><input value={newName} onChange={e=>setNewName(e.target.value)} placeholder="Name" className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white"/><input value={newEmail} onChange={e=>setNewEmail(e.target.value)} placeholder="Email" className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white"/><input value={newPass} onChange={e=>setNewPass(e.target.value)} placeholder="New Password" type="password" className="w-full bg-black/30 border border-white/10 p-3 rounded-lg text-white"/><button onClick={()=>updateProfile(currentUser.id, {name:newName, email:newEmail, password:newPass})} className="bg-[#0ea5e9] text-black font-bold px-6 py-2 rounded-lg">Update</button></div></div></div><div className="bg-[#0f172a]/50 p-6 rounded-3xl border border-white/10"><h3 className="text-[#0ea5e9] font-bold mb-4">User Management</h3><div className="overflow-x-auto"><table className="w-full text-left text-sm"><thead className="text-gray-400 border-b border-white/10"><tr><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Actions</th></tr></thead><tbody>{users.map(u=>(<tr key={u.id} className="border-b border-white/5 hover:bg-white/5"><td className="p-3 flex items-center gap-3">{u.image?<img src={u.image} className="w-8 h-8 rounded-full"/>:<div className="w-8 h-8 rounded-full bg-gray-700"/>}<div><p className="font-bold">{u.name}</p><p className="text-xs text-gray-400">{u.email}</p></div></td><td className="p-3 uppercase text-xs font-bold">{u.isPrimary?<span className="text-[#0ea5e9]">Primary</span>:u.role}</td><td className="p-3">{!u.isPrimary && u.id!==currentUser.id && (<div className="flex gap-2">{u.role==='user'?<button onClick={()=>promoteUser(u.id)} className="text-blue-400 text-xs">Promote</button>:<button onClick={()=>demoteUser(u.id)} className="text-yellow-400 text-xs">Demote</button>}<button onClick={()=>deleteUser(u.id)} className="text-red-400 text-xs">Delete</button></div>)}</td></tr>))}</tbody></table></div></div></div>)}
      </main>
    </div>
  );
}