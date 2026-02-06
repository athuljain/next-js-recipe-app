// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [recipes, setRecipes] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);

//   const [editingRecipeId, setEditingRecipeId] = useState(null);
//   const [recipeEditData, setRecipeEditData] = useState({
//     title: "",
//     ingredients: "",
//     steps: "",
//     image: "",
//   });

//   const [editData, setEditData] = useState({
//     name: "",
//     description: "",
//     youtube: "",
//     instagram: "",
//     profilePic: "",
//   });

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     if (!userId) {
//       router.push("/login");
//       return;
//     }

//     const fetchData = async () => {
//       try {
//         // 1. Fetch User Profile
//         const userRes = await fetch(`/api/users/${userId}`);
//         const userData = await userRes.json();

//         if (userRes.ok) {
//           setUser(userData);
//           setEditData({
//             name: userData.name || "",
//             description: userData.description || "",
//             youtube: userData.youtube || "",
//             instagram: userData.instagram || "",
//             profilePic: userData.profilePic || "",
//           });
//         }

//         // 2. Fetch User Recipes
//         const recipeRes = await fetch(`/api/recipes/user/${userId}`);
//         const recipeData = await recipeRes.json();
//         setRecipes(Array.isArray(recipeData) ? recipeData : []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       }
//     };

//     fetchData();
//   }, [router]);

//   const deleteRecipe = async (recipeId) => {
//     if (!confirm("Are you sure?")) return;

//     const res = await fetch("/api/recipes/delete", {
//       method: "DELETE",
//       body: JSON.stringify({
//         recipeId: recipeId, // Matches API
//         userId: localStorage.getItem("userId"), // Matches API
//       }),
//     });

//     if (res.ok) {
//       setRecipes(recipes.filter((r) => r._id !== recipeId));
//     }
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditData({ ...editData, profilePic: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const startEditing = (recipe) => {
//     setEditingRecipeId(recipe._id);
//     setRecipeEditData({
//       title: recipe.title,
//       ingredients: recipe.ingredients,
//       steps: recipe.steps,
//       image: recipe.image,
//     });
//   };

//   // Send the updated data to the API
//   const handleRecipeUpdate = async () => {
//     const res = await fetch("/api/recipes/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         recipeId: editingRecipeId,
//         userId: user._id,
//         ...recipeEditData,
//       }),
//     });

//     if (res.ok) {
//       alert("Recipe updated and sent for re-approval!");
//       window.location.reload(); // Simplest way to refresh the list
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch("/api/users/update", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id, ...editData }),
//       });

//       if (res.ok) {
//         const updated = await res.json();
//         setUser(updated.user); // Update local state with DB response
//         localStorage.setItem("name", updated.user.name);
//         setIsEditing(false);
//         alert("Profile Updated!");
//       }
//     } catch (error) {
//       alert("Update failed!");
//     }
//   };

//   if (!user)
//     return (
//       <p style={{ padding: "20px", color: "white" }}>Loading Profile...</p>
//     );

//   return (
//     <div
//       style={{
//         padding: "30px",
//         maxWidth: "900px",
//         margin: "0 auto",
//         color: "white",
//         fontFamily: "sans-serif",
//       }}
//     >
//       {/* USER PROFILE SECTION */}
//       <section
//         style={{
//           border: "2px solid white",
//           padding: "20px",
//           marginBottom: "40px",
//           backgroundColor: "#111",
//         }}
//       >
//         {isEditing ? (
//           <div
//             style={{ display: "flex", flexDirection: "column", gap: "10px" }}
//           >
//             <h2 style={{ textTransform: "uppercase", color: "white" }}>
//               Edit Profile
//             </h2>
//             <label>Profile Picture:</label>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               style={{
//                 border: "1px solid white",
//                 padding: "5px",
//                 color: "white",
//               }}
//             />
//             <input
//               value={editData.name}
//               onChange={(e) =>
//                 setEditData({ ...editData, name: e.target.value })
//               }
//               placeholder="Name"
//               style={{
//                 padding: "10px",
//                 background: "black",
//                 color: "white",
//                 border: "1px solid white",
//               }}
//             />
//             <textarea
//               value={editData.description}
//               onChange={(e) =>
//                 setEditData({ ...editData, description: e.target.value })
//               }
//               placeholder="Bio/Description"
//               style={{
//                 padding: "10px",
//                 background: "black",
//                 color: "white",
//                 border: "1px solid white",
//                 minHeight: "80px",
//               }}
//             />
//             <input
//               value={editData.youtube}
//               onChange={(e) =>
//                 setEditData({ ...editData, youtube: e.target.value })
//               }
//               placeholder="YouTube Link"
//               style={{
//                 padding: "10px",
//                 background: "black",
//                 color: "white",
//                 border: "1px solid white",
//               }}
//             />
//             <input
//               value={editData.instagram}
//               onChange={(e) =>
//                 setEditData({ ...editData, instagram: e.target.value })
//               }
//               placeholder="Instagram Link"
//               style={{
//                 padding: "10px",
//                 background: "black",
//                 color: "white",
//                 border: "1px solid white",
//               }}
//             />
//             <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
//               <button
//                 onClick={handleUpdate}
//                 style={{
//                   background: "white",
//                   color: "black",
//                   padding: "10px 20px",
//                   border: "none",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                 }}
//               >
//                 SAVE CHANGES
//               </button>
//               <button
//                 onClick={() => setIsEditing(false)}
//                 style={{
//                   background: "transparent",
//                   color: "white",
//                   padding: "10px 20px",
//                   border: "1px solid white",
//                   cursor: "pointer",
//                 }}
//               >
//                 CANCEL
//               </button>
//             </div>
//           </div>
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               gap: "30px",
//               alignItems: "center",
//               flexWrap: "wrap",
//             }}
//           >
//             <img
//               src={user.profilePic || "https://via.placeholder.com/150"}
//               style={{
//                 width: "150px",
//                 height: "150px",
//                 borderRadius: "50%",
//                 border: "3px solid white",
//                 objectFit: "cover",
//               }}
//               alt="Profile"
//             />
//             <div style={{ flex: 1 }}>
//               <h1
//                 style={{
//                   margin: "0 0 10px 0",
//                   textTransform: "uppercase",
//                   fontSize: "32px",
//                   color: "white",
//                 }}
//               >
//                 {user.name}
//               </h1>

//               {/* Only show these if they exist */}
//               {user.description && (
//                 <p
//                   style={{
//                     lineHeight: "1.4",
//                     marginBottom: "15px",
//                     color: "#ccc",
//                   }}
//                 >
//                   {user.description}
//                 </p>
//               )}

//               <div
//                 style={{ display: "flex", gap: "15px", marginBottom: "15px" }}
//               >
//                 {user.youtube && (
//                   <a
//                     href={user.youtube}
//                     target="_blank"
//                     style={{
//                       color: "#ff0000",
//                       fontWeight: "bold",
//                       textDecoration: "none",
//                     }}
//                   >
//                     YOUTUBE
//                   </a>
//                 )}
//                 {user.instagram && (
//                   <a
//                     href={user.instagram}
//                     target="_blank"
//                     style={{
//                       color: "#e1306c",
//                       fontWeight: "bold",
//                       textDecoration: "none",
//                     }}
//                   >
//                     INSTAGRAM
//                   </a>
//                 )}
//               </div>

//               <div style={{ display: "flex", gap: "10px" }}>
//                 <button
//                   onClick={() => setIsEditing(true)}
//                   style={{
//                     background: "white",
//                     color: "black",
//                     padding: "8px 15px",
//                     border: "none",
//                     cursor: "pointer",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   EDIT PROFILE
//                 </button>
//                 <button
//                   onClick={() => {
//                     localStorage.clear();
//                     router.push("/login");
//                   }}
//                   style={{
//                     background: "#ff4d4d",
//                     color: "white",
//                     padding: "8px 15px",
//                     border: "none",
//                     cursor: "pointer",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   LOGOUT
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </section>

//       {/* RECIPES LIST SECTION */}
//       <h2
//         style={{
//           textDecoration: "underline",
//           textTransform: "uppercase",
//           marginBottom: "20px",
//           color: "white",
//         }}
//       >
//         My Recipes
//       </h2>

//       {recipes.length === 0 && (
//         <p style={{ color: "#888" }}>No recipes found (Pending or Approved).</p>
//       )}

//       <div style={{ display: "grid", gap: "25px" }}>
//         {recipes.map((r) => (
//           <div
//             key={r._id}
//             style={{
//               border: "1px solid white",
//               padding: "25px",
//               backgroundColor: "#111",
//               position: "relative",
//               display: "flex",
//               flexDirection: "column",
//               gap: "15px",
//             }}
//           >
//             {/* WE CHECK HERE: 
//           Is this specific recipe being edited? 
//       */}
//             {editingRecipeId === r._id ? (
//               /* --- EDITING MODE FORM --- */
//               <div
//                 style={{
//                   display: "flex",
//                   flexDirection: "column",
//                   gap: "15px",
//                 }}
//               >
//                 <h3 style={{ color: "white", margin: 0 }}>
//                   Editing: {r.title}
//                 </h3>

//                 <label style={{ fontSize: "12px", color: "#888" }}>TITLE</label>
//                 <input
//                   value={recipeEditData.title}
//                   onChange={(e) =>
//                     setRecipeEditData({
//                       ...recipeEditData,
//                       title: e.target.value,
//                     })
//                   }
//                   style={{
//                     background: "black",
//                     color: "white",
//                     border: "1px solid white",
//                     padding: "10px",
//                   }}
//                 />

//                 <label style={{ fontSize: "12px", color: "#888" }}>
//                   INGREDIENTS
//                 </label>
//                 <textarea
//                   value={recipeEditData.ingredients}
//                   onChange={(e) =>
//                     setRecipeEditData({
//                       ...recipeEditData,
//                       ingredients: e.target.value,
//                     })
//                   }
//                   style={{
//                     background: "black",
//                     color: "white",
//                     border: "1px solid white",
//                     padding: "10px",
//                     height: "100px",
//                   }}
//                 />

//                 <label style={{ fontSize: "12px", color: "#888" }}>STEPS</label>
//                 <textarea
//                   value={recipeEditData.steps}
//                   onChange={(e) =>
//                     setRecipeEditData({
//                       ...recipeEditData,
//                       steps: e.target.value,
//                     })
//                   }
//                   style={{
//                     background: "black",
//                     color: "white",
//                     border: "1px solid white",
//                     padding: "10px",
//                     height: "100px",
//                   }}
//                 />

//                 <div style={{ display: "flex", gap: "10px" }}>
//                   <button
//                     onClick={handleRecipeUpdate}
//                     style={{
//                       background: "white",
//                       color: "black",
//                       padding: "10px 20px",
//                       fontWeight: "bold",
//                       cursor: "pointer",
//                       border: "none",
//                     }}
//                   >
//                     SAVE CHANGES
//                   </button>
//                   <button
//                     onClick={() => setEditingRecipeId(null)}
//                     style={{
//                       background: "transparent",
//                       color: "white",
//                       border: "1px solid white",
//                       padding: "10px 20px",
//                       cursor: "pointer",
//                     }}
//                   >
//                     CANCEL
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               /* --- NORMAL VIEW MODE --- */
//               <>
//                 {/* Status Badge */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     top: "15px",
//                     right: "15px",
//                     padding: "5px 12px",
//                     border: "1px solid white",
//                     fontSize: "12px",
//                     fontWeight: "bold",
//                     backgroundColor:
//                       r.status === "pending" ? "transparent" : "white",
//                     color: r.status === "pending" ? "white" : "black",
//                     zIndex: 2,
//                   }}
//                 >
//                   {r.status.toUpperCase()}
//                 </div>

//                 {/* 📸 RECIPE FOOD IMAGE */}
//                 {r.image && (
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "300px",
//                       overflow: "hidden",
//                       borderRadius: "4px",
//                       border: "1px solid #333",
//                     }}
//                   >
//                     <img
//                       src={r.image}
//                       alt={r.title}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                       }}
//                     />
//                   </div>
//                 )}

//                 <h3
//                   style={{
//                     fontSize: "26px",
//                     margin: "0",
//                     borderBottom: "1px solid #444",
//                     paddingBottom: "5px",
//                     color: "white",
//                   }}
//                 >
//                   {r.title}
//                 </h3>

//                 <div
//                   style={{
//                     display: "grid",
//                     gridTemplateColumns: "1fr 1fr",
//                     gap: "20px",
//                   }}
//                 >
//                   <div>
//                     <h4
//                       style={{
//                         margin: "0 0 5px 0",
//                         textTransform: "uppercase",
//                         fontSize: "12px",
//                         color: "#888",
//                       }}
//                     >
//                       Ingredients:
//                     </h4>
//                     <p
//                       style={{
//                         whiteSpace: "pre-wrap",
//                         lineHeight: "1.4",
//                         color: "white",
//                         fontSize: "14px",
//                       }}
//                     >
//                       {r.ingredients}
//                     </p>
//                   </div>
//                   <div>
//                     <h4
//                       style={{
//                         margin: "0 0 5px 0",
//                         textTransform: "uppercase",
//                         fontSize: "12px",
//                         color: "#888",
//                       }}
//                     >
//                       Steps:
//                     </h4>
//                     <p
//                       style={{
//                         whiteSpace: "pre-wrap",
//                         lineHeight: "1.4",
//                         color: "white",
//                         fontSize: "14px",
//                       }}
//                     >
//                       {r.steps}
//                     </p>
//                   </div>
//                 </div>

//                 <div
//                   style={{
//                     borderTop: "1px solid #444",
//                     paddingTop: "15px",
//                     display: "flex",
//                     justifyContent: "space-between",
//                     alignItems: "center",
//                   }}
//                 >
//                   <div
//                     style={{
//                       display: "flex",
//                       alignItems: "center",
//                       gap: "10px",
//                     }}
//                   >
//                     <span style={{ fontSize: "20px" }}>❤️</span>
//                     <b style={{ fontSize: "18px", color: "white" }}>
//                       {r.likes?.length || 0} LIKES
//                     </b>
//                   </div>

//                   <div style={{ display: "flex", gap: "15px" }}>
//                     <button
//                       onClick={() => startEditing(r)}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         color: "#aaa",
//                         textDecoration: "underline",
//                         cursor: "pointer",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       EDIT
//                     </button>
//                     <button
//                       onClick={() => deleteRecipe(r._id)}
//                       style={{
//                         background: "none",
//                         border: "none",
//                         color: "#ff4d4d",
//                         cursor: "pointer",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       DELETE
//                     </button>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => router.push("/dashboard")}
//         style={{
//           marginTop: "40px",
//           padding: "12px 25px",
//           background: "black",
//           color: "white",
//           border: "2px solid white",
//           fontWeight: "bold",
//           cursor: "pointer",
//         }}
//       >
//         ← BACK TO DASHBOARD
//       </button>
//     </div>
//   );
// }






"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  const [recipeEditData, setRecipeEditData] = useState({ title: "", ingredients: "", steps: "", image: "" });
  const [editData, setEditData] = useState({ name: "", description: "", youtube: "", instagram: "", profilePic: "" });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) { router.push("/login"); return; }

    const fetchData = async () => {
      try {
        const userRes = await fetch(`/api/users/${userId}`);
        const userData = await userRes.json();
        if (userRes.ok) {
          setUser(userData);
          setEditData({
            name: userData.name || "",
            description: userData.description || "",
            youtube: userData.youtube || "",
            instagram: userData.instagram || "",
            profilePic: userData.profilePic || "",
          });
        }
        const recipeRes = await fetch(`/api/recipes/user/${userId}`);
        const recipeData = await recipeRes.json();
        setRecipes(Array.isArray(recipeData) ? recipeData : []);
      } catch (err) { console.error("Fetch error:", err); }
    };
    fetchData();
  }, [router]);

  const handleUpdate = async () => {
    const res = await fetch("/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, ...editData }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUser(updated.user);
      setIsEditing(false);
    }
  };

  const deleteRecipe = async (id) => {
    if (!confirm("Remove this recipe forever?")) return;
    const res = await fetch("/api/recipes/delete", {
      method: "DELETE",
      body: JSON.stringify({ recipeId: id, userId: user._id }),
    });
    if (res.ok) setRecipes(recipes.filter((r) => r._id !== id));
  };

  if (!user) return <div className="min-h-screen bg-background flex items-center justify-center text-foreground font-bold italic tracking-tighter text-2xl">LOADING...</div>;

  return (
<div className="min-h-screen bg-background text-foreground pb-20">
      <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 w-full" />
      
      <div className="max-w-5xl mx-auto px-6">
        <section className="relative -mt-24 mb-16 bg-foreground/[0.03] backdrop-blur-xl border border-foreground/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
          <AnimatePresence mode="wait">
            {!isEditing ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative w-40 h-40 rounded-full border-4 border-background overflow-hidden shadow-xl">
                  <Image src={user.profilePic || "https://via.placeholder.com/150"} alt="Profile" fill className="object-cover" />
                </div>
                
                <div className="flex-1 text-center md:text-left">
                  {/* --- RECIPE COUNT STAT ADDED HERE --- */}
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 mb-2">
                    <h1 className="text-5xl font-black tracking-tighter italic uppercase">{user.name}</h1>
                    <div className="inline-flex items-center gap-2 bg-foreground/10 px-4 py-1 rounded-full border border-foreground/5">
                      <span className="text-blue-500 font-black text-xl">{recipes.length}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Recipes Posted</span>
                    </div>
                  </div>
                  {/* ------------------------------------ */}

                  <p className="text-foreground/60 max-w-xl leading-relaxed mb-6">
                    {user.description || "No bio yet. Tell the world about your kitchen secrets."}
                  </p>
                  
                  <div className="flex flex-wrap justify-center md:justify-start gap-4">
                    <button onClick={() => setIsEditing(true)} className="px-6 py-2 bg-foreground text-background rounded-full font-bold text-sm hover:scale-105 transition-transform">Edit Profile</button>
                    <button onClick={() => { localStorage.clear(); router.push("/login"); }} className="px-6 py-2 border border-red-500/50 text-red-500 rounded-full font-bold text-sm hover:bg-red-500 hover:text-white transition-all">Logout</button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                   <label className="text-xs font-black tracking-widest text-foreground/30 uppercase">Full Name</label>
                   <input className="w-full bg-background border border-foreground/10 p-3 rounded-xl outline-none focus:border-blue-500" value={editData.name} onChange={(e) => setEditData({...editData, name: e.target.value})} />
                   <label className="text-xs font-black tracking-widest text-foreground/30 uppercase">Bio</label>
                   <textarea className="w-full bg-background border border-foreground/10 p-3 rounded-xl h-24 outline-none focus:border-blue-500" value={editData.description} onChange={(e) => setEditData({...editData, description: e.target.value})} />
                </div>
                <div className="space-y-4">
                   <label className="text-xs font-black tracking-widest text-foreground/30 uppercase">Instagram Link</label>
                   <input className="w-full bg-background border border-foreground/10 p-3 rounded-xl outline-none focus:border-pink-500" value={editData.instagram} onChange={(e) => setEditData({...editData, instagram: e.target.value})} />
                   <div className="flex gap-4 pt-4">
                     <button onClick={handleUpdate} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold">Save Profile</button>
                     <button onClick={() => setIsEditing(false)} className="px-6 py-3 border border-foreground/10 rounded-xl font-bold">Cancel</button>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ===== RECIPES GRID ===== */}
        <div className="flex items-center justify-between mb-8 px-4">
          <h2 className="text-2xl font-black italic uppercase tracking-tighter">My Kitchen Cabinet <span className="text-foreground/20 ml-2">({recipes.length})</span></h2>
          <button onClick={() => router.push("/dashboard")} className="text-xs font-bold border-b border-foreground/20 pb-1 hover:text-blue-500 transition-colors">BACK TO FEED</button>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {recipes.map((r) => (
            <motion.div key={r._id} layout className="group relative bg-foreground/[0.02] border border-foreground/5 rounded-[2.5rem] overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Recipe Image Section */}
                <div className="relative w-full lg:w-96 h-64 lg:h-auto overflow-hidden">
                   <Image src={r.image || "https://via.placeholder.com/400"} alt={r.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className={`absolute top-6 left-6 px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter backdrop-blur-md border ${r.status === 'pending' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'}`}>
                      {r.status.toUpperCase()}
                   </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 lg:p-12">
                   <div className="flex justify-between items-start mb-4">
                      <h3 className="text-3xl font-black italic tracking-tighter uppercase">{r.title}</h3>
                      <div className="flex gap-4">
                         <button onClick={() => deleteRecipe(r._id)} className="text-xs font-black text-red-500/50 hover:text-red-500 uppercase tracking-widest transition-colors">Delete</button>
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-foreground/60 mb-8">
                      <div>
                        <p className="font-black text-[10px] uppercase tracking-widest text-foreground/20 mb-2">Ingredients</p>
                        <p className="line-clamp-3 leading-relaxed">{r.ingredients}</p>
                      </div>
                      <div>
                        <p className="font-black text-[10px] uppercase tracking-widest text-foreground/20 mb-2">Total Likes</p>
                        <p className="text-2xl font-bold text-foreground italic">❤️ {r.likes?.length || 0}</p>
                      </div>
                   </div>

                   <button onClick={() => router.push(`/recipe/${r._id}`)} className="w-full py-4 border border-foreground/10 rounded-2xl font-bold hover:bg-foreground hover:text-background transition-all">VIEW FULL RECIPE</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}