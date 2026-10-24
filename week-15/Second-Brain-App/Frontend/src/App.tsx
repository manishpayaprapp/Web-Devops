import { type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Signin } from "./pages/signin";
import { Signup } from "./pages/signup";
import { SharedBrain } from "./pages/shared-brain";

function getIsAuthenticated(): boolean {
  const token = localStorage.getItem("token");
  return Boolean(token && token !== "null" && token !== "undefined" && token.trim() !== "");
}

function RequireAuth({ children }: { children: ReactNode }) {
  return getIsAuthenticated()
    ? <>{children}</>
    : <Navigate to="/signin" replace />;
}

function RedirectIfAuth({ children }: { children: ReactNode }) {
  return getIsAuthenticated()
    ? <Navigate to="/dashboard" replace />
    : <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={getIsAuthenticated() ? "/dashboard" : "/signin"} replace />} />
        <Route path="/signup" element={<RedirectIfAuth><Signup /></RedirectIfAuth>} />
        <Route path="/signin" element={<RedirectIfAuth><Signin /></RedirectIfAuth>} />
        <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
        <Route path="/share/:shareLink" element={<SharedBrain />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
