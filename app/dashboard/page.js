"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState({ name: "", profilePic: "" });

  useEffect(() => {
    const id = localStorage.getItem("userId");
    setUserId(id);

    if (id) {
      fetch(`/api/users/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setUserProfile({
            name: data.name || "User",
            profilePic: data.profilePic || "",
          });
        })
        .catch((err) => console.error("Error fetching user header:", err));
    }
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const res = await fetch("/api/recipes/get");
      const data = await res.json();
      const approvedOnly = data.filter((r) => r.status === "approved");
      setRecipes(approvedOnly);
      setLoading(false);
    } catch (err) {
      console.error("Load recipes error:", err);
      setLoading(false);
    }
  };

  const likeRecipe = async (id) => {
    if (!userId) {
      alert("Please login to like recipes");
      return;
    }

    await fetch("/api/recipes/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id, userId }),
    });

    loadRecipes();
  };

  return (
    <div style={{ padding: "20px", color: "white", backgroundColor: "black", minHeight: "100vh" }}>
      {/* ===== HEADER ===== */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          borderBottom: "1px solid #333",
          paddingBottom: "15px",
        }}
      >
        <h1 style={{ margin: 0 }}>All Recipes</h1>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button
            onClick={() => router.push("/submit")}
            style={{
              padding: "8px 15px",
              cursor: "pointer",
              borderRadius: "5px",
              border: "1px solid white",
              background: "white",
              color: "black",
              fontWeight: "bold",
            }}
          >
            ➕ Add Recipe
          </button>

          {/* PROFILE BUTTON */}
          <div
            onClick={() => router.push("/profile")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              cursor: "pointer",
              background: "#1a1a1a",
              padding: "5px 15px 5px 5px",
              borderRadius: "30px",
              border: "1px solid #444",
            }}
          >
           <Image
  src={userProfile.profilePic || "https://via.placeholder.com/40"}
  alt="My Profile"
  width={35}
  height={35}
  unoptimized={userProfile.profilePic?.startsWith("data:")}
  style={{ 
    borderRadius: "50%", 
    objectFit: "cover", 
    border: "1px solid white" 
  }}
/>
            <span style={{ fontWeight: "bold", fontSize: "14px" }}>{userProfile.name}</span>
          </div>
        </div>
      </div>

      {loading && <p>Loading...</p>}

      {/* ===== RECIPES GRID ===== */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {recipes.map((r) => (
          <div
            key={r._id}
            onClick={() => router.push(`/recipe/${r._id}`)}
            style={{
              border: "1px solid #333",
              borderRadius: "12px",
              padding: "15px",
              width: "280px",
              background: "#111",
              cursor: "pointer",
              transition: "0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.borderColor = "white")}
            onMouseOut={(e) => (e.currentTarget.style.borderColor = "#333")}
          >
            {/* Food Image Wrapper */}
            {r.image && (
              <div style={{ position: "relative", width: "100%", height: "180px", marginBottom: "10px" }}>
                <Image
                  src={r.image}
                  alt={r.title}
                  fill
                  sizes="280px"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                  unoptimized={r.image?.startsWith("data:")}
                />
              </div>
            )}

            {/* Author Info */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
              <Image
                src={r.userPic || "https://via.placeholder.com/25"}
                alt={`${r.userName}'s avatar`}
                width={25}
                height={25}
                unoptimized={r.userPic?.startsWith("data:")}
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
              <span style={{ fontSize: "12px", color: "#bbb" }}>{r.userName}</span>
            </div>

            <h3 style={{ color: "white", margin: "0 0 5px 0" }}>{r.title}</h3>
            <p style={{ color: "#ccc", fontSize: "14px", marginBottom: "15px" }}>
              {r.ingredients.substring(0, 50)}...
            </p>

            {/* LIKE BUTTON */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                likeRecipe(r._id);
              }}
              style={{
                background: "transparent",
                border: "1px solid #444",
                color: "white",
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {r.likes?.includes(userId) ? "❤️" : "🤍"} {r.likes?.length || 0}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}