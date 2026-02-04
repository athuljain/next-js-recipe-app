"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState({ name: "", profilePic: "" });

  // ✅ Get logged user from localStorage
  // useEffect(() => {
  //   const id = localStorage.getItem("userId");
  //   const name = localStorage.getItem("name");

  //   setUserId(id);
  //   setUserName(name);
  // }, []);

  useEffect(() => {
    const id = localStorage.getItem("userId");
     const name = localStorage.getItem("name");
    setUserId(id);
    setUserName(name);

    if (id) {
      fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(data => {
          setUserProfile({
            name: data.name || "User",
            profilePic: data.profilePic || ""
          });
        })
        .catch(err => console.error("Error fetching user header:", err));
    }
  }, []);

  // ✅ Load recipes
  const loadRecipes = async () => {
    const res = await fetch("/api/recipes/get");
    const data = await res.json();

    // only approved recipes
    const approvedOnly = data.filter(r => r.status === "approved");

    setRecipes(approvedOnly);
    setLoading(false);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  // ✅ Like recipe
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

    loadRecipes(); // refresh list
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
          paddingBottom: "15px"
        }}
      >
        <h1 style={{ margin: 0 }}>All Recipes</h1>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <button 
            onClick={() => router.push("/submit")}
            style={{ padding: "8px 15px", cursor: "pointer", borderRadius: "5px", border: "1px solid white", background: "white", color: "black", fontWeight: "bold" }}
          >
            ➕ Add Recipe
          </button>

          {/* PROFILE BUTTON WITH NAME AND PIC */}
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
              border: "1px solid #444"
            }}
          >
            <img 
              src={userProfile.profilePic || "https://via.placeholder.com/40"} 
              style={{ width: "35px", height: "35px", borderRadius: "50%", objectFit: "cover", border: "1px solid white" }}
              alt="me"
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
      onClick={() => router.push(`/recipe/${r._id}`)} // 👈 Add this click handler
      style={{ 
        border: "1px solid #333", 
        borderRadius: "12px", 
        padding: "15px", 
        width: "280px", 
        background: "#111", 
        cursor: "pointer", // 👈 Make it look clickable
        transition: "0.2s"
      }}
      onMouseOver={(e) => e.currentTarget.style.borderColor = "white"}
      onMouseOut={(e) => e.currentTarget.style.borderColor = "#333"}
    >
    {/* Display the Food Image */}
    {r.image && (
      <img 
        src={r.image} 
        alt={r.title} 
        style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} 
      />
    )}

    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
       <img src={r.userPic || "/default-avatar.png"} style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
       <span style={{ fontSize: "12px" }}>{r.userName}</span>
    </div>

    <h3 style={{ color: "white" }}>{r.title}</h3>

      <h3 style={{ color: "white", marginTop: "0" }}>{r.title}</h3>
      <p style={{ color: "#ccc", fontSize: "14px" }}>{r.ingredients.substring(0, 50)}...</p>

      {/* LIKE BUTTON */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          likeRecipe(r._id);
        }}
        style={{ marginTop: "10px", cursor: "pointer" }}
      >
        {r.likes?.includes(userId) ? "❤️" : "🤍"} {r.likes?.length || 0}
      </button>
    </div>
  ))}
</div>
    </div>
  );
}