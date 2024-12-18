import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross2Icon } from "@radix-ui/react-icons";
import React from "react";

interface RoleEditProps {
  close: () => void;
}
const RoleEditForm: React.FC<RoleEditProps> = ({ close }) => {
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-xs font-semibold">Role Name</h1>
            <Input placeholder="Backend Developer" className="rounded-xl" />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xs font-semibold">User Type</h1>
            <select
              className="rounded-xl border border-gray-300 p-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select User Type
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-xs font-semibold">Department</h1>
            <select
              className="rounded-xl border border-gray-300 p-2 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Select Department
              </option>
              <option value="Operations">Operations</option>
              <option value="Development">Development</option>
              <option value="Support">Support</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
        </div>
        <button onClick={close} className="stroke-red-600 mb-4">
          <Cross2Icon />
        </button>
      </div>
      <div className="mt-2 w-full rounded-lg shadow-md">
        {/* header row */}
        <div className="grid grid-cols-7 h-6 bg-blue-950 w-full rounded-t-lg text-white items-center px-2 font-medium">
  <div className="col-span-2 text-left text-xs text-white">Permission for</div>
  <div className="col-span-1 text-center text-xs">Navigation</div>
  <div className="col-span-1 text-center text-xs">View</div>
  <div className="col-span-1 text-center text-xs">Edit</div>
  <div className="col-span-1 text-center text-xs">Delete</div>
  <div className="col-span-1 text-center text-xs">Add</div>
</div>

      </div>
      <div className="w-full flex justify-end mt-2">
        <Button className="bg-red-600">Update</Button>
      </div>
    </div>
  );
};

export default RoleEditForm;
