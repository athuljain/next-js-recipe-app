"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function SubmitRecipe() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", ingredients: "", steps: "" });
  const [userId, setUserId] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Only access localStorage inside useEffect
    const storedToken = localStorage.getItem("token");
    const storedId = localStorage.getItem("userId");
    
    if (!storedToken) {
      router.push("/login");
    } else {
      setToken(storedToken);
      setUserId(storedId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please login first");

    const res = await fetch("/api/recipes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId })
    });

    if (res.ok) {
      alert("Recipe Submitted!");
      router.push("/profile"); 
  };

  return (
    <div>
      <h1>Submit Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          required
        />

        <textarea
          name="ingredients"
          placeholder="Ingredients"
          onChange={handleChange}
          required
        />

        <textarea
          name="steps"
          placeholder="Steps"
          onChange={handleChange}
          required
        />

        <button>Submit</button>
      </form>
    </div>
  );
}
