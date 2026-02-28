"use client";

import React from "react";
import {
  HandHeart,
  Calendar,
  Settings,
  LayoutDashboard,
  LogOut,
  Droplets,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

function SideBar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "donors",
      label: "Donors",
      icon: <User size={20} />,
    },
    {
      id: "donations",
      label: "Donations",
      icon: <Droplets size={20} />,
    },
    {
      id: "volunteers",
      label: "Volunteers",
      icon: <HandHeart size={20} />,
    },
    {
      id: "events",
      label: "Upcoming Events",
      icon: <Calendar size={20} />,
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  const handleLogout = async () => {
    await fetch("api/admin/logout", {method: "POST"});
    router.push("/admin");
  }

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full ">
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="bg-red-600 p-2 rounded-lg">
          <Droplets className="text-white" size={24} />
        </div>
        <span className="text-xl font-black text-slate-800 tracking-tight">
          BPSKF
        </span>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 space-y-2 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === `/admin/${item.id}`;

          return (
            <Link
              href={`/admin/${item.id}`}
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive
                  ? "bg-red-50 text-red-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-red-600 transition-colors">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
