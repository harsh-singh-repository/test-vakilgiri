// Interface for Service Category
interface ServiceCategory {
    name: string;
    code: string;
  }
  
  // Interface for the Creator
  interface Creator {
    firstName: string;
    lastName: string;
    email: string;
    userRoles: string;
  }
  
  // Interface for each Service in the response
  export interface Service {
    id: string;
    name: string;
    category_id: string;
    icon_url: string;
    description: string;
    working_days: string;
    status: string;
    createdAt: string;
    modifiedAt: string;
    creatorId: string;
    creator: Creator;
    category: ServiceCategory[];
  }
  
  // Interface for the full response
  export interface ServiceResponse {
    statusCode: number;
    data: Service[];
    message: string;
    success: boolean;
    errors: any[];
  }
  
  // Service type to use on the frontend (with icon URL constructed)
  export type Services = {
    Icon: string;          
    id:string;
    ServiceId: string;      
    ServiceName: string;    
    projects: number;   
    workingDays:string;    
    active: boolean;        
    status: "Active" | "Inactive";  
    description:string;  
    categoryId:string;   
  };
  
  export type Category = {
    id: string;
    Icon: string;
    code: string;
    name: string;
    description: string;
  };
  
  export type CategoryResponse = {
    statusCode: number;
    data: {
      id: string;
      name: string;
      icon_url: string;
      code: string;
      description: string;
      status: string;
      creatorId: string;
      creator: {
        firstName: string;
        lastName: string;
        email: string;
        userRoles: string;
      };
    }[];
    message: string;
    success: boolean;
    errors: any[];
  };