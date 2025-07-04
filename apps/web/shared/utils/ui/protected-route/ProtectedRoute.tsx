"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    } else {
      router.replace("/");
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
