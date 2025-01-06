"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "sonner";

interface Permission {
  id: string;
  module: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  canNavigate: boolean;
}

interface RoleEditProps {
  close: () => void;
  id: string;
}

const RoleEditForm: React.FC<RoleEditProps> = ({ close, id }) => {
  const [roleName, setRoleName] = useState("");
  const [userType, setUserType] = useState("");
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoleData = async () => {
      setLoading(true);
      try {
        const session = await getSession();
        const token = session?.user.accessToken;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/rolePermission/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch role data");
        }

        const result = await response.json();
        setRoleName(result.data.name);
        setUserType(result.data.userType);
        setPermissions(result.data.permissions);
      } catch (error) {
        console.error("Error fetching role data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleData();
  }, [id]);

  const handlePermissionChange = async (
    permissionId: string,
    permissionType: keyof Permission,
    newValue: boolean
  ) => {
    const session = await getSession();
    const token = session?.user.accessToken;

    try {
      // Show a loading toast
      toast("Updating permission...", { duration: 2000 });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/rolePermission/${permissionId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [permissionType]: newValue }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update permission");
      }

      // Success toast
      toast.success("Permission updated successfully!");

      // Update the state
      setPermissions((prevPermissions) =>
        prevPermissions.map((permission) =>
          permission.id === permissionId
            ? { ...permission, [permissionType]: newValue }
            : permission
        )
      );
    } catch (error) {
      // Error toast
      toast.error("Failed to update permission. Please try again.");
      console.error("Error updating permission:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100px]">
        <img
          src="/favicon.ico"
          alt="Loading"
          className="w-12 h-12"
          style={{
            animation: "blurInOut 2s infinite ease-in-out",
          }}
        />
        <style jsx>{`
          @keyframes blurInOut {
            0%,
            100% {
              filter: blur(4px);
              opacity: 0.3;
            }
            50% {
              filter: blur(2px);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        {/* Role Details */}
        <div className="flex gap-4">
          {/* Role Name */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[12px] font-semibold ml-3 font-poppins text-[#091747]">Role Name</h1>
            <Input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {/* User Type */}
          <div className="flex flex-col gap-1">
            <h1 className="text-[12px] font-semibold ml-3 font-poppins text-[#091747]">User Type</h1>
            <select
              className="rounded-xl border border-gray-300 p-2 text-sm w-[202px]"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <h1 className="text-[12px] font-semibold ml-3 font-poppins text-[#091747]">Department</h1>
            <select
              className="rounded-xl border border-gray-300 p-2 text-sm w-[202px]"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="Accounts">Accounts</option>
              <option value="legal">Legal</option>
              <option value="contentWriting">Content Writing</option>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Close Button */}
        <div className="flex justify-end items-start mb-4 h-full">
        <button
          onClick={close}
          className="text-[#f21300] focus:outline-none"
        >
          <ImCross/>
        </button>
        </div>
      </div>

      {/* Permissions Table */}
      <div className="mt-4 w-full">
        {/* Header Row */}
        <div className="grid grid-cols-7 bg-[#091747] text-white rounded-t-lg py-2 px-2 font-medium h-[35px]">
          <div className="col-span-2 text-left text-[13px] font-semibold font-poppins">
            Permission For
          </div>
          <div className="col-span-1 text-center text-[13px] font-semibold font-poppins">
            Navigation
          </div>
          <div className="col-span-1 text-center text-[13px] font-semibold font-poppins">
            View
          </div>
          <div className="col-span-1 text-center text-[13px] font-semibold font-poppins">
            Edit
          </div>
          <div className="col-span-1 text-center text-[13px] font-semibold font-poppins">
            Delete
          </div>
          <div className="col-span-1 text-center text-[13px] font-semibold font-poppins">
            Add
          </div>
        </div>

        {/* Permission Rows */}
        {permissions.map((permission, index) => (
          <div
            key={permission.id}
            className={`grid grid-cols-7 items-center px-2 py-1 h-[33px] ${
              index % 2 === 0 ? "bg-[#D2D2D2]" : "bg-[#E7E7E7]"
            }`}
          >
            <div className="col-span-2 text-[14px] text-[#091747] font-semibold font-poppins text-left">
              {permission.module}
            </div>
            {[
              "canNavigate",
              "canRead",
              "canUpdate",
              "canDelete",
              "canCreate",
            ].map((key) => (
              <div key={key} className="col-span-1 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#f21300] focus:ring-[#f21300] cursor-pointer"
                  checked={!!permission[key as keyof Permission]}
                  onChange={(e) =>
                    handlePermissionChange(
                      permission.id,
                      key as keyof Permission,
                      e.target.checked
                    )
                  }
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Update Button */}
      <div className="flex justify-end mt-4">
        <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
          Update
        </Button>
      </div>
    </div>
  );
};

export default RoleEditForm;
