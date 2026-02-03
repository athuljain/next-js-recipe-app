// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function ProfilePage() {
//   const router = useRouter();
//   const [user, setUser] = useState(null);
//   const [recipes, setRecipes] = useState([]);

//   useEffect(() => {
//     const name = localStorage.getItem("name");
//     const userId = localStorage.getItem("userId");

//     if (!userId) {
//       router.push("/login");
//       return;
//     }

//     setUser({ name, userId });

//     fetch(`/api/recipes/user/${userId}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setRecipes(data);
//         } else {
//           setRecipes([]);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         setRecipes([]);
//       });
//   }, [router]);

//   if (!user) return <p style={{ color: "black", padding: "20px" }}>Loading...</p>;

//   return (
//     <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", color: "black", fontFamily: "sans-serif" }}>
      
//       <header style={{ borderBottom: "2px solid black", paddingBottom: "10px", marginBottom: "20px", color:"white"}}>
//         <h1 style={{ margin: 0, textTransform: "uppercase",color: "white" }}>User Profile</h1>
//         <p style={{ fontSize: "18px",color: "white" }}><b>Chef:</b> {user.name}</p>
        
//         <button
//           style={{ background: "red", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", fontWeight: "bold" }}
//           onClick={() => {
//             localStorage.clear();
//             router.push("/login");
//           }}
//         >
//           LOGOUT
//         </button>
//       </header>

//       <h2 style={{ textDecoration: "underline" }}>My Recipes</h2>

//       {recipes.length === 0 && <p>No recipes submitted yet.</p>}

//       <div style={{ display: "grid", gap: "20px" }}>
//         {recipes.map((r) => (
//           <div
//             key={r._id}
//             style={{
//               border: "2px solid black",
//               padding: "20px",
//               borderRadius: "0px", // Sharp corners for a modern black look
//               backgroundColor: r.status === "pending" ? "#f9f9f9" : "#ffffff",
//               position: "relative"
//             }}
//           >
//             {/* Status Badge */}
//             <div style={{
//               position: "absolute",
//               top: "10px",
//               right: "10px",
//               padding: "5px 10px",
//               border: "1px solid black",
//               fontSize: "12px",
//               fontWeight: "bold",
//               backgroundColor: r.status === "pending" ? "#eee" : "black",
//               color: r.status === "pending" ? "black" : "white"
//             }}>
//               {r.status.toUpperCase()}
//             </div>

//             <h3 style={{ fontSize: "24px", marginTop: "0", color: "black" }}>{r.title}</h3>

//             <div style={{ marginBottom: "15px" }}>
//               <h4 style={{ marginBottom: "5px", textTransform: "uppercase" }}>Ingredients:</h4>
//               <p style={{ whiteSpace: "pre-wrap", color: "black", lineHeight: "1.5" }}>{r.ingredients}</p>
//             </div>

//             <div style={{ marginBottom: "15px" }}>
//               <h4 style={{ marginBottom: "5px", textTransform: "uppercase" }}>Cooking Steps:</h4>
//               <p style={{ whiteSpace: "pre-wrap", color: "black", lineHeight: "1.5" }}>{r.steps}</p>
//             </div>

//             <div style={{ borderTop: "1px solid #ccc", paddingTop: "10px", display: "flex", alignItems: "center", gap: "10px" }}>
//               <span style={{ fontSize: "20px" }}>❤️</span>
//               <b style={{ color: "black" }}>{r.likes?.length || 0} Likes</b>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button 
//         onClick={() => router.push("/dashboard")}
//         style={{ 
//           marginTop: "30px", 
//           padding: "12px 24px", 
//           backgroundColor: "transparent", 
//           border: "2px solid black", 
//           fontWeight: "bold", 
//           cursor: "pointer" 
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

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    youtube: "",
    instagram: "",
    profilePic: ""
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

   const fetchData = async () => {
  try {
    // Fetch User Profile (Bio, Pic, Links)
    const userRes = await fetch(`/api/users/${userId}`);
    const userData = await userRes.json();
    
    if (userRes.ok) {
      setUser(userData);
      // This fills the edit form with the data FROM the database
      setEditData({
        name: userData.name || "",
        description: userData.description || "",
        youtube: userData.youtube || "",
        instagram: userData.instagram || "",
        profilePic: userData.profilePic || ""
      });
    }

    // Fetch Recipes
    const recipeRes = await fetch(`/api/recipes/user/${userId}`);
    const recipeData = await recipeRes.json();
    
    // Ensure we only set the array if it's valid
    setRecipes(Array.isArray(recipeData) ? recipeData : []);

  } catch (err) {
    console.error("Fetch error:", err);
  }
};
    fetchData();
  }, [router]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async () => {
    const res = await fetch("/api/users/update", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user._id, ...editData }),
    });
    if (res.ok) {
      const updated = await res.json();
      setUser(updated.user);
      localStorage.setItem("name", updated.user.name);
      setIsEditing(false);
      alert("Profile Updated!");
    }
  };

  if (!user) return <p style={{ padding: "20px", color: "gray" }}>Loading Profile...</p>;

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "0 auto", color: "black", fontFamily: "sans-serif" }}>
      
      {/* USER PROFILE SECTION */}
      <section style={{ border: "2px solid black", padding: "20px", marginBottom: "40px" }}>
        {isEditing ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <h2 style={{ textTransform: "uppercase" }}>Edit Profile</h2>
            <label>Profile Picture:</label>
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ border: "1px solid black", padding: "5px" }} />
            <input value={editData.name} onChange={e => setEditData({...editData, name: e.target.value})} placeholder="Name" style={{ padding: "10px", border: "1px solid black" }} />
            <textarea value={editData.description} onChange={e => setEditData({...editData, description: e.target.value})} placeholder="Bio/Description" style={{ padding: "10px", border: "1px solid black", minHeight: "80px" }} />
            <input value={editData.youtube} onChange={e => setEditData({...editData, youtube: e.target.value})} placeholder="YouTube Link" style={{ padding: "10px", border: "1px solid black" }} />
            <input value={editData.instagram} onChange={e => setEditData({...editData, instagram: e.target.value})} placeholder="Instagram Link" style={{ padding: "10px", border: "1px solid black" }} />
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={handleUpdate} style={{ background: "black", color: "white", padding: "10px 20px", border: "none", cursor: "pointer", fontWeight: "bold" }}>SAVE CHANGES</button>
              <button onClick={() => setIsEditing(false)} style={{ background: "white", color: "black", padding: "10px 20px", border: "1px solid black", cursor: "pointer" }}>CANCEL</button>
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "30px", alignItems: "center", flexWrap: "wrap" }}>
            <img 
              src={user.profilePic || "https://via.placeholder.com/150"} 
              style={{ width: "150px", height: "150px", borderRadius: "50%", border: "3px solid black", objectFit: "cover" }} 
              alt="Profile"
            />
            <div style={{ flex: 1 }}>
              <h1 style={{ margin: "0 0 10px 0", textTransform: "uppercase", fontSize: "32px",color:"white" }}>{user.name}</h1>
              <p style={{ lineHeight: "1.4", marginBottom: "15px",color:"white" }}>{user.description || "No bio added yet."}</p>
              
              <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
                {user.youtube && <a href={user.youtube} target="_blank" style={{ color: "black", fontWeight: "bold" }}>YOUTUBE</a>}
                {user.instagram && <a href={user.instagram} target="_blank" style={{ color: "black", fontWeight: "bold" }}>INSTAGRAM</a>}
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => setIsEditing(true)} style={{ background: "black", color: "white", padding: "8px 15px", border: "none", cursor: "pointer", fontWeight: "bold" }}>EDIT PROFILE</button>
                <button 
                  onClick={() => { localStorage.clear(); router.push("/login"); }} 
                  style={{ background: "red", color: "white", padding: "8px 15px", border: "none", cursor: "pointer", fontWeight: "bold" }}
                >LOGOUT</button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* RECIPES LIST SECTION */}
      <h2 style={{ textDecoration: "underline", textTransform: "uppercase", marginBottom: "20px" }}>My Recipes</h2>

      {recipes.length === 0 && <p>No recipes found (Pending or Approved).</p>}

      <div style={{ display: "grid", gap: "25px" }}>
        {recipes.map((r) => (
          <div
            key={r._id}
            style={{
              border: "2px solid black",
              padding: "25px",
              backgroundColor: r.status === "pending" ? "#f9f9f9" : "white",
              position: "relative"
            }}
          >
            {/* Status Badge */}
            <div style={{
              position: "absolute", top: "15px", right: "15px",
              padding: "5px 12px", border: "1px solid black",
              fontSize: "12px", fontWeight: "bold",
              backgroundColor: r.status === "pending" ? "#eee" : "black",
              color: r.status === "pending" ? "black" : "white"
            }}>
              {r.status.toUpperCase()}
            </div>

            <h3 style={{ fontSize: "26px", margin: "0 0 20px 0", borderBottom: "1px solid black", paddingBottom: "5px" }}>{r.title}</h3>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 5px 0", textTransform: "uppercase", fontSize: "14px" }}>Ingredients:</h4>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{r.ingredients}</p>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h4 style={{ margin: "0 0 5px 0", textTransform: "uppercase", fontSize: "14px" }}>Steps:</h4>
              <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{r.steps}</p>
            </div>

            <div style={{ borderTop: "1px solid black", paddingTop: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "20px" }}>❤️</span>
              <b style={{ fontSize: "18px" }}>{r.likes?.length || 0} LIKES</b>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => router.push("/dashboard")}
        style={{ marginTop: "40px", padding: "12px 25px", background: "white", border: "2px solid black", fontWeight: "bold", cursor: "pointer" }}
      >
        ← BACK TO DASHBOARD
      </button>

    </div>
  );
} 