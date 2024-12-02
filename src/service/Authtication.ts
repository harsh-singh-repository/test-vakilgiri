// https://vg-backend-082f56fdbc53.herokuapp.com/api/v1import { DomainStatus } from '../app/(backend)/api/clientdomain/getclientsdomains/route';
import axios from 'axios';
import { useMutation } from 'react-query';

// Define API route constants
const API_ROUTES = {
  LOGIN: '/api/v1/user/login',
};
// https://vg-backend-082f56fdbc53.herokuapp.com/api/v1

export const useValidateLogin = (options = {}) =>
  useMutation(async ({ email, password }: { email: string; password: string }) => {
    const response = await axios.post(`${process.env.API_BASE_URL}${API_ROUTES.LOGIN}`, { email, password });
    return response.data;
  }, options);