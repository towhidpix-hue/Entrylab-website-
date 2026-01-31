"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { DataProvider, useData } from "./DataContext";
import Link from "next/link";
import { Menu, X, MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

const Footer = () => {
  const { navLogo, contactInfo, setShowGallery } = useData(); // Use Global Gallery Setter
  const currentYear = new Date().getFullYear();
  
  // Helper to close gallery when clicking links
  const handleNav = () => setShowGallery(false);

  return (
    <footer className="bg-[#010409] border-t border-white/10 pt-16 pb-8 relative z-10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 space-y-6"><img src={navLogo} alt="Entrylab Logo" className="h-10 w-auto object-contain brightness-0 invert" /><p className="text-gray-400 text-sm leading-relaxed">Transforming data into actionable insights.</p><div className="flex gap-4 text-gray-400 mt-4"><Facebook size={20}/><Twitter size={20}/><Linkedin size={20}/><Instagram size={20}/></div></div>
        <div><h4 className="text-white font-bold mb-6">Quick Links</h4><ul className="space-y-3 text-sm text-gray-400">
          <li><Link href="/" onClick={handleNav} className="hover:text-[#0ea5e9] flex items-center gap-2">› Home</Link></li>
          <li><Link href="/#research" onClick={handleNav} className="hover:text-[#0ea5e9] flex items-center gap-2">› Research</Link></li>
          <li><Link href="/#careers" onClick={handleNav} className="hover:text-[#0ea5e9] flex items-center gap-2">› Careers</Link></li>
          <li><Link href="/#about" onClick={handleNav} className="hover:text-[#0ea5e9] flex items-center gap-2">› About</Link></li>
          <li><Link href="/#contact" onClick={handleNav} className="hover:text-[#0ea5e9] flex items-center gap-2">› Contact</Link></li>
        </ul></div>
         <div><h4 className="text-white font-bold mb-6">Services</h4><ul className="space-y-3 text-sm text-gray-400"><li>Data Analysis</li><li>Market Research</li><li>Trend Forecasting</li></ul></div>
        <div><h4 className="text-white font-bold mb-6">Contact Us</h4><ul className="space-y-4 text-sm text-gray-400"><li className="flex gap-3 items-start"><MapPin size={18} className="text-[#0ea5e9] shrink-0 mt-1"/><span>{contactInfo.address}</span></li><li className="flex gap-3 items-center"><Phone size={18} className="text-[#0ea5e9] shrink-0"/><span>{contactInfo.phone}</span></li><li className="flex gap-3 items-center"><Mail size={18} className="text-[#0ea5e9] shrink-0"/><span>{contactInfo.email}</span></li></ul></div>
      </div>
      <div className="border-t border-white/10 pt-8 mt-8 text-center text-gray-500 text-sm"><p>© {currentYear} EntryLab. All rights reserved.</p></div>
    </footer>
  );
};

const Navbar = () => {
  const { navLogo, navSizes, isMobileMenuOpen, setIsMobileMenuOpen, currentUser, setShowGallery } = useData();
  
  // Helper to close gallery and mobile menu
  const handleNav = () => {
    setShowGallery(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <style jsx global>{`
        :root { --nav-logo-h: ${navSizes.mobile}%; }
        @media (min-width: 768px) { :root { --nav-logo-h: ${navSizes.tablet}%; } }
        @media (min-width: 1024px) { :root { --nav-logo-h: ${navSizes.pc}%; } }
      `}</style>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020617]/95 backdrop-blur-md border-b border-white/10 shadow-lg h-24 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between h-full">
          <Link href="/" onClick={handleNav} className="flex items-center gap-2 hover:opacity-80 transition-opacity h-full py-2">
            <img src={navLogo} alt="Entrylab Logo" style={{ height: `var(--nav-logo-h)` }} className="w-auto max-h-full object-contain brightness-0 invert transition-all duration-300" />
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-300 tracking-wide">
            <Link href="/" onClick={handleNav} className="hover:text-[#0ea5e9] transition-colors">Home</Link>
            <Link href="/#research" onClick={handleNav} className="hover:text-[#0ea5e9] transition-colors">Research</Link>
            <Link href="/#careers" onClick={handleNav} className="hover:text-[#0ea5e9] transition-colors">Careers</Link>
            <Link href="/#about" onClick={handleNav} className="hover:text-[#0ea5e9] transition-colors">About</Link>
            <Link href="/#contact" onClick={handleNav} className="hover:text-[#0ea5e9] transition-colors">Contact</Link>
          </div>
          <div className="md:hidden flex items-center"><button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">{isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}</button></div>
          <div className="hidden md:flex items-center gap-4"><Link href="/entry-manage"><button className="bg-[#0ea5e9] hover:bg-blue-500 text-black font-extrabold px-6 py-2.5 rounded-full text-sm transition-all shadow-[0_0_15px_rgba(14,165,233,0.4)]">{currentUser ? "Dashboard" : "Sign In"}</button></Link></div>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0f172a] border-t border-white/10 absolute w-full left-0 top-24 px-6 py-8 flex flex-col gap-6 shadow-2xl h-screen">
            <Link href="/" onClick={handleNav} className="text-xl font-bold text-white hover:text-[#0ea5e9]">Home</Link>
            <Link href="/#research" onClick={handleNav} className="text-xl font-bold text-white hover:text-[#0ea5e9]">Research</Link>
            <Link href="/#careers" onClick={handleNav} className="text-xl font-bold text-white hover:text-[#0ea5e9]">Careers</Link>
            <Link href="/#about" onClick={handleNav} className="text-xl font-bold text-white hover:text-[#0ea5e9]">About</Link>
            <Link href="/#contact" onClick={handleNav} className="text-xl font-bold text-white hover:text-[#0ea5e9]">Contact</Link>
            <Link href="/entry-manage" onClick={handleNav}><button className="w-full bg-[#0ea5e9] text-black font-bold py-4 rounded-xl mt-4">{currentUser ? "Dashboard" : "Sign In"}</button></Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#020617] text-white antialiased flex flex-col min-h-screen pt-24`}>
        <DataProvider><Navbar /><div className="flex-grow">{children}</div><Footer /></DataProvider>
      </body>
    </html>
  );
}