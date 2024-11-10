import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';

export type Business = {
  id: number;
  profileImage: string;
  companyName: string;
  name: string;
  registration: string;
  doi: string;
  estimates: string;
  projects: string;
  manager: string;
  status: string;
};

export const fakeBusinesss = {
    records: [] as Business[],
  
    // Initialize with sample data
    initialize() {
      const sampleBusinesss: Business[] = [
        {
          id: 1,
          profileImage: '', // Replace with actual URL if needed
          companyName: "KARAN (OPC) PRIVATE LIMITED",
          name: "Karan Garg",
          registration: "OPC",
          doi: "01-05-2022",
          estimates: "46647.92",
          projects: "0",
          manager: "Ravi Kumar",
          status: "Active",
        },
        {
          id: 2,
          profileImage: '', // Replace with actual URL if needed
          companyName: "Jane Corp",
          name: "Jane Smith",
          registration: "Private Limited",
          doi: "15-08-2021",
          estimates: "52300.50",
          projects: "1",
          manager: "Anita Sharma",
          status: "Inactive",
        },
        {
          id: 3,
          profileImage: '', // Replace with actual URL if needed
          companyName: "Wilson Trust",
          name: "Sam Wilson",
          registration: "Trust",
          doi: "10-12-2020",
          estimates: "38900.75",
          projects: "0",
          manager: "Manoj Verma",
          status: "Active",
        },
        {
          id: 4,
          profileImage: '',
          companyName: "Alice Foundation",
          name: "Alice Brown",
          registration: "Section -8",
          doi: "25-04-2019",
          estimates: "56000.00",
          projects: "2",
          manager: "Rajesh Patel",
          status: "Active",
        },
        {
          id: 5,
          profileImage: '',
          companyName: "Johnson Group",
          name: "Bob Johnson",
          registration: "Private Limited",
          doi: "12-06-2018",
          estimates: "32000.00",
          projects: "3",
          manager: "Neha Gupta",
          status: "Inactive",
        },
        {
          id: 6,
          profileImage: '',
          companyName: "Cathy Produce",
          name: "Cathy Adams",
          registration: "Produces Limited",
          doi: "30-09-2021",
          estimates: "10606.66", // Set to null if unknown
          projects: "1",
          manager: "Sandeep Mehta",
          status: "Active",
        },
        {
          id: 7,
          profileImage: '',
          companyName: "Clark Services",
          name: "David Clark",
          registration: "Private Limited",
          doi: "11-03-2017",
          estimates: "75000.20",
          projects: "0",
          manager: "Nisha Batra",
          status: "Inactive",
        },
        {
          id: 8,
          profileImage: '',
          companyName: "Green Ventures",
          name: "Eva Green",
          registration: "OPC",
          doi: "05-11-2022",
          estimates: "47500.10",
          projects: "4",
          manager: "Rahul Sinha",
          status: "Active",
        },
        {
          id: 9,
          profileImage: '',
          companyName: "Lee Foundation",
          name: "Frank Lee",
          registration: "Section -8",
          doi: "02-07-2020",
          estimates: "21000.75",
          projects: "0",
          manager: "Kavita Das",
          status: "Inactive",
        },
        {
          id: 10,
          profileImage: '',
          companyName: "Hill Manufacturing",
          name: "Grace Hill",
          registration: "Produces Limited",
          doi: "19-01-2016",
          estimates: "94000.00",
          projects: "3",
          manager: "Vikram Joshi",
          status: "Active",
        }
      ];
  
      this.records = sampleBusinesss;
    },
  
    // Get all businesses with optional search
    async getAll({ search }: { search?: string }) {
      let businesses = [...this.records];
  
      // Search functionality across multiple fields, including 'name'
      if (search) {
        businesses = matchSorter(businesses, search, {
          keys: ['name', 'registration', 'manager', 'status']
        });
      }
  
      return businesses;
    },
  
    // Get paginated results with optional search
    async getBusinesses({
      page = 1,
      limit = 10,
      search
    }: {
      page?: number;
      limit?: number;
      search?: string;
    }) {
      const allBusinesses = await this.getAll({ search });
      const totalBusinesses = allBusinesses.length;
  
      // Pagination logic
      const offset = (page - 1) * limit;
      const paginatedBusinesses = allBusinesses.slice(offset, offset + limit);
  
      // Mock current time
      const currentTime = new Date().toISOString();
  
      // Return paginated response
      return {
        success: true,
        time: currentTime,
        message: 'Sample data for testing and learning purposes',
        total_businesses: totalBusinesses,
        offset,
        limit,
        businesses: paginatedBusinesses
      };
    }
  };
  
  // Initialize sample businesses
  fakeBusinesss.initialize();
  