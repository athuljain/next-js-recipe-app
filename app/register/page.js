

// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { motion } from "framer-motion";

// export default function Register() {
//   const router = useRouter();
//   const [form, setForm] = useState({ name: "", email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     try {
//       const res = await fetch("/api/auth/register", {
//         method: "POST",
//         body: JSON.stringify(form)
//       });
//       const data = await res.json();
//       alert(data.message);
//       if (res.status === 400 || res.ok) {
//         router.push("/login");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500">
//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 z-0">
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.2, 1],
//             rotate: [0, 90, 0],
//           }}
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px]"
//         />
//         <motion.div 
//           animate={{ 
//             scale: [1, 1.3, 1],
//             rotate: [0, -90, 0],
//           }}
//           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
//           className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-500/20 blur-[120px]"
//         />
//       </div>

//       <motion.div 
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative z-10 w-full max-w-md p-8 mx-4 rounded-3xl border border-foreground/10 bg-background/50 backdrop-blur-xl shadow-2xl"
//       >
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-extrabold tracking-tight mb-2">
//             Join Us
//           </h1>
//           <p className="text-foreground/60">Create your account in seconds</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div className="space-y-1">
//             <input
//               name="name"
//               placeholder="Full Name"
//               onChange={handleChange}
//               className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-foreground/30"
//               required
//             />
//           </div>

//           <div className="space-y-1">
//             <input
//               name="email"
//               type="email"
//               placeholder="Email address"
//               onChange={handleChange}
//               className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-foreground/30"
//               required
//             />
//           </div>

//           <div className="space-y-1">
//             <input
//               name="password"
//               type="password"
//               placeholder="Create password"
//               onChange={handleChange}
//               className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all placeholder:text-foreground/30"
//               required
//             />
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.01 }}
//             whileTap={{ scale: 0.98 }}
//             disabled={isLoading}
//             className="w-full py-4 bg-foreground text-background font-bold rounded-2xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50"
//           >
//             {isLoading ? "Creating account..." : "Get Started"}
//           </motion.button>
//         </form>

//         <p className="mt-8 text-center text-foreground/40 text-sm">
//           Already a member?{" "}
//           <button 
//             onClick={() => router.push("/login")}
//             className="text-foreground font-semibold hover:underline"
//           >
//             Sign in
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast"; // 1. Import Toast

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form)
      });
      const data = await res.json();

      if (res.ok) {
        // Success: The dish is served!
        toast.success("Order Up! Your account is ready.", {
          icon: '👨‍🍳',
          style: { borderRadius: '15px', background: '#333', color: '#fff' }
        });
        setTimeout(() => router.push("/login"), 1500);
      } else {
        // Error: Something burnt in the kitchen
        toast.error(data.message || "Kitchen error! Try again.", {
          icon: '🔥',
        });
      }
    } catch (error) {
      toast.error("The stove wouldn't light. Check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-500">
      {/* 2. Place the Toaster component anywhere */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-orange-500/20 blur-[120px]"
        />
        <motion.div 
          animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-yellow-500/20 blur-[120px]"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md p-8 mx-4 rounded-3xl border border-foreground/10 bg-background/50 backdrop-blur-xl shadow-2xl"
      >
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight mb-2">
            Join the Kitchen 🍳
          </h1>
          <p className="text-foreground/60">Reserve your spot at the table</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="name"
            placeholder="Chef Name"
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Kitchen Email"
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Secret Recipe (Password)"
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
            required
          />

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            className="w-full py-4 bg-orange-600 text-white font-bold rounded-2xl shadow-lg hover:bg-orange-500 transition-all disabled:opacity-50"
          >
            {isLoading ? "Preheating..." : "Start Cooking"}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-foreground/40 text-sm">
          Already a chef?{" "}
          <button 
            onClick={() => router.push("/login")}
            className="text-foreground font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </motion.div>
    </div>
  );
}