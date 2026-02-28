/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState, useMemo } from "react";
import {
  Users,
  HandHeart,
  Droplets,
  TrendingUp,
  Bell,
  Loader2,
  ChevronDown,
  User,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";

const Dashboard = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    phone: "",
    image: "",
  });
  const [loading, setLoading] = useState(true);

  // Year state
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear.toString());

  // 1. Data States (Matching your Donations page logic)
  const [chart, setChart] = useState(null);
  const [totalDonations, setTotalDonations] = useState();
  const [data, setData] = useState({
    stats: { approved: 0, pending: 0, volunteers: 0 },
    recentDonors: [],
  });

  const yearsList = useMemo(() => {
    return Array.from({ length: currentYear - 2018 + 1 }, (_, i) =>
      (2018 + i).toString(),
    ).reverse();
  }, [currentYear]);

  // 2. Database-driven chart selection (Safe check for null)
  const chartData = useMemo(() => {
    if (!chart || !chart[year]) return [];
    return chart[year];
  }, [chart, year]);

  const fetchDashboardData = async () => {
    try {
      // Fetching from both APIs
      const [adminRes, statsRes, donationsRes] = await Promise.all([
        fetch("/api/admin/me"),
        fetch(`/api/admin/stats`),
        fetch("/api/donations"), // Your database API
      ]);

      const adminJson = await adminRes.json();
      const statsJson = await statsRes.json();
      const donationsJson = await donationsRes.json();

      if (adminRes.ok) setAdminData(adminJson.admin);

      if (statsRes.ok) {
        setData((prev) => ({
          ...prev,
          stats: statsJson.stats,
          recentDonors: statsJson.recentDonors,
        }));
      }

      // 3. Set the database chart data
      if (donationsJson.success) {
        setChart(donationsJson.historicalDonations);
        setTotalDonations(donationsJson.allDonations.length);
      }
    } catch (error) {
      console.error("Load Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSec = Math.floor((now - date) / 1000);
    const diffInHrs = Math.floor(diffInSec / 3600);
    if (diffInSec < 60) return "Just now";
    if (diffInSec < 3600) return `${Math.floor(diffInSec / 60)}m ago`;
    if (diffInHrs < 24) return `${diffInHrs}h ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-red-600" size={40} />
      </div>
    );

  return (
    <main className="p-6 bg-slate-50 min-h-screen">
      <header className="flex justify-end items-center mb-8">
        <div className="flex items-center gap-4">
          <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 relative">
            <Bell size={20} />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <p className="text-sm font-bold text-slate-800">
                {adminData?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-500">
                {adminData?.phone || "Administrator"}
              </p>
            </div>
            <div className="w-10 h-10 bg-red-100 rounded-full overflow-hidden flex items-center justify-center text-red-600 font-bold border border-white">
              {adminData?.image ? (
                <img
                  src={adminData.image}
                  alt="admin"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>AD</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Total Donations",
            val: totalDonations,
            icon: <Droplets />,
            color: "text-red-600",
            bg: "bg-red-50",
          },
          {
            label: "Total Donors",
            val: data.stats.approved,
            icon: <Users />,
            color: "text-blue-600",
            bg: "bg-blue-50",
          },
          {
            label: "New Requests",
            val: data.stats.pending,
            icon: <User />,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Volunteers",
            val: data.stats.volunteers,
            icon: <HandHeart />,
            color: "text-purple-600",
            bg: "bg-purple-50",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-4xl border border-slate-100 shadow-sm flex items-center gap-4"
          >
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-2xl font-black text-slate-800">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CHART SECTION (Now linked to DB) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">
              Donation Overview
            </h3>
            <div className="relative flex items-center">
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 text-xs font-bold py-2 px-4 pr-8 rounded-xl outline-none cursor-pointer hover:bg-slate-100 transition min-w-[100px]"
              >
                {yearsList.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorDon" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ stroke: "#ef4444", strokeWidth: 1 }}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="donations"
                  stroke="#ef4444"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorDon)"
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RECENT DONORS SECTION */}
        <div className="bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 mb-6">
            Recent Donors
          </h3>
          <div className="space-y-6">
            {data.recentDonors.length > 0 ? (
              data.recentDonors.map((donor, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex items-center justify-center font-bold text-slate-500 text-xs border border-slate-200">
                      {donor.common?.image ? (
                        <img
                          src={donor.common.image}
                          alt="donor"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        donor.common?.name?.slice(0, 1).toUpperCase()
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-red-600 transition">
                        {donor.common?.name}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {formatTimeAgo(donor.createdAt)}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-red-50 text-red-600 rounded-lg font-black text-xs">
                    {donor.common?.blood_group}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-center text-slate-400 text-sm italic">
                No recent donors found.
              </p>
            )}
          </div>
          <Link
            href="/admin/donors"
            className="w-full block text-center mt-8 py-3 bg-slate-50 text-slate-500 font-bold text-xs rounded-xl hover:bg-red-50 hover:text-red-600 transition"
          >
            View All Donors
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
