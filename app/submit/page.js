// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function SubmitRecipe() {
//   const router = useRouter();
//   const [form, setForm] = useState({ title: "", ingredients: "", steps: "", image: "" });
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const storedId = localStorage.getItem("userId");
//     if (!localStorage.getItem("token")) {
//       router.push("/login");
//     } else {
//       setUserId(storedId);
//     }
//   }, []);

//   // Handle text inputs
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle Image selection and convert to Base64
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setForm({ ...form, image: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!userId) return alert("Please login first");

//     const res = await fetch("/api/recipes/add", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ ...form, userId })
//     });

//     if (res.ok) {
//       alert("Recipe Submitted for Approval!");
//       router.push("/profile"); 
//     }
//   };

//   return (
//     <div style={{ padding: "30px", maxWidth: "600px", margin: "0 auto", color: "white", backgroundColor: "black" }}>
//       <h1>Submit New Recipe</h1>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
//         <input name="title" placeholder="Recipe Title" onChange={handleChange} required 
//           style={{ padding: "10px", background: "#222", color: "white", border: "1px solid #444" }} />

//         {/* IMAGE UPLOAD FIELD */}
//         <label>Food Image:</label>
//         <input type="file" accept="image/*" onChange={handleImageChange} required 
//           style={{ padding: "10px", border: "1px solid #444" }} />
        
//         {form.image && <img src={form.image} alt="Preview" style={{ width: "100%", borderRadius: "10px" }} />}

//         <textarea name="ingredients" placeholder="Ingredients" onChange={handleChange} required 
//           style={{ padding: "10px", background: "#222", color: "white", border: "1px solid #444", height: "100px" }} />

//         <textarea name="steps" placeholder="Cooking Steps" onChange={handleChange} required 
//           style={{ padding: "10px", background: "#222", color: "white", border: "1px solid #444", height: "150px" }} />

//         <button style={{ padding: "12px", background: "white", color: "black", fontWeight: "bold", cursor: "pointer" }}>
//           SUBMIT RECIPE
//         </button>
//       </form>
//     </div>
//   );
// }






"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function SubmitRecipe() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", ingredients: "", steps: "", image: "" });
  const [userId, setUserId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      setUserId(storedId);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) return alert("Please login first");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/recipes/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, userId })
      });

      if (res.ok) {
        alert("Recipe Submitted for Approval!");
        router.push("/profile");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-12 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <header className="mb-10">
          <h1 className="text-4xl font-black tracking-tight mb-2">Share a Recipe</h1>
          <p className="text-foreground/50">Your creation will be reviewed by our community.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title Input */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Recipe Title</label>
            <input 
              name="title" 
              placeholder="e.g. Midnight Garlic Pasta" 
              onChange={handleChange} 
              required 
              className="w-full bg-foreground/[0.03] border-b-2 border-foreground/10 py-4 text-2xl font-bold outline-none focus:border-foreground transition-colors placeholder:text-foreground/10"
            />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Cover Photo</label>
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                required={!form.image}
                className="absolute inset-0 w-full h-full opacity-0 z-20 cursor-pointer"
              />
              <div className={`w-full h-64 rounded-3xl border-2 border-dashed flex flex-col items-center justify-center transition-all ${form.image ? 'border-transparent' : 'border-foreground/10 group-hover:border-foreground/30'}`}>
                <AnimatePresence mode="wait">
                  {form.image ? (
                    <motion.img 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      src={form.image} 
                      alt="Preview" 
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  ) : (
                    <div className="text-center">
                      <span className="text-4xl mb-2 block">📸</span>
                      <p className="text-sm text-foreground/40">Click to upload food photo</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Ingredients</label>
            <textarea 
              name="ingredients" 
              placeholder="List items separated by lines..." 
              onChange={handleChange} 
              required 
              className="w-full min-h-[120px] p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/10 outline-none focus:ring-2 focus:ring-foreground/5 transition-all resize-none"
            />
          </div>

          {/* Steps */}
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-foreground/40">Cooking Steps</label>
            <textarea 
              name="steps" 
              placeholder="Describe the process..." 
              onChange={handleChange} 
              required 
              className="w-full min-h-[200px] p-4 rounded-2xl bg-foreground/[0.03] border border-foreground/10 outline-none focus:ring-2 focus:ring-foreground/5 transition-all resize-none"
            />
          </div>

          {/* Submit Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full py-5 bg-foreground text-background font-black rounded-2xl text-lg shadow-xl shadow-foreground/10 hover:shadow-foreground/20 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "PUBLISHING..." : "SUBMIT FOR REVIEW"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}