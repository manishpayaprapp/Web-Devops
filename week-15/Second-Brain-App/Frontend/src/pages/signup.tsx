import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";

export function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      await apiRequest("/api/v1/signup", {
        method: "POST",
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      }, false);
      navigate("/signin", { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Sign up failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={signup}>
        <div className="brand-mark">B</div>
        <p className="eyebrow">MAKE SPACE FOR GOOD IDEAS</p>
        <h1>Create your brain</h1>
        <p className="muted">Save the videos and posts you want to remember.</p>
        <Input label="Username" name="username" placeholder="At least 3 characters" autoComplete="username" required minLength={3} />
        <Input label="Password" name="password" placeholder="8+ chars, upper, lower & symbol" type="password" autoComplete="new-password" required minLength={8} />
        {error && <p className="form-error" role="alert">{error}</p>}
        <Button type="submit" text="Create account" fullWidth loading={loading} />
        <p className="auth-switch">Already have an account? <Link to="/signin">Sign in</Link></p>
      </form>
    </main>
  );
}
