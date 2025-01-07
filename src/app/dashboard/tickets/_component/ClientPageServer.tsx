'use server'
import { fakeUsers, User } from '@/constants/client-table-data';

type ClientPageServerProps = {
  page: number;
  pageLimit: number;
  searchValue: string;
};

type ClientPageServerResponse = {
  employee: User[];
  totalUsers: number;
  pageCount: number;
};

export async function ClientPageServer({ page, pageLimit, searchValue }: ClientPageServerProps): Promise<ClientPageServerResponse> {
  const totalUsers = 20; // Example fixed value
  const pageCount = Math.ceil(totalUsers / pageLimit);

  // Fetch paginated users
  const { users: paginatedUsers } = await fakeUsers.getUsers({ page, limit: pageLimit, search: searchValue }) || { users: [] };

  // If no users were found, use the fallback or default data
  const fallbackUsers = paginatedUsers.length > 0 ? paginatedUsers : await fakeUsers.getAll({ search: searchValue });

  // Ensure we have a valid list of employees (use empty array as last resort)
  const employee: User[] = fallbackUsers.length > 0 ? fallbackUsers : fakeUsers.records;

  return { employee, totalUsers, pageCount };
}
