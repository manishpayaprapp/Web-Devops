import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api";
import { Button } from "../components/UI/Button";
import { Input } from "../components/UI/Input";

interface SigninResponse {
  token: string;
}

export function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function signin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);

    try {
      const result = await apiRequest<SigninResponse>("/api/v1/signin", {
        method: "POST",
        body: JSON.stringify({
          username: form.get("username"),
          password: form.get("password"),
        }),
      }, false);
      localStorage.setItem("token", result.token);
      navigate("/dashboard", { replace: true });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Sign in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={signin}>
        <div className="brand-mark">B</div>
        <p className="eyebrow">YOUR PERSONAL KNOWLEDGE SPACE</p>
        <h1>Welcome back</h1>
        <p className="muted">Sign in to pick up where your ideas left off.</p>
        <Input label="Username" name="username" placeholder="Your username" autoComplete="username" required minLength={3} />
        <Input label="Password" name="password" placeholder="Your password" type="password" autoComplete="current-password" required />
        {error && <p className="form-error" role="alert">{error}</p>}
        <Button type="submit" text="Sign in" fullWidth loading={loading} />
        <p className="auth-switch">New to Brainly? <Link to="/signup">Create an account</Link></p>
      </form>
    </main>
  );
}
