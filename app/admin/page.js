"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function AdminPage() {
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  // ================= AUTH PROTECTION =================
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

    loadAllRecipes();
  }, []);

  // ================= LOADERS =================

  const loadAllRecipes = async () => {
    const res = await fetch("/api/recipes/all");
    const data = await res.json();

    // Pending first, Approved next, Rejected last
    const sorted = data.sort((a, b) => {
      const order = { pending: 0, approved: 1, rejected: 2 };
      return order[a.status] - order[b.status];
    });

    setRecipes(sorted);
  };

  const loadPendingRecipes = async () => {
    const res = await fetch("/api/recipes/pending");
    const data = await res.json();
    setRecipes(data);
  };

  const loadRejectedRecipes = async () => {
    const res = await fetch("/api/recipes/rejected");
    const data = await res.json();
    setRecipes(data);
  };

  const loadUsers = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch("/api/users", {
      headers: {
        authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    setUsers(data);
  };

  // ================= ACTIONS =================

  const approveRecipe = async (id) => {
    const token = localStorage.getItem("token");

    await fetch("/api/recipes/approve", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({ id }),
    });

    loadAllRecipes();
  };

  

  const rejectRecipe = async (id) => {
  const token = localStorage.getItem("token");

  await fetch("/api/recipes/reject", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
    body: JSON.stringify({ id }),
  });

  // 👉 switch to rejected tab & load rejected list
  setActiveTab("rejected");
  loadRejectedRecipes();
};

  // ================= UI =================

  return (
    <div style={{ padding: 20 }}>
      <h1>🍽️ Admin Dashboard</h1>

      {/* ---------- BUTTONS ---------- */}
      <div style={{ marginBottom: 20 }}>
        <button onClick={() => { setActiveTab("all"); loadAllRecipes(); }}>
          All Recipes
        </button>

        <button
          style={{ marginLeft: 10 }}
          onClick={() => { setActiveTab("pending"); loadPendingRecipes(); }}
        >
          Pending
        </button>

        <button
          style={{ marginLeft: 10 }}
          onClick={() => { setActiveTab("rejected"); loadRejectedRecipes(); }}
        >
          Rejected
        </button>

        <button
          style={{ marginLeft: 10 }}
          onClick={() => { setActiveTab("users"); loadUsers(); }}
        >
          Users
        </button>
      </div>

      {/* ---------- RECIPES ---------- */}
      {activeTab !== "users" && (
        <>
          <h2>
            {activeTab === "all"
              ? "All Recipes"
              : activeTab === "pending"
              ? "Pending Recipes"
              : "Rejected Recipes"}
          </h2>

          {recipes.length === 0 && <p>No recipes found</p>}

          {recipes.map((r) => (
            <div
              key={r._id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <h3>{r.title}</h3>

            <p><strong>Submitted By:</strong> {r.userId?.name}</p>
<p><strong>Email:</strong> {r.userId?.email}</p>

              <p>{r.ingredients}</p>

              <p>
                <strong>Status:</strong> {r.status}
              </p>

              {r.status === "pending" && (
                <>
                  <button onClick={() => approveRecipe(r._id)}>
                    ✅ Approve
                  </button>

                  <button
                    style={{ marginLeft: 10 }}
                    onClick={() => rejectRecipe(r._id)}
                  >
                    ❌ Reject
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}

      {/* ---------- USERS ---------- */}
      {activeTab === "users" && (
        <>
          <h2>All Users</h2>

          {users.length === 0 && <p>No users found</p>}

          {users.map((u) => (
            <div
              key={u._id}
              style={{
                border: "1px solid #ccc",
                padding: 15,
                marginBottom: 10,
                borderRadius: 8,
              }}
            >
              <p><strong>Name:</strong> {u.name}</p>
              <p><strong>Email:</strong> {u.email}</p>
              <p><strong>Role:</strong> {u.role}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}
