export interface UserTypes{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    emailStatus: string;
    panStatus: string | null;
    userRoles: string;
    mobileNumber:string;
    loginStatus:"Active"|"Inactive"|"None",
}
