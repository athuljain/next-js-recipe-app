// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form)
//     });

//     const data = await res.json();

//     if (data.token && data.user.role === "admin") {
//       localStorage.setItem("token", data.token);
//       router.push("/admin");
//     } else {
//       alert("Not authorized as admin");
//     }
//   };

  
//   return (
//     <div>
//       <h2>Admin Login</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           name="email"
//           placeholder="Admin Email"
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />

//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }




"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.token && data.user.role === "admin") {
      localStorage.setItem("token", data.token);
      router.push("/admin");
    } else {
      alert("Access Denied: Administrative Privileges Required");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 selection:bg-white selection:text-black">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="text-center mb-10">
          <div className="inline-block px-3 py-1 border border-white/20 rounded-full mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">
              System Access
            </span>
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter italic">
            Admin <span className="text-white/20">Portal</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <input
              name="email"
              type="email"
              placeholder="System Email"
              onChange={handleChange}
              required
              className="w-full bg-white/[0.05] border border-white/10 px-4 py-4 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all placeholder:text-white/20 font-mono text-sm"
            />
          </div>

          <div className="space-y-1">
            <input
              type="password"
              name="password"
              placeholder="Access Key"
              onChange={handleChange}
              required
              className="w-full bg-white/[0.05] border border-white/10 px-4 py-4 rounded-xl text-white outline-none focus:border-white/40 focus:bg-white/[0.08] transition-all placeholder:text-white/20 font-mono text-sm"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            disabled={isLoading}
            className="w-full bg-white text-black py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Authorize Access"}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">
          Authorized Personnel Only • IP Logged
        </p>
      </motion.div>
    </div>
  );
}