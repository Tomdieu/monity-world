"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Filter,
  RotateCcw,
  Heart,
  Bookmark,
  BadgeCheck,
  MapPin,
  Verified,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

interface ProjectTag {
  name: string;
  type: "category" | "feature";
}

interface Project {
  id: string;
  title: string;
  location: string;
  isVerified: boolean;
  description: string;
  tags: ProjectTag[];
  amountRequired: number;
  donations: number;
  amountDonated: number;
  leftOver: number;
  postedTime: string;
}

interface ProjectsListProps {
  projects: Project[];
  className?: string;
  isApprove?: boolean;
}

const Filters: React.FC<{
  onFilterChange: (type: string, value: string) => void;
  onReset: () => void;
}> = ({ onFilterChange, onReset }) => {
  const [filters, setFilters] = React.useState({
    projectType: "",
    location: "",
    status: "",
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
    onFilterChange(type, value);
  };

  return (
    <div className="flex items-center gap-4 p-2 bg-white rounded-lg">
      <div className="flex items-center gap-2">
        <Filter className="size-4 text-gray-500" />
        <span className="text-gray-600">Filter By</span>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={filters.projectType}
          onValueChange={(value) => handleFilterChange("projectType", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Project Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agriculture">Agriculture</SelectItem>
            <SelectItem value="farming">Farming</SelectItem>
            <SelectItem value="environmental">Environmental</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.location}
          onValueChange={(value) => handleFilterChange("location", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bafoussam">Bafoussam</SelectItem>
            <SelectItem value="douala">Douala</SelectItem>
            <SelectItem value="yaounde">Yaounde</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(value) => handleFilterChange("status", value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        variant="ghost"
        className="text-red-500 ml-auto"
        onClick={() => {
          setFilters({
            projectType: "",
            location: "",
            status: "",
          });
          onReset();
        }}
      >
        <RotateCcw className="size-4 mr-2" />
        Reset Filter
      </Button>
    </div>
  );
};

const ProjectCard: React.FC<{ project: Project; isApprove?: boolean }> = ({
  project,
  isApprove = true,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 space-y-4 border-t border-primary">
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
            <span>Posted {project.postedTime}</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link
                href={`/dashboard/projects/${!isApprove ? "pending/" : ""}${
                  project.id
                }`}
                className=""
              >
                <h3
                  className={cn(
                    "text-lg font-semibold",
                    !isApprove && "text-orange-600"
                  )}
                >
                  {project.title}
                </h3>
              </Link>

              {project.isVerified && (
                <BadgeCheck className="size-4 text-blue-500" />
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="size-4 text-primary" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center">
                <Verified className="size-4 text-primary" />
                <span>Verify Profile</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-0.5">
          <Button variant="ghost" size="icon">
            <Heart className="size-5 text-primary" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bookmark className="size-5 text-primary" />
          </Button>
        </div>
      </div>

      <p className="text-gray-600">{project.description}</p>
      <Link href={"#"} className="text-primary underline">
        More
      </Link>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "px-3 py-1 rounded-full text-sm border",
              tag.type === "category"
                ? "bg-gray-50 text-gray-600"
                : "bg-blue-50 text-blue-600"
            )}
          >
            {tag.name}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-4 gap-4 p-4 rounded-lg">
        <div className="p-2.5 px-3 rounded-lg border py-2 flex flex-col gap-5 bg-primary/5">
          <span className="text-sm text-gray-500 block mb-1">
            Amount required
          </span>
          <span className="font-semibold text-lg">
            {project.amountRequired.toLocaleString()} XAF
          </span>
        </div>
        <div className="p-2.5 px-3 rounded-lg border py-2 flex flex-col gap-5 bg-gray-50">
          <span className="text-sm text-gray-500 block mb-1">Donations</span>
          <span className="font-semibold text-lg">{project.donations}</span>
        </div>
        <div className="p-2.5 px-3 rounded-lg border py-2 flex flex-col gap-5 bg-green-50">
          <span className="text-sm text-gray-500 block mb-1">
            Amount donated
          </span>
          <span className="font-semibold text-lg">
            {project.amountDonated.toLocaleString()} XAF
          </span>
        </div>
        <div className="p-2.5 px-3 rounded-lg border py-2 flex flex-col gap-5 bg-red-50">
          <span className="text-sm text-gray-500 block mb-1">Left over</span>
          <span className="font-semibold text-lg">
            {project.leftOver.toLocaleString()} XAF
          </span>
        </div>
      </div>
    </div>
  );
};

const ProjectsList: React.FC<ProjectsListProps> = ({
  projects,
  className,
  isApprove,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <div className={cn("space-y-4 h-full", className)}>
      {/* Search */}
      <div className="flex gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="search user ID or Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white px-8 rounded-full">
          Search
        </Button>
      </div>

      {/* Filters */}
      <Filters
        onFilterChange={(type, value) => console.log(type, value)}
        onReset={() => console.log("Reset filters")}
      />

      {/* Projects List */}
      <div className="space-y-4 p-2 bg-white">
        {projects.map((project) => (
          <ProjectCard
            isApprove={isApprove}
            key={project.id}
            project={project}
          />
        ))}
      </div>
    </div>
  );
};

// Sample Data
export const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Fish Farming business",
    location: "Bafoussam",
    isVerified: true,
    description:
      "Our project focuses on sustainable fish farming to meet the growing demand for fresh, high-quality fish while preserving natural resources. By using eco-",
    tags: [
      { name: "Agriculture", type: "category" },
      { name: "Farming", type: "category" },
      { name: "small business", type: "category" },
      { name: "Environmental", type: "category" },
    ],
    amountRequired: 300000,
    donations: 3,
    amountDonated: 29000,
    leftOver: 20000,
    postedTime: "3 hours ago",
  },
  {
    id: "2",
    title: "Fish Farming business",
    location: "Bafoussam",
    isVerified: true,
    description:
      "Our project focuses on sustainable fish farming to meet the growing demand for fresh, high-quality fish while preserving natural resources. By using eco-",
    tags: [
      { name: "Agriculture", type: "category" },
      { name: "Farming", type: "category" },
      { name: "small business", type: "category" },
      { name: "Environmental", type: "category" },
    ],
    amountRequired: 300000,
    donations: 3,
    amountDonated: 29000,
    leftOver: 20000,
    postedTime: "3 hours ago",
  },
  {
    id: "3",
    title: "Fish Farming business",
    location: "Bafoussam",
    isVerified: true,
    description:
      "Our project focuses on sustainable fish farming to meet the growing demand for fresh, high-quality fish while preserving natural resources. By using eco-",
    tags: [
      { name: "Agriculture", type: "category" },
      { name: "Farming", type: "category" },
      { name: "small business", type: "category" },
      { name: "Environmental", type: "category" },
    ],
    amountRequired: 300000,
    donations: 3,
    amountDonated: 29000,
    leftOver: 20000,
    postedTime: "3 hours ago",
  },
  // Add more sample projects as needed
];

export default ProjectsList;
