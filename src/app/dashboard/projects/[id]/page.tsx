"use client"

import React from "react";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  BadgeCheck,
  Flag,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ProjectDetailProps {
  project: {
    tags: string[];
    stats: {
      amountRequired: number;
      amountDonated: number;
      donations: number;
      leftOver: number;
    };
    images: string[];
  };
  user: {
    name: string;
    avatar: string;
    isVerified: boolean;
    location: string;
    phone: string;
    email: string;
    sex: string;
    profession: string;
    niu: string;
    cni: string;
  };
  onReturn?: () => void;
  className?: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  project,
  user,
  onReturn,
  className,
}) => {
  return (
    <div className={cn("max-w-5xl mx-auto p-6", className)}>
      {/* Return Button */}
      <Button
        variant="ghost"
        onClick={onReturn}
        className="mb-6 hover:bg-blue-50 text-blue-500"
      >
        <ArrowLeft className="size-4 mr-2" />
        Return
      </Button>

      {/* Project Tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 bg-blue-50 text-blue-500 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500 block mb-1">Amount required</span>
          <span className="text-lg font-semibold">
            {project.stats.amountRequired.toLocaleString()} XAF
          </span>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500 block mb-1">Amount donated</span>
          <span className="text-lg font-semibold text-blue-500">
            {project.stats.amountDonated.toLocaleString()} XAF
          </span>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-gray-500 block mb-1">Donations</span>
              <span className="text-lg font-semibold">{project.stats.donations}</span>
            </div>
            <Button variant="secondary" size="sm">
              See donors
            </Button>
          </div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <span className="text-sm text-gray-500 block mb-1">Left over</span>
          <span className="text-lg font-semibold text-red-500">
            {project.stats.leftOver.toLocaleString()} XAF
          </span>
        </div>
      </div>

      {/* Business Plan Button */}
      <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white mb-8">
        See full bussines plan
        <ExternalLink className="size-4 ml-2" />
      </Button>

      {/* Image Gallery */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {project.images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden",
              index === project.images.length - 1 && "bg-gray-900"
            )}
          >
            <Image
              src={image}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === project.images.length - 1 && (
              <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-lg">
                See all
              </div>
            )}
          </div>
        ))}
      </div>

      {/* User Profile Section */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Column - Avatar and Basic Info */}
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <Image
                src={user.avatar}
                alt={user.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            {user.isVerified && (
              <div className="absolute bottom-1 right-1 bg-emerald-500 rounded-full p-1">
                <BadgeCheck className="size-5 text-white" />
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold mt-3">{user.name}</h2>
          <p className="text-sm text-gray-500">@{user.name.toLowerCase().replace(' ', '')}</p>
        </div>

        {/* Middle Column - Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="size-4" />
            <span>{user.location}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="size-4" />
            <span>{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="size-4" />
            <span>{user.email}</span>
          </div>
        </div>

        {/* Right Column - Additional Info and Actions */}
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-500">Sex:</span>
            <span className="ml-2">{user.sex}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">Profession:</span>
            <span className="ml-2 text-blue-500">{user.profession}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">NIU:</span>
            <span className="ml-2">{user.niu}</span>
          </div>
          <div>
            <span className="text-sm text-gray-500">CNI:</span>
            <span className="ml-2">{user.cni}</span>
          </div>
          <Button variant="secondary" className="w-full">
            See profile
          </Button>
        </div>
      </div>

      {/* Flag Alert Section */}
      <div className="mt-6 bg-emerald-50 border border-emerald-100 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flag className="size-4 text-emerald-600" />
            <span className="font-medium text-emerald-600">Flag alert!</span>
          </div>
          <Button variant="ghost" className="text-emerald-600 hover:bg-emerald-100">
            Know more
          </Button>
        </div>
        <p className="mt-1 text-sm text-emerald-600">
          Everything seems to be okay here
        </p>
        <p className="text-xs text-emerald-500 mt-1">
          We found nothing fishy
        </p>
      </div>
    </div>
  );
};

// Sample Data
export const sampleProjectDetail = {
  project: {
    tags: ["Agriculture", "Farming", "small business", "Environmental"],
    stats: {
      amountRequired: 300000,
      amountDonated: 29000,
      donations: 3,
      leftOver: 20000
    },
    images: [
      "/image1.jpg",
      "/image2.jpg",
      "/image3.jpg",
      "/image4.jpg",
      "/image5.jpg"
    ]
  },
  user: {
    name: "Nguh Fabrice",
    avatar: "/avatar.jpg",
    isVerified: true,
    location: "Douala, Cameroon",
    phone: "+91 7048144030",
    email: "yghori@asite.com",
    sex: "M",
    profession: "Etudiante",
    niu: "155xs4×3245xc4",
    cni: "155xs4×3245xc4"
  }
};


function ProjectDetailPage(){

    return (
        <ProjectDetail project={sampleProjectDetail.project} user={sampleProjectDetail.user}    />
    )
}


export default ProjectDetailPage