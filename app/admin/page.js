"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AdminPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);

  // protect page
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin-login");
      return;
    }

    const decoded = jwtDecode(token);
    if (decoded.role !== "admin") {
      router.push("/login");
      return;
    }

    loadPendingRecipes();
  }, []);

  const loadPendingRecipes = async () => {
    const res = await fetch("/api/recipes/pending");
    const data = await res.json();
    setRecipes(data);
  };

  const approveRecipe = async (id) => {
    const token = localStorage.getItem("token");

    await fetch("/api/recipes/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token
      },
      body: JSON.stringify({ id })
    });

    loadPendingRecipes();
  };

  const rejectRecipe = async (id) => {
    const token = localStorage.getItem("token");

    await fetch("/api/recipes/reject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token
      },
      body: JSON.stringify({ id })
    });

    loadPendingRecipes();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {recipes.length === 0 && <p>No pending recipes</p>}

      {recipes.map((r) => (
        <div key={r._id} style={{ border: "1px solid gray", padding: 10, marginBottom: 10 }}>
          <h3>{r.title}</h3>
          <p>{r.ingredients}</p>

          <button onClick={() => approveRecipe(r._id)}>
            ✅ Approve
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => rejectRecipe(r._id)}
          >
            ❌ Reject
          </button>
        </div>
      ))}
    </div>
  );
}
