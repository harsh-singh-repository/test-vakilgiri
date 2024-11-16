import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter';

export type Leads = {
  leadId: number;
  date: string;
  service: string;
  businessOrClient: string;
  companyName: string | null;
  mobile: string;
  value: string;
  assigned: string;
  convertedOn: string | null;
  status: string;
};

export const fakeLeads = {
  records: [] as Leads[],

  // Initialize with sample data
  initialize() {
    const sampleLeads: Leads[] = [
      {
        leadId: 1,
        date: "12-11-2024",
        service: "ISO Certification",
        businessOrClient: "Karan Garg",
        companyName: "VAKILGIRI LEDTECH (INDIA)",
        mobile: "123567890",
        value: "10000",
        assigned: "",
        convertedOn: null,
        status: "New",
      },
      {
        leadId: 2,
        date: "10-11-2024",
        service: "Digital Marketing",
        businessOrClient: "Arjun Patel",
        companyName: "Market Solutions Ltd",
        mobile: "9876543210",
        value: "20000",
        assigned: "John Doe",
        convertedOn: "11-11-2024",
        status: "Converted",
      },
      {
        leadId: 3,
        date: "08-11-2024",
        service: "Web Development",
        businessOrClient: "Sara Khan",
        companyName: "Tech Innovators",
        mobile: "9988776655",
        value: "15000",
        assigned: "",
        convertedOn: null,
        status: "Contacted",
      },
      {
        leadId: 4,
        date: "07-11-2024",
        service: "App Development",
        businessOrClient: "Vikram Joshi",
        companyName: "Appify Solutions",
        mobile: "8899001122",
        value: "30000",
        assigned: "Jane Smith",
        convertedOn: "09-11-2024",
        status: "Converted",
      },
      {
        leadId: 5,
        date: "05-11-2024",
        service: "Legal Services",
        businessOrClient: "Anita Sharma",
        companyName: "Legal Ease",
        mobile: "7766554433",
        value: "18000",
        assigned: "Rahul Sinha",
        convertedOn: null,
        status: "New",
      },
      {
        leadId: 6,
        date: "04-11-2024",
        service: "Accounting",
        businessOrClient: "Manoj Verma",
        companyName: "Finance Experts",
        mobile: "9988007766",
        value: "12000",
        assigned: "",
        convertedOn: null,
        status: "Disqualified",
      },
      {
        leadId: 7,
        date: "02-11-2024",
        service: "Tax Filing",
        businessOrClient: "Neha Gupta",
        companyName: "Tax Solutions",
        mobile: "6655443322",
        value: "16000",
        assigned: "Rajesh Patel",
        convertedOn: "05-11-2024",
        status: "Converted",
      },
      {
        leadId: 8,
        date: "01-11-2024",
        service: "Graphic Design",
        businessOrClient: "Sandeep Mehta",
        companyName: "Creative Hub",
        mobile: "5544332211",
        value: "25000",
        assigned: "",
        convertedOn: null,
        status: "Contacted",
      },
      {
        leadId: 9,
        date: "30-10-2024",
        service: "Content Writing",
        businessOrClient: "Nisha Batra",
        companyName: "Write Solutions",
        mobile: "4433221100",
        value: "13000",
        assigned: "Kavita Das",
        convertedOn: "01-11-2024",
        status: "Converted",
      },
      {
        leadId: 10,
        date: "29-10-2024",
        service: "SEO Services",
        businessOrClient: "Rahul Sinha",
        companyName: "Search Masters",
        mobile: "3322110099",
        value: "19000",
        assigned: "",
        convertedOn: null,
        status: "New",
      },
    ];

    this.records = sampleLeads;
  },

  // Get all leads with optional search
  async getAll({ search }: { search?: string }) {
    let leads = [...this.records];

    // Search functionality across multiple fields
    if (search) {
      leads = matchSorter(leads, search, {
        keys: ['businessOrClient', 'service', 'companyName', 'status']
      });
    }

    return leads;
  },

  // Get paginated results with optional search
  async getLeads({
    page = 1,
    limit = 10,
    search
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const allLeads = await this.getAll({ search });
    const totalLeads = allLeads.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedLeads = allLeads.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      totalLeads,
      offset,
      limit,
      leads: paginatedLeads
    };
  }
};

// Initialize sample leads
fakeLeads.initialize();
