"use client";
import React, { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { columns } from "./columns";
import { useSearchParams } from "next/navigation";
import ProjectCreate from "./projectCreate";
import { projectServices } from "../services/manage-projects";
import { Project } from "../types";
import ProjectCard from "./client-card";
import { ProjectTable } from "./client-table";
import Modal from "@/components/model/custom-modal";

// Define the response structure for projects
type ResponseData = {
  projects: Project[];
  totalProjects: number;
  pageCount: number;
};

export default function ProjectPage() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;
  const pageLimit = searchParams.get("limit") ? Number(searchParams.get("limit")) : 10;
  const [searchValue, setSearchValue] = useState(searchParams.get("search") || "");
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Fetch data using projectServices
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await projectServices.getAll();
        const modifiedData = data.map((dt, index) => ({
          ...dt,
          code: `P${String(index + 1).padStart(3, '0')}`, // Generate code like P001, P002, etc.
        }));
        setResponseData({
          projects: modifiedData,
          totalProjects: data.length,
          pageCount: Math.ceil(data.length / pageLimit),
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        setResponseData(null);
      }
    };

    fetchData();
  }, [page, pageLimit, searchValue]);

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("page", String(newPage));
    window.history.pushState({}, "", "?" + newSearchParams.toString());
  };

  if (!responseData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <img
          src="/favicon.ico"
          alt="Loading"
          className="w-12 h-12"
          style={{
            animation: "blurInOut 2s infinite ease-in-out",
          }}
        />
        <style jsx>{`
          @keyframes blurInOut {
            0%,{
            filter: blur(2px);
              opacity: 1;
            }
            100% {
              filter: blur(4px);
              opacity: 0.3;
            }
            50% {
              filter: blur(2px);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-1 p-4 pt-6 md:p-4">
      <div className="flex items-start justify-between">
        <div className="text-[20px] font-bold text-[#042559] ml-1">
          {`Projects (${responseData.totalProjects})`}
        </div>
        <div className="flex justify-center items-center gap-4">
          <Input
            placeholder="Search project..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full md:max-w-sm ml-auto bg-white"
          />
          <div
            className="bg-[#f21300] text-white p-1 rounded-md cursor-pointer"
            onClick={handleOpenModal}
          >
            <Plus strokeWidth={5} className="h-6 w-6" />
          </div>
        </div>
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <ProjectCreate close={handleCloseModal} />
          </Modal>
        )}
      </div>
      <Separator />
      <ProjectCard/>
      <Separator />
      <ProjectTable
        searchKey="search"
        searchValue={searchValue}
        pageNo={page}
        columns={columns}
        totalItems={responseData.totalProjects}
        data={responseData.projects}
        pageCount={responseData.pageCount}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

