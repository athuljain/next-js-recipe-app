// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function Login() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   const res = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify(form)
//   });

//   const data = await res.json();

//   if (data.token) {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("userId", data.user.id);   
//     localStorage.setItem("name", data.user.name);   
//     router.push("/dashboard");
//   } else {
//     alert("Invalid Credentials");
//   }
// };
//   return (
//     <div>
//       <h1>Login</h1>

//       <form onSubmit={handleSubmit}>
//         <input name="email" placeholder="Email" onChange={handleChange} />
//         <input
//           name="password"
//           type="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />
//         <button>Login</button>
//       </form>
//     </div>
//   );
// }



"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
        router.push("/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Glows - Matching the Register style */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            x: [0, 30, 0] 
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px]"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, -30, 0] 
          }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md p-8 mx-4 rounded-3xl border border-foreground/10 bg-background/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Welcome Back</h1>
          <p className="text-foreground/50 mt-2">Enter your credentials to access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="group">
            <input
              name="email"
              type="email"
              placeholder="Email address"
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.03] border border-foreground/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-foreground/30"
              required
            />
          </div>

          <div className="group">
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-foreground/[0.03] border border-foreground/10 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-foreground/30"
              required
            />
          </div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-4 mt-2 bg-foreground text-background font-semibold rounded-2xl shadow-xl hover:shadow-foreground/10 transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <div className="mt-8 pt-6 border-t border-foreground/5 text-center">
          <p className="text-foreground/40 text-sm">
            Don't have an account?{" "}
            <button 
              onClick={() => router.push("/register")}
              className="text-foreground font-semibold hover:text-blue-500 transition-colors"
            >
              Create one
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}