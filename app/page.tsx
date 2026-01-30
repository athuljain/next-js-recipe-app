export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>🍔 Recipe Sharing App</h1>
      <p>Share and discover amazing recipes</p>

      <div style={{ marginTop: "30px" }}>
        <a href="/register">
          <button>Register</button>
        </a>

        <a href="/login" style={{ marginLeft: "10px" }}>
          <button>User Login</button>
        </a>

        <a href="/admin-login" style={{ marginLeft: "10px" }}>
          <button>Admin Login</button>
        </a>
      </div>
    </div>
  );
}
