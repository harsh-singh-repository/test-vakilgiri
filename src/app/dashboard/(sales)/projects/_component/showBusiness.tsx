"use client";
import axios from "axios";
import { getSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

// Define types for the business data structure
interface Creator {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userRoles: string;
}

interface Manager {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ContactPerson {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface BusinessUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
}

interface BusinessData {
  id: string;
  about: string | null;
  authCapital: string | null;
  businessAddress1: string;
  businessAddress2: string;
  businessLogo: string;
  businessMobile: string;
  businessEmail: string;
  businessName: string;
  businessPan: string | null;
  businessPincode: string;
  businessRegDate: string;
  businessRegNo: string;
  businessStatus: string | null;
  businessType: string;
  businessWebsite: string | null;
  city: string;
  contactPersonId: string;
  createdFromLeadId: string | null;
  fbLink: string | null;
  instaLink: string | null;
  officialEmail: string | null;
  paidUpCapital: string | null;
  pan: string | null;
  panStatus: string | null;
  state: string;
  twitterLink: string | null;
  creatorId: string;
  modifiedAt: string;
  createdAt: string;
  slug: string | null;
  isDisabled: boolean;
  creator: Creator;
  managers: Manager[];
  contactPerson: ContactPerson;
  businessUsers: BusinessUser[];
}

interface ShowBusinessProps {
  id: string;
}

const ShowBusiness: React.FC<ShowBusinessProps> = ({ id }) => {
  const [business, setBusiness] = useState<BusinessData | null>(null); // State to store business data

  useEffect(() => {
    const getBusinessById = async () => {
      try {
        const session=await getSession();
        const token = session?.user.accessToken;
        const response = await axios.get<{ data: BusinessData }>(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/business/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setBusiness(response.data.data);
      } catch (error) {
        console.error("Error fetching business data", error);
      }
    };

    getBusinessById();
  }, [id]);

  return (
    <div className="text-[14px] text-[#f21300] font-poppins cursor-pointer">
        {business?.businessName.toUpperCase()}
    </div>
  );
};

export default ShowBusiness;
