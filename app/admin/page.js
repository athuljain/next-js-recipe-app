"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin-login");
      return;
    }

    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      router.push("/login");
    }
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Only admins can see this</p>
    </div>
  );
}
