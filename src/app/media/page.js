"use client";
import { useData } from "../DataContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, PlayCircle, Image as ImageIcon } from "lucide-react";

export default function MediaPage() {
  const { posts } = useData();
  // Filter only Media category posts
  const mediaPosts = posts.filter(p => p.category === 'Media');
  const [selectedItem, setSelectedItem] = useState(null);

  // Helper to check if string is a URL (for video embeds)
  const isUrl = (string) => {
    try { return Boolean(new URL(string)); } catch (e) { return false; }
  };

  return (
    <main className="min-h-screen p-8 md:p-20 relative z-0">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none fixed"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Media <span className="text-[#0ea5e9]">Gallery</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Explore our visual journey, events, and technological breakthroughs in our exclusive photo and video zone.</p>
        </div>

        {mediaPosts.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-white/10 rounded-3xl">
            <ImageIcon size={48} className="mx-auto text-gray-500 mb-4"/>
            <p className="text-gray-500 text-xl">No media content uploaded yet.</p>
          </div>
        ) : (
          // Fancy Grid Layout
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[300px]">
            {mediaPosts.map((post, index) => {
               const isVideo = post.image && isUrl(post.image);
               return (
                <motion.div 
                  key={post.id}
                  initial={{ opacity: 0, y: 20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  layoutId={post.id}
                  onClick={() => setSelectedItem(post)}
                  className={`group relative rounded-3xl overflow-hidden border border-white/10 cursor-pointer hover:border-[#0ea5e9]/50 shadow-lg hover:shadow-[#0ea5e9]/20 transition-all ${index % 3 === 0 || index === 0 ? 'md:col-span-2' : ''}`}
                >
                  {post.image ? (
                    isVideo ? (
                      // Simulated Video Thumbnail (Overlay icon)
                      <div className="w-full h-full relative bg-black">
                         <img src={`https://source.unsplash.com/random/800x600?technology,video&sig=${post.id}`} className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"/>
                         <div className="absolute inset-0 flex items-center justify-center"><PlayCircle size={64} className="text-white/80 group-hover:text-[#0ea5e9] transition-colors"/></div>
                      </div>
                    ) : (
                      // Regular Image Upload
                      <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title}/>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 font-bold flex-col gap-2"><ImageIcon/>No Media Content</div>
                  )}
                  
                  {/* Overlay Title */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform sm:opacity-0 group-hover:opacity-100">
                    <span className="text-[#0ea5e9] text-xs font-bold uppercase tracking-wider mb-2 block">{isVideo ? 'Video' : 'Photo'}</span>
                    <h3 className="text-2xl font-bold text-white">{post.title}</h3>
                    <p className="text-gray-300 line-clamp-2 mt-2">{post.desc}</p>
                  </div>
                </motion.div>
               );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal for Fancy View */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedItem(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 p-2 rounded-full transition-colors"><X size={32}/></button>
            
            <motion.div 
              layoutId={selectedItem.id}
              className="max-w-5xl w-full max-h-[90vh] bg-[#0f172a] rounded-3xl overflow-hidden border border-white/10 relative flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking content
            >
               {/* Media Container */}
               <div className="flex-grow bg-black relative min-h-[300px] md:min-h-[500px] flex items-center justify-center">
                 {selectedItem.image && isUrl(selectedItem.image) ? (
                   // It's a URL, assume video embed (Simulated for browser-only demo)
                   <iframe width="100%" height="100%" src={selectedItem.image.replace("watch?v=", "embed/")} title="Video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full"></iframe>
                 ) : (
                   // It's Base64 image data
                   <img src={selectedItem.image} className="w-full h-full object-contain" alt={selectedItem.title}/>
                 )}
               </div>
               {/* Details Container */}
               <div className="p-8 md:w-[400px] flex-shrink-0 flex flex-col justify-center bg-[#0f172a]">
                  <span className="text-[#0ea5e9] text-sm font-bold uppercase tracking-wider mb-4 block">{selectedItem.category}</span>
                  <h2 className="text-3xl font-bold mb-4">{selectedItem.title}</h2>
                  <p className="text-gray-300 leading-relaxed">{selectedItem.desc}</p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}