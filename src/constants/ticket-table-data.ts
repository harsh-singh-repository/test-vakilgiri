// Import necessary dependencies
'use client';
import { matchSorter } from 'match-sorter';

export type Ticket = {
  id: number;
  profileImage: string;
  ticketId: string;
  date: string;
  firstName: string;
  lastName: string;
  category: string;
  subject: string;
  manager: string;
  status: string;
};

export const fakeTickets = {
  records: [] as Ticket[],

  // Initialize with sample data
  initialize() {
    const sampleTickets: Ticket[] = [
      {
        id: 1,
        profileImage: '', // Replace with actual URL if needed
        ticketId: 'TKT001',
        date: '2023-03-01',
        firstName: 'John',
        lastName: 'Doe',
        category: 'Technical',
        subject: 'Login issue',
        manager: 'Alice Brown',
        status: 'Open',
      },
      {
        id: 2,
        profileImage: '',
        ticketId: 'TKT002',
        date: '2023-03-02',
        firstName: 'Jane',
        lastName: 'Smith',
        category: 'Billing',
        subject: 'Payment issue',
        manager: 'Bob Johnson',
        status: 'Closed',
      },
      {
        id: 3,
        profileImage: '',
        ticketId: 'TKT003',
        date: '2023-03-03',
        firstName: 'Sam',
        lastName: 'Wilson',
        category: 'General',
        subject: 'Account details',
        manager: 'Cathy Adams',
        status: 'Pending',
      },
      {
        id: 4,
        profileImage: '',
        ticketId: 'TKT004',
        date: '2023-03-04',
        firstName: 'Alice',
        lastName: 'Brown',
        category: 'Technical',
        subject: 'Bug report',
        manager: 'David Clark',
        status: 'In Progress',
      },
      {
        id: 5,
        profileImage: '',
        ticketId: 'TKT005',
        date: '2023-03-05',
        firstName: 'Bob',
        lastName: 'Johnson',
        category: 'Billing',
        subject: 'Refund request',
        manager: 'Eva Green',
        status: 'Resolved',
      },
    ];

    this.records = sampleTickets;
  },

  // Get all Tickets with optional search
  async getAll({
    search
  }: {
    search?: string;
  }) {
    let Tickets = [...this.records];

    // Search functionality across multiple fields, including 'firstName', 'lastName', 'manager'
    if (search) {
      Tickets = matchSorter(Tickets, search, {
        keys: ['firstName', 'lastName', 'ticketId', 'manager', 'category', 'subject']
      });
    }

    return Tickets;
  },

  // Get paginated results with optional search
  async getTickets({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const allTickets = await this.getAll({ search });
    const totalTickets = allTickets.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedTickets = allTickets.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_Tickets: totalTickets,
      offset,
      limit,
      Tickets: paginatedTickets
    };
  }
};

// Initialize sample Tickets
fakeTickets.initialize();
