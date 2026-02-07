


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // 1. Import Toast

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.user.id);
        localStorage.setItem("name", data.user.name);
        
        // Success Toast: The chef is in the kitchen!
        toast.success(`Welcome back, Chef ${data.user.name}!`, {
          icon: '🔪',
          style: {
            borderRadius: '15px',
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          },
        });

        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        // Error Toast: Wrong recipe/credentials
        toast.error("Invalid Recipe! Check your email or password.", {
          icon: '🚫',
        });
      }
    } catch (error) {
      toast.error("The kitchen is closed due to a server error.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 2. Toaster Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background Glows - Matching the Cooking Style */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-orange-500/10 blur-[100px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], x: [0, -30, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md p-8 mx-4 rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back 🧑‍🍳</h1>
          <p className="text-foreground/50 mt-2">Sign in to start your shift</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group">
            <input
              name="email"
              type="email"
              placeholder="Chef Email"
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.03] border border-foreground/10 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-foreground/30"
              required
            />
          </div>

          <div className="group">
            <input
              name="password"
              type="password"
              placeholder="Chef Password"
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.03] border border-foreground/10 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all placeholder:text-foreground/30"
              required
            />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-orange-600 text-white font-semibold rounded-2xl shadow-xl hover:bg-orange-500 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Checking Pantry...</span>
              </>
            ) : (
              "Clock In"
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-foreground/5 text-center">
          <p className="text-foreground/40 text-sm">
            New to the team?{" "}
            <button 
              onClick={() => router.push("/register")}
              className="text-foreground font-semibold hover:text-orange-500 transition-colors"
            >
              Apply as Chef
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}