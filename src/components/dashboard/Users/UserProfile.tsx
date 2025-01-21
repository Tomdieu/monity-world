"use client"

import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

type ProfileCardProps = {
  user: {
    name: string;
    username: string;
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
};

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-3xl shadow-sm p-6">
      {/* Avatar Section */}
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          {/* Avatar with blue gradient border */}
          <div className="w-56 h-56 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 p-1">
            <div className="w-full h-full rounded-full overflow-hidden border border-white">
              <Image
                src={user.avatar} 
                alt="Profile"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
          </div>
          
          {/* Verification Badge */}
          {user.isVerified && (
            <div className="absolute bottom-4 right-5 bg-emerald-500 rounded-lg p-1">
              <RiVerifiedBadgeFill className="w-6 h-6 text-white" />
            </div>
          )}
        </div>

        {/* Name and Username */}
        <h2 className="text-lg font-semibold text-gray-800 mt-3">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.username}</p>
      </div>
      <Separator  className='my-2'/>

      {/* Contact Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="w-5 h-5 text-blue-500" />
          <span className="text-sm">{user.location}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Phone className="w-5 h-5 text-blue-500" />
          <span className="text-sm">{user.phone}</span>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="w-5 h-5 text-blue-500" />
          <span className="text-sm">{user.email}</span>
        </div>

        {/* Additional Information */}
        <div className="pt-4 space-y-2 border-t border-gray-100">
          <div className="flex">
            <span className="text-sm text-gray-500 w-24">Sex:</span>
            <span className="text-sm text-primary">{user.sex}</span>
          </div>

          <div className="flex">
            <span className="text-sm text-gray-500 w-24">Profession:</span>
            <span className="text-sm text-primary">{user.profession}</span>
          </div>

          <div className="flex">
            <span className="text-sm text-gray-500 w-24">NIU:</span>
            <span className="text-sm text-muted-foreground">{user.niu}</span>
          </div>

          <div className="flex">
            <span className="text-sm text-gray-500 w-24">CNI:</span>
            <span className="text-sm text-muted-foreground">{user.cni}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard