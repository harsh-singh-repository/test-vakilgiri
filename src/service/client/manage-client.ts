// THIS IS EXMAPLE
import { ApiResponse, CreateClientData } from '../../types';
import { fetchHandler } from '../../lib/api-utils';
import axiosInstance from '@/lib/axiosInstance';

const CLIENT_API = {
    CREATE: '/client/create-client',
    // EDIT: (id: number) => `/admin/master/edit-user/${id}`,
    // DELETE: (id: number) => `/admin/master/delete-user/${id}`,
    // GET_ALL: '/admin/master/get-users',
    // GET_BY_ID: (id: number) => `/admin/master/get-user/${id}`,
    // GET_CURRENT: '/admin/current-user'
} as const;

export const clientService = {
    // add: (userData: UserPayload) =>
    //     fetchHandler<ApiResponse>(USER_API.ADD, 'POST', userData),

    create: async (clientData: CreateClientData) => {
        return await axiosInstance.post(CLIENT_API.CREATE, clientData);
      },

    // edit: (userId: number, userData: Partial<Omit<UserPayload, 'password'>>) =>
    //     fetchHandler<ApiResponse>(USER_API.EDIT(userId), 'PUT', userData),

    // delete: (userId: number) =>
    //     fetchHandler<ApiResponse>(USER_API.DELETE(userId), 'DELETE'),

    // getAll: () =>
    //     fetchHandler<ApiResponse>(USER_API.GET_ALL, 'GET'),

    // getById: (userId: number) =>
    //     fetchHandler<ApiResponse>(USER_API.GET_BY_ID(userId), 'GET'),

    // getCurrent: () =>
    //     fetchHandler<ApiResponse>(USER_API.GET_CURRENT, 'GET')
};