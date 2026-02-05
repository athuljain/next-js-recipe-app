"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SubmitRecipe() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", ingredients: "", steps: "", image: "" });
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      setUserId(storedId);
    }
  }, []);

  // Handle text inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Handle Image selection and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please login first");

    const res = await fetch("/api/recipes/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, userId })
    });

    if (res.ok) {
      alert("Recipe Submitted for Approval!");
      router.push("/profile"); 
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto", color: "white", backgroundColor: "black" }}>
      <h1>Submit New Recipe</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <input name="title" placeholder="Recipe Title" onChange={handleChange} required 
          style={{ padding: "10px", background: "#222", color: "white", border: "1px solid #444" }} />

        {/* IMAGE UPLOAD FIELD */}
        <label>Food Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} required 
          style={{ padding: "10px", border: "1px solid #444" }} />
        
        {form.image && <img src={form.image} alt="Preview" style={{ width: "100%", borderRadius: "10px" }} />}

        <textarea name="ingredients" placeholder="Ingredients" onChange={handleChange} required 
          style={{ padding: "10px", background: "#222", color: "white", border: "1px solid #444", height: "100px" }} />

        <textarea name="steps" placeholder="Cooking Steps" onChange={handleChange} required 
          style={{ padding: "10px", background: "#222", color: "white", border: "1px solid #444", height: "150px" }} />

        <button style={{ padding: "12px", background: "white", color: "black", fontWeight: "bold", cursor: "pointer" }}>
          SUBMIT RECIPE
        </button>
      </form>
    </div>
  );
}