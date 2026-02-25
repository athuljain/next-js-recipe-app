"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
        .catch((err) => console.error("Error fetching user:", err));
    }
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const res = await fetch("/api/recipes/get");
      const data = await res.json();
      const approvedOnly = data.filter((r) => r.status === "approved");
      setRecipes(approvedOnly);
    } catch (err) {
      console.error("Load recipes error:", err);
    } finally {
      setLoading(false);
    }
  };

  const likeRecipe = async (id) => {
    if (!userId) return alert("Please login to like recipes");
    await fetch("/api/recipes/like", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ recipeId: id, userId }),
    });
    loadRecipes();
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-8">
      {/* ===== NAVBAR ===== */}
      <nav className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 pb-6 border-b border-foreground/5">
        <div>
          <h1 className="text-4xl font-black tracking-tighter">CraveBase</h1>
          <p className="text-foreground/50 text-sm">Discover the worlds best recipes</p>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/submit")}
            className="px-6 py-2.5 bg-foreground text-background rounded-full font-bold text-sm shadow-lg hover:shadow-foreground/10 transition-all"
          >
            + Create Recipe
          </motion.button>

          <div
            onClick={() => router.push("/profile")}
            className="flex items-center gap-3 p-1.5 pr-5 bg-foreground/5 rounded-full border border-foreground/10 cursor-pointer hover:bg-foreground/10 transition-all"
          >
            <div className="relative w-8 h-8 overflow-hidden rounded-full border border-foreground/20">
              <Image
                src={userProfile.profilePic || "https://via.placeholder.com/40"}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-sm">{userProfile.name}</span>
          </div>
        </div>
      </nav>

      {/* ===== GRID SECTION ===== */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 w-full bg-foreground/5 animate-pulse rounded-3xl" />
          ))}
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {recipes.map((r, index) => (
              <motion.div
                key={r._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => router.push(`/recipe/${r._id}`)}
                className="group relative bg-foreground/[0.02] border border-foreground/5 rounded-[2rem] overflow-hidden cursor-pointer hover:border-foreground/20 transition-colors"
              >
                {/* Image Container */}
                <div className="aspect-[4/5] relative overflow-hidden">
                  <Image
                    src={r.image || "https://via.placeholder.com/400"}
                    alt={r.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized={r.image?.startsWith("data:")}
                  />
                  {/* Overlay for "Like" count */}
                  <div className="absolute top-4 right-4 z-10">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        likeRecipe(r._id);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold hover:bg-black/60 transition-all"
                    >
                      <span>{r.likes?.includes(userId) ? "❤️" : "🤍"}</span>
                      {r.likes?.length || 0}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative w-5 h-5 rounded-full overflow-hidden border border-foreground/10">
                      <Image
                        src={r.userPic || "https://via.placeholder.com/25"}
                        alt="Author"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-foreground/40 italic">
                      {r.userName}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-blue-500 transition-colors">
                    {r.title}
                  </h3>
                  
                  <p className="text-foreground/60 text-sm line-clamp-2 leading-relaxed">
                    {r.ingredients}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && recipes.length === 0 && (
        <div className="text-center py-20">
          <p className="text-foreground/30 text-xl font-medium">No recipes found. Be the first to share one!</p>
        </div>
      )}
    </div>
  );
}