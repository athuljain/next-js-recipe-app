// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { jwtDecode } from "jwt-decode";
// import Image from "next/image";
// export default function AdminPage() {
//   const router = useRouter();

//   const [recipes, setRecipes] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [activeTab, setActiveTab] = useState("all");

//   // ================= AUTH PROTECTION =================
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       router.push("/admin-login");
//       return;
//     }

//     const decoded = jwtDecode(token);

//     if (decoded.role !== "admin") {
//       router.push("/login");
//       return;
//     }

//     loadAllRecipes();
//   }, []);

//   // ================= LOADERS =================

//   const loadAllRecipes = async () => {
//     const res = await fetch("/api/recipes/all");
//     const data = await res.json();

//     // Pending first, Approved next, Rejected last
//     const sorted = data.sort((a, b) => {
//       const order = { pending: 0, approved: 1, rejected: 2 };
//       return order[a.status] - order[b.status];
//     });

//     setRecipes(sorted);
//   };

//   const loadPendingRecipes = async () => {
//     const res = await fetch("/api/recipes/pending");
//     const data = await res.json();
//     setRecipes(data);
//   };

//   const loadRejectedRecipes = async () => {
//     const res = await fetch("/api/recipes/rejected");
//     const data = await res.json();
//     setRecipes(data);
//   };

//   const loadUsers = async () => {
//     const token = localStorage.getItem("token");

//     const res = await fetch("/api/users", {
//       headers: {
//         authorization: "Bearer " + token,
//       },
//     });

//     const data = await res.json();
//     setUsers(data);
//   };

//   // ================= ACTIONS =================

//   const approveRecipe = async (id) => {
//     const token = localStorage.getItem("token");

//     await fetch("/api/recipes/approve", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         authorization: "Bearer " + token,
//       },
//       body: JSON.stringify({ id }),
//     });

//     loadAllRecipes();
//   };

  

//   const rejectRecipe = async (id) => {
//   const token = localStorage.getItem("token");

//   await fetch("/api/recipes/reject", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       authorization: "Bearer " + token,
//     },
//     body: JSON.stringify({ id }),
//   });

//   // 👉 switch to rejected tab & load rejected list
//   setActiveTab("rejected");
//   loadRejectedRecipes();
// };

//   // ================= UI =================

//   return (
//     <div style={{ padding: 20 }}>
//       <h1>🍽️ Admin Dashboard</h1>

//       {/* ---------- BUTTONS ---------- */}
//       <div style={{ marginBottom: 20 }}>
//         <button onClick={() => { setActiveTab("all"); loadAllRecipes(); }}>
//           All Recipes
//         </button>

//         <button
//           style={{ marginLeft: 10 }}
//           onClick={() => { setActiveTab("pending"); loadPendingRecipes(); }}
//         >
//           Pending
//         </button>

//         <button
//           style={{ marginLeft: 10 }}
//           onClick={() => { setActiveTab("rejected"); loadRejectedRecipes(); }}
//         >
//           Rejected
//         </button>

//         <button
//           style={{ marginLeft: 10 }}
//           onClick={() => { setActiveTab("users"); loadUsers(); }}
//         >
//           Users
//         </button>
//       </div>

//       {/* ---------- RECIPES ---------- */}
//       {activeTab !== "users" && (
//         <>
//           <h2>
//             {activeTab === "all"
//               ? "All Recipes"
//               : activeTab === "pending"
//               ? "Pending Recipes"
//               : "Rejected Recipes"}
//           </h2>

//           {recipes.length === 0 && <p>No recipes found</p>}

//           {recipes.map((r) => (
//             <div
//               key={r._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: 15,
//                 marginBottom: 10,
//                 borderRadius: 8,
//               }}
//             >
//               <h3>{r.title}</h3>
//              <Image
//   src={r.image} 
//   alt={r.title} 
//   width={500} 
//   height={180} 
//   style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px" }} 
// />

//             <p><strong>Submitted By:</strong> {r.userId?.name}</p>
// <p><strong>Email:</strong> {r.userId?.email}</p>

//               <p>{r.ingredients}</p>

//               <p>
//                 <strong>Status:</strong> {r.status}
//               </p>

//               {r.status === "pending" && (
//                 <>
//                   <button onClick={() => approveRecipe(r._id)}>
//                     ✅ Approve
//                   </button>

//                   <button
//                     style={{ marginLeft: 10 }}
//                     onClick={() => rejectRecipe(r._id)}
//                   >
//                     ❌ Reject
//                   </button>
//                 </>
//               )}
//             </div>
//           ))}
//         </>
//       )}

//       {/* ---------- USERS ---------- */}
//       {activeTab === "users" && (
//         <>
//           <h2>All Users</h2>

//           {users.length === 0 && <p>No users found</p>}

//           {users.map((u) => (
//             <div
//               key={u._id}
//               style={{
//                 border: "1px solid #ccc",
//                 padding: 15,
//                 marginBottom: 10,
//                 borderRadius: 8,
//               }}
//             >
//               <p><strong>Name:</strong> {u.name}</p>
//               <p><strong>Email:</strong> {u.email}</p>
//               <p><strong>Role:</strong> {u.role}</p>
//               <p><strong>Description:{u.description}</strong></p>
//            <Image
//   src={u.profilePic || "https://via.placeholder.com/150"} 
//   width={150} 
//   height={150}
//   style={{ width: "150px", height: "150px", borderRadius: "50%", border: "3px solid white", objectFit: "cover" }} 
//   alt="Profile"
// />
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);

  // ================= AUTH PROTECTION =================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin-login");
      return;
    }
    try {
      const decoded = jwtDecode(token);
      if (decoded.role !== "admin") {
        router.push("/login");
        return;
      }
      loadAllRecipes();
    } catch (e) {
      router.push("/admin-login");
    }
  }, []);

  // ================= LOADERS =================
  const loadAllRecipes = async () => {
    setLoading(true);
    const res = await fetch("/api/recipes/all");
    const data = await res.json();
    const sorted = data.sort((a, b) => {
      const order = { pending: 0, approved: 1, rejected: 2 };
      return order[a.status] - order[b.status];
    });
    setRecipes(sorted);
    setLoading(false);
  };

  const loadRecipesByStatus = async (status) => {
    setLoading(true);
    const res = await fetch(`/api/recipes/${status}`);
    const data = await res.json();
    setRecipes(data);
    setLoading(false);
  };

  const loadUsers = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const res = await fetch("/api/users", {
      headers: { authorization: "Bearer " + token },
    });
    const data = await res.json();
    setUsers(data);
    setLoading(false);
  };

  // ================= ACTIONS =================
  const updateStatus = async (id, action) => {
    const token = localStorage.getItem("token");
    const endpoint = action === 'approve' ? '/api/recipes/approve' : '/api/recipes/reject';
    
    await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
      },
      body: JSON.stringify({ id }),
    });

    if (action === 'reject') {
      setActiveTab("rejected");
      loadRecipesByStatus("rejected");
    } else {
      loadAllRecipes();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col md:flex-row">
      {/* ---------- SIDE NAVIGATION ---------- */}
      <aside className="w-full md:w-64 bg-black border-r border-white/10 p-6 flex flex-col gap-8">
        <div>
          <h1 className="text-xl font-black tracking-tighter italic uppercase underline decoration-blue-500 underline-offset-4">
            Admin <span className="text-white/40">HQ</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          {[
            { id: "all", label: "All Recipes", icon: "📚", action: loadAllRecipes },
            { id: "pending", label: "Pending", icon: "⏳", action: () => loadRecipesByStatus("pending") },
            { id: "rejected", label: "Rejected", icon: "🚫", action: () => loadRecipesByStatus("rejected") },
            { id: "users", label: "User Directory", icon: "👤", action: loadUsers },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); tab.action(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                activeTab === tab.id ? "bg-white text-black scale-105" : "hover:bg-white/5 text-white/50"
              }`}
            >
              <span>{tab.icon}</span> {tab.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => router.push("/dashboard")}
          className="mt-auto text-[10px] font-black tracking-[0.2em] text-white/20 hover:text-white transition-colors uppercase"
        >
          ← Exit to Public Site
        </button>
      </aside>

      {/* ---------- MAIN CONTENT ---------- */}
      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        <header className="mb-12 flex justify-between items-end">
          <div>
            <p className="text-blue-500 font-black text-xs uppercase tracking-[0.3em] mb-2">Management Console</p>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">
              {activeTab.replace("-", " ")}
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-white/20 text-[10px] font-mono tracking-widest">SYSTEM STATUS: OPTIMAL</p>
          </div>
        </header>

        {loading ? (
          <div className="h-64 flex items-center justify-center font-mono text-white/20 animate-pulse uppercase tracking-widest">
            Syncing Database...
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {activeTab !== "users" ? (
                recipes.map((r) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={r._id}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col gap-6 hover:border-white/20 transition-colors"
                  >
                    <div className="flex gap-4">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10">
                        <Image src={r.image} alt={r.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold truncate">{r.title}</h3>
                        <p className="text-xs text-white/40 mb-2 uppercase font-black tracking-widest">By: {r.userId?.name || "Unknown"}</p>
                        <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${
                          r.status === 'pending' ? 'bg-orange-500/20 text-orange-400' : 
                          r.status === 'approved' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {r.status}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-sm text-white/60 line-clamp-2 italic leading-relaxed">
                        &quot;{r.ingredients}&quot;
                      </p>
                      
                      {r.status === "pending" && (
                        <div className="flex gap-3 pt-2">
                          <button 
                            onClick={() => updateStatus(r._id, 'approve')}
                            className="flex-1 bg-white text-black py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => updateStatus(r._id, 'reject')}
                            className="flex-1 border border-white/10 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-500 hover:border-red-500 transition-all"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                users.map((u) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    key={u._id}
                    className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-6"
                  >
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10">
                      <Image src={u.profilePic || "https://via.placeholder.com/150"} alt="Profile" fill className="object-cover" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{u.name}</h3>
                      <p className="text-sm text-white/40 font-mono">{u.email}</p>
                      <p className="text-[10px] font-black text-blue-500 uppercase mt-1 tracking-[0.2em]">{u.role}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
