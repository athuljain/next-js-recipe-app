"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default function SubmitRecipe() {
  const router = useRouter();
  const [userId, setUserId] = useState(null);

  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    steps: ""
  });

  const token = localStorage.getItem("token");
const decoded = jwtDecode(token);



  // get logged-in user id
  useEffect(() => {
  const userId = localStorage.getItem("userId");
  setUserId(userId);
}, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/recipes/add", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + token
  },
  body: JSON.stringify({
    ...form,
    userId: userId  
  })
});

    alert("Recipe Submitted for Approval");
    router.push("/dashboard");
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
