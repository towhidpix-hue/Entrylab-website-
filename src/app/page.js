"use client";
import { useData } from "./DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Briefcase, MapPin, Calendar, CheckCircle, Lock, X, Image as ImageIcon, Database, BarChart2, Lightbulb, TrendingUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const { heroLogo, heroSizes, posts, aboutData, jobs, currentUser, sendMessage, handleFileUpload, showGallery, setShowGallery } = useData();
  const [selectedJob, setSelectedJob] = useState(null);
  const [msgText, setMsgText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const featuredPosts = posts.filter(p => p.featured && p.category === 'Research');

  // Animation for the Slogan
  const sloganSentence = "Where Every Search Has a ";
  const sloganContainer = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
    }
  };
  const sloganLetter = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  const handleApply = (e) => {
    e.preventDefault();
    if (!currentUser) { alert("Please Sign In to Apply!"); return; }
    sendMessage({ senderName: currentUser.name, senderEmail: currentUser.email, type: "Job Application", message: `Applying for: ${selectedJob.title}. Note: ${msgText}`, attachment: attachment });
    alert("Application Sent!"); setSelectedJob(null); setMsgText(""); setAttachment(null);
  };

  const handleContact = (e) => {
    e.preventDefault();
    if (!currentUser) { alert("Please Sign In to Send Messages!"); return; }
    sendMessage({ senderName: currentUser.name, senderEmail: currentUser.email, type: "Contact Inquiry", message: msgText, attachment: null });
    alert("Message Sent!"); setMsgText("");
  };

  return (
    <main className="flex-col select-none relative z-0">
      <style jsx global>{`
        :root { --hero-logo-h: ${heroSizes.mobile}px; }
        @media (min-width: 768px) { :root { --hero-logo-h: ${heroSizes.tablet}px; } }
        @media (min-width: 1024px) { :root { --hero-logo-h: ${heroSizes.pc}px; } }
      `}</style>

      {/* 1. HERO SECTION */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none mask-radial-faded"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-[#020617] to-[#020617]"></div>
        
        {/* Main Content Container - space-y-0 to remove all auto-spacing */}
        <div className="relative z-10 text-center space-y-0 max-w-7xl px-4 flex flex-col items-center">
          
          {/* LOGO CONTAINER */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, y: -20 }} 
            animate={{ opacity: 1, scale: 1, y: [0, -5, 0] }} 
            transition={{ y: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            onHoverStart={() => setIsLogoHovered(true)}
            onHoverEnd={() => setIsLogoHovered(false)}
            className="cursor-pointer relative z-20" 
          >
             <img 
               src={heroLogo} 
               style={{ height: "var(--hero-logo-h)" }} 
               className="w-auto mx-auto object-contain brightness-0 invert drop-shadow-[0_0_45px_rgba(14,165,233,0.4)] transition-all duration-500 hover:drop-shadow-[0_0_100px_rgba(14,165,233,0.8)] hover:scale-105" 
               alt="Hero Logo" 
             />
          </motion.div>

          {/* ANIMATED SLOGAN - Negative Margin (-mt-4) pulls it UP towards the logo */}
          <div className="flex items-center justify-center -mt-4 relative z-30">
            <motion.h1 
              className="text-xl md:text-3xl font-bold tracking-wide leading-none"
              variants={sloganContainer}
              initial="hidden"
              animate={isLogoHovered ? "visible" : "hidden"}
            >
              {sloganSentence.split("").map((char, index) => (
                <motion.span key={index} variants={sloganLetter}>{char}</motion.span>
              ))}
              <motion.span 
                variants={sloganLetter}
                className="text-[#0ea5e9] inline-block ml-2 font-extrabold"
              >
                Value
              </motion.span>
            </motion.h1>
          </div>
          
          {/* Buttons - Added margin top to separate from logo/slogan */}
          <div className="flex flex-wrap justify-center gap-4 pt-12">
            <a href="#research" className="inline-block bg-[#0ea5e9] text-black px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_rgba(14,165,233,0.4)]">Explore Research</a>
            <a href="#careers" className="inline-block bg-white/10 border border-white/20 text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-all">Join Us</a>
          </div>
        </div>
      </section>

      {/* 2. OUR EXPERTISE */}
      <section className="py-24 bg-[#010409] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-5xl font-bold mb-4">Our <span className="bg-blue-600 text-white px-2">Expertise</span></h2>
             <p className="text-gray-400 max-w-2xl mx-auto">Comprehensive data research solutions designed to unlock the full potential of your information.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Database, title: "Data Collection", desc: "Comprehensive data gathering from multiple sources with rigorous validation protocols." },
                { icon: BarChart2, title: "Advanced Analytics", desc: "Cutting-edge analytical methods to extract meaningful patterns from complex datasets." },
                { icon: Lightbulb, title: "Actionable Insights", desc: "Transform raw data into strategic recommendations that drive business decisions." },
                { icon: TrendingUp, title: "Trend Forecasting", desc: "Predictive modeling to anticipate market shifts and emerging opportunities." }
              ].map((item, i) => (
                <div key={i} className="bg-[#0f172a] p-8 rounded-2xl border border-white/10 hover:border-[#0ea5e9] hover:-translate-y-2 transition-all group">
                   <div className="w-12 h-12 bg-[#0ea5e9]/10 rounded-lg flex items-center justify-center text-[#0ea5e9] mb-6 group-hover:bg-[#0ea5e9] group-hover:text-black transition-colors"><item.icon size={24}/></div>
                   <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 3. LATEST RESEARCH */}
      <section id="research" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex justify-between items-end mb-12">
             <h2 className="text-3xl md:text-4xl font-bold border-l-4 border-[#0ea5e9] pl-6 leading-tight">Latest <span className="text-[#0ea5e9]">Updates</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {featuredPosts.length > 0 ? featuredPosts.map((post) => (
              <div key={post.id} className="bg-[#0f172a] border border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[#0ea5e9]/10 transition-all group cursor-pointer">
                <div className="h-56 w-full bg-gray-900 flex items-center justify-center overflow-hidden relative">
                   {post.image ? <img src={post.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/> : <span className="text-gray-600">No Image</span>}
                   <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1 rounded text-xs font-bold uppercase text-[#0ea5e9]">{post.category}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#0ea5e9] transition-colors">{post.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-3 leading-relaxed">{post.desc}</p>
                  <div className="mt-6 pt-6 border-t border-white/5 flex items-center text-[#0ea5e9] text-sm font-bold gap-2 group-hover:gap-3 transition-all">Read More <ArrowRight size={16}/></div>
                </div>
              </div>
            )) : <div className="col-span-3 text-center py-16 border border-dashed border-white/10 rounded-2xl text-gray-500">No Featured Updates.</div>}
          </div>
        </div>
      </section>

      {/* 4. CAREERS */}
      <section id="careers" className="py-24 bg-[#0f172a] relative border-t border-white/10">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Open <span className="text-[#0ea5e9]">Positions</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Join our team of researchers and engineers building the future of data.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map(job => (
                <div key={job.id} className={`bg-[#020617] p-8 rounded-2xl border ${job.status === 'open' ? 'border-white/10 hover:border-[#0ea5e9]' : 'border-red-900/30 opacity-60'} transition-all group flex flex-col justify-between min-h-[250px]`}>
                   <div>
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#0ea5e9] transition-colors">{job.title}</h3>
                        {job.status === 'closed' && <span className="bg-red-500/20 text-red-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1"><Lock size={12}/> Closed</span>}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400 mb-6">
                         <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full"><Briefcase size={14}/> {job.type}</span>
                         <span className="flex items-center gap-1 bg-white/5 px-3 py-1 rounded-full"><MapPin size={14}/> {job.location}</span>
                      </div>
                   </div>
                   <button onClick={() => setSelectedJob(job)} disabled={job.status !== 'open'} className={`w-full flex items-center justify-between px-6 py-4 rounded-xl font-bold transition-all ${job.status === 'open' ? 'bg-white/5 text-white hover:bg-[#0ea5e9] hover:text-black' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}>
                      {job.status === 'open' ? 'Apply Now' : 'Position Closed'}
                      {job.status === 'open' && <ArrowRight size={18}/>}
                   </button>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* 5. ABOUT US & GALLERY */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1">
             <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{aboutData.title}</h2>
             <p className="text-gray-400 text-lg leading-relaxed mb-12">{aboutData.desc}</p>
             <button onClick={() => setShowGallery(true)} className="bg-[#0ea5e9] text-black px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3">
               View Life at EntryLab <ArrowRight/>
             </button>
           </div>
           <div className="order-1 md:order-2 relative rounded-3xl overflow-hidden aspect-square md:aspect-[4/3] border border-white/10 group">
             {aboutData.heroImage ? <img src={aboutData.heroImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"/> : <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-500"><ImageIcon size={48}/></div>}
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-50"></div>
           </div>
        </div>
      </section>

      {/* 6. CONTACT */}
      <section id="contact" className="py-24 relative"><div className="max-w-3xl mx-auto px-6 relative z-10 bg-[#0f172a]/90 p-12 rounded-[2rem] text-center shadow-2xl"><h2 className="text-3xl font-bold mb-6">Contact Us</h2>{!currentUser ? <p className="text-yellow-400">Please <a href="/entry-manage" className="underline">Sign In</a> to message us.</p> : <form onSubmit={handleContact} className="space-y-4"><textarea required placeholder="Message..." className="w-full bg-black/40 border border-white/10 p-4 rounded-xl text-white outline-none" rows="5" value={msgText} onChange={e=>setMsgText(e.target.value)}/><button className="w-full bg-[#0ea5e9] text-black font-bold py-4 rounded-xl">Send Message</button></form>}</div></section>

      {/* --- MODALS --- */}

      <AnimatePresence>
      {selectedJob && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
           <div className="bg-[#0f172a] p-8 rounded-3xl border border-white/20 max-w-lg w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
              <button onClick={() => setSelectedJob(null)} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-white/10 p-1 rounded-full"><X size={20}/></button>
              <h2 className="text-2xl font-bold mb-4">Apply: <span className="text-[#0ea5e9]">{selectedJob.title}</span></h2>
              <div className="bg-black/30 p-4 rounded-xl mb-6 border border-white/5"><h4 className="font-bold text-white mb-2 text-sm uppercase tracking-wider">Job Description</h4><p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedJob.description || "No description available."}</p></div>
              {!currentUser ? <div className="text-center py-4"><p className="text-red-400 font-bold mb-4">Login Required to Apply</p><a href="/entry-manage" className="inline-block bg-[#0ea5e9] text-black px-8 py-3 rounded-xl font-bold hover:bg-white transition-colors">Go to Login</a></div> : <form onSubmit={handleApply} className="space-y-4"><textarea required placeholder="Brief Cover Letter..." className="w-full bg-black/30 border border-white/10 p-4 rounded-xl text-white h-32 focus:border-[#0ea5e9] outline-none" value={msgText} onChange={e => setMsgText(e.target.value)}/><div><label className="text-sm text-gray-400 mb-2 block font-bold">Upload CV / Portfolio (Image)</label><div className="relative group flex items-center justify-center border-2 border-dashed border-gray-600 rounded-xl p-4 hover:border-[#0ea5e9] transition-colors cursor-pointer"><input type="file" onChange={(e) => handleFileUpload(e.target.files[0], setAttachment)} className="absolute inset-0 opacity-0 cursor-pointer"/><div className="text-center text-gray-400 flex items-center gap-2"><ImageIcon size={20}/><span>{attachment ? "File Selected" : "Click to Upload"}</span></div></div></div><button className="w-full bg-[#0ea5e9] text-black font-bold py-4 rounded-xl hover:bg-white transition-all shadow-lg">Submit Application</button></form>}
           </div>
        </motion.div>
      )}
      </AnimatePresence>

      <AnimatePresence>
        {showGallery && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl p-4 md:p-10 overflow-y-auto">
             <button className="fixed top-6 right-6 z-50 text-white/70 hover:text-white bg-white/10 p-2 rounded-full transition-colors" onClick={() => setShowGallery(false)}><X size={32}/></button>
             <div className="max-w-7xl mx-auto mt-12">
               <h2 className="text-4xl font-bold mb-12 text-center">Life at <span className="text-[#0ea5e9]">EntryLab</span></h2>
               {aboutData.gallery.length === 0 ? (
                 <p className="text-center text-gray-500 text-xl py-20">Gallery is empty. Add photos in Admin Panel.</p>
               ) : (
                 <div className="columns-1 md:columns-3 gap-6 space-y-6">
                   {aboutData.gallery.map((img) => (
                     <motion.div key={img.id} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{once:true}} className="break-inside-avoid rounded-2xl overflow-hidden border border-white/10 group">
                       <img src={img.src} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"/>
                     </motion.div>
                   ))}
                 </div>
               )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}