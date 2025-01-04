"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

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
    console.log(permissionId)
    try {
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

      setPermissions((prevPermissions) =>
        prevPermissions.map((permission) =>
          permission.id === permissionId
            ? { ...permission, [permissionType]: newValue }
            : permission
        )
      );

      console.log("Permission updated successfully!");
    } catch (error) {
      console.error("Error updating permission:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-2 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        {/* Role Details */}
        <div className="flex gap-4">
          {/* Role Name */}
          <div className="flex flex-col gap-1">
            <h1 className="text-xs font-semibold">Role Name</h1>
            <Input
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="rounded-xl"
            />
          </div>

          {/* User Type */}
          <div className="flex flex-col gap-1">
            <h1 className="text-xs font-semibold">User Type</h1>
            <select
              className="rounded-xl border border-gray-300 p-2 text-sm"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="Admin">Admin</option>
              <option value="Staff">Staff</option>
            </select>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={close}
          className="text-red-600 hover:text-red-800 focus:outline-none"
        >
          <Cross2Icon />
        </button>
      </div>

      {/* Permissions Table */}
      <div className="mt-4 w-full">
        {/* Header Row */}
        <div className="grid grid-cols-7 bg-blue-950 text-white rounded-t-lg py-2 px-2 font-medium">
          <div className="col-span-2 text-left text-xs">Permission For</div>
          <div className="col-span-1 text-center text-xs">Navigation</div>
          <div className="col-span-1 text-center text-xs">View</div>
          <div className="col-span-1 text-center text-xs">Edit</div>
          <div className="col-span-1 text-center text-xs">Delete</div>
          <div className="col-span-1 text-center text-xs">Add</div>
        </div>

        {/* Permission Rows */}
        {permissions.map((permission, index) => (
          <div
            key={permission.id}
            className={`grid grid-cols-7 items-center px-2 py-1 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"
            }`}
          >
            <div className="col-span-2 text-sm text-left">{permission.module}</div>
            {["canNavigate", "canRead", "canUpdate", "canDelete", "canCreate"].map(
              (key) => (
                <div key={key} className="col-span-1 text-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-red-600 focus:ring-red-500"
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
              )
            )}
          </div>
        ))}
      </div>

      {/* Update Button */}
      <div className="flex justify-end mt-4">
        <Button
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default RoleEditForm;
