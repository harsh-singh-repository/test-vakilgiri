// 'use server'
// import { fakeLeads } from '@/constants/leads-table-data';
// import { Leads } from '@/constants/data';

// type LeadsPageServerProps = {
//   page: number;
//   pageLimit: number;
//   searchValue: string;
// };

// type LeadsPageServerResponse = {
//   employee: Leads[];
//   totalUsers: number;
//   pageCount: number;
// };

// export async function LeadsPageServer({ page, pageLimit, searchValue }: LeadsPageServerProps): Promise<LeadsPageServerResponse> {
//   const totalUsers = 20; // Example fixed value
//   const pageCount = Math.ceil(totalUsers / pageLimit);

//   // Fetch paginated users
//   const { leads: paginatedUsers } = await fakeLeads.getLeads({ page, limit: pageLimit, search: searchValue }) || { users: [] };

//   // If no users were found, use the fallback or default data
//   const fallbackUsers = paginatedUsers.length > 0 ? paginatedUsers : await fakeLeads.getAll({ search: searchValue });

//   // Ensure we have a valid list of employees (use empty array as last resort)
//   // const employee: Leads[] = fallbackUsers.length > 0 ? fallbackUsers : fakeLeads.records;

//   return { employee, totalUsers, pageCount };
// }
