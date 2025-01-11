import axios from 'axios';
import { useMutation } from 'react-query';

// Define API route constants
const API_ROUTES = {
  LOGIN: '/api/v1/user/login',
};

export const useValidateLogin = (options = {}) =>
  useMutation(async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${process.env.API_BASE_URL}${API_ROUTES.LOGIN}`, { email, password });
    return response.data;
  }, options);