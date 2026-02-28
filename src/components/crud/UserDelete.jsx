"use client";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function UserDelete({ id, name,  }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const deleteUser = async () => {
    const res = await fetch(`http://localhost:5001/users/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setShowModal(false);
      alert(`User "${name}" deleted`);
      router.push("/user-management");
    } else {
      alert("Failed to delete user");
    }
  };

  return (
    <>
      {/* Trash Icon */}
      <Trash2
        className="text-red-500 cursor-pointer"
        onClick={() => setShowModal(true)}
      />

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800">
              Delete User?
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Are you sure you want to delete <b>{name}</b>`s account?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={deleteUser}
                className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserDelete;
