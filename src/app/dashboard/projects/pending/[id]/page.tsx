"use client";

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
import Link from "next/link";
import { useRouter } from "next/navigation";

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
    <div className={cn("w-full p-6 pb-11", className)}>
      {/* Return Button */}
      <Button
        variant="ghost"
        onClick={onReturn}
        className="mb-6 hover:bg-blue-50 text-muted-foreground"
      >
        <ArrowLeft className="size-4 mr-2 text-primary" />
        Return
      </Button>

      {/* Project Tags */}
      <div className="flex flex-wrap gap-3 mb-8">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="px-4 py-2 border border-primary bg-primary/5 text-primary font-semibold rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Project Stats */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="bg-blue-50 flex flex-col gap-3 px-5 py-3 rounded-xl border-2">
          <span className="text-sm text-black/80 block mb-1">
            Amount required
          </span>
          <span className="text-2xl font-semibold">
            {project.stats.amountRequired.toLocaleString()} XAF
          </span>
        </div>

        <div className="bg-primary/5 flex flex-col gap-3 px-5 py-3 rounded-xl">
          <span className="text-sm text-primary font-light block mb-1">
            Amount donated
          </span>
          <span className="text-2xl font-semibold text-primary">
            {project.stats.amountDonated.toLocaleString()} XAF
          </span>
        </div>

        <div className="bg-gray-50 flex flex-col gap-3 px-5 py-3 rounded-xl border-2">
          <span className="text-sm text-gray-500 block">Donations</span>
          <div className="flex flex-col">
            <div className="flex gap-5 items-center justify-between">
              <span className="text-2xl font-semibold">
                {project.stats.donations}
              </span>
              <Button
                className="w-fit rounded-full bg-gray-400 text-white font-semibold"
                size="sm"
              >
                See donors
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-red-50 flex flex-col gap-3 px-5 py-3 rounded-xl">
          <span className="text-sm text-gray-500 block mb-1">Left over</span>
          <span className="text-2xl font-semibold">
            {project.stats.leftOver.toLocaleString()} XAF
          </span>
        </div>
      </div>

      {/* Business Plan Button */}
      <Button
        size={"lg"}
        className="w-full bg-primary hover:bg-primary/95 text-white mb-8"
      >
        See full bussines plan
        <ExternalLink className="size-4 ml-2" />
      </Button>

      {/* Image Gallery */}
      <div className="grid sm:grid-cols-3 md:grid-cols-3 xl:grid-cols-5 gap-2 mb-8">
        {project.images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "relative aspect-square rounded-xl overflow-hidden",
              index === project.images.length - 1 && ""
            )}
          >
            <Image
              src={image}
              alt={`Project image ${index + 1}`}
              fill
              className="object-cover"
            />
            {index === project.images.length - 1 && (
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white font-semibold text-lg">
                <Link href={"#"} className="font-semibold text-xl">
                  See all
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* User Profile Section */}
        <div className="grid grid-cols-3 p-3 py-4 col-span-9 gap-8 border rounded-md shadow-md">
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
            <p className="text-sm text-gray-500">
              @{user.name.toLowerCase().replace(" ", "")}
            </p>
          </div>

          {/* Middle Column - Contact Info */}
          <div className="space-y-4 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="size-4 text-primary" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="size-4 text-primary" />
              <span>{user.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="size-4 text-primary" />
              <span>{user.email}</span>
            </div>
          </div>

          {/* Right Column - Additional Info and Actions */}
          <div className="space-y-4">
            <div>
              <span className="text-sm text-gray-500">Sex:</span>
              <span className="ml-2 text-primary">{user.sex}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">Profession:</span>
              <span className="ml-2 text-primary">{user.profession}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">NIU:</span>
              <span className="ml-2">{user.niu}</span>
            </div>
            <div>
              <span className="text-sm text-gray-500">CNI:</span>
              <span className="ml-2">{user.cni}</span>
            </div>
            <Button className="w-full bg-gray-400 text-white">
              See profile
            </Button>
          </div>
        </div>

        {/* Flag Alert Section */}
        <div className="h-fit col-span-3 bg-emerald-50 border border-emerald-100 rounded-lg">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-between gap-2 bg-emerald-600 w-full p-2 rounded-t-lg">
              <span className="font-medium text-white">Flag alert!</span>

              <Image
                src={"/icons/flag-green.svg"}
                alt="flag"
                className="w-7 h-7"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 p-3">
          <p className="mt-1 text-sm text-black">
            Everything seems to be okay here
          </p>
          <p className="text-xs/3 text-emerald-500 mt-1">
            We found nothing fishy
          </p>
          </div>
        </div>
      </div>
      <div className="flex items-center  justify-center gap-5 py-5">
            <Button size={"lg"} variant={"destructive"}>Decline Project</Button>
            <Button size={"lg"} variant={"success"}>Approve Project</Button>
      
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
      leftOver: 20000,
    },
    images: [
      "/images/img2.svg",
      "/images/img2.svg",
      "/images/img2.svg",
      "/images/img2.svg",
      "/images/img2.svg",
    ],
  },
  user: {
    name: "Nguh Fabrice",
    avatar: "/images/img2.svg",
    isVerified: true,
    location: "Douala, Cameroon",
    phone: "+91 7048144030",
    email: "yghori@asite.com",
    sex: "M",
    profession: "Etudiante",
    niu: "155xs4×3245xc4",
    cni: "155xs4×3245xc4",
  },
};

function ProjectDetailPage() {
  const router = useRouter();
  return (
    <ProjectDetail
      project={sampleProjectDetail.project}
      user={sampleProjectDetail.user}
      onReturn={() => router.back()}
    />
  );
}

export default ProjectDetailPage;
