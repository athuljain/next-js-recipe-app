// export default function Home() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h1>🍔 Recipe Sharing App</h1>
//       <p>Share and discover amazing recipes</p>

//       <div style={{ marginTop: "30px" }}>
//         <a href="/register">
//           <button>Register</button>
//         </a>

//         <a href="/login" style={{ marginLeft: "10px" }}>
//           <button>User Login</button>
//         </a>

//         <a href="/admin-login" style={{ marginLeft: "10px" }}>
//           <button>Admin Login</button>
//         </a>
//       </div>
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* Decorative Background Blur */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />

      <main className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full backdrop-blur-md">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
              The Culinary Social Network
            </span>
          </div>

          <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase mb-6 leading-none">
            Cook. <span className="text-white/20">Post.</span> <br /> 
            Share.
          </h1>

          <p className="max-w-md mx-auto text-white/40 text-lg md:text-xl font-medium leading-relaxed mb-10">
            A premium space for chefs and foodies to archive their finest recipes and discover global flavors.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/register">
            <button className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform">
              Join the Kitchen
            </button>
          </Link>

          <div className="flex gap-4">
            <Link href="/login">
              <button className="px-8 py-4 border border-white/10 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all">
                Chef Login
              </button>
            </Link>

            <Link href="/admin-login">
              <button className="px-8 py-4 bg-white/5 border border-white/5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:border-white/40 transition-all text-white/40 hover:text-white">
                Admin
              </button>
            </Link>
          </div>
        </motion.div>
      </main>

      {/* Footer Decoration */}
      <footer className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-center opacity-20">
        <div className="text-[10px] font-mono tracking-widest uppercase">Est. 2026</div>
        <div className="text-[10px] font-mono tracking-widest uppercase italic">Design by Gemini</div>
      </footer>
    </div>
  );
}