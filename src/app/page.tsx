"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation"; // Changed from next/router to next/navigation for app router
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Setup the timeout for redirect
    const redirectTimeout = setTimeout(() => {
      router.push('/login');
    }, 5000); // Changed to 5000ms (5 seconds)

    // Cleanup function to clear timeout if component unmounts
    return () => clearTimeout(redirectTimeout);
  }, []); // Remove isLoading dependency as it's no longer needed

  // Always show splash screen until redirect happens
  return <SplashScreen />;
}