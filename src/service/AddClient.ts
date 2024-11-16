import axios from "axios";
import { useSession } from "next-auth/react";
import { useMutation, UseMutationOptions } from "react-query";
// Define the client data interface

interface CreateClientData {
  First_Name: string;
  Last_Name: string;
  PAN: string;
  email: string;
  gender: "Male" | "Female" | "Other";
  Mobile_Number: string;
  City: string;
  State: string;
  Pincode: string;
  Address_1: string;
  Alternate_Mobile_Number?: string; // Optional
  Address_2?: string; // Optional
  Aadhaar?: string; // Optional
  sendMailToClient: boolean;
}

const getSessionCookie = () => {
  const cookies = document.cookie.split("; ");
  const sessionCookie = cookies.find((cookie) =>
    cookie.startsWith("a_session_console_legacy=")
  );

  if (sessionCookie) {
    return sessionCookie.split("=")[1]; // Extract the value of __session cookie
  }
  return null;
};


// Custom hook for creating a client
export const useCreateClient = (
  options: UseMutationOptions<any, Error, CreateClientData> = {}
) =>
  useMutation(async (clientData: CreateClientData) => {
    // if (!sessionToken) {
    //     throw new Error("Not authenticated");
    // }
    try {
      const response = await axios.post(
        `https://vg-backend-082f56fdbc53.herokuapp.com/api/v1/client/create-client`
        // clientData,{
        //     headers:{
        //         "Authorization": `Bearer ${sessionToken}`
        //     }
        // }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  }, options);
