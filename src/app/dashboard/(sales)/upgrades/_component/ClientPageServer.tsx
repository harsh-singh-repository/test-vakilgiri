'use server';

// Define the Project type
export type Project = {
  date: string;
  paymentId: string;
  invoiceId: string;
  business: string;
  project: string;
  amount: string;
  status: string;
};

// Mock data source for projects
const fakeProjects = {
  records: Array.from({ length: 50 }, (_, index) => ({
    date: new Date(Date.now() - Math.random() * 1e10).toISOString().split('T')[0], // Random past date
    paymentId: `UPG${index + 1}`,
    invoiceId: `INV-${index + 1}`,
    business: `Business ${Math.ceil(Math.random() * 5)}`, // Random business
    project: `Project ${Math.ceil(Math.random() * 10)}`, // Random project
    amount: `₹${(Math.random() * 5000).toFixed(2)}`, // Random amount
    status: Math.random() > 0.5 ? "Completed" : "due", // Random status
  })),

  // Method to get all records
  getAll({ search }: { search: string }) {
    return this.records.filter(
      (project) =>
        project.business.toLowerCase().includes(search.toLowerCase()) ||
        project.project.toLowerCase().includes(search.toLowerCase()) ||
        project.paymentId.toLowerCase().includes(search.toLowerCase())
    );
  },

  // Method to get paginated records
  getProjects({ page, limit, search }: { page: number; limit: number; search: string }) {
    const filteredRecords = this.getAll({ search });
    return {
      projects: filteredRecords.slice((page - 1) * limit, page * limit),
      total: filteredRecords.length,
    };
  },
};

// Main server function for handling project data
export async function ProjectPageServer({
  page,
  pageLimit,
  searchValue,
}: {
  page: number;
  pageLimit: number;
  searchValue: string;
}): Promise<{
  projects: Project[];
  totalProjects: number;
  pageCount: number;
}> {
  const totalProjects = fakeProjects.records.length;
  const pageCount = Math.ceil(totalProjects / pageLimit);
  
  // Fetch paginated projects
  const { projects: paginatedProjects, total } = fakeProjects.getProjects({
    page,
    limit: pageLimit,
    search: searchValue,
  });

  return {
    projects: paginatedProjects,
    totalProjects: total,
    pageCount,
  };
}
