/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Upload, X } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function page() {
  const IMGBB_API_KEY = "6ad1958c294b93229c443eb0b10d8673";
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const fetchData = async () => {
    const response = await fetch(`http://localhost:5001/images`);
    const data = await response.json();
    setImages(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreview(reader.result);
      };
    }
  };
  
  const handleSubmit = async (e) => {
    // e.preventDefault();
    let imageUrl = "";
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: formData }
      );
      const imgbbData = await imgbbRes.json();
      imageUrl = imgbbData.data.url;
    }
    console.log("uploaded image url:", imageUrl);
    const jsonRes = await fetch("http://localhost:5001/images", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: imageUrl }),
    });
    if (jsonRes.ok) {
      fetchData();
      setPreview(null);
      setImage(null);
    } else {
      alert("failed to save image url to json server");
    }
  };

  const handleDelete = async (id) => {
    console.log("image id", id)
    const deleteImage = await fetch(`http://localhost:5001/images/${id}`, {
      method: "DELETE",
    })
    if(deleteImage.ok){
      fetchData()
    }else{
      alert("Failed to delete image")
    }
  }
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center gap-3">
        <label className="h-40 w-40 mt-10 rounded-lg overflow-hidden bg-gray-50 flex justify-center items-center border border-gray-800 border-dashed group cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <Upload size={40} />
          )}
        </label>
        <button
          onClick={handleSubmit}
          className="text-sm font-semibold px-7 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-all"
        >
          Upload
        </button>
      </div>
      <div className="p-20 flex flex-wrap gap-5">
        {images.map((image, index) => {
          return (
            <div
              key={image?.id}
              className="h-40 w-40 rounded-lg overflow-hidden relative"
            >
              <X
                className="absolute top-2 right-2 text-red-500 cursor-pointer bg-[#00000080]"
                onClick={() => handleDelete(image?.id)}
              />
              <img
                src={image?.url}
                alt={`image:${index}`}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
