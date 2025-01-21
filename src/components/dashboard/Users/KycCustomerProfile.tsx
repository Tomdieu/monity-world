"use client";
import React from "react";
import { ArrowLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import FlagAlert from "./FlagAlert";
import { useToast } from "@/hooks/use-toast"


interface KycCustomerProfileProps {
  customer: {
    name: string;
    userId: string;
    email: string;
    phone: string;
    bvn: string;
    avatar?: string;
    isOnOfacList?: boolean;
  };
  className?: string;
  // onReturn?: () => void;
}

const KycCustomerProfile = ({
  customer,
  className,
}: KycCustomerProfileProps) => {

  const { toast } = useToast()

  const handleCopyUserId = () => {
    navigator.clipboard.writeText(customer.userId);
    toast({
      description: "Id Copy",
    })
  };



  const router = useRouter();

  const navigateBakc = () => {
    router.back();
  };

  return (
    <div className={cn("w-full flex gap-5 bg-white p-6 rounded-xl", className)}>
      <div className="flex gap-5 flex-1">
        <div className="flex flex-col items-center gap-8  mb-8">
          <div className="flex w-full items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={navigateBakc}
              className="hover:bg-neutral-100 rounded-full bg-primary/10"
            >
              <ArrowLeft className="size-4 text-primary" />
            </Button>
            <span className="text-lg font-medium text-muted-foreground">
              Return
            </span>
          </div>
          {/* Avatar Section */}
          <div className="col-span-3">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-neutral-100">
              {customer.avatar ? (
                <Image
                  src={customer.avatar}
                  alt={customer.name}
                  className="w-full h-full object-cover"
                  width={50}
                  height={50}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8 flex-1">
          {/* Customer Details Section */}
          <div className="col-span-9 space-y-6 w-full">
            <h1 className="text-xl font-semibold text-gray-900">
              Customer profile
            </h1>

            {/* Customer Info Grid */}
            <div className="flex flex-col gap-x-8 gap-y-4">
              <div className="grid grid-cols-2">
                <label className="text-sm text-neutral-500">
                  Customer name
                </label>
                <p className="text-base font-medium text-gray-900 text-right">
                  {customer.name}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <label className="text-sm text-neutral-500">User ID</label>
                <div className="flex items-center justify-end gap-2">
                  <p className="text-base font-medium text-gray-900 text-right">
                    {customer.userId}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleCopyUserId}
                    className="p-1 hover:bg-neutral-100"
                  >
                    <Copy className="size-4 text-orange-600" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2">
                <label className="text-sm text-neutral-500">Email</label>
                <p className="text-base font-medium text-gray-900 text-right">
                  {customer.email}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <label className="text-sm text-neutral-500">Phone</label>
                <p className="text-base font-medium text-gray-900 text-right">
                  {customer.phone}
                </p>
              </div>

              <div className="grid grid-cols-2">
                <label className="text-sm text-neutral-500">
                  Bank Verification Number (BVN)
                </label>
                <p className="text-base font-medium text-gray-900 text-right">
                  {customer.bvn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between max-w-[300px]">
        {/* Alert Banner */}
        {customer.isOnOfacList && (
          <FlagAlert
            variant="error"
            className="mb-6"
            message="This customer was recently flagged on the OFAC list."
            linkText="Know more"
          />
        )}
        {/* Action Button */}
        <Button size={"lg"} variant="secondary" className="mt-6 w-fit">
          See profile
        </Button>
      </div>
    </div>
  );
};

export default KycCustomerProfile;
