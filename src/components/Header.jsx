/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, Heart, Users, Droplet, LogIn, 
  LogOut, ChevronDown, LayoutDashboard, 
  Calendar,
  Settings
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [userData, setUserData] = useState(null);
  const dropdownRef = useRef(null);
  
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("/api/users/me");
        const data = await res.json();
        if (res.ok) setUserData(data.user);
        else setUserData(null);
      } catch (err) {
        setUserData(null);
      }
    };
    checkUser();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/users/logout", { method: "POST" });
      if (res.ok) {
        setUserData(null);
        setUserDropdown(false);
        setIsOpen(false);
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const navLinks = [
    { name: "Home", href: "/", icon: <Heart size={14} className="text-green-500" /> },
    { name: "Blood Directory", href: "/blood-directory", icon: <Droplet size={14} className="text-red-500" /> },
    { name: "Volunteer", href: "/volunteer", icon: <Users size={14} className="text-blue-500" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md border-b border-slate-200/50" />

      <div className="relative max-w-7xl mx-auto h-20 flex items-center justify-between px-6 lg:px-12">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center group-hover:bg-green-600 transition-all shadow-lg shadow-slate-200">
            <Heart size={20} className="text-white group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
              Birabo <span className="text-green-600">Progoti</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase">
              Somajkollan Foundation
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center bg-slate-100/50 p-1 rounded-full border border-slate-200/50">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
                  isActive ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900 hover:bg-white"
                }`}
              >
                {link.icon} {link.name}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP AUTH/ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          {userData ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setUserDropdown(!userDropdown)}
                className="flex items-center gap-2 p-1 pr-3 bg-white border border-slate-200 rounded-full hover:shadow-md transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold overflow-hidden border border-green-200">
                  {userData.common?.image ? (
                    <img src={userData.common.image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    userData.common?.name?.charAt(0) || "U"
                  )}
                </div>
                <span className="text-sm font-bold text-slate-700">{userData.common?.name?.split(" ")[0]}</span>
                <ChevronDown size={14} className={`text-slate-400 transition-transform ${userDropdown ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {userDropdown && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    // Added onClick here to close whenever any part of the dropdown is clicked
                    onClick={() => setUserDropdown(false)}
                    className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50"
                  >
                    <Link href="/user/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                      <LayoutDashboard size={18} className="text-slate-400" /> Dashboard
                    </Link>
                    <Link href="/user/donation" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                      <Droplet size={18} className="text-slate-400" /> Blood Donation
                    </Link>
                    <Link href="/user/attended-events" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                      <Calendar size={18} className="text-slate-400" /> Attended Event
                    </Link>
                    <Link href="/user/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 rounded-xl transition-colors">
                      <Settings size={18} className="text-slate-400" /> Settings
                    </Link>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents double-triggering the parent onClick
                        handleLogout();
                      }} 
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/login" className={`flex items-center gap-2 px-5 py-2.5 text-sm font-bold transition-colors ${pathname === "/login" ? "text-green-600" : "text-slate-700 hover:text-slate-900"}`}>
              <LogIn size={18} /> Login
            </Link>
          )}

          <Link href="/donate" className="px-6 py-2.5 bg-green-600 text-white rounded-full text-sm font-bold hover:bg-slate-900 shadow-lg shadow-green-100 transition-all hover:-translate-y-0.5">
            Donate Now
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button className="md:hidden p-2 text-slate-900 bg-slate-100 rounded-xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden md:hidden shadow-2xl"
          >
            <div className="p-6 space-y-6">
              {userData && (
                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-lg">
                    {userData.common?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{userData.common?.name}</p>
                    <p className="text-xs text-slate-500">{userData.common?.phone_number}</p>
                  </div>
                </div>
              )}

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 text-lg font-bold text-slate-900 hover:bg-slate-50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      {link.icon}
                    </div>
                    {link.name}
                  </Link>
                ))}
                
                {userData && (
                  <Link
                    href="/user/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 p-4 text-lg font-bold text-slate-900 hover:bg-slate-50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                      <LayoutDashboard size={18} className="text-indigo-500" />
                    </div>
                    My Dashboard
                  </Link>
                )}
              </nav>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                {userData ? (
                  <button 
                    onClick={handleLogout}
                    className="w-full py-4 bg-red-50 text-red-600 font-bold rounded-2xl flex items-center justify-center gap-2"
                  >
                    <LogOut size={20} /> Logout
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="w-full py-4 bg-slate-100 text-slate-900 text-center font-bold rounded-2xl block"
                  >
                    Login to Account
                  </Link>
                )}
                
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-4 bg-green-600 text-white text-center font-bold rounded-2xl shadow-lg shadow-green-100 block"
                >
                  Donate Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;