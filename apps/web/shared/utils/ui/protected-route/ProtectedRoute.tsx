"use client";
import Loader from "../loader";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = localStorage.getItem('token')

  if (isAuthenticated === null) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
