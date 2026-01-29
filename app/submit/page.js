"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SubmitRecipe() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    steps: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/recipes/add", {
      method: "POST",
      body: JSON.stringify(form)
    });

    alert("Recipe Submitted for Approval");
    router.push("/dashboard");
  };

  return (
    <div>
      <h1>Submit Recipe</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" onChange={handleChange} />
        <textarea name="ingredients" placeholder="Ingredients" onChange={handleChange} />
        <textarea name="steps" placeholder="Steps" onChange={handleChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}
