'use client'
import { Trash2 } from "lucide-react";
import React from "react";

function Delete({id}) {
  const handleDelete = async () => {
    const res = await fetch(`api/users/${id}`, {
        method: "DELETE"
    })
    if(res.ok){
        console.log("Delete user successfully!")
    }
  };
  return (
    <Trash2 className="text-red-600 cursor-pointer" onClick={handleDelete} />
  );
}

export default Delete;
