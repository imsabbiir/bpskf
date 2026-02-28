
import React from "react";
import SideBar from "@/components/SideBar"
function layout({ children }) {
  
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* SIDEBAR */}
      <SideBar />
      <main className="ml-64 flex-1 p-8">{children}</main>
    </div>
  );
}

export default layout;
