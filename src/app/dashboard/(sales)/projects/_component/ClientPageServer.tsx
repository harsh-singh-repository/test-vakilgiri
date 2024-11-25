'use server';
import { fakeUsers, User } from '@/constants/client-table-data';
import { Client } from '@/constants/data';

type ClientPageServerProps = {
  page: number;
  pageLimit: number;
  searchValue: string;
};

type ClientPageServerResponse = {
  employee: Client[];
  totalUsers: number;
  pageCount: number;
};

// Mapping function to convert User to Client
const mapUserToClient = (user: User): Client => ({
  id: user.id || Date.now(), // Use the existing ID or generate one
  firstName: user.firstName || 'Unknown', // Default firstName
  lastName: user.lastName || 'Unknown', // Default lastName
  profileImage: user.profileImage || 'default-profile.png', // Default profile image
  cltid: user.cltid || 'N/A', // Default client ID
  pan: user.pan || 'N/A', // Default PAN
  bussinesses: user.bussinesses || 'No businesses', // Join businesses if array
  projects: user.projects || 'No projects', // Join projects if array
  wallet: user.wallet || 'Emplty', // Default wallet value
  manager: user.manager || 'N/A', // Default manager
  kyc: user.kyc ? 'Verified' : 'Not Verified', // Transform boolean to string
});

export async function ClientPageServer({
  page,
  pageLimit,
  searchValue,
}: ClientPageServerProps): Promise<ClientPageServerResponse> {
  const totalUsers = 20; // Example fixed value
  const pageCount = Math.ceil(totalUsers / pageLimit);

  // Fetch paginated users
  const { users: paginatedUsers } = (await fakeUsers.getUsers({
    page,
    limit: pageLimit,
    search: searchValue,
  })) || { users: [] };

  // If no users were found, use the fallback or default data
  const fallbackUsers =
    paginatedUsers.length > 0 ? paginatedUsers : await fakeUsers.getAll({ search: searchValue });

  // Transform User[] to Client[]
  const employees: Client[] = (fallbackUsers.length > 0 ? fallbackUsers : fakeUsers.records).map(
    mapUserToClient
  );

  return { employee: employees, totalUsers, pageCount };
}
