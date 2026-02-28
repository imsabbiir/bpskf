/* eslint-disable @next/next/no-img-element */
import Delete from "@/components/crud/Delete";
import { Edit, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

async function page() {
  const res = await fetch("http://localhost:3000/api/users");
  const users = await res.json();
  return (
    <div className="min-h-screen w-full bg-[#f1f1f1] py-20">
      <div className="w-[85%] mx-auto rounded-lg bg-white overflow-hidden">
        <div className="flex items-center justify-between p-5">
          <h2 className="text-2xl text-[#555]">User Management</h2>
          <Link
            href={"/user-management/add-new"}
            className="text-xl py-2 px-6 bg-[#444] text-white rounded flex items-center gap-3 cursor-pointer"
          >
            <Plus /> New
          </Link>
        </div>
        <table className="w-full border-collapse">
          <thead className="">
            <tr className="bg-[#cafaca] text-gray-700 text-left">
              <td className="px-4 py-3 font-medium">Name</td>
              <td className="px-4 py-3 font-medium">Email</td>
              <td className="px-4 py-3 font-medium">Role</td>
              <td className="px-4 py-3 font-medium text-center">Image</td>
              <td className="px-4 py-3 font-medium text-center">Action</td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr
                  key={user?._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Name */}
                  <td className="px-4 py-3">
                    <span className="font-medium">{user?.name}</span>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-3">
                    <span className="font-medium">{user?.email}</span>
                  </td>

                  {/* Role */}
                  <td className="px-4 py-3">
                    <span className="font-medium capitalize">{user?.role}</span>
                  </td>

                  {/* Avatar */}

                  <td className="px-4 py-3 text-center">
                    <img
                      src={user?.image}
                      alt={user?.name}
                      className="w-12 h-12 rounded-full object-cover mx-auto ring-2 ring-gray-200"
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center items-center gap-3">
                      <Delete id={user?._id} />
                      <Link href={`/user-management/update/${user?._id}`}>
                        <Edit className="w-5 h-5 text-blue-600 cursor-pointer hover:scale-110 transition" />
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default page;
