export interface StaffType {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailStatus: "Verified" | "Unverified";
    panStatus: string | null;
    userRoles: "Client" | "Admin" | "Staff_Manager" | string; // Add more roles if needed
    kycStatus: "Pending" | "Verified" | "Rejected";
    mobileNumber: string;
    dob: Date | null;
    gender: "Male" | "Female" | "Other";
    loginStatus: "Active" | "Inactive";
    creator: [];
    managers: [];
  }
  
  export interface Manager {
    id: string;
    managerType: "ADMIN_STAFF" | string; // Add more manager types if needed
    adminStaff: AdminStaff;
    professional: [];
  }
  
  export interface AdminStaff {
    id: string;
    officialEmail: string | null;
    officialMobile: string | null;
    user: UserDetail;
  }
  
  export interface UserDetail {
    id: string;
    firstName: string;
    lastName: string;
    profilePic: string | null;
    userRoles: string; // Add more roles if needed
  }
  
  