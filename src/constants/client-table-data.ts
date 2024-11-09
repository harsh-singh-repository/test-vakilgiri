import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; 

export type User = {
  id: number;
  profileImage: string;
  cltid: string;
  name: string;
  pan: string;
  bussinesses: string;
  projects: string;
  wallet: string;
  manager: string;
  kyc: string;
};

export const fakeUsers = {
  records: [] as User[],

  // Initialize with sample data
  initialize() {
    const sampleUsers: User[] = [
      {
        id: 1,
        profileImage: '', // Replace with actual URL if needed
        cltid: "USR001",
        name: "John Doe",
        pan: "INV001",
        bussinesses: "0",
        projects: "0",
        wallet: "250.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 2,
        profileImage: '', // Replace with actual URL if needed
        cltid: "USR002",
        name: "Jane Smith",
        pan: "INV002",
        bussinesses: "0",
        projects: "0",
        wallet: "500.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 3,
        profileImage: '', // Replace with actual URL if needed
        cltid: "USR003",
        name: "Sam Wilson",
        pan: "INV003",
        bussinesses: "0",
        projects: "0",
        wallet: "750.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 4,
        profileImage: '', 
        cltid: "USR004",
        name: "Alice Brown",
        pan: "INV004",
        bussinesses: "1",
        projects: "1",
        wallet: "1200.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 5,
        profileImage: '', 
        cltid: "USR005",
        name: "Bob Johnson",
        pan: "INV005",
        bussinesses: "2",
        projects: "3",
        wallet: "450.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 6,
        profileImage: '', 
        cltid: "USR006",
        name: "Cathy Adams",
        pan: "INV006",
        bussinesses: "1",
        projects: "2",
        wallet: "680.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 7,
        profileImage: '', 
        cltid: "USR007",
        name: "David Clark",
        pan: "INV007",
        bussinesses: "0",
        projects: "0",
        wallet: "300.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 8,
        profileImage: '', 
        cltid: "USR008",
        name: "Eva Green",
        pan: "INV008",
        bussinesses: "1",
        projects: "1",
        wallet: "820.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 9,
        profileImage: '', 
        cltid: "USR009",
        name: "Frank Lee",
        pan: "INV009",
        bussinesses: "0",
        projects: "1",
        wallet: "100.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 10,
        profileImage: '', 
        cltid: "USR010",
        name: "Grace Hill",
        pan: "INV010",
        bussinesses: "2",
        projects: "4",
        wallet: "940.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 11,
        profileImage: '', 
        cltid: "USR011",
        name: "Henry Ford",
        pan: "INV011",
        bussinesses: "1",
        projects: "2",
        wallet: "310.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 12,
        profileImage: '', 
        cltid: "USR012",
        name: "Isla Fisher",
        pan: "INV012",
        bussinesses: "0",
        projects: "0",
        wallet: "100.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 13,
        profileImage: '', 
        cltid: "USR013",
        name: "Jack Brown",
        pan: "INV013",
        bussinesses: "3",
        projects: "5",
        wallet: "1500.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 14,
        profileImage: '', 
        cltid: "USR014",
        name: "Karen White",
        pan: "INV014",
        bussinesses: "1",
        projects: "1",
        wallet: "400.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 15,
        profileImage: '', 
        cltid: "USR015",
        name: "Larry King",
        pan: "INV015",
        bussinesses: "2",
        projects: "3",
        wallet: "780.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 16,
        profileImage: '', 
        cltid: "USR016",
        name: "Monica Bell",
        pan: "INV016",
        bussinesses: "0",
        projects: "2",
        wallet: "260.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 17,
        profileImage: '', 
        cltid: "USR017",
        name: "Nina Sky",
        pan: "INV017",
        bussinesses: "2",
        projects: "4",
        wallet: "980.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 18,
        profileImage: '', 
        cltid: "USR018",
        name: "Oliver Twist",
        pan: "INV018",
        bussinesses: "0",
        projects: "0",
        wallet: "50.00",
        manager: '',
        kyc: "Incomplete",
      },
      {
        id: 19,
        profileImage: '', 
        cltid: "USR019",
        name: "Paul Newman",
        pan: "INV019",
        bussinesses: "1",
        projects: "1",
        wallet: "670.00",
        manager: '',
        kyc: "Complete",
      },
      {
        id: 20,
        profileImage: '', 
        cltid: "USR020",
        name: "Quincy Jones",
        pan: "INV020",
        bussinesses: "2",
        projects: "3",
        wallet: "890.00",
        manager: '',
        kyc: "Incomplete",
      }
    ];
    

    this.records = sampleUsers;
  },

  // Get all users with optional search
  async getAll({
    search
  }: {
    search?: string;
  }) {
    let users = [...this.records];

    // Search functionality across multiple fields, including 'name'
    if (search) {
      users = matchSorter(users, search, {
        keys: ['name', 'cltid', 'pan', 'manager']
      });
    }

    return users;
  },

  // Get paginated results with optional search
  async getUsers({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const allUsers = await this.getAll({ search });
    const totalUsers = allUsers.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedUsers = allUsers.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_users: totalUsers,
      offset,
      limit,
      users: paginatedUsers
    };
  }
};

// Initialize sample users
fakeUsers.initialize();
