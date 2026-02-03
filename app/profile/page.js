"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem("name");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      router.push("/login");
      return;
    }

    setUser({ name, userId });

    fetch(`/api/recipes/user/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("MY RECIPES:", data);

        if (Array.isArray(data)) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setRecipes([]);
      });

  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ padding: "30px" }}>

      <h1>User Profile</h1>

      <p><b>Name:</b> {user.name}</p>
      <p><b>User ID:</b> {user.userId}</p>

      <button
        style={{ background: "red", color: "white" }}
        onClick={() => {
          localStorage.clear();
          router.push("/login");
        }}
      >
        Logout
      </button>

      <hr />

      <h2>My Recipes</h2>

      {recipes.length === 0 && <p>No recipes yet</p>}

      {recipes.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{r.title}</h3>
          <p>{r.ingredients}</p>

          <p>❤️ {r.likes?.length || 0}</p>

          <p>Status: {r.status}</p>
        </div>
      ))}

      <button onClick={() => router.push("/dashboard")}>
        Back to Dashboard
      </button>

    </div>
  );
}
