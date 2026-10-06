import { useState } from "react";

// Self-contained: the only import is "react", so Vite can always resolve it.
// Replace the TODO in handleSubmit with your real auth call.

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f6f8",
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
    padding: 16,
  },
  card: {
    width: "100%",
    maxWidth: 380,
    background: "#fff",
    borderRadius: 12,
    padding: 28,
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  title: { margin: "0 0 4px", fontSize: 24 },
  sub: { margin: "0 0 20px", color: "#666", fontSize: 14 },
  label: { display: "block", fontSize: 13, margin: "12px 0 4px" },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "10px 12px",
    fontSize: 16,
    border: "1px solid #ccc",
    borderRadius: 8,
  },
  button: {
    width: "100%",
    marginTop: 20,
    padding: "11px 0",
    fontSize: 16,
    color: "#fff",
    background: "#2f5bea",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  error: { color: "#c0392b", fontSize: 14, marginTop: 12 },
};

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      // TODO: call your real login API here, e.g.
      // const res = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, password }),
      // });
      // if (!res.ok) throw new Error("Wrong email or password.");
      console.log("Login submitted for", email);
    } catch (err) {
      setError(err.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Log in</h1>
        <p style={styles.sub}>Welcome back.</p>

        <form onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label style={styles.label} htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
