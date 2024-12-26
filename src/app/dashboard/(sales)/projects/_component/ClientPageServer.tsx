// 'use server';

// import { Client } from '@/constants/data';
// import axiosInstance from '@/lib/axiosInstance';
// import { getSession } from 'next-auth/react';

// type ClientPageServerProps = {
//   page: number;
//   pageLimit: number;
//   searchValue: string;
// };

// type ClientPageServerResponse = {
//   clients: Client[];
//   totalUsers: number;
//   pageCount: number;
// };

// // Function to map project data to client data
// const mapProjectToClient = (project: any): Client => ({
//   id: project.projectContactPerson?.id || 'N/A',
//   firstName: project.projectContactPerson?.firstName || 'Unknown',
//   lastName: project.projectContactPerson?.lastName || 'Unknown',
//   profileImage: project.projectContactPerson?.profilePic || 'default-profile.png',
//   cltid: project.businessId || 'N/A',
//   pan: project.projectContactPerson?.pan || 'N/A',
//   bussinesses: project.projectState || 'No business details',
//   projects: project.projectDescription || 'No project description',
//   wallet: project.projectTaxAmount?.toString() || 'Empty',
//   manager: project.projectContactPerson?.managerId || 'N/A',
//   kyc: project.projectContactPerson?.kycStatus || 'Not Verified',
// });

// export async function ClientPageServer({
//   page,
//   pageLimit,
//   searchValue,
// }: ClientPageServerProps): Promise<ClientPageServerResponse> {
//   try {
//     // Get session to fetch user access token
//     const session = await getSession();
//     if (!session?.user?.accessToken) {
//       throw new Error('Authentication failed. Access token is missing.');
//     }

//     const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/projects?page=${page}&limit=${pageLimit}&search=${encodeURIComponent(
//       searchValue
//     )}`;

//     // // Set Authorization header
//     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${session.user.accessToken}`;

//     // Fetch projects data from API
//     const response = await axiosInstance.get(apiUrl);

//     if (response.status !== 200) {
//       throw new Error(`Failed to fetch projects (Status: ${response.status})`);
//     }

//     const { data: projects, message, success } = response.data;

//     if (!success) {
//       throw new Error(message || 'Failed to fetch projects');
//     }

//     // Map projects to client data
//     const clients = projects.map(mapProjectToClient);

//     const totalUsers = projects.length; // Total number of users from the fetched data
//     const pageCount = Math.ceil(totalUsers / pageLimit);

//     return {
//       clients,
//       totalUsers,
//       pageCount,
//     };
//   } catch (error: any) {
//     console.error('Error fetching projects:', error.message || error);
//     return {
//       clients: [],
//       totalUsers: 0,
//       pageCount: 0,
//     };
//   }
// }
