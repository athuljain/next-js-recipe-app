"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

export default function PublicProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // 1. Fetch User Info
        const userRes = await fetch(`/api/users/${id}`);
        const userData = await userRes.json();
        setUser(userData);

        // 2. Fetch User's Approved Recipes
        const recipeRes = await fetch(`/api/recipes/user/${id}`);
        const recipeData = await recipeRes.json();
        // Filter for ONLY approved for public view
        setRecipes(recipeData.filter(r => r.status === "approved"));
      } catch (err) {
        console.error("Error fetching public profile:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading Profile...</div>;
  if (!user) return <div className="p-20 text-center">User not found.</div>;

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      {/* Profile Header */}
      <header className="max-w-4xl mx-auto flex flex-col items-center text-center mb-12 border-b border-foreground/10 pb-10">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-foreground/20 mb-4">
          <Image 
            src={user.profilePic || "https://via.placeholder.com/150"} 
            alt={user.name} 
            fill 
            className="object-cover" 
          />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter">{user.name}</h1>
        <p className="text-foreground/60 mt-2 max-w-md">{user.description || "No bio provided."}</p>
        
        <div className="flex gap-4 mt-4">
          <div className="px-4 py-1 bg-foreground/5 rounded-full text-sm font-bold">
            {recipes.length} POSTS
          </div>
        </div>
      </header>

      {/* User's Recipes Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((r) => (
          <div key={r._id} className="border border-foreground/10 rounded-2xl overflow-hidden bg-foreground/[0.02]">
            <div className="aspect-video relative">
              <Image src={r.image} alt={r.title} fill className="object-cover" unoptimized />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg">{r.title}</h3>
              <p className="text-sm text-foreground/50 line-clamp-1">{r.ingredients}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}