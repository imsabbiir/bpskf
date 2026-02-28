/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { Edit, Save, Upload, X } from "lucide-react";

import { useRouter } from "next/navigation";
import UserDelete from "./UserDelete";

function UserRow({ user }) {
  const IMGBB_API_KEY = "6ad1958c294b93229c443eb0b10d8673";
  const route = useRouter();
  const [editState, setEditState] = useState(false);
  const [preview, setPreview] = useState(user?.image);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState({
    name: user?.name,
    email: user?.email,
    role: user?.role,
  });
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };
  const handleCancel = () => {
    setEditState(false);
    setUserData({
      name: user?.name,
      email: user?.email,
      role: user?.role,
    });
    setPreview(user?.image);
    setImage(null);
  };
  const handleSave = async (e) => {
    let imageUrl = "";
    if (image) {
      const imageData = new FormData();
      imageData.append("image", image);
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
            method: "POST", 
            body: imageData
        }
      );
      const data = await imgbbRes.json();
      imageUrl = data.data.url;
    }
    const res = await fetch(`http://localhost:3000/users/${user.id}`,{
        method: "PUT",
        headers: {"Content-Type":"Application/json"},
        body: JSON.stringify({
            ...userData,
            image: imageUrl
        })
    })
    if(res.ok){
        setEditState(false);
        setImage(null);
        route.push("/user-management")
    }
    console.log(`updated user details of user id ${user?.id}:`, userData);
  };
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      {/* Name */}
      <td className="px-4 py-3">
        {editState ? (
          <input
            type="text"
            name="name"
            value={userData?.name}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        ) : (
          <span className="font-medium">{user?.name}</span>
        )}
      </td>

      {/* Email */}
      <td className="px-4 py-3">
        {editState ? (
          <input
            type="email"
            name="email"
            value={userData?.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        ) : (
          <span className="font-medium">{user?.email}</span>
        )}
      </td>

      {/* Role */}
      <td className="px-4 py-3">
        {editState ? (
          <select
            name="role"
            value={userData?.role}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="editor">Editor</option>
            <option value="moderator">Moderator</option>
            <option value="admin">Administrator</option>
          </select>
        ) : (
          <span className="font-medium capitalize">{user?.role}</span>
        )}
      </td>

      {/* Avatar */}
      {editState ? (
        <td className="px-4 py-3 text-center">
          <label className="relative cursor-pointer">
            <input
              type="file"
              accept="image*"
              className="hidden"
              onChange={handleImageChange}
            />
            <div className="w-12 h-12 rounded-full mx-auto  ring-2 ring-gray-200 overflow-hidden relative group">
              <img
                src={preview}
                alt={user?.name}
                className="w-full h-full object-cover"
              />
              <div className="bg-[#00000094] w-full h-full absolute top-0 left-0 opacity-0 group-hover:opacity-100 flex justify-center items-center transition duration-300">
                <Upload className="text-white" size={18} />
              </div>
            </div>
          </label>
        </td>
      ) : (
        <td className="px-4 py-3 text-center">
          <img
            src={user?.image}
            alt={user?.name}
            className="w-12 h-12 rounded-full object-cover mx-auto ring-2 ring-gray-200"
          />
        </td>
      )}

      {/* Actions */}
      <td className="px-4 py-3 text-center">
        {editState ? (
          <div className="flex justify-center items-center gap-3">
            <Save
              className="w-5 h-5 text-green-600 cursor-pointer hover:scale-110 transition"
              onClick={handleSave}
            />
            <X
              className="w-5 h-5 text-red-600 cursor-pointer hover:scale-110 transition"
              onClick={handleCancel}
            />
          </div>
        ) : (
          <div className="flex justify-center items-center gap-3">
            <UserDelete id={user?.id} name={user?.name} url={`http://localhost:5001/users`} />
            <Edit
              className="w-5 h-5 text-blue-600 cursor-pointer hover:scale-110 transition"
              onClick={() => setEditState(true)}
            />
          </div>
        )}
      </td>
    </tr>
  );
}

export default UserRow;
