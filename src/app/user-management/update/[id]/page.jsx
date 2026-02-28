/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Upload, User, Mail, Shield, ChevronDown } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function page() {
  const params = useParams();
  const route = useRouter();
  const id = params.id;

  const IMGBB_API_KEY = "6ad1958c294b93229c443eb0b10d8673";

  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    image: "", // ✅ FIXED
  });

  const [preview, setPreview] = useState(null);
  const [imgFile, setImgFile] = useState(null);

  // 🔹 Fetch existing user
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`);
      const data = await res.json();

      setUser({
        name: data?.name || "",
        email: data?.email || "",
        role: data?.role || "",
        image: data?.image || "",
      });

      setPreview(data?.image || null);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Input handler
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Image handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgFile(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    let imgUrl = user.image;

    if (imgFile) {
      const image = new FormData();
      image.append("image", imgFile);

      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          body: image,
        }
      );

      const data = await imgbbRes.json();
      imgUrl = data.data.url;
    }

    const updatedData = {
      ...user,
      images: imgUrl,
    };

    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (res.ok) {
      setImgFile(null);
      route.push("/user-management");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-50" />

      <div className="w-full max-w-lg bg-white/70 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] ">
        <div className="bg-white rounded-[2.2rem] p-8 md:p-10 border border-gray-50">
          {/* Header */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                New User
              </h1>
              <p className="text-gray-500 mt-1 text-sm">
                Set up a new member`s profile and permissions.
              </p>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Avatar Section */}
            <div className="flex justify-center pb-4">
              <label className="group relative cursor-pointer">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 bg-gray-50/50 flex items-center justify-center transition-all duration-300 group-hover:border-indigo-400 group-hover:bg-indigo-50/30 ">
                  {preview ? (
                    <img
                      src={preview}
                      alt="preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-gray-400 group-hover:text-indigo-500 transition-colors">
                      <Upload size={20} />
                      <span className="text-[10px] font-semibold uppercase tracking-tighter">
                        Photo
                      </span>
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 gap-5">
              {/* Name */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={user.name}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              {/* Email */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-4 bg-gray-50 border-transparent rounded-2xl text-sm font-medium placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none"
                />
              </div>

              {/* Role */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Shield size={18} className="text-gray-400" />
                </div>
                <select
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  className="w-full pl-11 pr-10 py-4 bg-gray-50 border-transparent rounded-2xl text-sm font-medium text-gray-600 appearance-none focus:bg-white focus:ring-2 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none cursor-pointer"
                >
                  <option value="editor">Editor</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Administrator</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400">
                  <ChevronDown size={18} />
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-4 bg-gray-900 text-white py-4 rounded-2xl text-sm font-bold shadow-lg shadow-gray-200 hover:bg-indigo-600 hover:shadow-indigo-200 hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              Confirm & Update User
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
