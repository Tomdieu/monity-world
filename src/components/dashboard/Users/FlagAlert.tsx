"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type AlertVariant = "error" | "success" | "warning";

interface FlagAlertProps {
  variant?: AlertVariant;
  message: string;
  onKnowMore?: () => void;
  className?: string;
  linkText: string;
}

const variantStyles = {
  error: {
    container: "bg-red-50 border-red-100",
    header: "bg-red-800",
    link: "text-[#A98B25]",
    text: "text-black",
  },
  success: {
    container: "bg-emerald-50 border-emerald-100",
    header: "bg-emerald-800",
    link: "text-emerald-800",
    text: "text-black",
  },
  warning: {
    container: "bg-amber-50 border-amber-100",
    header: "bg-warning",
    link: "text-warning-forground",
    text: "text-black",
  },
};

const FlagAlert: React.FC<FlagAlertProps> = ({
  variant = "error",
  message,
  onKnowMore,
  className,
  linkText: lineText,
}) => {
  const styles = variantStyles[variant];

  return (
    <div className={cn("border rounded-lg", styles.container, className)}>
      {/* Header */}
      <div className={cn("flex justify-between rounded-t-lg", styles.header)}>
        <div className="flex flex-1 items-center gap-2 px-4 py-2">
          <span className="text-sm text-white font-bold">Flag alert!</span>
        </div>
        <div className="flex pr-3 items-center justify-between flex-col h-full">
          <div className="size-3" />
          <Image
            src={variant=="success"? "/icons/flag-green.svg":"/icons/flag.svg"}
            width={24}
            height={24}
            className="size-8"
            alt="Flag"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-4">
        <p className={cn("text-sm font-thin", styles.text)}>{message}</p>
        <button
          onClick={onKnowMore}
          className={cn(
            "text-xs font-bold hover:underline text-left",
            styles.link
          )}
        >
          {lineText}
        </button>
      </div>
    </div>
  );
};

export default FlagAlert;
